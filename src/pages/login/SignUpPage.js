import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import SignUpStyles from '@pages/login/SignUpStyles';
import { CustomTheme } from '@styles/CustomTheme.js';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/common/ApplyButton';
import InfoCircle from '@components/common/InfoCircle';
import IconNotSeePw from '@components/login/IconNotSeePw';
import IconSeePw from '@components/login/IconSeePw';

const SignUpPage = () => {
    const navigation = useNavigation();

    const SignUpData = ['회원가입'];
    const [valueID, onChangeID] = useState('');
    const [valuePW, onChangePW] = useState('');
    const [valueCheckPW, onChangeCheckPW] = useState('');
    const [showPW, setShowPW] = useState(false);
    const [vaildID, setVaildID] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setIsFormValid(valueID !== '' && valuePW !== '' && valueCheckPW !== '' && passwordMatch && !passwordError);
    }, [valueID, valuePW, valueCheckPW, passwordMatch, passwordError]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleShowPW = () => {
        setShowPW(!showPW);
    };

    const handlePasswordError = () => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        setPasswordError(!passwordRegex.test(valuePW));
    };

    const handleCheckPassword = () => {
        setPasswordMatch(valuePW === valueCheckPW);
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };
    

    const handleSignUp = () => {
        axios.post('http://192.168.0.4:8080/api/members/register', {
            email: valueID,
            password: valuePW,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        })
        .then(response => {
            console.log('회원가입 성공:', response.data.message);
            navigation.navigate('Login');
        })
        .catch(error => {
            console.error('회원가입 실패:', error.response ? error.response.data : error.message);
            setVaildID(false);
            setErrorMessage(error.response.data.message);
        });
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
        <SafeAreaView style={[SignUpStyles.container]}>
            <TouchableOpacity onPress={handleGoBack}>
                <ArrowRight32 style={SignUpStyles.iconArrow} color={CustomTheme.textPrimary} />
            </TouchableOpacity>
            <Text style={SignUpStyles.textTitle}>{SignUpData[0]}</Text>
            <Text style={SignUpStyles.textId}>이메일</Text>
            <TextInput style={SignUpStyles.textInputId}
                placeholder="이메일을 입력해주세요"
                onChangeText={text => onChangeID(text)}
                value={valueID}
            />
            {!vaildID && (
                <View style={SignUpStyles.containerError}>
                <InfoCircle color='#FF3E3E'/>
                <Text style={SignUpStyles.textError}>{errorMessage}</Text>
            </View>
            )}
            <Text style={SignUpStyles.textPw}>비밀번호</Text>
            <View style={SignUpStyles.textInputPwContainer}>
                <TextInput style={SignUpStyles.textInputPw}
                    placeholder="영문, 숫자 포함 8자 이상"
                    onChangeText={text => onChangePW(text)}
                    value={valuePW}
                    secureTextEntry={!showPW}
                    onBlur={handlePasswordError}
                />
                <TouchableOpacity style={SignUpStyles.iconSee} onPress={handleShowPW}>
                    { valuePW == '' ? null : (showPW ? <IconSeePw /> : <IconNotSeePw />)}
                </TouchableOpacity>
            </View>
            {passwordError && (
                <View style={SignUpStyles.containerError}>
                    <InfoCircle color='#FF3E3E'/>
                    <Text style={SignUpStyles.textError}>영문, 숫자 포함 8자 이상의 비밀번호를 입력해주세요</Text>
                </View>
            )}
            <Text style={SignUpStyles.textPw}>비밀번호 확인</Text>
            <View style={SignUpStyles.textInputPwContainer}>
                <TextInput style={SignUpStyles.textInputPw}
                    placeholder="비밀번호 확인"
                    onChangeText={text => onChangeCheckPW(text)}
                    value={valueCheckPW}
                    secureTextEntry={!showPW}
                    onBlur={handleCheckPassword}
                />
            </View>
            {!passwordMatch && (
                <View style={SignUpStyles.containerError}>
                    <InfoCircle color='#FF3E3E'/>
                    <Text style={SignUpStyles.textError}>비밀번호가 일치하지 않습니다.</Text>
                </View>
            )}
            <View style={SignUpStyles.buttonMove}>
                <ApplyButton text="회원가입 완료" disabled={!isFormValid} onPress={handleSignUp} />
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpPage;