import React, { useState, useEffect, useCallback } from "react";
import {
	View,
	Text,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import TextInput from "@components/common/TextInput";

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { checkEmail, createVerificationCode } from "config/api";
import { debounce } from "util/debounce";

import ApplyButton from "@components/common/ApplyButton";
import InfoCircle from "@components/common/InfoCircle";

const SignUpStep1Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const [valueID, onChangeID] = useState(stepData[1] || "");
	const [validID, setValidID] = useState(true);
	const [isFormValid, setIsFormValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsFormValid(valueID && validID);
	}, [valueID]);

	const handleEmailFormat = (email) => {
		const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
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

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const fetchCreateVerificationCode = async () => {
		setLoading(true);
		try {
			await createVerificationCode(valueID);
			saveData(1, valueID);
			goToNext(2);
			setLoading(false);
		} catch (error) {
			console.error(
				"회원가입 인증번호 전송 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<View style={SignUpStyles.container}>
				<Text
					style={[SignUpStyles.textSubTitle, { marginBottom: 120 }]}
				>
					{t("emailPlaceholder")}
				</Text>
				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						ID (Email Address)
					</Text>
					<TextInput
						style={SignUpStyles.textInputIdPw}
						placeholder={t("emailPlaceholder")}
						onChangeText={(text) => handleEmailFormat(text)}
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
				</View>

				<View style={[SignUpStyles.buttonMove, { top: 265 }]}>
					<ApplyButton
						text={t("passwordResetButton")}
						disabled={!isFormValid}
						onPress={fetchCreateVerificationCode}
						loading={loading}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SignUpStep1Page;
