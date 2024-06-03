import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CompleteProfileStyles from '@pages/onboarding/CompleteProfileStyles';

import IconLoading from '@components/onboarding/IconLoading';
import ApplyButton from '@components/common/ApplyButton';

const CompleteProfilePage = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    const CompleteProfileData = ['프로필 생성 완료!', '재학생 인증 확인까지 잠시만 기다려주세요'];


    return (
        <SafeAreaView style={[CompleteProfileStyles.container]}>
            <Text style={CompleteProfileStyles.textTitle}>{CompleteProfileData[0]}</Text>
            <Text style={CompleteProfileStyles.textSubTitle}>{CompleteProfileData[1]}</Text>
            <View style={CompleteProfileStyles.iconLoading}>
                <IconLoading />
            </View>
            <View style={CompleteProfileStyles.buttonCheck}>
                <ApplyButton text="확인" onPress={() => navigation.navigate('LoadingVerification')}/>
            </View>
        </SafeAreaView>
    )
}

export default CompleteProfilePage;