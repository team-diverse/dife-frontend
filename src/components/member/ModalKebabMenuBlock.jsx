import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { deleteBlockMember } from "config/api";

const { fontBody14 } = CustomTheme;

const ModalKebabMenuBlock = ({
	modalVisible,
	setModalVisible,
	blacklistedMemberId,
	position,
}) => {
	const { t } = useTranslation();

	const handleBlock = async () => {
		try {
			await deleteBlockMember(blacklistedMemberId);
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
			style={[
				styles.modal,
				{
					top: position.y - (position.height + 38) / 2,
					left: position.x - (position.width + 100),
				},
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.rectangle}>
				<TouchableOpacity onPress={handleBlock}>
					<Text style={styles.textDeleteBlock}>
						{t("removeBlock")}
					</Text>
				</TouchableOpacity>
			</View>
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
