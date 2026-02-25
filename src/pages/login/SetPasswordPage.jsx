import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
	ScrollView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import TextInput from "@components/common/TextInput";

import SetPasswordStyles from "@pages/login/SetPasswordStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { changePassword } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import GoBack from "@components/common/GoBack";
import IconSeePw from "@components/login/IconSeePw";
import IconNotSeePw from "@components/login/IconNotSeePw";

const SetPasswordPage = ({ route }) => {
	const { verificationCode, valueID } = route.params;

	const { t } = useTranslation();
	const navigation = useNavigation();

	const [valuePW, onChangePW] = useState("");
	const [valueCheckPW, onChangeCheckPW] = useState("");
	const [showPW, setShowPW] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [passwordError, setPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const scrollViewRef = useRef(null);

	useEffect(() => {
		setIsFormValid(
			valuePW && valueCheckPW && passwordMatch && !passwordError,
		);
	}, [valuePW, valueCheckPW, passwordMatch, passwordError]);

	useEffect(() => {
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const showSubscription = Keyboard.addListener(showEvent, (event) => {
			setKeyboardHeight(event.endCoordinates?.height ?? 0);
		});
		const hideSubscription = Keyboard.addListener(hideEvent, () => {
			scrollViewRef.current?.scrollTo({ y: 0, animated: false });
			setKeyboardHeight(0);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

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

	const handleSetPassword = async () => {
		try {
			const response = await changePassword(
				verificationCode,
				valuePW,
				valueID,
			);
			if (response.status === 200) {
				navigation.navigate("Login");
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"비밀번호 재설정 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={SetPasswordStyles.container}>
				<GoBack />
				<ScrollView
					ref={scrollViewRef}
					contentContainerStyle={{
						paddingBottom:
							keyboardHeight > 0
								? keyboardHeight +
									(Platform.OS === "ios" ? 72 : 56)
								: 180,
					}}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
					scrollEnabled={keyboardHeight > 0}
				>
					<Text style={SetPasswordStyles.textTitle}>
						{t("setPasswordTitle")}
					</Text>
					<View style={SetPasswordStyles.containerPw}>
						<Text style={SetPasswordStyles.textPw}>
							{t("passwordLabel")}
						</Text>
						<View style={SetPasswordStyles.textInputPwContainer}>
							<TextInput
								style={SetPasswordStyles.textInputPw}
								placeholder={t("passwordPlaceholder")}
								onChangeText={handlePasswordError}
								value={valuePW}
								secureTextEntry={!showPW}
							/>
							<TouchableOpacity
								style={SetPasswordStyles.iconSee}
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
							<View style={SetPasswordStyles.containerError}>
								<InfoCircle color={CustomTheme.warningRed} />
								<Text style={SetPasswordStyles.textError}>
									{t("passwordError")}
								</Text>
							</View>
						)}
						<Text
							style={[
								SetPasswordStyles.textPw,
								{ marginTop: 36 },
							]}
						>
							{t("confirmPasswordLabel")}
						</Text>
						<View style={SetPasswordStyles.textInputPwContainer}>
							<TextInput
								style={SetPasswordStyles.textInputPw}
								placeholder={t("confirmPasswordPlaceholder")}
								onChangeText={handleCheckPassword}
								value={valueCheckPW}
								secureTextEntry={!showPW}
							/>
						</View>
						{!passwordMatch && (
							<View style={SetPasswordStyles.containerError}>
								<InfoCircle color={CustomTheme.warningRed} />
								<Text style={SetPasswordStyles.textError}>
									{t("passwordMismatchError")}
								</Text>
							</View>
						)}
					</View>
					<View style={SetPasswordStyles.applyButton}>
						<ApplyButton
							text={t("loginPageButton")}
							disabled={!isFormValid}
							onPress={handleSetPassword}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SetPasswordPage;
