import React, { useState, useCallback } from "react";
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
import { changePassword, checkEmail } from "config/api";
import { debounce } from "util/debounce";

import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import ModalRequest from "@components/common/ModalRequest";
import GoBack from "@components/common/GoBack";
import * as Sentry from "@sentry/react-native";

const FindPasswordPage = () => {
	const { t } = useTranslation();

	const [valueID, onChangeID] = useState("");
	const [validID, setValidID] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
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
				setValidID(false);
				setErrorMessage(t("emailNotFoundError"));
			} catch (error) {
				setValidID(true);
			}
		}, 300),
		[validID],
	);

	const handleFindPassword = async () => {
		setModalConnectVisible(true);
		try {
			await changePassword(valueID);
			setValidID(true);
			navigation.navigate("FindPasswordVerifying");
		} catch (error) {
			Sentry.captureException(error);
			setModalConnectVisible(false);
			console.error(
				"비밀번호 재발급 실패:",
				error.response ? error.response.data : error.message,
			);
			setValidID(false);
			setErrorMessage(t("registeredMemberInfoError"));
		} finally {
			setModalConnectVisible(false);
		}
	};

	const [modalConnectVisible, setModalConnectVisible] = useState(false);

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
				<ApplyButton
					text={t("passwordResetButton")}
					disabled={!validID}
					onPress={handleFindPassword}
				/>
				<ModalRequest
					modalVisible={modalConnectVisible}
					setModalVisible={setModalConnectVisible}
					textLoading={t("emailSendingText")}
					textComplete={t("emailSentText")}
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default FindPasswordPage;
