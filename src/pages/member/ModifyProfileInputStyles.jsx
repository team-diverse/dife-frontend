import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14, fontCaption } = CustomTheme;

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
	textAvailableNickname: {
		...fontBody14,
		color: CustomTheme.primaryMedium,
		marginTop: 8,
		marginLeft: 30,
	},
	textUnavailableNickname: {
		...fontBody14,
		color: CustomTheme.warningRed,
		marginTop: 8,
		marginLeft: 30,
	},
	textTagTitle: {
		fontSize: 18,
		lineHeight: 26,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.textPrimary,
		marginVertical: 16,
		marginLeft: 24,
	},
	line: {
		width: "100%",
		height: 2,
		backgroundColor: CustomTheme.bgList,
		marginBottom: 5,
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
	containerMbti: {
		alignItems: "center",
		marginVertical: 10,
	},
	flexStartMbti: {
		alignItems: "flex-start",
	},
	rowMbti: {
		flexDirection: "row",
	},
	checkbox: {
		marginTop: 30,
	},
});

export default ModifyProfileInputStyles;
