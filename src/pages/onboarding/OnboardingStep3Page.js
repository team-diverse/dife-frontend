import React, { useState } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";

import OnboardingStep3Styles from "@pages/onboarding/OnboardingStep3Styles";
import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";
import { MBTI_OPTIONS } from "constants";

const OnboardingStep3Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const [selectedMBTI, setSelectedMBTI] = useState(
		stepData[3].selectedMBTI || "",
	);

	const mbti = [...MBTI_OPTIONS, t("mbtiNoneOption")];
	const size = 3;
	const mbtiRows = [];
	for (let i = 0; i < mbti.length; i += size) {
		mbtiRows.push(mbti.slice(i, i + size));
	}

	const handleSelectMBTI = (mbti) => {
		if (selectedMBTI === mbti) {
			setSelectedMBTI("");
		} else {
			setSelectedMBTI(mbti);
		}
	};

	const handleMbtiSubmit = () => {
		saveData(3, { selectedMBTI });
		goToNext(4);
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={OnboardingStep3Styles.container}>
			<Text style={OnboardingStep3Styles.textTitle}>
				{t("profileCreationTitle")}
			</Text>
			<Text style={OnboardingStep3Styles.textSubTitle}>
				{t("mbtiSubtitle", { username: stepData[1].nickname })}
			</Text>
			<View style={OnboardingStep3Styles.containerMbti}>
				<View style={OnboardingStep3Styles.flexStartMbti}>
					{mbtiRows.map((row, rowIndex) => (
						<View
							key={rowIndex}
							style={OnboardingStep3Styles.rowMbti}
						>
							{row.map((type, typeIndex) => (
								<FilterCategory
									key={typeIndex}
									text={type}
									mbtiCount={selectedMBTI.length}
									onPress={() => handleSelectMBTI(type)}
									onBoardingMBTI="true"
									selected={selectedMBTI === type}
								/>
							))}
						</View>
					))}
				</View>
			</View>
			<View
				style={[
					OnboardingStep3Styles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("nextButton")}
					onPress={handleMbtiSubmit}
					disabled={selectedMBTI.length === 0}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingStep3Page;
