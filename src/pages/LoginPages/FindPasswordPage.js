import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FindPasswordStyles from '@pages/LoginPages/FindPasswordStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import InfoCircle from '@components/CommonCompo/InfoCircle';
import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/CommonCompo/ApplyButton';

const FindPasswordPage = () => {
    const [valueID, onChangeID] = useState('');

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[FindPasswordStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={FindPasswordStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <Text style={FindPasswordStyles.textTitle}>비밀번호 재발급</Text>
            <Text style={FindPasswordStyles.textSubTitle}>회원가입 시 사용한 이메일을 입력해주세요</Text>
            <Text style={FindPasswordStyles.textId}>ID (Email Address)</Text>
            <TextInput style={FindPasswordStyles.textInputId}
                placeholder="이메일을 입력해주세요"
                onChangeText={text => onChangeID(text)}
                value={valueID}
            />
            {/* '비밀번호 재발급받기'를 눌렀을 때 정보에 따라 안 보이게 변경하기 */}
            <View style={FindPasswordStyles.containerNotMember}>
                <InfoCircle color='#FF3E3E'/>
                <Text style={FindPasswordStyles.textNotMember}>등록된 회원정보가 없습니다</Text>
            </View>
            <ApplyButton text="비밀번호 재발급받기" />
        </SafeAreaView>
    )
}

export default FindPasswordPage;