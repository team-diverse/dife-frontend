import React, { useState, useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import * as SecureStore from "expo-secure-store";

import OnboardingStep5Styles from "@pages/onboarding/OnboardingStep5Styles";
import { updateMyProfile } from "config/api";

import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const OnboardingStep5Page = ({ stepData, saveData }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const languages = t("languages", { returnObjects: true });

	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	useEffect(() => {
		if (stepData[5] && stepData[5].isCheckedList) {
			setIsCheckedList(stepData[5].isCheckedList);
		}
	}, [stepData, languages.length]);

	const handlePress = (index) => {
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	};

	const handleOnboarding = async () => {
		const currentSelectedLanguages = isCheckedList.reduce(
			(selected, isChecked, index) => {
				if (isChecked) {
					selected.push(languages[index]);
				}
				return selected;
			},
			[],
		);

		saveData(5, {
			selectedLanguages: currentSelectedLanguages,
			isCheckedList,
		});

		const formData = new FormData();
		formData.append("username", stepData[1].nickname);
		formData.append("country", stepData[2].nation);
		formData.append("bio", stepData[2].bio);

		if (stepData[3].selectedMBTI !== t("mbtiNoneOption")) {
			formData.append("mbti", stepData[3].selectedMBTI);
		}

		if (Array.isArray(stepData[4].selectedHobby)) {
			stepData[4].selectedHobby.forEach((hobby) => {
				formData.append("hobbies", hobby);
			});
		} else {
			formData.append("hobbies", stepData[4].selectedHobby);
		}

		currentSelectedLanguages.forEach((lang) => {
			formData.append("languages", lang);
		});

		const memberId = await SecureStore.getItemAsync("memberId");

		if (stepData[2].image) {
			const file = {
				uri: stepData[2].image,
				type: "image/jpeg",
				name: `${memberId}_profile.jpg`,
			};
			formData.append("profileImg", file);
		}

		try {
			await updateMyProfile(formData);
			navigation.replace("CompleteProfilePage");
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"온보딩 저장 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<View style={OnboardingStep5Styles.container}>
			<Text style={OnboardingStep5Styles.textTitle}>
				{t("profileCreationTitle")}
			</Text>
			<Text style={OnboardingStep5Styles.textSubTitle}>
				{t("languageSubtitle", { username: stepData[1].nickname })}
			</Text>
			<View style={OnboardingStep5Styles.containerCheckbox}>
				{languages.map((language, index) => (
					<Checkbox
						key={index}
						checked={isCheckedList[index]}
						onPress={() => handlePress(index)}
						text={language}
					/>
				))}
			</View>
			<View
				style={[
					OnboardingStep5Styles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("completeButtonText")}
					onPress={handleOnboarding}
					disabled={!isCheckedList.some((isChecked) => isChecked)}
				/>
			</View>
		</View>
	);
};

export default OnboardingStep5Page;
