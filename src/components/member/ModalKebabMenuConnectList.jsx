import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import {
	createBlockMemberByMemberId,
	rejectedConnectByConnectId,
} from "config/api";
import { useNavigation } from "@react-navigation/native";

const { fontBody14 } = CustomTheme;

const ModalKebabMenuConnectList = ({
	modalVisible,
	setModalVisible,
	name,
	connectId,
	memberId,
	pending = false,
	position,
}) => {
	const navigation = useNavigation();

	const handleBlockAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			`'${name}'\n사용자를 차단하겠습니까?`,
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						handleBlock();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleBlock = async () => {
		try {
			await createBlockMemberByMemberId(memberId);
			Alert.alert(
				"",
				`'${name}'\n사용자를 차단하였습니다.`,
				[
					{
						text: "확인",
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"차단 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleProfile = () => {
		setModalVisible(false);
		navigation.navigate("ConnectProfilePage", {
			memberId: memberId,
		});
	};

	const handleConnectDeleteAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			`'${name}'\n커넥트 요청을 취소하겠습니까?`,
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						handleDeleteConnect();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleDeleteConnect = async () => {
		try {
			await rejectedConnectByConnectId(connectId);
			Alert.alert(
				"",
				`'${name}'\n커넥트 요청을 취소하였습니다.`,
				[
					{
						text: "확인",
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 취소 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={[styles.modal, { top: position.top, right: position.width }]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			{pending ? (
				<View style={styles.rectangle}>
					<TouchableOpacity onPress={handleProfile}>
						<Text style={styles.text}>프로필 보기</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity onPress={handleConnectDeleteAlert}>
						<Text style={styles.text}>요청 취소</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.rectangle}>
					<TouchableOpacity onPress={handleConnectDeleteAlert}>
						<Text style={styles.text}>커넥트 취소</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity onPress={handleBlockAlert}>
						<Text style={styles.text}>차단</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-start",
		alignItems: "flex-end",
	},
	rectangle: {
		width: 95,
		height: 75,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
	},
	line: {
		width: 86,
		height: 1,
		backgroundColor: CustomTheme.bgList,
		marginHorizontal: 5,
	},
	text: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 11,
		marginVertical: 9,
	},
});

export default ModalKebabMenuConnectList;
