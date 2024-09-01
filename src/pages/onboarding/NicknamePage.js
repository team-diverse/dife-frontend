import React, { useState, useCallback } from "react";
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

import NicknameStyles from "@pages/onboarding/NicknameStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { checkUsername } from "config/api";
import { debounce } from "util/debounce";

import ArrowRight from "@components/common/ArrowRight";
import Progress1 from "@components/onboarding/Progress1";
import LoginBackground from "@components/login/LoginBackground";
import IconDelete from "@components/onboarding/IconDelete";
import ApplyButton from "@components/common/ApplyButton";
import * as Sentry from "@sentry/react-native";

const NicknamePage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const [nickname, setNickname] = useState("");
	const [nicknameValid, setNicknameValid] = useState(null);
	const { updateOnboardingData } = useOnboarding();

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

	const handleNicknameSubmit = () => {
		if (nicknameValid) {
			updateOnboardingData({ username: nickname });
			navigation.navigate("Profile");
		}
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

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[NicknameStyles.container]}>
				<TouchableOpacity onPress={handleGoBack}>
					<ArrowRight
						style={NicknameStyles.iconArrow}
						color={CustomTheme.textPrimary}
					/>
				</TouchableOpacity>
				<View style={[NicknameStyles.iconProgress]}>
					<Progress1 />
				</View>
				<LoginBackground style={NicknameStyles.backgroundLogin} />
				<Text style={NicknameStyles.textTitle}>
					{t("welcomeMessage")}
				</Text>
				<Text style={NicknameStyles.textSubTitle}>
					{t("nicknamePrompt")}
				</Text>
				<View style={NicknameStyles.containerInput}>
					<TextInput
						style={NicknameStyles.textInputNickname}
						placeholder={t("nicknamePlaceholder")}
						onChangeText={handleNicknameChange}
						value={nickname}
						maxLength={12}
					/>
					{nickname.length > 0 && (
						<TouchableOpacity
							style={NicknameStyles.iconDelete}
							onPress={handleClearText}
						>
							<IconDelete />
						</TouchableOpacity>
					)}
				</View>
				{nickname.length > 0 &&
					typeof nicknameValid === "boolean" &&
					(nicknameValid ? (
						<Text style={NicknameStyles.textAvailableNickname}>
							{t("nicknameAvailable")}
						</Text>
					) : (
						<Text style={NicknameStyles.textUnavailableNickname}>
							{t("nicknameUnavailable")}
						</Text>
					))}
				<View style={NicknameStyles.buttonCheck}>
					<ApplyButton
						text={t("confirmButtonText")}
						onPress={handleNicknameSubmit}
						disabled={!nicknameValid || nickname.length === 0}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default NicknamePage;
