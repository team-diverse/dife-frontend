import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";

import OnboardingStep5Styles from "@pages/onboarding/OnboardingStep5Styles";

import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const OnboardingStep5Page = ({ goToNext, stepData, saveData }) => {
	const { t } = useTranslation();

	const [selectedLanguages, setSelectedLanguages] = useState(
		stepData[5].selectedLanguages || "",
	);
	const languages = t("languages", { returnObjects: true });
	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	useEffect(() => {
		if (stepData[5]) {
			setSelectedLanguages(stepData[5].selectedLanguages);
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

	const handleDataSave = () => {
		const tmp = isCheckedList.reduce((selected, isChecked, index) => {
			if (isChecked) {
				selected.push(languages[index]);
			}
			return selected;
		}, []);

		saveData(5, { selectedLanguages: tmp, isCheckedList });
		goToNext(6);
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={OnboardingStep5Styles.container}>
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
					text={t("nextButton")}
					onPress={handleDataSave}
					disabled={!isCheckedList.some((isChecked) => isChecked)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingStep5Page;
