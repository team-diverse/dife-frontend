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

import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import ConnectRequest from "@components/ConnectRequest";
import GoBack from "@components/common/GoBack";
import { changePassword } from "config/api";

const FindPasswordPage = () => {
	const [valueID, onChangeID] = useState("");
	const [idValid, setIdValid] = useState(null);

	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleFindPassword = () => {
		setModalConnectVisible(true);
		console.log("이메일 주소:", valueID);

		changePassword(valueID)
			.then((response) => {
				console.log("비밀번호 재발급 성공:", response.data);
				setIdValid(true);
				navigation.navigate("FindPasswordVerifying");
			})
			.catch((error) => {
				setModalConnectVisible(false);
				console.error(
					"비밀번호 재발급 실패:",
					error.response ? error.response.data : error.message,
				);
				setIdValid(false);
			})
			.finally(() => {
				setModalConnectVisible(false);
			});
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
						onChangeText={(text) => onChangeID(text)}
						value={valueID}
					/>
				</View>
				{idValid == false && (
					<View style={FindPasswordStyles.containerNotMember}>
						<InfoCircle color={CustomTheme.warningRed} />
						<Text style={FindPasswordStyles.textNotMember}>
							등록된 회원정보가 없습니다
						</Text>
					</View>
				)}
				<ApplyButton
					text="비밀번호 재발급받기"
					disabled={valueID === ""}
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
