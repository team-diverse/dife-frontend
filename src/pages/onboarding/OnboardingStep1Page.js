import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import TextInput from "@components/common/TextInput";

import OnboardingStep1Styles from "@pages/onboarding/OnboardingStep1Styles";
import { checkUsername } from "config/api";
import { debounce } from "util/debounce";

import DifeLine from "@components/common/DifeLine";
import IconDelete from "@components/onboarding/IconDelete";
import ApplyButton from "@components/common/ApplyButton";
import * as Sentry from "@sentry/react-native";

const OnboardingStep1Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const [nickname, setNickname] = useState(stepData[1].nickname || "");
	const [nicknameValid, setNicknameValid] = useState(
		stepData[1].nicknameValid || null,
	);

	const handleNicknameChange = (text) => {
		setNickname(text);
		if (text.length > 0) {
			handleNickname(text);
		} else {
			setNicknameValid(null);
		}
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleClearText = () => {
		setNickname("");
		setNicknameValid(null);
	};

	const handleNickname = useCallback(
		debounce(async (text) => {
			try {
				const response = await checkUsername(text);
				if (response.status === 200) {
					setNicknameValid(true);
				} else {
					setNicknameValid(false);
				}
			} catch (error) {
				console.error("닉네임 사용 불가: ", error.message);
				Sentry.captureException(error);
				setNicknameValid(false);
			}
		}, 100),
		[],
	);

	const handleNicknameSubmit = () => {
		if (nicknameValid) {
			saveData(1, { nickname, nicknameValid });
			goToNext(2);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<View style={OnboardingStep1Styles.container}>
				<DifeLine style={OnboardingStep1Styles.backgroundLogin} />
				<Text
					style={[OnboardingStep1Styles.textTitle, { marginTop: 41 }]}
				>
					{t("welcomeMessage")}
				</Text>
				<Text style={OnboardingStep1Styles.textSubTitle}>
					{t("nicknamePrompt")}
				</Text>
				<View style={OnboardingStep1Styles.containerInput}>
					<TextInput
						style={OnboardingStep1Styles.textInputNickname}
						placeholder={t("nicknamePlaceholder")}
						onChangeText={handleNicknameChange}
						value={nickname}
						maxLength={12}
					/>
					{nickname.length > 0 && (
						<TouchableOpacity
							style={OnboardingStep1Styles.iconDelete}
							onPress={handleClearText}
						>
							<IconDelete />
						</TouchableOpacity>
					)}
				</View>
				{nickname.length > 0 &&
					typeof nicknameValid === "boolean" &&
					(nicknameValid ? (
						<Text
							style={OnboardingStep1Styles.textAvailableNickname}
						>
							{t("nicknameAvailable")}
						</Text>
					) : (
						<Text
							style={
								OnboardingStep1Styles.textUnavailableNickname
							}
						>
							{t("nicknameUnavailable")}
						</Text>
					))}
				<View style={OnboardingStep1Styles.buttonCheck}>
					<ApplyButton
						text={t("confirmButtonText")}
						onPress={handleNicknameSubmit}
						disabled={!nicknameValid || nickname.length === 0}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default OnboardingStep1Page;
