import React, { useState } from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";

import OnboardingStep4Styles from "@pages/onboarding/OnboardingStep4Styles";

import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";

const OnboardingStep4Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const [selectedHobby, setSelectedHobby] = useState(
		stepData[4].selectedHobby || [],
	);

	const hobby = t("hobbyOptions", { returnObjects: true });
	const size = 3;
	const hobbyRows = [];
	for (let i = 0; i < hobby.length; i += size) {
		hobbyRows.push(hobby.slice(i, i + size));
	}

	const handleSelectHobby = (hobby) => {
		if (selectedHobby.includes(hobby)) {
			setSelectedHobby(selectedHobby.filter((item) => item !== hobby));
		} else {
			setSelectedHobby([...selectedHobby, hobby]);
		}
	};

	const handleHobbySubmit = () => {
		saveData(4, { selectedHobby });
		goToNext(5);
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={OnboardingStep4Styles.container}>
			<Text style={OnboardingStep4Styles.textTitle}>
				{t("profileCreationTitle")}
			</Text>
			<Text style={OnboardingStep4Styles.textSubTitle}>
				{t("hobbySubtitle", { username: stepData[1].nickname })}
			</Text>
			<View style={OnboardingStep4Styles.containerHobby}>
				{hobbyRows.map((row, rowIndex) => (
					<View key={rowIndex} style={OnboardingStep4Styles.rowHobby}>
						{row.map((type, typeIndex) => (
							<FilterCategory
								key={typeIndex}
								text={type}
								hobbyCount={selectedHobby.length}
								onPress={() => handleSelectHobby(type)}
								selected={selectedHobby.includes(type)}
							/>
						))}
					</View>
				))}
			</View>
			<View
				style={[
					OnboardingStep4Styles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("nextButton")}
					onPress={handleHobbySubmit}
					disabled={selectedHobby.length === 0}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingStep4Page;
