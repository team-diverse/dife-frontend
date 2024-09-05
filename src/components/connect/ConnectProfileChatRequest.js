import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import ModalRequest from "@components/common/ModalRequest";

const { fontSub16 } = CustomTheme;

const ConnectProfileChatRequest = () => {
	const { t } = useTranslation();
	const [modalVisible, setModalVisible] = useState(false);

	const pressButton = () => {
		setModalVisible(true);
	};

	return (
		<View style={styles.rectangle}>
			<TouchableOpacity style={styles.chat}>
				<Text style={styles.textChat}>{t("chat")}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.request} onPress={pressButton}>
				<Text style={styles.textRequest}>{t("requestButtonText")}</Text>
			</TouchableOpacity>
			<ModalRequest
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				textLoading={t("connectRequestInProgress")}
				textComplete={t("connectRequestComplete")}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		flexDirection: "row",
		width: "100%",
		height: 72,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: -1 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	chat: {
		height: 44,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginLeft: 24,
		marginRight: 8,
		marginVertical: 14,
	},
	request: {
		height: 44,
		backgroundColor: CustomTheme.primaryMedium,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginRight: 24,
		marginLeft: 8,
		marginVertical: 14,
	},
	textChat: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		paddingHorizontal: 50,
		paddingVertical: 10,
	},
	textRequest: {
		...fontSub16,
		color: CustomTheme.bgBasic,
		paddingHorizontal: 50,
		paddingVertical: 10,
	},
});

export default ConnectProfileChatRequest;
