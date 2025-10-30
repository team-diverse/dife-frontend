import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";

import { CustomTheme } from "@styles/CustomTheme";
import { createChatBookmark } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import Report from "@components/Report";
import IconModalCopy from "components/chat/IconModalCopy";
import IconModalBookmark from "@components/chat/IconModalBookmark.jsx";

const { fontBody14 } = CustomTheme;

const ModalMenuChat = ({
	modalVisible,
	setModalVisible,
	position,
	isMine,
	chatroomId,
	chatId,
	clipboardContent,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [modalReportVisible, setModalReportVisible] = useState(false);

	const handleBookmarkAlert = async () => {
		setModalVisible(false);
		try {
			await createChatBookmark(chatroomId, chatId);
			Alert.alert(
				"",
				t("bookmarked"),
				[
					{
						text: t("cancelButton"),
						style: "cancel",
					},
					{
						text: t("goToBookmarks"),
						onPress: () => {
							navigation.navigate("BookmarkPage");
						},
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			Alert.alert(
				"",
				t("alreadyBookmarkedChat"),
				[
					{
						text: t("confirmButtonText"),
					},
				],
				{ cancelable: false },
			);
			console.error(
				"채팅 북마크 생성 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleCopyToClipboard = () => {
		setModalVisible(false);
		Clipboard.setString(clipboardContent);
	};

	const handleReport = () => {
		setModalReportVisible(true);
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={[
				styles.modal,
				isMine
					? {
							top: position.y + 15,
							right: position.width,
							alignItems: "flex-end",
						}
					: {
							top: position.y + 15,
							left: position.x,
						},
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.rectangle}>
				<TouchableOpacity
					style={styles.containerIconText}
					onPress={handleBookmarkAlert}
				>
					<Text style={styles.textIsMe}>{t("chatBookmark")}</Text>
					<IconModalBookmark />
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity
					style={styles.containerIconText}
					onPress={handleCopyToClipboard}
				>
					<Text style={styles.textIsMe}>{t("chatCopy")}</Text>
					<IconModalCopy />
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity
					style={styles.containerIconText}
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
				/>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-start",
	},
	rectangle: {
		alignSelf: "flex-start",
		width: "auto",
		height: 110,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	rectangleIsGroup: {
		alignSelf: "flex-start",
		width: "auto",
		height: 72,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	line: {
		minWidth: 86,
		maxWidth: 101,
		height: 1,
		backgroundColor: CustomTheme.bgList,
		marginHorizontal: 5,
	},
	textIsMe: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 11,
		marginRight: 5,
		marginVertical: 8,
	},
	containerIconText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 11,
	},
});

export default ModalMenuChat;
