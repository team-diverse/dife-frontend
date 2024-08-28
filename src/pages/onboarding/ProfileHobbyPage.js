import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ProfileHobbyStyles from "@pages/onboarding/ProfileHobbyStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress4 from "@components/onboarding/Progress4";
import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";

const ProfileHobbyPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();
	const [selectedHobby, setSelectedHobby] = useState([]);

	const handleGoBack = () => {
		navigation.goBack();
	};

	const { onboardingData, updateOnboardingData } = useOnboarding();

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

	const handleDataSave = () => {
		updateOnboardingData({ hobbies: selectedHobby });
		navigation.navigate("ProfileLanguage");
	};

	return (
		<SafeAreaView style={[ProfileHobbyStyles.container]}>
			<TouchableOpacity onPress={handleGoBack}>
				<ArrowRight
					style={ProfileHobbyStyles.iconArrow}
					color={CustomTheme.textPrimary}
				/>
			</TouchableOpacity>
			<View style={[ProfileHobbyStyles.iconProgress]}>
				<Progress4 />
			</View>
			<Text style={ProfileHobbyStyles.textTitle}>
				{t("profileCreationTitle")}
			</Text>
			<Text style={ProfileHobbyStyles.textSubTitle}>
				{t("hobbySubtitle", { username: onboardingData.username })}
			</Text>
			<View style={ProfileHobbyStyles.containerHobby}>
				{hobbyRows.map((row, rowIndex) => (
					<View key={rowIndex} style={ProfileHobbyStyles.rowHobby}>
						{row.map((type, typeIndex) => (
							<FilterCategory
								key={typeIndex}
								text={type}
								hobbyCount={selectedHobby.length}
								onPress={() => handleSelectHobby(type)}
							/>
						))}
					</View>
				))}
			</View>
			<View style={ProfileHobbyStyles.buttonCheck}>
				<ApplyButton
					text={t("nextButton")}
					onPress={handleDataSave}
					disabled={selectedHobby.length === 0}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfileHobbyPage;
