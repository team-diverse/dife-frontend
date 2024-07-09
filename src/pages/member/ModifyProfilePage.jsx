import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ModifyProfileStyles from '@pages/member/ModifyProfileStyles';
import { CustomTheme } from '@styles/CustomTheme';
import { useOnboarding } from 'src/states/OnboardingContext.js';
import { updateProfile } from 'config/api';

import TopBar from '@components/common/TopBar';
import ModifyKBackground from '@components/member/ModifyKBackground';
import IconLock from '@components/member/IconLock';
import IconProfileEdit from '@components/member/IconProfileEdit';

const ModifyProfilePage = () => {
    const [profileImage, setProfileImage] = useState(null);
    const { onboardingData } = useOnboarding();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('알림', '설정에서 이미지 권한을 허용해주세요.');
            return;
        };
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled) {
            setProfileImage(result.assets[0].uri);
            await handleProfileImage(result.assets[0].uri);
        }
      };
    
      const handleProfileImage = async(imageUri) => {
        const formData = new FormData();
        if (profileImage) {
            const file = {
                uri: imageUri,
                type: 'image/jpeg',
                name: `${onboardingData.id}_profile.jpg`
            };
            formData.append('profileImg', file);
        }
    
        try {
            const response = await updateProfile(onboardingData.id, formData);
            console.log('프로필 이미지 변경 성공:', response.data.message);
        } catch (error) {
            setProfileImage(null);
            console.error('프로필 이미지 변경 실패:', error.response ? error.response.data : error.message);
        };
      };

    return (
        <SafeAreaView style={ModifyProfileStyles.container}>
            <TopBar topBar="프로필 수정" color='#000' backgroundColor={CustomTheme.primaryBg} />

            <View style={{ marginTop: 14 }}>
                <Text style={ModifyProfileStyles.textTitle}>프로필 사진</Text>
                    <View style={ModifyProfileStyles.containerProfileImage}>
                        <View style={ModifyProfileStyles.modifyKBackground}>
                            {profileImage === null && (
                                <ModifyKBackground />
                            )}
                        </View>
                        <TouchableOpacity style={ModifyProfileStyles.iconProfileEdit} onPress={pickImage}>
                            <IconProfileEdit color={CustomTheme.primaryMedium} />
                        </TouchableOpacity>
                    </View>

                <Text style={ModifyProfileStyles.textTitle}>프로필 정보</Text>
                <View style={ModifyProfileStyles.containerBackgroundWhite}>
                    <View style={[ModifyProfileStyles.backgroundWhite, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[ModifyProfileStyles.textSubTitle, {marginBottom: 0}]}>닉네임</Text>
                            <Text style={[ModifyProfileStyles.textContent, {color: CustomTheme.primaryMedium}]}>Amy</Text>
                        </View>
                        <Text style={ModifyProfileStyles.textModify}>수정</Text>
                    </View>

                    <View style={ModifyProfileStyles.backgroundWhite}>
                        <View style={ModifyProfileStyles.containerRowText}>
                            <Text style={ModifyProfileStyles.textSubTitle}>한줄소개</Text>
                            <Text style={ModifyProfileStyles.textModify}>수정</Text>
                        </View>
                        <Text style={ModifyProfileStyles.textContent}>안녕하세요, 저는 프랑스에서 온 에이미 입니다, 산업디자인을 전공하고 있습니다. 언제든지 채팅 주세요!! 😀</Text>
                    </View>

                    <View style={ModifyProfileStyles.backgroundWhite}>
                        <View style={ModifyProfileStyles.containerRowText}>
                            <Text style={ModifyProfileStyles.textSubTitle}>태그</Text>
                            <Text style={ModifyProfileStyles.textModify}>수정</Text>
                        </View>
                        <Text style={ModifyProfileStyles.textContent}>#여행 #사진 #스포츠 #요리 #ENTP</Text>
                    </View>

                    <View style={ModifyProfileStyles.backgroundWhite}>
                        <View style={ModifyProfileStyles.containerRowText}>
                            <Text style={ModifyProfileStyles.textSubTitle}>언어</Text>
                            <Text style={ModifyProfileStyles.textModify}>수정</Text>
                        </View>
                        <Text style={ModifyProfileStyles.textContent}>English / English, 한국어 / Korean</Text>
                    </View>

                    <View style={ModifyProfileStyles.backgroundWhite}>
                        <View style={ModifyProfileStyles.containerRowText}>
                            <View style={ModifyProfileStyles.containerBasicInfo}>
                                <Text style={ModifyProfileStyles.textSubTitle}>기본정보</Text>
                                <View>
                                    <View style={ModifyProfileStyles.containerBasicInfoContent}>
                                        <Text style={ModifyProfileStyles.textBasicInfo}>국적</Text>
                                        <Text style={ModifyProfileStyles.textContent}>프랑스</Text>
                                    </View>
                                    <View style={ModifyProfileStyles.containerBasicInfoContent}>
                                        <Text style={ModifyProfileStyles.textBasicInfo}>본명</Text>
                                        <Text style={ModifyProfileStyles.textContent}>Amy</Text>
                                    </View>
                                    <View style={[ModifyProfileStyles.containerBasicInfoContent, {marginBottom: 0}]}>
                                        <Text style={ModifyProfileStyles.textBasicInfo}>전공</Text>
                                        <Text style={ModifyProfileStyles.textContent}>산업디자인</Text>
                                    </View>
                                </View>
                            </View>
                            <IconLock />
                        </View>
                    </View>

                </View>
            </View>
                
        </SafeAreaView>
    )
}

export default ModifyProfilePage;