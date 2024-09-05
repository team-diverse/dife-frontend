import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead18, fontSub14, fontBody14, fontCaption } = CustomTheme;

const LoginStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	backgroundLogin: {
		position: "absolute",
		top: 124,
		left: -70,
	},
	textTitle: {
		fontSize: 32,
		lineHeight: 37,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryDefault,
		marginTop: 67,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontHead18,
		color: CustomTheme.textSecondary,
		marginTop: 12,
		marginLeft: 24,
	},
	containerIdPw: {
		paddingHorizontal: 30,
		marginTop: 115,
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
	textIdPw: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 12,
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
	containerButtonSignupLogin: {
		position: "absolute",
		width: "100%",
		bottom: 45,
		alignItems: "center",
	},
	textReport: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		textDecorationLine: "underline",
		marginTop: 20,
	},
});

export default LoginStyles;
