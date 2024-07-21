import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14, fontCaption } = CustomTheme;

const ModifyProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryBg,
	},
	containerProfileImage: {
		width: 100,
		marginLeft: 23,
		marginBottom: 30,
	},
	modifyKBackground: {
		width: 85,
		height: 85,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 2,
		borderColor: CustomTheme.bgBasic,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	iconProfileEdit: {
		position: "absolute",
		right: 0,
		bottom: -9,
	},
	containerBackgroundWhite: {
		marginHorizontal: 24,
	},
	backgroundWhite: {
		width: "100%",
		borderRadius: 14,
		backgroundColor: CustomTheme.bgBasic,
		justifyContent: "center",
		paddingHorizontal: 13,
		paddingVertical: 16,
		marginBottom: 16,
	},
	containerRowText: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	textTitle: {
		...fontSub14,
		marginBottom: 10,
		marginLeft: 23,
	},
	textSubTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: "#AFB0B3",
		marginRight: 8,
		marginBottom: 8,
	},
	textModify: {
		...fontCaption,
		color: "#B0D0FF",
	},
	textContent: {
		...fontCaption,
		color: CustomTheme.textSecondary,
	},
	containerBasicInfo: {
		flexDirection: "row",
	},
	containerBasicInfoContent: {
		flexDirection: "row",
		marginBottom: 12,
	},
	textBasicInfo: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: "#8C8D91",
		marginRight: 8,
	},
	containerTagLanguage: {
		flexDirection: "row",
	},
});

export default ModifyProfileStyles;
