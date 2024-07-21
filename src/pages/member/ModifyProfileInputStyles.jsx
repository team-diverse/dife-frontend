import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const ModifyProfileInputStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerBackgroundWhite: {
		marginTop: 20,
		marginHorizontal: 24,
	},
	backgroundWhite: {
		width: "100%",
		borderRadius: 14,
		backgroundColor: CustomTheme.bgBasic,
		justifyContent: "center",
		paddingHorizontal: 12,
		paddingVertical: 15,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
	},
	textTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: CustomTheme.borderColor,
	},
	textInput: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: CustomTheme.textSecondary,
		marginTop: 5,
	},
	textCount: {
		...fontCaption,
		position: "absolute",
		top: 12,
		right: 12,
		color: "#666",
	},
	infoTextContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 6,
		marginLeft: 26,
	},
	infoText: {
		...fontCaption,
		color: "#8C8D91",
		marginLeft: 3,
	},
	containerRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	checkbox: {
		marginTop: 30,
	},
});

export default ModifyProfileInputStyles;
