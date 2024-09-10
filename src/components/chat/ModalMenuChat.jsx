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
				"북마크되었습니다.",
				[
					{
						text: t("cancelButton"),
						style: "cancel",
					},
					{
						text: "북마크로 이동",
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
				"이미 북마크된 채팅입니다.",
				[
					{
						text: "확인",
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
				{
					top: position.y + 15,
					left: isMine
						? position.x - position.width / 2
						: position.x + position.width / 2 + 15,
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
					<Text style={styles.textIsMe}>북마크</Text>
					<IconModalBookmark />
				</TouchableOpacity>
				<View style={styles.line} />
				<TouchableOpacity
					style={styles.containerIconText}
					onPress={handleCopyToClipboard}
				>
					<Text style={styles.textIsMe}>복사</Text>
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
	containerIconText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 11,
	},
});

export default ModalMenuChat;
