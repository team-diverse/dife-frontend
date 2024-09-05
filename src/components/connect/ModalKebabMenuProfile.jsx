import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import * as Sharing from "expo-sharing";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { createBlockMemberByMemberId } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import Report from "@components/Report";

const { fontBody14 } = CustomTheme;

const ModalKebabMenuProfile = ({
	modalVisible,
	setModalVisible,
	memberId,
	groupId,
	position,
	onNavigation,
}) => {
	const { t } = useTranslation();
	const [modalReportVisible, setModalReportVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
	};

	const handleBlockAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			t("blockUserConfirmation"),
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
				t("userBlocked"),
				[
					{
						text: t("confirmButtonText"),
						onPress: () => {
							setModalVisible(false);
							onNavigation.goBack();
						},
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			console.error(
				"차단 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const baseUrl = process.env.EXPO_PUBLIC_API_URL;

	const createUrl = (id, type) => `${baseUrl}/${type}/${id}`;

	const handleShare = async (id, type) => {
		if (!(await Sharing.isAvailableAsync())) {
			Alert.alert(t("shareError"));
			return;
		}

		const url = createUrl(id, type);
		await Sharing.shareAsync(url);
	};

	const handleShareProfile = (groupId, memberId) => {
		const type = groupId ? "chatrooms" : "members";
		const id = groupId || memberId;

		handleShare(id, type);
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={[
				styles.modal,
				{ top: position.top * 2, right: position.width },
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			{groupId ? (
				<View style={styles.rectangleIsGroup}>
					<TouchableOpacity onPress={handleShareProfile}>
						<Text style={styles.textIsMe}>{t("profileShare")}</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity
						style={styles.containerReport}
						onPress={handleReport}
					>
						<Text
							style={[
								styles.textIsMe,
								{ color: CustomTheme.warningRed },
							]}
						>
							{t("report")}
						</Text>
						<InfoCircle color={CustomTheme.warningRed} />
					</TouchableOpacity>
					<Report
						modalVisible={modalReportVisible}
						setModalVisible={setModalReportVisible}
						reportTitle={t("reportGroupProfile")}
						groupId={groupId}
					/>
				</View>
			) : (
				<View style={styles.rectangle}>
					<TouchableOpacity onPress={handleShareProfile}>
						<Text style={styles.textIsMe}>{t("profileShare")}</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity onPress={handleBlockAlert}>
						<Text style={styles.textIsMe}>{t("block")}</Text>
					</TouchableOpacity>
					<View style={styles.line} />
					<TouchableOpacity
						style={styles.containerReport}
						onPress={handleReport}
					>
						<Text
							style={[
								styles.textIsMe,
								{ color: CustomTheme.warningRed },
							]}
						>
							{t("report")}
						</Text>
						<InfoCircle color={CustomTheme.warningRed} />
					</TouchableOpacity>
					<Report
						modalVisible={modalReportVisible}
						setModalVisible={setModalReportVisible}
						reportTitle={t("reportIndividualProfile")}
						memberId={memberId}
					/>
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
		height: 110,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	rectangleIsGroup: {
		width: 95,
		height: 72,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	line: {
		width: 86,
		height: 1,
		backgroundColor: CustomTheme.bgList,
		marginHorizontal: 5,
	},
	textIsMe: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 11,
		marginVertical: 8,
	},
	containerReport: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 11,
	},
});

export default ModalKebabMenuProfile;
