import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import IconSmallTalkClose from "@components/chat/IconSmallTalkClose";

const { fontCaption } = CustomTheme;

const ModalSmallTalk = ({ visible, onClose, style, subject, onLayout }) => {
	const { t } = useTranslation();
	if (!visible) return null;
	return (
		<View pointerEvents="box-none" style={[styles.overlay, style]}>
			<View style={styles.modalRectangle} onLayout={onLayout}>
				<TouchableOpacity
					style={styles.iconSmallTalkClose}
					onPress={onClose}
				>
					<IconSmallTalkClose />
				</TouchableOpacity>

				<Text style={styles.textSmallTalkProposal}>
					{t("smallTalkProposal")}
				</Text>
				<Text
					style={styles.textSmallTalkSubject}
				>{`"${subject}"`}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	overlay: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 120,
		zIndex: 10,
	},
	modalRectangle: {
		alignSelf: "stretch",
		paddingVertical: 8,
		marginHorizontal: 16,
		backgroundColor: "#B0D0FF",
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	iconSmallTalkClose: {
		position: "absolute",
		top: 4,
		right: 4,
	},
	textSmallTalkProposal: {
		...fontCaption,
		color: CustomTheme.bgBasic,
	},
	textSmallTalkSubject: {
		fontSize: 12,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Medium",
		color: CustomTheme.primaryMedium,
		width: 250,
		textAlign: "center",
	},
});

export default ModalSmallTalk;
