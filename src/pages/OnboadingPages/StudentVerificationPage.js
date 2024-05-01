import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import StudentVerificationStyles from '@pages/OnboadingPages/StudentVerificationStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress6 from '@components/OnboadingCompo/Progress6';
import BackgroundOnkookminUpload from '@components/OnboadingCompo/BackgroundOnkookminUpload';
import IconOnkookminUpload from '@components/OnboadingCompo/IconOnkookminUpload';
import ApplyButton from '@components/CommonCompo/ApplyButton';

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
                <ApplyButton text="완료" onPress={() => navigation.navigate('CompleteProfile')} disabled=''/>
            </View>
        </SafeAreaView>
    )
}

export default StudentVerificationPage;
