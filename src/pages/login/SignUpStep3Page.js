import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import TextInput from "@components/common/TextInput";

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { signUp } from "config/api";

import ApplyButton from "@components/common/ApplyButton";
import InfoCircle from "@components/common/InfoCircle";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";

const SignUpStep3Page = ({ stepData }) => {
	const navigation = useNavigation();

	const { t } = useTranslation();

	const [valuePW, onChangePW] = useState("");
	const [valueCheckPW, onChangeCheckPW] = useState("");
	const [showPW, setShowPW] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [passwordError, setPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);

	useEffect(() => {
		setIsFormValid(
			valuePW && valueCheckPW && passwordMatch && !passwordError,
		);
	}, [valuePW, valueCheckPW, passwordMatch, passwordError]);

	const handleShowPW = () => {
		setShowPW(!showPW);
	};

	const handlePasswordError = (text) => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
		setPasswordError(!passwordRegex.test(text));
		onChangePW(text);
	};

	const handleCheckPassword = (text) => {
		setPasswordMatch(valuePW === text);
		onChangeCheckPW(text);
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleSignUp = async () => {
		try {
			await signUp(stepData[1], valuePW);
			navigation.navigate("Login");
		} catch (error) {
			console.error(
				"회원가입 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<View style={SignUpStyles.container}>
				<Text style={[SignUpStyles.textSubTitle, { marginBottom: 21 }]}>
					{t("placeholderPassword")}
				</Text>
				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						ID (Email Address)
					</Text>
					<TextInput
						style={[
							SignUpStyles.textInputIdPw,
							{ color: "#8C8D91" },
						]}
						value={stepData[1]}
						editable={false}
						selectTextOnFocus={false}
					/>
				</View>

				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						{t("passwordLabel")}
					</Text>
					<View style={SignUpStyles.textInputPwContainer}>
						<TextInput
							style={SignUpStyles.textInputIdPw}
							placeholder={t("passwordPlaceholder")}
							onChangeText={handlePasswordError}
							value={valuePW}
							secureTextEntry={!showPW}
						/>
						<TouchableOpacity
							style={SignUpStyles.iconSee}
							onPress={handleShowPW}
						>
							{valuePW == "" ? null : showPW ? (
								<IconSeePw />
							) : (
								<IconNotSeePw />
							)}
						</TouchableOpacity>
					</View>
					{passwordError && (
						<View style={SignUpStyles.containerError}>
							<InfoCircle color={CustomTheme.warningRed} />
							<Text style={SignUpStyles.textError}>
								{t("passwordError")}
							</Text>
						</View>
					)}
				</View>

				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						{t("confirmPasswordLabel")}
					</Text>
					<View style={SignUpStyles.textInputPwContainer}>
						<TextInput
							style={SignUpStyles.textInputIdPw}
							placeholder={t("confirmPasswordPlaceholder")}
							onChangeText={handleCheckPassword}
							value={valueCheckPW}
							secureTextEntry={true}
						/>
					</View>
					{!passwordMatch && (
						<View style={SignUpStyles.containerError}>
							<InfoCircle color={CustomTheme.warningRed} />
							<Text style={SignUpStyles.textError}>
								{t("passwordMismatchError")}
							</Text>
						</View>
					)}
				</View>

				<View style={SignUpStyles.buttonMove}>
					<ApplyButton
						text={t("signUpCompleteButton")}
						disabled={!isFormValid}
						onPress={handleSignUp}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SignUpStep3Page;
