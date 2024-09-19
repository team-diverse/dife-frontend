import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import FindPasswordStyles from "@pages/login/FindPasswordStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { getVerifyCode, changePassword } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import ModalRequest from "@components/common/ModalRequest";
import GoBack from "@components/common/GoBack";
import * as Sentry from "@sentry/react-native";

const FindPasswordPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [valueID, onChangeID] = useState("");
	const [validID, setValidID] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");
	const [isNext, setIsNext] = useState(false);
	const [invalidVerificationCode, setInvalidVerificationCode] =
		useState(false);
	const [verificationCode, setVerificationCode] = useState();
	const [modalConnectVisible, setModalConnectVisible] = useState(false);

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleEmailFormat = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(email);
		setValidID(isValid);
		if (isValid) {
			setValidID(true);
		} else {
			setErrorMessage(t("emailInvalidError"));
		}
		onChangeID(email);
	};

	const handleFindPassword = async () => {
		setModalConnectVisible(true);
		try {
			await getVerifyCode(valueID);
			setValidID(true);
			setIsNext(true);
		} catch (error) {
			Sentry.captureException(error);
			setModalConnectVisible(false);
			console.error(
				"비밀번호 재발급 실패:",
				error.response ? error.response.data : error.message,
			);
			setValidID(false);
			setErrorMessage(t("errorRetry"));
		} finally {
			setModalConnectVisible(false);
		}
	};

	const handleSetPassword = async () => {
		try {
			const response = await changePassword(
				verificationCode,
				null,
				valueID,
			);
			if (response.status === 200) {
				navigation.navigate("SetPasswordPage", {
					verificationCode: verificationCode,
					valueID: valueID,
				});
			} else {
				setInvalidVerificationCode(true);
				setErrorMessage(t("verifyCodePrompt"));
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"인증번호 매치 실패: ",
				error.response ? error.response.data : error.message,
			);
			setInvalidVerificationCode(true);
			setErrorMessage(t("verifyCodePrompt"));
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[FindPasswordStyles.container]}>
				<GoBack />
				<Text style={FindPasswordStyles.textTitle}>
					{t("findPasswordTitle")}
				</Text>
				<Text style={FindPasswordStyles.textSubTitle}>
					{t("findPasswordSubtitle")}
				</Text>
				<Text style={FindPasswordStyles.textId}>
					ID (Email Address)
				</Text>
				<View style={FindPasswordStyles.textInputId}>
					<TextInput
						placeholder={t("emailPlaceholder")}
						onChangeText={handleEmailFormat}
						value={valueID}
						editable={isNext ? false : true}
					/>
				</View>
				{validID == false && (
					<View style={FindPasswordStyles.containerNotMember}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={FindPasswordStyles.textNotMember}>
							{errorMessage}
						</Text>
					</View>
				)}
				{isNext ? (
					<>
						<Text
							style={[
								FindPasswordStyles.textId,
								{ marginTop: 36 },
							]}
						>
							{t("verificationCode")}
						</Text>
						<View style={FindPasswordStyles.textInputId}>
							<TextInput
								onChangeText={(text) =>
									setVerificationCode(text)
								}
								value={verificationCode}
							/>
						</View>
						{invalidVerificationCode && (
							<View style={FindPasswordStyles.containerNotMember}>
								<InfoCircle color={CustomTheme.warningRed} />
								<Text style={FindPasswordStyles.textNotMember}>
									{errorMessage}
								</Text>
							</View>
						)}
						<View style={FindPasswordStyles.applyButton}>
							<ApplyButton
								text={t("setPasswordButton")}
								disabled={!verificationCode}
								onPress={handleSetPassword}
							/>
						</View>
					</>
				) : (
					<>
						<View style={{ marginTop: 37 }}>
							<ApplyButton
								text={t("passwordResetButton")}
								disabled={!validID}
								onPress={handleFindPassword}
							/>
						</View>
						<ModalRequest
							modalVisible={modalConnectVisible}
							setModalVisible={setModalConnectVisible}
							textLoading={t("emailSendingText")}
							textComplete={t("emailSentText")}
						/>
					</>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default FindPasswordPage;
