import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LoadingVerificationStyles from '@pages/onboarding/LoadingVerificationStyles';
import IconLoading from '@components/OnboadingCompo/IconLoading';
import Checkbox from '@components/common/Checkbox';

const LoadingVerificationPage = () => {
    const navigation = useNavigation();

    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        setIsChecked(!isChecked);
      };

    return (
        <SafeAreaView style={LoadingVerificationStyles.container}>
            <Image 
                style={[LoadingVerificationStyles.imageBackgroud]}
                source={require('@assets/images/BlurHomePage.png')} />
            <View style={LoadingVerificationStyles.modalBackground}>
                <View style={LoadingVerificationStyles.modal}>
                    <View style={LoadingVerificationStyles.containerModalContent}>
                        <Text style={LoadingVerificationStyles.textModal}>재학생 인증 대기중</Text>
                        <View style={LoadingVerificationStyles.iconLoading}>
                            <IconLoading />
                        </View>
                        <Text style={LoadingVerificationStyles.textModal}>인증이 완료되면{'\n'}모든 기능을 사용할 수 있어요</Text>
                        <Checkbox style={LoadingVerificationStyles.checkboxRememberMe}
                            checked={isChecked}
                            onPress={() => {handlePress()}}
                            text='인증 완료 알림 받기'
                            login='true' />
                        <Text style={LoadingVerificationStyles.textMove} onPress={() => navigation.navigate('Login')}>로그인 화면으로 돌아가기</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoadingVerificationPage;
