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

import ProfileHobbyStyles from "@pages/onboarding/ProfileHobbyStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress4 from "@components/onboarding/Progress4";
import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";

const ProfileHobbyPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { onboardingData, updateOnboardingData } = useOnboarding();

	const [selectedHobby, setSelectedHobby] = useState([]);

	useEffect(() => {
		if (onboardingData.hobbies && selectedHobby.length === 0) {
			setSelectedHobby(onboardingData.hobbies);
		}
	}, [onboardingData.hobbies]);

	const handleGoBack = () => {
		navigation.goBack();
	};

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

	useEffect(() => {
		updateOnboardingData({ hobbies: selectedHobby });
	}, [selectedHobby]);

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

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
								selected={selectedHobby.includes(type)}
							/>
						))}
					</View>
				))}
			</View>
			<View
				style={[
					ProfileHobbyStyles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("nextButton")}
					onPress={() => navigation.navigate("ProfileLanguage")}
					disabled={selectedHobby.length === 0}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfileHobbyPage;
