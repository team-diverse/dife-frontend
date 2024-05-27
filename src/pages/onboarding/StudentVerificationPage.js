import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import StudentVerificationStyles from '@pages/onboarding/StudentVerificationStyles';
import { CustomTheme } from '@styles/CustomTheme.js';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress6 from '@components/onboarding/Progress6';
import BackgroundOnkookminUpload from '@components/onboarding/BackgroundOnkookminUpload';
import IconOnkookminUpload from '@components/onboarding/IconOnkookminUpload';
import ApplyButton from '@components/common/ApplyButton';

const StudentVerificationPage = () => {
    const [isModalVisible, setModalVisible] = useState(true);
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    
    const handleGoBack = () => {
        navigation.goBack();
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const StudentVerificationData = ['재학생 인증'];

    // 권한 부분으로 옮기기
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('알림', '설정에서 이미지 권한을 허용해주세요.');
            return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
};

    const { onboardingData } = useOnboarding();

    const handleOnboarding = () => {
        const formData = new FormData();
        formData.append('bio', onboardingData.bio);
        formData.append('mbti', onboardingData.mbti);
        formData.append('hobbies', JSON.stringify(onboardingData.hobbies));
        formData.append('profile_img', onboardingData.profile_img);
        if (image) {
            const file = {
                uri: image,
                type: 'image/jpeg',
                name: `${onboardingData.id}_verification.jpg`
            };
            formData.append('verification_file', file);
        }
        formData.append('verification_file', image);
    
        axios.put(`http://192.168.45.89:8080/api/members/${onboardingData.id}?username=${onboardingData.username}&is_korean=${onboardingData.is_korean}&languages=${onboardingData.languages}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json',
                'Authorization': `Bearer ${onboardingData.token}`
            }
        })
        .then(response => {
            console.log('온보딩 저장 성공:', response.data);
            navigation.navigate('LoadingVerification');
        })
        .catch(error => {
            console.error('온보딩 저장 실패:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <SafeAreaView style={[StudentVerificationStyles.container]}>
            <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
            >
                <View style={StudentVerificationStyles.modalBackground}>
                    <View style={StudentVerificationStyles.modal}>
                        <View style={StudentVerificationStyles.containerModalContent}>
                            <Image
                                style={StudentVerificationStyles.imageModal}
                                source={require('@assets/images/onboardingExample.png')} />
                            <Text style={StudentVerificationStyles.textModal}>온국민 캡쳐 화면을 업로드 해주세요.{'\n'}(학번/이름 포함, 재학생 인증 용도)</Text>
                        </View>
                        <View style={StudentVerificationStyles.buttonModalCheck}>
                            <ApplyButton text="확인" onPress={toggleModal}/>
                        </View>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={StudentVerificationStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <View style={[StudentVerificationStyles.iconProgress]}>
                <Progress6 />
            </View>
            <Text style={StudentVerificationStyles.textTitle}>{StudentVerificationData[0]}</Text>
            {image ? (
                <TouchableOpacity style={StudentVerificationStyles.containerUploadOnkookmin} onPress={pickImage}>
                    <Image source={{ uri: image }} style={StudentVerificationStyles.imageOnkookmin} />
                    <IconOnkookminUpload style={StudentVerificationStyles.iconUploadOnkookmin}/>
                    <Text style={StudentVerificationStyles.textUploadOnkookmin}>다시 업로드하기</Text>
                    <BackgroundOnkookminUpload />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={StudentVerificationStyles.containerUploadOnkookmin} onPress={pickImage}>
                    <IconOnkookminUpload style={StudentVerificationStyles.iconUploadOnkookmin}/>
                    <Text style={StudentVerificationStyles.textUploadOnkookmin}>사진 업로드하기</Text>
                    <BackgroundOnkookminUpload />
                </TouchableOpacity>
            )}
            <View style={StudentVerificationStyles.buttonCheck}>
                <ApplyButton text="완료" onPress={handleOnboarding} disabled={!image}/>
            </View>
        </SafeAreaView>
    )
}

export default StudentVerificationPage;
