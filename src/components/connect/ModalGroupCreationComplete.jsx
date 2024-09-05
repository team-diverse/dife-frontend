import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import CompleteIcon from "@components/common/CompleteIcon";
import IconCancelX from "@components/connect/IconCancelX";
import { useNavigation } from "@react-navigation/native";

const { fontCaption, fontSub14, fontSub16 } = CustomTheme;

const ModalGroupCreationComplete = ({
	groupId,
	modalVisible,
	setModalVisible,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const handleMoveGroupProfile = () => {
		setModalVisible(false);
		navigation.navigate("GroupProfilePage", {
			groupId: groupId,
		});
	};

	return (
		<Modal
			isVisible={modalVisible}
			onBackdropPress={() => setModalVisible(false)}
			style={styles.modal}
		>
			<View style={styles.rectangle}>
				<TouchableOpacity
					style={styles.iconCancelX}
					onPress={() => setModalVisible(false)}
				>
					<IconCancelX />
				</TouchableOpacity>

				<View style={styles.reportCompleteContainer}>
					<CompleteIcon isConnect={true} />
					<Text style={styles.reportCompleteText}>
						{t("groupCreationComplete")}
					</Text>
				</View>
				<TouchableOpacity
					style={styles.rectangleBlue}
					onPress={handleMoveGroupProfile}
				>
					<Text style={styles.textRectangleBlue}>
						{t("moveToGroupProfile")}
					</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	iconCancelX: {
		position: "absolute",
		top: 13,
		right: 13,
	},
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		alignItems: "center",
		position: "relative",
	},
	reportCompleteContainer: {
		marginTop: 114,
		alignItems: "center",
	},
	reportCompleteText: {
		marginTop: 16,
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	iconLock: {
		marginTop: 85,
	},
	containerPassword: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	input: {
		width: 28,
		height: 44,
		marginHorizontal: 4,
		borderRadius: 4,
		backgroundColor: CustomTheme.borderColor,
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 24,
	},
	secretInput: {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0,
	},
	containerError: {
		flexDirection: "row",
		marginBottom: 12,
	},
	textError: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	textPassword: {
		...fontSub16,
	},
	rectangleBlue: {
		position: "absolute",
		width: 220,
		height: 37,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: CustomTheme.primaryMedium,
		bottom: 34,
	},
	textRectangleBlue: {
		...fontSub14,
		color: CustomTheme.bgBasic,
	},
});

export default ModalGroupCreationComplete;
