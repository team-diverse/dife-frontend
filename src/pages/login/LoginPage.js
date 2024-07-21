import React, { useState } from "react";
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

import { CustomTheme } from "@styles/CustomTheme";
import LoginStyles from "@pages/login/LoginStyles";

import BottomTwoButtons from "@components/common/BottomTwoButtons";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import LoginBackground from "@components/login/LoginBackground";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { useAuth } from "src/states/AuthContext";
import InfoCircle from "@components/common/InfoCircle";
import { getProfile, login } from "config/api";
import * as SecureStore from "expo-secure-store";

const LoginPage = () => {
	const navigation = useNavigation();

	const loginData = ["Dife와 함께하는\n캠퍼스 라이프!", "지금 바로 시작하기"];
	const [valueID, onChangeID] = useState("");
	const [valuePW, onChangePW] = useState("");
	const [showPW, setShowPW] = useState(false);
	const { updateOnboardingData } = useOnboarding();
	const { setIsLoggedIn } = useAuth();
	const [loginFailed, setLoginFailed] = useState(false);

	const handleShowPW = () => {
		setShowPW(!showPW);
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleSignUp = () => {
		navigation.navigate("SignUp");
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

			updateOnboardingData({ id, accessToken, refreshToken });

			const profileResponse = await getProfile();
			if (profileResponse.data.isVerified) {
				setIsLoggedIn(true);
			} else {
				navigation.navigate("Nickname");
			}
		} catch (error) {
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
					navigation.navigate("LoadingVerification");
					break;
				case 500:
					console.error(
						"500:",
						error.response ? error.response.data : error.message,
					);
					setLoginFailed(true);
					break;
				default:
					console.error(
						"오류:",
						error.response ? error.response.data : error.message,
					);
			}
		}
	};

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
					onChangeText={(text) => onChangeID(text)}
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
						onChangeText={(text) => onChangePW(text)}
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
