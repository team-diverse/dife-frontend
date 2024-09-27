import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import ProfileLanguageStyles from "@pages/onboarding/ProfileLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { updateMyProfile } from "config/api";

import ArrowRight from "@components/common/ArrowRight";
import Progress5 from "@components/onboarding/Progress5";
import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const ProfileLanguagePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const { onboardingData, updateOnboardingData } = useOnboarding();

	const [selectedLanguages, setSelectedLanguages] = useState("");
	const languages = t("languages", { returnObjects: true });
	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	const handleGoBack = () => {
		navigation.goBack();
	};

	useEffect(() => {
		if (onboardingData.languages && selectedLanguages.length === 0) {
			setSelectedLanguages(onboardingData.languages);
			setIsCheckedList(onboardingData.checkLanguages);
		}
	}, [onboardingData.languages]);

	const handlePress = (index) => {
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	};

	useEffect(() => {
		const tmp = isCheckedList.reduce((selected, isChecked, index) => {
			if (isChecked) {
				selected.push(languages[index]);
			}
			return selected;
		}, []);

		updateOnboardingData({
			languages: tmp,
			checkLanguages: isCheckedList,
		});
	}, [isCheckedList]);

	const handleDataSave = async () => {
		const formData = new FormData();
		formData.append("username", onboardingData.username);
		formData.append("country", onboardingData.country);
		formData.append("bio", onboardingData.bio);
		formData.append("mbti", onboardingData.mbti);
		formData.append("hobbies", JSON.stringify(onboardingData.hobbies));
		formData.append("languages", selectedLanguages);
		const memberId = onboardingData.id;

		if (onboardingData.profileImg) {
			const file = {
				uri: onboardingData.profileImg,
				type: "image/jpeg",
				name: `${memberId}_profile.jpg`,
			};
			formData.append("profileImg", file);
		}

		try {
			await updateMyProfile(formData);
			navigation.navigate("CompleteProfile");
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"온보딩 저장 실패:",
				error.response ? error.response.data : error.message,
			);
		}

		// navigation.navigate("StudentVerification");
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={[ProfileLanguageStyles.container]}>
			<TouchableOpacity onPress={handleGoBack}>
				<ArrowRight
					style={ProfileLanguageStyles.iconArrow}
					color={CustomTheme.textPrimary}
				/>
			</TouchableOpacity>
			<View style={[ProfileLanguageStyles.iconProgress]}>
				<Progress5 />
			</View>
			<Text style={ProfileLanguageStyles.textTitle}>
				{t("profileCreationTitle")}
			</Text>
			<Text style={ProfileLanguageStyles.textSubTitle}>
				{t("languageSubtitle", { username: onboardingData.username })}
			</Text>
			<View style={ProfileLanguageStyles.containerCheckbox}>
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
					ProfileLanguageStyles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("nextButton")}
					onPress={handleDataSave}
					disabled={!isCheckedList.some((isChecked) => isChecked)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfileLanguagePage;
