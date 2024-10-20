import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfileLanguageStyles from "@pages/onboarding/ProfileLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress5 from "@components/onboarding/Progress5";
import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const ProfileLanguagePage = () => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const { onboardingData, updateOnboardingData } = useOnboarding();

	const ProfileData = [
		"프로필 생성하기",
		`${onboardingData.username}님의 사용언어를 알려주세요!`,
	];
	const languages = [
		"English / English",
		"中文 / Chinese",
		"日本語 / Japanese",
		"Español / Spanish",
		"한국어 / Korean",
		"기타",
	];
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
				{ProfileData[0]}
			</Text>
			<Text style={ProfileLanguageStyles.textSubTitle}>
				{ProfileData[1]}
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
			<View style={ProfileLanguageStyles.buttonCheck}>
				<ApplyButton
					text="다음"
					onPress={handleDataSave}
					disabled={!isCheckedList.some((isChecked) => isChecked)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfileLanguagePage;
