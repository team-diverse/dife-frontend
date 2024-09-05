import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { CustomTheme } from "@styles/CustomTheme";
import { deleteBlockMember } from "config/api";

const { fontBody14 } = CustomTheme;

const ModalKebabMenuBlock = ({
	modalVisible,
	setModalVisible,
	memberId,
	position,
}) => {
	const handleBlock = async () => {
		try {
			await deleteBlockMember(memberId);
			setModalVisible(false);
		} catch (error) {
			console.error(
				"차단 삭제 오류:",
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
		>
			<View style={styles.rectangle}>
				<TouchableOpacity onPress={handleBlock}>
					<Text style={styles.textDeleteBlock}>차단 해제하기</Text>
				</TouchableOpacity>
			</View>
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
		height: 38,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	textDeleteBlock: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 11,
		marginVertical: 8,
	},
});

export default ModalKebabMenuBlock;
