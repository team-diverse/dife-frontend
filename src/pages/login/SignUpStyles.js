import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14, fontCaption } = CustomTheme;

const SignUpStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textTitle: {
		fontSize: 32,
		lineHeight: 37,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 33,
		marginLeft: 24,
	},
	textId: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 34,
		marginLeft: 24,
	},
	textInputId: {
		width: 327,
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		marginTop: 8,
		marginHorizontal: 25,
		alignItems: "center",
	},
	textPw: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 34,
		marginLeft: 24,
	},
	textInputPwContainer: {
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
	},
	textInputPw: {
		width: 327,
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		marginTop: 8,
		marginHorizontal: 25,
		alignItems: "center",
	},
	iconSee: {
		position: "absolute",
		alignItems: "center",
		top: 17,
		right: 50,
	},
	containerError: {
		flexDirection: "row",
		marginTop: 8,
		marginLeft: 25,
	},
	textError: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	buttonMove: {
		marginTop: 161,
	},
});

export default SignUpStyles;
