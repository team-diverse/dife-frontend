import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14, fontSub16, fontCaption } = CustomTheme;

const DeleteMemberStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	iconDeleteMember: {
		marginTop: 8,
		marginLeft: 20,
		marginBottom: 10,
	},
	textTitle: {
		fontSize: 20,
		lineHeight: 28,
		fontFamily: "NotoSansCJKkr-Medium",
		marginLeft: 28,
		marginBottom: 15,
	},
	containerNotice: {
		flexDirection: "row",
		marginLeft: 26,
		marginRight: 66,
		marginVertical: 7,
	},
	textNotice: {
		...fontCaption,
		color: CustomTheme.textSecondary,
		marginLeft: 5,
	},
	textReasonTitle: {
		...fontSub16,
		marginTop: 20,
		marginLeft: 32,
		marginBottom: 17,
	},
	containerReason: {
		width: 328,
		height: 48,
		borderRadius: 14,
		borderWidth: 2,
		borderColor: CustomTheme.bgList,
		justifyContent: "center",
	},
	textReasonBold: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.textSecondary,
		marginLeft: 16,
	},
	textReason: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 16,
	},
	iconArrowRight: {
		marginRight: 10,
		transform: [{ rotate: "-90deg" }],
	},
	containerReasonItem: {
		width: 324,
		height: 48,
		borderBottomWidth: 2,
		borderBottomColor: CustomTheme.bgList,
		justifyContent: "center",
	},
	applyButton: {
		position: "absolute",
		bottom: 35,
	},
});

export default DeleteMemberStyles;
