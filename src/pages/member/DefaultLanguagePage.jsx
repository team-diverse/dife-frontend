import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import DefaultLanguageStyles from "@pages/member/DefaultLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyProfile, updateMyProfile } from "config/api";
import i18n from "i18next";

import TopBar from "@components/common/TopBar";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const DefaultLanguagePage = ({ route }) => {
	const { defaultLanguage } = route.params;
	const { t } = useTranslation();

	const languageMap = {
		EN: "English / English",
		ZH: "中文 / Chinese",
		JA: "日本語 / Japanese",
		ES: "Español / Spanish",
		KO: "한국어 / Korean",
	};

	const reverseLanguageMap = Object.fromEntries(
		Object.entries(languageMap).map(([code, display]) => [display, code]),
	);

	const [selected, setSelected] = useState(languageMap[defaultLanguage]);
	const [selectedLanguage, setSelectedLanguage] = useState(
		reverseLanguageMap[selected],
	);

	const handleAlert = (value) => {
		Alert.alert(
			"",
			t("changeLanguageConfirmation"),
			[
				{ text: t("cancelButton"), style: "cancel" },
				{
					text: t("confirmButtonText"),
					onPress: () => {
						setSelected(value);
						setSelectedLanguage(reverseLanguageMap[value]);
						Alert.alert("", t("languageChangedSuccess"));
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleProfile = async () => {
		try {
			const response = await getMyProfile();
			setSelected(languageMap[response.data.settingLanguage]);
			setSelectedLanguage(response.data.settingLanguage);
			i18n.changeLanguage(selectedLanguage.toLowerCase());
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"기본 설정 언어 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		const updateProfile = async () => {
			if (!selectedLanguage) return;

			try {
				const formData = new FormData();
				formData.append("settingLanguage", selectedLanguage);
				await updateMyProfile(formData);

				handleProfile();
			} catch (error) {
				Sentry.captureException(error);
				console.error(
					"기본 언어 변경 실패:",
					error.response ? error.response.data : error.message,
				);
			}
		};

		if (selectedLanguage) {
			updateProfile();
		}
	}, [selectedLanguage]);

	return (
		<SafeAreaView style={DefaultLanguageStyles.container}>
			<TopBar topBar={t("defaultLanguageSettings")} color="#000" />

			<View style={DefaultLanguageStyles.radioButtonGroup}>
				<RadioButtonGroup
					values={[
						t("english"),
						t("chinese"),
						t("japanese"),
						t("spanish"),
						t("korean"),
					]}
					value={selected}
					onValueChange={handleAlert}
					mainColor="#B0D0FF"
					borderColor={CustomTheme.primaryMedium}
					fontSize16={true}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DefaultLanguagePage;
