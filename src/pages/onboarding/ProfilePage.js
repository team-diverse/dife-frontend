import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import ProfileStyles from '@pages/onboarding/ProfileStyles';
import { CustomTheme } from '@styles/CustomTheme.js';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import Progress2 from '@components/OnboadingCompo/Progress2';
import ApplyButton from '@components/common/ApplyButton';
import IconProfileUpload from '@components/OnboadingCompo/IconProfileUpload';
import RadioButtonGroup from '@components/RadioButton/RadioButtonGroup';
import IconProfileChange from '@components/OnboadingCompo/IconProfileChange';
import IconProfileBorder from '@components/OnboadingCompo/IconProfileBorder';

const ProfilePage = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);


    const handleGoBack = () => {
        navigation.goBack();
    };

    const ProfileData = ['프로필 생성하기', '프로필 사진'];
    const [selected, setSelected] = useState('');
    const [selectedValue, setSelectedValue] = useState(true);
    const [isReportButtonDisabled, setIsReportButtonDisabled] = useState(true);
    const [text, setText] = useState('');

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleRadioButtonSelect = (value) => {
        setSelected(value);
        setIsReportButtonDisabled(false);
    };

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

    const { updateOnboardingData } = useOnboarding();

    const handleDataSave = () => {
        updateOnboardingData({
            profile_img: image,
            is_korean: selected,
            bio: text
        });
        navigation.navigate('ProfileMbti');
      };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={[ProfileStyles.container]}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight32 style={ProfileStyles.iconArrow} color={CustomTheme.textPrimary} />
                </TouchableOpacity>
                <View style={[ProfileStyles.iconProgress]}>
                    <Progress2 />
                </View>
                <Text style={ProfileStyles.textTitle}>{ProfileData[0]}</Text>
                <Text style={ProfileStyles.textSubTitle}>{ProfileData[1]}</Text>
                {image ? (
                    <View style={ProfileStyles.containerImage}>
                        <Image source={{ uri: image }} style={ProfileStyles.imageProfile} />
                        <IconProfileBorder style={ProfileStyles.imageBorder} />
                        <TouchableOpacity onPress={pickImage}>
                            <IconProfileChange />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity style={ProfileStyles.containerImage} onPress={pickImage}>
                        <IconProfileUpload />
                    </TouchableOpacity>
                )}
                <Text style={ProfileStyles.textNationIntroduction}>국적</Text>
                <View style={ProfileStyles.containerRadioButton}>
                    <RadioButtonGroup
                        values={['내국인 (Korean)', '외국인']}
                        value={selected}
                        onValueChange={handleRadioButtonSelect}
                        mainColor={CustomTheme.primaryMedium}
                        borderColor='#B0D0FF'
                        onboarding='true' />
                </View>
                <Text style={ProfileStyles.textNationIntroduction}>한줄소개</Text>
                <View style={ProfileStyles.containerTextInput}>
                    <TextInput style={ProfileStyles.textInputIntroduction}
                        placeholder="간단한 자기소개를 입력해주세요"
                        onChangeText={setText}
                        value={text}
                        multiline={true}
                        maxLength={60}
                    />
                    <Text style={ProfileStyles.textIntroductionCount}>{text.length}/60</Text>
                </View>
                <View style={ProfileStyles.buttonCheck}>
                    <ApplyButton text="다음" onPress={handleDataSave} disabled={!selected}/>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ProfilePage;