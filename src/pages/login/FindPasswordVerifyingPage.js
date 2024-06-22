import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FindPasswordVerifyingStyles from '@pages/login/FindPasswordVerifyingStyles';

import IconEmail from '@components/login/IconEmail';
import ApplyButton from '@components/common/ApplyButton';
import GoBack from '@components/common/GoBack';

const FindPasswordVerifyingPage = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[FindPasswordVerifyingStyles.container]}>
            <GoBack />
            <View style={FindPasswordVerifyingStyles.containerContent}>
                <IconEmail style={FindPasswordVerifyingStyles.iconEmail}/>
                <Text style={FindPasswordVerifyingStyles.textTitle}>이메일 확인</Text>
                <Text style={FindPasswordVerifyingStyles.textSubTitle}>비밀번호 재발급을 위한 이메일을 전송했습니다</Text>
                <View style={FindPasswordVerifyingStyles.buttonMove}>
                    <ApplyButton text="로그인 페이지로 이동하기" onPress={() => navigation.navigate('Login')}/>
                </View>
                <TouchableOpacity>
                    <Text style={FindPasswordVerifyingStyles.textReport} onPress={handleGoBack}>이메일 재전송 요청</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default FindPasswordVerifyingPage;
