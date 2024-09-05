import React, { useState, useEffect, useCallback } from "react";
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
import { useTranslation } from "react-i18next";

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { signUp, checkEmail } from "config/api";
import { debounce } from "util/debounce";

import ApplyButton from "@components/common/ApplyButton";
import InfoCircle from "@components/common/InfoCircle";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import GoBack from "@components/common/GoBack";
import * as Sentry from "@sentry/react-native";

const SignUpPage = () => {
	const navigation = useNavigation();

	const { t } = useTranslation();

	const [valueID, onChangeID] = useState("");
	const [valuePW, onChangePW] = useState("");
	const [valueCheckPW, onChangeCheckPW] = useState("");
	const [showPW, setShowPW] = useState(false);
	const [validID, setValidID] = useState(true);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [passwordError, setPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setIsFormValid(
			valueID &&
				validID &&
				valuePW &&
				valueCheckPW &&
				passwordMatch &&
				!passwordError,
		);
	}, [valueID, valuePW, valueCheckPW, passwordMatch, passwordError]);

	const handleShowPW = () => {
		setShowPW(!showPW);
	};

	const handleEmailFormat = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(email);
		setValidID(isValid);
		if (isValid) {
			handleEmail(email);
		} else {
			setErrorMessage(t("emailInvalidError"));
		}
		onChangeID(email);
	};

	const handleEmail = useCallback(
		debounce(async (email) => {
			try {
				await checkEmail(email);
				setValidID(true);
			} catch (error) {
				console.error("이메일 사용 불가: ", error.message);
				setValidID(false);
				setErrorMessage(t("duplicateEmailError"));
			}
		}, 300),
		[validID],
	);

	const handlePasswordError = (text) => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
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
			await signUp(valueID, valuePW);
			navigation.navigate("Login");
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"회원가입 실패:",
				error.response ? error.response.data : error.message,
			);
			setValidID(false);
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[SignUpStyles.container]}>
				<GoBack />
				<Text style={SignUpStyles.textTitle}>{t("signUpTitle")}</Text>
				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>{t("emailLabel")}</Text>
					<TextInput
						style={SignUpStyles.textInputIdPw}
						placeholder={t("emailPlaceholder")}
						onChangeText={handleEmailFormat}
						value={valueID}
					/>
					{!validID && (
						<View style={SignUpStyles.containerError}>
							<InfoCircle color={CustomTheme.warningRed} />
							<Text style={SignUpStyles.textError}>
								{errorMessage}
							</Text>
						</View>
					)}
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
					<Text style={SignUpStyles.textIdPw}>
						{t("confirmPasswordLabel")}
					</Text>
					<View style={SignUpStyles.textInputPwContainer}>
						<TextInput
							style={SignUpStyles.textInputIdPw}
							placeholder={t("confirmPasswordPlaceholder")}
							onChangeText={handleCheckPassword}
							value={valueCheckPW}
							secureTextEntry={!showPW}
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
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SignUpPage;
