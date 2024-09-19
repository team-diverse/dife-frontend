import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontSub14, fontCaption } = CustomTheme;

const SetPasswordStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textTitle: {
		...fontHead24,
		marginTop: 28,
		marginLeft: 24,
	},
	containerPw: {
		marginHorizontal: 24,
	},
	textPw: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 120,
	},
	textInputPw: {
		width: "100%",
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		marginTop: 8,
		alignItems: "center",
	},
	textInputPwContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconSee: {
		position: "absolute",
		top: 17,
		right: 12,
	},
	containerError: {
		flexDirection: "row",
		marginTop: 8,
	},
	textError: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	applyButton: {
		position: "absolute",
		bottom: 126,
	},
});

export default SetPasswordStyles;
