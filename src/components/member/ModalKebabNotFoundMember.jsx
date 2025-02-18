import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

const ModalKebabNotFoundMember = ({ modalVisible, setModalVisible }) => {
	const { t } = useTranslation();

	return (
		<Modal
			isVisible={modalVisible}
			style={styles.modal}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.5)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.rectangle}>
				<Text style={styles.description}>{t("notFoundMember")}</Text>
				<View style={styles.line} />
				<TouchableOpacity onPress={() => setModalVisible(false)}>
					<Text style={styles.text}>{t("close")}</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
	rectangle: {
		width: 250,
		padding: 20,
		backgroundColor: "rgba(0, 0, 0, 0.6)",
		borderRadius: 10,
		alignItems: "center",
	},
	line: {
		width: "100%",
		height: 1,
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		marginHorizontal: 5,
	},
	description: {
		fontSize: 18,
		color: "#ccc",
		marginVertical: 9,
	},

	text: {
		fontSize: 18,
		color: CustomTheme.primaryMedium,
		marginVertical: 9,
	},
});

export default ModalKebabNotFoundMember;
