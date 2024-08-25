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

import { CustomTheme } from "@styles/CustomTheme";
import LoginStyles from "@pages/login/LoginStyles";

import BottomTwoButtons from "@components/common/BottomTwoButtons";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import LoginBackground from "@components/login/LoginBackground";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { useAuth } from "src/states/AuthContext";
import InfoCircle from "@components/common/InfoCircle";
import { getMyProfile, login, createNotificationToken } from "config/api";
import * as SecureStore from "expo-secure-store";
import * as Sentry from "@sentry/react-native";

const isMockLoginEnabled = process.env.EXPO_PUBLIC_MOCK_LOGIN === "true";
const mockEmail = process.env.EXPO_PUBLIC_MOCK_EMAIL || "";
const mockPassword = process.env.EXPO_PUBLIC_MOCK_PASSWORD || "";

const LoginPage = () => {
	const navigation = useNavigation();

	const loginData = ["Dife와 함께하는\n캠퍼스 라이프!", "지금 바로 시작하기"];
	const [valueID, setEmail] = useState("");
	const [valuePW, setPassword] = useState("");
	const [showPW, setShowPW] = useState(false);
	const { updateOnboardingData } = useOnboarding();
	const { setIsLoggedIn } = useAuth();
	const [loginFailed, setLoginFailed] = useState(false);
	const [deviceId, setDeviceId] = useState("");

	useEffect(() => {
		const getDeviceId = async () => {
			const id = await Device.modelId;
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

	const handleSignUp = () => {
		navigation.navigate("SignUp");
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
			<SafeAreaView style={[LoginStyles.container]}>
				<LoginBackground style={LoginStyles.backgroundLogin} />
				<Text style={LoginStyles.textTitle}>{loginData[0]}</Text>
				<Text style={LoginStyles.textSubTitle}>{loginData[1]}</Text>
				<Text style={LoginStyles.textId}>ID (Email Address)</Text>
				<TextInput
					style={
						loginFailed
							? [
									LoginStyles.textInputPw,
									{ borderColor: CustomTheme.warningRed },
								]
							: LoginStyles.textInputId
					}
					placeholder="이메일을 입력해주세요"
					onChangeText={(text) => handleEmail(text)}
					value={valueID}
				/>
				<Text style={LoginStyles.textPw}>Password</Text>
				<View style={LoginStyles.textInputPwContainer}>
					<TextInput
						style={
							loginFailed
								? [
										LoginStyles.textInputPw,
										{ borderColor: CustomTheme.warningRed },
									]
								: LoginStyles.textInputPw
						}
						placeholder="비밀번호를 입력해주세요"
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
							입력하신 아이디 또는 비밀번호를 확인해주세요
						</Text>
					</View>
				)}
				<View style={LoginStyles.ButtonSignupPwContainer}>
					<BottomTwoButtons>
						<View text="회원가입" onPress={handleSignUp} />
						<View text="로그인" onPress={handleLogin} />
					</BottomTwoButtons>
					<TouchableOpacity
						onPress={() => navigation.navigate("FindPassword")}
					>
						<Text style={LoginStyles.textReport}>
							비밀번호를 까먹었어요
						</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default LoginPage;
