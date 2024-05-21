import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { CustomTheme } from '@styles/CustomTheme';
import LoginStyles from '@pages/login/LoginStyles';

import BottomTwoButtons from '@components/common/BottomTwoButtons';
import IconNotSeePw from '@components/login/IconNotSeePw';
import IconSeePw from '@components/login/IconSeePw';
import LoginBackground from '@components/login/LoginBackground';
import { useOnboarding } from 'src/states/OnboardingContext.js';
import InfoCircle from '@components/common/InfoCircle';

const LoginPage = () => {
    const navigation = useNavigation();

    const loginData = ['Dife와 함께하는\n캠퍼스 라이프!', '지금 바로 시작하기'];
    const [valueID, onChangeID] = useState('');
    const [valuePW, onChangePW] = useState('');
    const [showPW, setShowPW] = useState(false);

    const handleShowPW = () => {
        setShowPW(!showPW);
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };


    const { updateOnboardingData } = useOnboarding();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSignUp = () => {
        navigation.navigate('SignUp')
    };

    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = () => {
        axios.post(`http://192.168.45.92:8080/api/members/login?email=${valueID}&password=${valuePW}`, {
        email: valueID,
        password: valuePW,
        }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        }
        })
        .then(response => {
            console.log('로그인 성공:', response.data);
            updateOnboardingData({
            token: response.data.accessToken,
            id: response.data.member_id
            });
            setIsLoggedIn(true);
            navigation.navigate('Nickname');
        })
        .catch(error => {
            console.error('로그인 오류:', error.response ? error.response.data : error.message);
            setLoginFailed(true);
        });
        };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
        <SafeAreaView style={[LoginStyles.container]}>
            <LoginBackground style={LoginStyles.backgroundLogin}/>
            <Text style={LoginStyles.TextTitle}>{loginData[0]}</Text>
            <Text style={LoginStyles.TextSubTitle}>{loginData[1]}</Text>
            <Text style={LoginStyles.TextId}>ID (Email Address)</Text>
            <TextInput style={loginFailed ? [LoginStyles.TextInputPw, {borderColor: CustomTheme.warningRed}] : LoginStyles.TextInputId}
                placeholder="이메일을 입력해주세요"
                onChangeText={text => onChangeID(text)}
                value={valueID}
            />
            <Text style={LoginStyles.TextPw}>Password</Text>
            <View style={LoginStyles.TextInputPwContainer}>
                <TextInput style={loginFailed ? [LoginStyles.TextInputPw, {borderColor: CustomTheme.warningRed}] : LoginStyles.TextInputPw}
                    placeholder="비밀번호를 입력해주세요"
                    onChangeText={text => onChangePW(text)}
                    value={valuePW}
                    secureTextEntry={!showPW}
                />
                <TouchableOpacity style={LoginStyles.iconSee} onPress={handleShowPW}>
                    { valuePW == '' ? null : (showPW ? <IconSeePw /> : <IconNotSeePw />)}
                </TouchableOpacity>
            </View>
            {loginFailed && (
                <View style={LoginStyles.containerError}>
                    <InfoCircle color={CustomTheme.warningRed} />
                    <Text style={LoginStyles.textError}>입력하신 아이디 또는 비밀번호를 확인해주세요</Text>
                </View>
            )}
            <View style={LoginStyles.ButtonSignupPwContainer}>
                <BottomTwoButtons>
                    <View text='회원가입' onPress={handleSignUp} />
                    <View text='로그인' onPress={handleLogin} />
                </BottomTwoButtons>
                <TouchableOpacity onPress={() => navigation.navigate('FindPassword')}>
                    <Text style={LoginStyles.TextReport}>비밀번호를 까먹었어요</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default LoginPage;