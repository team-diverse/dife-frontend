import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProfileHobbyStyles from "@pages/onboarding/ProfileHobbyStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress4 from "@components/onboarding/Progress4";
import FilterCategory from "@components/connect/FilterCategory";
import ApplyButton from "@components/common/ApplyButton";

const ProfileHobbyPage = () => {
    const navigation = useNavigation();
    const [selectedHobby, setSelectedHobby] = useState([]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const { onboardingData, updateOnboardingData } = useOnboarding();

    const ProfileData = [
        "프로필 생성하기",
        `${onboardingData.username}님의 취미/관심사를 선택해주세요!`,
    ];

    const hobby = [
        "SNS",
        "OTT",
        "캠핑",
        "쇼핑",
        "드라이브",
        "산책",
        "반려동물",
        "스포츠",
        "K-POP",
        "사진",
        "음악",
        "드라마",
        "독서",
        "그림",
        "요리",
        "만화",
        "언어공부",
        "여행",
        "악기연주",
        "영화",
        "맛집",
    ];
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
            <Text style={ProfileHobbyStyles.textTitle}>{ProfileData[0]}</Text>
            <Text style={ProfileHobbyStyles.textSubTitle}>
                {ProfileData[1]}
            </Text>
            <View style={ProfileHobbyStyles.containerHobby}>
                {hobbyRows.map((row, rowIndex) => (
                    <View key={rowIndex} style={ProfileHobbyStyles.rowHobby}>
                        {row.map((type, typeIndex) => (
                            <FilterCategory
                                key={typeIndex}
                                text={type}
                                hobbyCnt={selectedHobby.length}
                                onPress={() => handleSelectHobby(type)}
                            />
                        ))}
                    </View>
                ))}
            </View>
            <View style={ProfileHobbyStyles.buttonCheck}>
                <ApplyButton
                    text="다음"
                    onPress={handleDataSave}
                    disabled={selectedHobby.length === 0}
                />
            </View>
        </SafeAreaView>
    );
};

export default ProfileHobbyPage;
