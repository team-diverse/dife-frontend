import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import AccessStyles from '@pages/login/AccessStyles';
import { CustomTheme } from '@styles/CustomTheme';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/common/ApplyButton';
import IconAccessCamera from '@components/login/IconAccessCamera';
import IconAccessNotification from '@components/login/IconAccessNotification';
import IconAccessImage from '@components/login/IconAccessImage';
import IconAccessPhone from '@components/login/IconAccessPhone';

const AccessPage = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={[AccessStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={AccessStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <Text style={AccessStyles.textTitle}>앱 서비스 접근 권한 허용</Text>
            <View style={AccessStyles.containerContent}>
                <IconAccessPhone />
                <View style={AccessStyles.containerText}>
                    <Text style={AccessStyles.textSubTitle}>기기정보 및 ID</Text>
                    <Text style={AccessStyles.textId}>재학생 인증 및 오류 확인</Text>
                </View>
            </View>
            <View style={AccessStyles.containerContent}>
                <IconAccessNotification />
                <View style={AccessStyles.containerText}>
                    <Text style={AccessStyles.textSubTitle}>알림(선택)</Text>
                    <Text style={AccessStyles.textId}>푸시 알림 및 수신 안내</Text>
                </View>
            </View>
            <View style={AccessStyles.containerContent}>
                <IconAccessImage />
                <View style={AccessStyles.containerText}>
                    <Text style={AccessStyles.textSubTitle}>저장공간</Text>
                    <Text style={AccessStyles.textId}>사진 및 정보 저장</Text>
                </View>
            </View>
            <View style={AccessStyles.containerContent}>
                <IconAccessCamera />
                <View style={AccessStyles.containerText}>
                    <Text style={AccessStyles.textSubTitle}>카메라</Text>
                    <Text style={AccessStyles.textId}>사진 업로드</Text>
                </View>
            </View>
            <View style={AccessStyles.guide}>
                <Text style={AccessStyles.textGuide}>권한을 허용하지 않을 시 Dife 서비스 이용이 어렵습니다.</Text>
            </View>
            <View style={AccessStyles.applyButton}>
                <ApplyButton text="확인" access="true" />
            </View>
        </SafeAreaView>
    )
}

export default AccessPage;