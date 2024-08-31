import React, { useState, useRef } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

import { CustomTheme } from "@styles/CustomTheme";

import CompleteIcon from "@components/common/CompleteIcon";
import IconCancelX from "@components/connect/IconCancelX";
import IconLock from "@components/connect/IconLock";
import IconSecretPassword from "@components/connect/IconSecretPassword";
import InfoCircle from "@components/common/InfoCircle";

const { fontCaption, fontSub14, fontSub16 } = CustomTheme;

const ModalGroupJoin = ({
	modalVisible,
	setModalVisible,
	isPublic,
	length = 5,
}) => {
	const [showComplete, setShowComplete] = useState(false);
	const [password, setPassword] = useState(Array(length).fill(""));
	const [incorrectPassword, setIncorrectPassword] = useState(false);

	const inputs = useRef([]);

	const handleChange = (text, index) => {
		const newPassword = [...password];
		newPassword[index] = text;

		setPassword(newPassword);

		if (text !== "" && index < length - 1) {
			inputs.current[index + 1].focus();
		}

		if (index === length - 1 && text !== "") {
			setIncorrectPassword(true);
		}
	};

	const handleKeyPress = (e, index) => {
		if (
			e.nativeEvent.key === "Backspace" &&
			password[index] === "" &&
			index > 0
		) {
			inputs.current[index - 1].focus();
		}
	};

	return (
		<Modal
			isVisible={modalVisible}
			onBackdropPress={() => setModalVisible(false)}
			style={styles.modal}
		>
			<View style={styles.rectangle}>
				<TouchableOpacity
					style={styles.iconCancelX}
					onPress={() => setModalVisible(false)}
				>
					<IconCancelX />
				</TouchableOpacity>
				{isPublic || showComplete ? (
					<>
						<View style={styles.reportCompleteContainer}>
							<CompleteIcon isConnect={true} />
							<Text style={styles.reportCompleteText}>
								가입 완료
							</Text>
						</View>
						<TouchableOpacity style={styles.rectangleBlue}>
							<Text style={styles.textRectangleBlue}>
								채팅방으로 바로 이동하기
							</Text>
						</TouchableOpacity>
					</>
				) : (
					<>
						<View style={styles.iconLock}>
							<IconLock />
						</View>
						<View style={styles.containerPassword}>
							{password.map((password, index) => (
								<View key={index} style={styles.input}>
									<TextInput
										style={styles.secretInput}
										value={password}
										onChangeText={(text) =>
											handleChange(text, index)
										}
										onKeyPress={(e) =>
											handleKeyPress(e, index)
										}
										keyboardType="numeric"
										maxLength={1}
										ref={(el) =>
											(inputs.current[index] = el)
										}
									/>
									{password !== "" && <IconSecretPassword />}
								</View>
							))}
						</View>
						{incorrectPassword && (
							<View style={styles.containerError}>
								<InfoCircle color={CustomTheme.warningRed} />
								<Text style={styles.textError}>
									잘못된 비밀번호입니다
								</Text>
							</View>
						)}
						<Text style={styles.textPassword}>
							비밀번호를 입력해주세요
						</Text>
						<TouchableOpacity
							style={styles.rectangleBlue}
							onPress={() => setShowComplete(true)}
						>
							<Text style={styles.textRectangleBlue}>확인</Text>
						</TouchableOpacity>
					</>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	iconCancelX: {
		position: "absolute",
		top: 13,
		right: 13,
	},
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		alignItems: "center",
		position: "relative",
	},
	reportCompleteContainer: {
		marginTop: 114,
		alignItems: "center",
	},
	reportCompleteText: {
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	iconLock: {
		marginTop: 85,
	},
	containerPassword: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	input: {
		width: 28,
		height: 44,
		marginHorizontal: 4,
		borderRadius: 4,
		backgroundColor: CustomTheme.borderColor,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 24,
	},
	secretInput: {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0,
	},
	containerError: {
		flexDirection: "row",
		marginBottom: 12,
	},
	textError: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	textPassword: {
		...fontSub16,
	},
	rectangleBlue: {
		position: "absolute",
		width: 220,
		height: 37,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: CustomTheme.primaryMedium,
		bottom: 34,
	},
	textRectangleBlue: {
		...fontSub14,
		color: CustomTheme.bgBasic,
	},
	radioButtonTitle: {
		alignItems: "center",
	},
	title: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 21,
		marginBottom: 12,
	},
	radioButtonGroup: {
		marginLeft: 24,
		justifyContent: "space-between",
	},
	radioButtonText: {
		...fontSub14,
	},
});

export default ModalGroupJoin;
