import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
	const [verificationCode, setVerificationCode] = useState("");
	const [modalConnectVisible, setModalConnectVisible] = useState(false);
	const [timeLeft, setTimeLeft] = useState(3 * 60);
	const [timerKey, setTimerKey] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timerKey]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	const fetchCreateVerificationCode = async () => {
		setVerificationCode("");
		setInvalidVerificationCode(false);
		setErrorMessage("");
		setTimeLeft(3 * 60);
		setTimerKey((prev) => prev + 1);
		try {
			await getVerifyCode(valueID);
		} catch (error) {
			console.error(
				"비밀번호 찾기 인증번호 전송 실패:",
				error.response ? error.response.data : error.message,
			);
			setInvalidVerificationCode(true);
			setErrorMessage(t("verifyCodePrompt"));
		}
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleEmailFormat = (email) => {
		const emailRegex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
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
			setIsNext(true);
			setInvalidVerificationCode(true);
			setErrorMessage(t("verifyCodePrompt"));
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={FindPasswordStyles.container}>
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
				<View style={FindPasswordStyles.containerTextInputId}>
					<TextInput
						style={FindPasswordStyles.textInputId}
						placeholder={t("emailPlaceholder")}
						onChangeText={(text) => handleEmailFormat(text.trim())}
						value={valueID}
						editable={isNext ? false : true}
					/>
					{isNext && (
						<TouchableOpacity
							style={FindPasswordStyles.containerRetransmit}
							onPress={fetchCreateVerificationCode}
						>
							<Text style={FindPasswordStyles.textResend}>
								{t("resend")}
							</Text>
						</TouchableOpacity>
					)}
				</View>
				{validID == false && (
					<View style={FindPasswordStyles.containerError}>
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
						<View style={FindPasswordStyles.containerTextInputId}>
							<TextInput
								style={FindPasswordStyles.textInputId}
								onChangeText={(text) =>
									setVerificationCode(text)
								}
								value={verificationCode}
							/>
						</View>
						<View
							style={[
								FindPasswordStyles.containerError,
								{ justifyContent: "space-between" },
							]}
						>
							<View style={{ flexDirection: "row" }}>
								<InfoCircle color={CustomTheme.warningRed} />

								{invalidVerificationCode ? (
									<Text
										style={FindPasswordStyles.textNotMember}
									>
										{t("verifyCodePrompt")}
									</Text>
								) : timeLeft === 0 ? (
									<Text
										style={FindPasswordStyles.textNotMember}
									>
										{t("invalidVerificationCode")}
									</Text>
								) : (
									<Text
										style={FindPasswordStyles.textNotMember}
									>
										{t("verificationCodeSent")}
									</Text>
								)}
							</View>

							{!invalidVerificationCode && timeLeft > 0 && (
								<Text style={FindPasswordStyles.textNotMember}>
									{formatTime(timeLeft)}
								</Text>
							)}
						</View>

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
