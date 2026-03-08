import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontSub16, fontSub14, fontCaption } = CustomTheme;

const FindPasswordStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textTitle: {
		...fontHead24,
		marginTop: 28,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontSub16,
		color: CustomTheme.textSecondary,
		marginTop: 12,
		marginLeft: 22,
	},
	textId: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 120,
	},
	containerTextInputId: {
		marginHorizontal: 24,
	},
	textInputIdWrapper: {
		position: "relative",
		marginTop: 8,
	},
	textInputId: {
		width: "100%",
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		alignItems: "center",
	},
	textInputIdWithButton: {
		paddingRight: 80,
	},
	containerRetransmit: {
		width: 59,
		height: 28,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 4,
		position: "absolute",
		right: 12,
		top: "50%",
		transform: [{ translateY: -14 }],
	},
	textResend: {
		...fontSub14,
		color: "#FBFBFB",
	},
	containerError: {
		flexDirection: "row",
		marginTop: 8,
		marginHorizontal: 25,
	},
	textNotMember: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	applyButton: {
		marginTop: 204,
	},
});

export default FindPasswordStyles;
