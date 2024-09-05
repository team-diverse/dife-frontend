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
	containerIdPw: {
		marginHorizontal: 25,
	},
	textIdPw: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 34,
	},
	textInputIdPw: {
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
	buttonMove: {
		position: "absolute",
		bottom: 126,
	},
});

export default SignUpStyles;
