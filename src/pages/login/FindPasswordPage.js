import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FindPasswordStyles from "@pages/login/FindPasswordStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { changePassword } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import ConnectRequest from "@components/ConnectRequest";
import GoBack from "@components/common/GoBack";

const FindPasswordPage = () => {
	const [valueID, onChangeID] = useState("");
	const [validID, setValidID] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleEmail = (text) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		setValidID(emailRegex.test(text));
		setErrorMessage("유효한 이메일 형식을 입력해주세요.");
		onChangeID(text);
	};

	const handleFindPassword = async () => {
		setModalConnectVisible(true);
		try {
			await changePassword(valueID);
			setValidID(true);
			navigation.navigate("FindPasswordVerifying");
		} catch (error) {
			setModalConnectVisible(false);
			console.error(
				"비밀번호 재발급 실패:",
				error.response ? error.response.data : error.message,
			);
			setValidID(false);
			setErrorMessage("등록된 회원정보가 없습니다.");
		} finally {
			setModalConnectVisible(false);
		}
	};

	const [modalConnectVisible, setModalConnectVisible] = useState(false);

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[FindPasswordStyles.container]}>
				<GoBack />
				<Text style={FindPasswordStyles.textTitle}>
					비밀번호 재발급
				</Text>
				<Text style={FindPasswordStyles.textSubTitle}>
					회원가입 시 사용한 이메일을 입력해주세요
				</Text>
				<Text style={FindPasswordStyles.textId}>
					ID (Email Address)
				</Text>
				<View style={FindPasswordStyles.textInputId}>
					<TextInput
						placeholder="이메일을 입력해주세요"
						onChangeText={handleEmail}
						value={valueID}
					/>
				</View>
				{validID == false && (
					<View style={FindPasswordStyles.containerNotMember}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={FindPasswordStyles.textNotMember}>
							{errorMessage}
						</Text>
					</View>
				)}
				<ApplyButton
					text="비밀번호 재발급받기"
					disabled={!validID}
					onPress={handleFindPassword}
				/>
				<ConnectRequest
					modalVisible={modalConnectVisible}
					setModalVisible={setModalConnectVisible}
					textLoading="이메일 전송중"
					textComplete="이메일 전송 완료!"
				/>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default FindPasswordPage;
