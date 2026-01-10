import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";
import IconSmallTalkClose from "@components/chat/IconSmallTalkClose";

const { fontCaption } = CustomTheme;

const ModalSmallTalk = ({ visible, onClose, style }) => {
	if (!visible) return null;

	return (
		<View pointerEvents="box-none" style={[styles.overlay, style]}>
			<View style={styles.modalRectangle}>
				<TouchableOpacity
					style={styles.iconSmallTalkClose}
					onPress={onClose}
				>
					<IconSmallTalkClose />
				</TouchableOpacity>

				<Text style={styles.textSmallTalkProposal}>
					대화를 이어보고 싶다면 이런 주제는 어때요?
				</Text>
				<Text style={styles.textSmallTalkSubject}>
					요즘 듣고 있는 노래 하나 추천해 줄 수 있어?
				</Text>
				{/* TODO: 번역 추가 및 API 연결 */}
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
		height: 56,
		padding: 8,
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
	},
});

export default ModalSmallTalk;
