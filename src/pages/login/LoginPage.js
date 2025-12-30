import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";
import { getLocales } from "expo-localization";

import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";
import * as Updates from "expo-updates";
import LoginStyles from "@pages/login/LoginStyles";
import { useAuth } from "src/states/AuthContext";
import {
	getMyProfile,
	login,
	createNotificationToken,
	updateMyProfile,
} from "config/api";

import BottomTwoButtons from "@components/common/BottomTwoButtons";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import DifeLine from "@components/common/DifeLine";
import InfoCircle from "@components/common/InfoCircle";
const isMockLoginEnabled = process.env.EXPO_PUBLIC_MOCK_LOGIN === "true";
const mockEmail = process.env.EXPO_PUBLIC_MOCK_EMAIL || "";
const mockPassword = process.env.EXPO_PUBLIC_MOCK_PASSWORD || "";

const LoginPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const emailRef = useRef("");
	const [valuePW, setPassword] = useState("");
	const [showPW, setShowPW] = useState(false);
	const { setIsLoggedIn } = useAuth();
	const [loginFailed, setLoginFailed] = useState(false);
	const [deviceId, setDeviceId] = useState("");

	useEffect(() => {
		const getDeviceId = async () => {
			const id = Device.modelName;
			setDeviceId(id);
		};

		getDeviceId();
	}, []);

	const handleShowPW = () => {
		setShowPW(!showPW);
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleEmail = (text) => {
		emailRef.val = text;
		setLoginFailed(false);
	};

	const handlePassword = (text) => {
		setPassword(text);
		setLoginFailed(false);
	};

	const DEVICE_LANG_FLAG_KEY = "didSendDeviceLanguage";

	const deviceLanguageOnce = async () => {
		const alreadySent =
			await SecureStore.getItemAsync(DEVICE_LANG_FLAG_KEY);
		if (alreadySent === "true") return;

		try {
			const formData = new FormData();
			formData.append(
				"settingLanguage",
				getLocales()[0].languageCode.toUpperCase(),
			);
			await updateMyProfile(formData);

			await SecureStore.setItemAsync(DEVICE_LANG_FLAG_KEY, "true");
		} catch (error) {
			console.error("언어 설정 업데이트 오류:", error);
		}
	};

	const handleLogin = async () => {
		try {
			const loginResponse = await login(emailRef.val, valuePW);
			const { status } = await Notifications.getPermissionsAsync();
			const projectId =
				Constants.expoConfig?.extra?.eas?.projectId ||
				Updates.manifest?.extra?.eas?.projectId ||
				null;

			let token = "undefined";

			try {
				if (status === "granted") {
					token = (
						await Notifications.getExpoPushTokenAsync({
							projectId,
						})
					).data;
				} else {
					const { granted } =
						await Notifications.requestPermissionsAsync();

					console.log("REQUEST", granted);
					if (granted) {
						token = (
							await Notifications.getExpoPushTokenAsync({
								projectId,
							})
						).data;
						console.log("FINALLY", token);
					}
				}
			} catch (error) {
				console.error("푸시 알림 토큰 요청 중 오류 발생:", error);
			}

			const id = loginResponse.data.member_id;
			const accessToken = loginResponse.data.accessToken;
			const refreshToken = loginResponse.data.refreshToken;

			await SecureStore.setItemAsync("memberId", JSON.stringify(id));
			await SecureStore.setItemAsync("accessToken", accessToken);
			await SecureStore.setItemAsync("refreshToken", refreshToken);
			await SecureStore.setItemAsync(
				"deviceId",
				JSON.stringify(deviceId),
			);

			console.log(accessToken);

			await deviceLanguageOnce();

			const profileResponse = await getMyProfile();
			const { username } = profileResponse.data;

			if (username && username !== "Diver") {
				setIsLoggedIn(true);
			} else {
				navigation.navigate("OnboardingPage");
			}

			await createNotificationToken(token, deviceId);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"로그인 또는 프로필 확인 오류:",
				error.response ? error.response.data : error.message,
			);
			const status = error.response ? error.response.status : null;
			switch (status) {
				case 401:
					console.error(
						"401:",
						error.response ? error.response.data : error.message,
					);
					setLoginFailed(true);
					break;
				case 403:
					console.error(
						"403:",
						error.response ? error.response.data : error.message,
					);
					if (error.response.data.message === "탈퇴한 회원입니다!") {
						setLoginFailed(true);
					}

					break;
				default:
					console.error(
						"오류:",
						error.response ? error.response.data : error.message,
					);
			}
		}
	};

	useEffect(() => {
		if (isMockLoginEnabled) {
			emailRef.val = mockEmail;
			setPassword(mockPassword);
		}
	}, []);

	useEffect(() => {
		if (isMockLoginEnabled && emailRef.val && valuePW) {
			handleLogin();
		}
	}, [valuePW]);

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={LoginStyles.container}>
				<DifeLine style={LoginStyles.backgroundLogin} />

				<Text style={LoginStyles.textTitle}>{t("loginTitle")}</Text>
				<Text style={LoginStyles.textSubTitle}>
					{t("loginSubtitle")}
				</Text>

				<KeyboardAvoidingView
					behavior={"position"}
					keyboardVerticalOffset={20}
				>
					<View style={LoginStyles.containerIdPw}>
						<Text style={LoginStyles.textIdPw}>
							ID (Email Address)
						</Text>
						<TextInput
							ref={emailRef}
							style={
								loginFailed
									? [
											LoginStyles.textInputIdPw,
											{
												borderColor:
													CustomTheme.warningRed,
											},
										]
									: LoginStyles.textInputIdPw
							}
							placeholder={t("emailPlaceholder")}
							autoCorrect={false}
							onChangeText={(text) => handleEmail(text)}
						/>

						<Text style={LoginStyles.textIdPw}>Password</Text>
						<View style={LoginStyles.textInputPwContainer}>
							<TextInput
								style={
									loginFailed
										? [
												LoginStyles.textInputIdPw,
												{
													borderColor:
														CustomTheme.warningRed,
												},
											]
										: LoginStyles.textInputIdPw
								}
								placeholder={t("placeholderPassword")}
								onChangeText={(text) => handlePassword(text)}
								value={valuePW}
								secureTextEntry={!showPW}
							/>

							<TouchableOpacity
								style={LoginStyles.iconSee}
								onPress={handleShowPW}
							>
								{valuePW == "" ? null : showPW ? (
									<IconSeePw />
								) : (
									<IconNotSeePw />
								)}
							</TouchableOpacity>
						</View>
						{loginFailed && (
							<View style={LoginStyles.containerError}>
								<InfoCircle color={CustomTheme.warningRed} />
								<Text style={LoginStyles.textError}>
									{t("loginError")}
								</Text>
							</View>
						)}
					</View>
				</KeyboardAvoidingView>

				<KeyboardAvoidingView>
					<View style={LoginStyles.containerButtonSignupLogin}>
						<BottomTwoButtons>
							<View
								text={t("signUpTitle")}
								onPress={() => navigation.navigate("SignUp")}
							/>
							<View text={t("login")} onPress={handleLogin} />
						</BottomTwoButtons>
						<TouchableOpacity
							onPress={() => navigation.navigate("FindPassword")}
						>
							<Text style={LoginStyles.textReport}>
								{t("loginForgotPassword")}
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default LoginPage;
