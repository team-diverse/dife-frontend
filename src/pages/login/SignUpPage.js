import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import SignUpStyles from '@pages/login/SignUpStyles';
import { CustomTheme } from '@styles/CustomTheme';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ApplyButton from '@components/common/ApplyButton';
import InfoCircle from '@components/common/InfoCircle';

const SignUpPage = () => {
    const navigation = useNavigation();

    const SignUpData = ['회원가입'];
    const [valueID, onChangeID] = useState('');
    const [valuePW, onChangePW] = useState('');
    const [valueCheckPW, onChangeCheckPW] = useState('');
    const [showPW, setShowPW] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setIsFormValid(valueID !== '' && valuePW !== '' && valueCheckPW !== '' && passwordMatch);
    }, [valueID, valuePW, valueCheckPW, passwordMatch]);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleShowPW = () => {
        setShowPW(!showPW);
    };

    const handleCheckPassword = () => {
        setPasswordMatch(valuePW === valueCheckPW);
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
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
            {/* 서버에서 받아오는 정보에 따라 수정하기 */}
            <View style={SignUpStyles.containerError}>
                <InfoCircle color='#FF3E3E'/>
                <Text style={SignUpStyles.textError}>이미 가입되어 있는 이메일입니다.</Text>
            </View>
            <Text style={SignUpStyles.textPw}>비밀번호</Text>
            <View style={SignUpStyles.textInputPwContainer}>
                <TextInput style={SignUpStyles.textInputPw}
                    placeholder="영문, 숫자 포함 8자 이상"
                    onChangeText={text => onChangePW(text)}
                    value={valuePW}
                    onBlur={handleCheckPassword}
                />
            </View>
            {/* 서버에서 받아오는 정보에 따라 수정하기 */}
            <View style={SignUpStyles.containerError}>
                <InfoCircle color='#FF3E3E'/>
                <Text style={SignUpStyles.textError}>영문, 숫자 포함 8자 이상의 비밀번호를 입력해주세요</Text>
            </View>
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
                <ApplyButton text="회원가입 완료" disabled={!isFormValid}/>
            </View>
        </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default SignUpPage;