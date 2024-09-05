import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfileMbtiStyles from "@pages/onboarding/ProfileMbtiStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress3 from "@components/onboarding/Progress3";
import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";

const ProfileMBTIPage = () => {
	const navigation = useNavigation();
	const [selectedMBTI, setSelectedMBTI] = useState("");

	const handleGoBack = () => {
		navigation.goBack();
	};

	const { onboardingData, updateOnboardingData } = useOnboarding();

	const ProfileData = [
		"프로필 생성하기",
		`${onboardingData.username}님의 MBTI를 알려주세요!`,
	];

	const mbti = [
		"ISTP",
		"ISFP",
		"ENTP",
		"ISFJ",
		"INFJ",
		"ENTJ",
		"INFP",
		"INTP",
		"ESFP",
		"ESTP",
		"ESFJ",
		"INTJ",
		"ESTJ",
		"ENFP",
		"ISTJ",
		"ENFJ",
		"선택안함",
	];
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

	const handleDataSave = () => {
		updateOnboardingData({
			mbti: selectedMBTI !== "선택안함" ? selectedMBTI : "",
		});
		navigation.navigate("ProfileHobby");
	};

	return (
		<SafeAreaView style={[ProfileMbtiStyles.container]}>
			<TouchableOpacity onPress={handleGoBack}>
				<ArrowRight
					style={ProfileMbtiStyles.iconArrow}
					color={CustomTheme.textPrimary}
				/>
			</TouchableOpacity>
			<View style={[ProfileMbtiStyles.iconProgress]}>
				<Progress3 />
			</View>
			<Text style={ProfileMbtiStyles.textTitle}>{ProfileData[0]}</Text>
			<Text style={ProfileMbtiStyles.textSubTitle}>{ProfileData[1]}</Text>
			<View style={ProfileMbtiStyles.containerMbti}>
				<View style={ProfileMbtiStyles.flexStartMbti}>
					{mbtiRows.map((row, rowIndex) => (
						<View key={rowIndex} style={ProfileMbtiStyles.rowMbti}>
							{row.map((type, typeIndex) => (
								<FilterCategory
									key={typeIndex}
									text={type}
									mbtiCount={selectedMBTI.length}
									onPress={() => handleSelectMBTI(type)}
									onBoardingMBTI="true"
								/>
							))}
						</View>
					))}
				</View>
			</View>
			<View style={ProfileMbtiStyles.buttonCheck}>
				<ApplyButton
					text="다음"
					onPress={handleDataSave}
					disabled={selectedMBTI.length === 0}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ProfileMBTIPage;
