import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { CustomTheme } from "@styles/CustomTheme";
import LoginStyles from "@pages/login/LoginStyles";

import BottomTwoButtons from "@components/common/BottomTwoButtons";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import LoginBackground from "@components/login/LoginBackground";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { useAuth } from "src/states/AuthContext";
import InfoCircle from "@components/common/InfoCircle";

const LoginPage = () => {
    const navigation = useNavigation();

    const loginData = ["Dife와 함께하는\n캠퍼스 라이프!", "지금 바로 시작하기"];
    const [valueID, onChangeID] = useState("");
    const [valuePW, onChangePW] = useState("");
    const [showPW, setShowPW] = useState(false);

    const handleShowPW = () => {
        setShowPW(!showPW);
    };

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    const { updateOnboardingData } = useOnboarding();
    const { setIsLoggedIn } = useAuth();
    const [loginFailed, setLoginFailed] = useState(false);

    const handleLogin = async () => {
        try {
            const loginResponse = await axios.post(
                `http://192.168.0.4:8080/api/members/login`,
                {
                    email: valueID,
                    password: valuePW,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                },
            );

            console.log("기본 로그인 성공:", loginResponse.data);
            updateOnboardingData({
                id: loginResponse.data.member_id,
                accessToken: loginResponse.data.accessToken,
                refreshToken: loginResponse.data.refreshToken,
            });

            const profileResponse = await axios.get(
                `http://192.168.0.4:8080/api/members/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${loginResponse.data.accessToken}`,
                        Accept: "application/json",
                    },
                },
            );

            console.log(profileResponse.data);
            if (profileResponse.data.isVerified) {
                setIsLoggedIn(true);
            } else {
                navigation.navigate("Nickname");
            }
        } catch (error) {
            console.error(
                "로그인 또는 프로필 확인 오류:",
                error.response ? error.response.data : error.message,
            );
            const status = error.response ? error.response.status : null;
            switch (status) {
                case 401:
                    console.error(
                        "401:",
                        error.response ? error.response.data : error.message,
                    );
                    navigation.navigate("LoadingVerification");
                    break;
                case 500:
                    console.error(
                        "500:",
                        error.response ? error.response.data : error.message,
                    );
                    setLoginFailed(true);
                    break;
                default:
                    console.error(
                        "오류:",
                        error.response ? error.response.data : error.message,
                    );
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={[LoginStyles.container]}>
                <LoginBackground style={LoginStyles.backgroundLogin} />
                <Text style={LoginStyles.textTitle}>{loginData[0]}</Text>
                <Text style={LoginStyles.textSubTitle}>{loginData[1]}</Text>
                <Text style={LoginStyles.textId}>ID (Email Address)</Text>
                <TextInput
                    style={
                        loginFailed
                            ? [
                                LoginStyles.textInputPw,
                                { borderColor: CustomTheme.warningRed },
                            ]
                            : LoginStyles.textInputId
                    }
                    placeholder="이메일을 입력해주세요"
                    onChangeText={(text) => onChangeID(text)}
                    value={valueID}
                />
                <Text style={LoginStyles.textPw}>Password</Text>
                <View style={LoginStyles.textInputPwContainer}>
                    <TextInput
                        style={
                            loginFailed
                                ? [
                                    LoginStyles.textInputPw,
                                    { borderColor: CustomTheme.warningRed },
                                ]
                                : LoginStyles.textInputPw
                        }
                        placeholder="비밀번호를 입력해주세요"
                        onChangeText={(text) => onChangePW(text)}
                        value={valuePW}
                        secureTextEntry={!showPW}
                    />
                    <TouchableOpacity
                        style={LoginStyles.iconSee}
                        onPress={handleShowPW}
                    >
                        {valuePW == "" ? null : showPW ? (
                            <IconSeePw />
                        ) : (
                            <IconNotSeePw />
                        )}
                    </TouchableOpacity>
                </View>
                {loginFailed && (
                    <View style={LoginStyles.containerError}>
                        <InfoCircle color={CustomTheme.warningRed} />
                        <Text style={LoginStyles.textError}>
                            입력하신 아이디 또는 비밀번호를 확인해주세요
                        </Text>
                    </View>
                )}
                <View style={LoginStyles.ButtonSignupPwContainer}>
                    <BottomTwoButtons>
                        <View text="회원가입" onPress={handleSignUp} />
                        <View text="로그인" onPress={handleLogin} />
                    </BottomTwoButtons>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("FindPassword")}
                    >
                        <Text style={LoginStyles.textReport}>
                            비밀번호를 까먹었어요
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

export default LoginPage;
