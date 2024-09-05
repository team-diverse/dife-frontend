import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16, fontSub14, fontBody14, fontCaption } = CustomTheme;

const ModifyGroupProfileInputStyles = StyleSheet.create({
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
	checkbox: {
		marginTop: 30,
	},
	containerSlider: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 24,
		marginBottom: 18,
	},
	textMinMaxCount: {
		fontSize: 11,
		lineHeight: 14,
		fontFamily: "NotoSansCJKkr-Medium",
		color: CustomTheme.textDisable,
		marginTop: -10,
	},
	textHeadcount: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		marginRight: 24,
	},
	containerRadioButtonGroup: {
		marginHorizontal: 24,
		marginBottom: 107,
	},
	textInputPassword: {
		...fontSub14,
		height: 48,
		paddingLeft: 13,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#B0D0FF",
	},
});

export default ModifyGroupProfileInputStyles;
