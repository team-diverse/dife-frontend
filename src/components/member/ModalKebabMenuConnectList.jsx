import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import * as Sentry from "@sentry/react-native";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const navigation = useNavigation();

	const handleBlockAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			t("blockAlertMessage", { name }),
			[
				{
					text: t("cancelButton"),
					style: "cancel",
				},
				{
					text: t("confirmButtonText"),
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
				t("blockSuccessMessage", { name }),
				[
					{
						text: t("confirmButtonText"),
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
			t("connectCancelAlertMessage", { name }),
			[
				{
					text: t("cancelButton"),
					style: "cancel",
				},
				{
					text: t("confirmButtonText"),
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
				t("connectCancelSuccessMessage", { name }),
				[
					{
						text: t("confirmButtonText"),
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
			style={[
				styles.modal,
				{
					top: position.y - (position.height + 75) / 2,
					left: position.x - (position.width + 100),
				},
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			{pending ? (
				<View style={styles.rectangle}>
					<TouchableOpacity onPress={handleProfile}>
						<Text style={styles.text}>{t("viewProfile")}</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity onPress={handleConnectDeleteAlert}>
						<Text style={styles.text}>
							{t("cancelRequestButtonText")}
						</Text>
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.rectangle}>
					<TouchableOpacity onPress={handleConnectDeleteAlert}>
						<Text style={styles.text}>
							{t("cancelConnectButtonText")}
						</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity onPress={handleBlockAlert}>
						<Text style={styles.text}>{t("block")}</Text>
					</TouchableOpacity>
				</View>
			)}
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-start",
		alignItems: "flex-start",
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
