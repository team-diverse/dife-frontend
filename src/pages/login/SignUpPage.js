import React, { useState, useEffect, useCallback } from "react";
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

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { signUp, checkEmail } from "config/api";
import { debounce } from "util/debounce";

import ApplyButton from "@components/common/ApplyButton";
import InfoCircle from "@components/common/InfoCircle";
import IconNotSeePw from "@components/login/IconNotSeePw";
import IconSeePw from "@components/login/IconSeePw";
import GoBack from "@components/common/GoBack";

const SignUpPage = () => {
	const navigation = useNavigation();

	const SignUpData = ["회원가입"];
	const [valueID, onChangeID] = useState("");
	const [valuePW, onChangePW] = useState("");
	const [valueCheckPW, onChangeCheckPW] = useState("");
	const [showPW, setShowPW] = useState(false);
	const [validID, setValidID] = useState(true);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [passwordError, setPasswordError] = useState(false);
	const [isFormValid, setIsFormValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		setIsFormValid(
			valueID &&
				validID &&
				valuePW &&
				valueCheckPW &&
				passwordMatch &&
				!passwordError,
		);
	}, [valueID, valuePW, valueCheckPW, passwordMatch, passwordError]);

	const handleShowPW = () => {
		setShowPW(!showPW);
	};

	const handleEmailFormat = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const isValid = emailRegex.test(email);
		setValidID(isValid);
		if (isValid) {
			handleEmail(email);
		} else {
			setErrorMessage("유효한 이메일 형식을 입력해주세요.");
		}
		onChangeID(email);
	};

	const handleEmail = useCallback(
		debounce(async (email) => {
			try {
				await checkEmail(email);
				setValidID(true);
			} catch (error) {
				console.error("이메일 사용 불가: ", error.message);
				setValidID(false);
				setErrorMessage("중복된 이메일 주소입니다.");
			}
		}, 300),
		[validID],
	);

	const handlePasswordError = (text) => {
		const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
		setPasswordError(!passwordRegex.test(text));
		onChangePW(text);
	};

	const handleCheckPassword = (text) => {
		setPasswordMatch(valuePW === text);
		onChangeCheckPW(text);
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleSignUp = async () => {
		try {
			await signUp(valueID, valuePW);
			navigation.navigate("Login");
		} catch (error) {
			console.error(
				"회원가입 실패:",
				error.response ? error.response.data : error.message,
			);
			setValidID(false);
			setErrorMessage(error.response.data.message);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[SignUpStyles.container]}>
				<GoBack />
				<Text style={SignUpStyles.textTitle}>{SignUpData[0]}</Text>
				<Text style={SignUpStyles.textId}>이메일</Text>
				<TextInput
					style={SignUpStyles.textInputId}
					placeholder="이메일을 입력해주세요"
					onChangeText={handleEmailFormat}
					value={valueID}
				/>
				{!validID && (
					<View style={SignUpStyles.containerError}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={SignUpStyles.textError}>
							{errorMessage}
						</Text>
					</View>
				)}
				<Text style={SignUpStyles.textPw}>비밀번호</Text>
				<View style={SignUpStyles.textInputPwContainer}>
					<TextInput
						style={SignUpStyles.textInputPw}
						placeholder="영문, 숫자 포함 8자 이상"
						onChangeText={handlePasswordError}
						value={valuePW}
						secureTextEntry={!showPW}
					/>
					<TouchableOpacity
						style={SignUpStyles.iconSee}
						onPress={handleShowPW}
					>
						{valuePW == "" ? null : showPW ? (
							<IconSeePw />
						) : (
							<IconNotSeePw />
						)}
					</TouchableOpacity>
				</View>
				{passwordError && (
					<View style={SignUpStyles.containerError}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={SignUpStyles.textError}>
							영문, 숫자 포함 8자 이상의 비밀번호를 입력해주세요
						</Text>
					</View>
				)}
				<Text style={SignUpStyles.textPw}>비밀번호 확인</Text>
				<View style={SignUpStyles.textInputPwContainer}>
					<TextInput
						style={SignUpStyles.textInputPw}
						placeholder="비밀번호 확인"
						onChangeText={handleCheckPassword}
						value={valueCheckPW}
						secureTextEntry={!showPW}
					/>
				</View>
				{!passwordMatch && (
					<View style={SignUpStyles.containerError}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={SignUpStyles.textError}>
							비밀번호가 일치하지 않습니다.
						</Text>
					</View>
				)}
				<View style={SignUpStyles.buttonMove}>
					<ApplyButton
						text="회원가입 완료"
						disabled={!isFormValid}
						onPress={handleSignUp}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SignUpPage;
