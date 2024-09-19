import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { CustomTheme } from "@styles/CustomTheme";

import IconCancel from "@components/common/IconCancel";

const { fontSub14, fontCaption } = CustomTheme;

const ModalNoBookmark = ({
	modalVisible,
	setModalVisible,
	context,
	date,
	time,
}) => {
	const handleNoButtonPress = () => {
		setModalVisible(false);
	};

	return (
		<Modal isVisible={modalVisible} style={styles.modal}>
			<View style={styles.modalRectangle}>
				<TouchableOpacity
					style={styles.iconCancel}
					onPress={handleNoButtonPress}
				>
					<IconCancel />
				</TouchableOpacity>
				<View style={styles.containerContext}>
					<View style={styles.textBackgroundRectangle}>
						<View style={styles.containerNameContext}>
							<Text style={styles.textContext}>{context}</Text>
						</View>
						<View style={styles.containerDateTime}>
							<Text style={styles.textDate}>{date}</Text>
							<Text style={styles.textTime}>{time}</Text>
						</View>
					</View>
					<View style={styles.containerNoBookmark}>
						<Text style={styles.textNoBookmark}>
							북마크를 해제하시겠어요?
						</Text>
					</View>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.buttonNo}
						onPress={handleNoButtonPress}
					>
						<Text style={styles.textNo}>아니오</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.buttonReport}>
						<Text style={styles.textReport}>해제하기</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	modalRectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
	},
	iconCancel: {
		alignItems: "flex-end",
		marginTop: 13,
		marginRight: 13,
	},
	containerContext: {
		alignItems: "center",
		marginTop: 78,
	},
	textBackgroundRectangle: {
		flexDirection: "row",
		width: 217,
		height: 43,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 10,
	},
	containerNameContext: {
		marginLeft: 12,
		justifyContent: "center",
	},
	textContext: {
		...fontCaption,
		width: 136,
		height: 17,
		marginTop: 1,
	},
	containerDateTime: {
		marginRight: 12,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	textDate: {
		fontSize: 11,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.textDisable,
	},
	textTime: {
		fontSize: 11,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Regular",
		color: CustomTheme.textDisable,
		marginTop: 1,
	},
	containerNoBookmark: {
		marginTop: 44,
	},
	textNoBookmark: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		position: "absolute",
		bottom: 20,
		left: 20,
		right: 20,
	},
	buttonNo: {
		flex: 1,
		width: 102,
		padding: 10,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: CustomTheme.textDisable,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
	},
	textNo: {
		...fontSub14,
	},
	buttonReport: {
		flex: 1,
		width: 102,
		padding: 10,
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: CustomTheme.primaryMedium,
		alignItems: "center",
		justifyContent: "center",
		marginLeft: 8,
	},
	textReport: {
		...fontSub14,
		color: CustomTheme.bgBasic,
	},
});

export default ModalNoBookmark;
