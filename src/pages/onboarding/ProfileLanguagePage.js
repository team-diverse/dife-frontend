import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ProfileLanguageStyles from "@pages/onboarding/ProfileLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress5 from "@components/onboarding/Progress5";
import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const ProfileLanguagePage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const { onboardingData, updateOnboardingData } = useOnboarding();

	const languages = t("languages", { returnObjects: true });
	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	const handlePress = (index) => {
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});
	};

	const handleDataSave = () => {
		const selectedLanguages = isCheckedList.reduce(
			(selected, isChecked, index) => {
				if (isChecked) {
					selected.push(languages[index]);
				}
				return selected;
			},
			[],
		);

		updateOnboardingData({ languages: selectedLanguages });
		navigation.navigate("StudentVerification");
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
