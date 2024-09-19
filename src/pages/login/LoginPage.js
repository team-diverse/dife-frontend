import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Device from "expo-device";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import LoginStyles from "@pages/login/LoginStyles";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { useAuth } from "src/states/AuthContext";
import { getMyProfile, login, createNotificationToken } from "config/api";

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

	const [valueID, setEmail] = useState("");
	const [valuePW, setPassword] = useState("");
	const [showPW, setShowPW] = useState(false);
	const { updateOnboardingData } = useOnboarding();
	const { setIsLoggedIn } = useAuth();
	const [loginFailed, setLoginFailed] = useState(false);
	const [deviceId, setDeviceId] = useState("");

	useEffect(() => {
		const getDeviceId = async () => {
			const id = Device.modelId;
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
		setEmail(text);
		setLoginFailed(false);
	};

	const handlePassword = (text) => {
		setPassword(text);
		setLoginFailed(false);
	};

	const handleLogin = async () => {
		try {
			const loginResponse = await login(valueID, valuePW);
			const id = loginResponse.data.member_id;
			const accessToken = loginResponse.data.accessToken;
			const refreshToken = loginResponse.data.refreshToken;

			await SecureStore.setItemAsync("memberId", JSON.stringify(id));
			await SecureStore.setItemAsync("accessToken", accessToken);
			await SecureStore.setItemAsync("refreshToken", refreshToken);
			await SecureStore.setItemAsync("deviceId", deviceId);

			console.log(accessToken);
			updateOnboardingData({ id, accessToken, refreshToken });

			const profileResponse = await getMyProfile();
			if (profileResponse.data.isVerified) {
				setIsLoggedIn(true);
			} else {
				navigation.navigate("Nickname");
			}

			await createNotificationToken(accessToken, deviceId);
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
					} else {
						navigation.navigate("LoadingVerification");
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
			setEmail(mockEmail);
			setPassword(mockPassword);
		}
	}, []);

	useEffect(() => {
		if (isMockLoginEnabled && valueID && valuePW) {
			handleLogin();
		}
	}, [valueID, valuePW]);

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={LoginStyles.container}>
				<DifeLine style={LoginStyles.backgroundLogin} />
				<Text style={LoginStyles.textTitle}>{t("loginTitle")}</Text>
				<Text style={LoginStyles.textSubTitle}>
					{t("loginSubtitle")}
				</Text>
				<View style={LoginStyles.containerIdPw}>
					<Text style={LoginStyles.textIdPw}>ID (Email Address)</Text>
					<TextInput
						style={
							loginFailed
								? [
										LoginStyles.textInputIdPw,
										{ borderColor: CustomTheme.warningRed },
									]
								: LoginStyles.textInputIdPw
						}
						placeholder={t("placeholderEmail")}
						onChangeText={(text) => handleEmail(text)}
						value={valueID}
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

				<View style={LoginStyles.containerButtonSignupLogin}>
					<BottomTwoButtons>
						<View
							text={t("signUp")}
							onPress={() => navigation.navigate("SignUp")}
						/>
						<View text={t("login")} onPress={handleLogin} />
					</BottomTwoButtons>
					{/* <TouchableOpacity
						onPress={() => navigation.navigate("FindPassword")}
					>
						<Text style={LoginStyles.textReport}>
							{t("loginForgotPassword")}
						</Text>
					</TouchableOpacity> */}
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default LoginPage;
