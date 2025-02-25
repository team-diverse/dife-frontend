import { StyleSheet, Platform, StatusBar } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontSub16, fontSub14, fontCaption } = CustomTheme;

const SignUpStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	textTitle: {
		...fontHead24,
		marginTop: 33,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontSub16,
		marginLeft: 24,
		marginTop: 12,
	},
	containerIdPw: {
		marginHorizontal: 25,
		marginBottom: 32,
	},
	textIdPw: {
		...fontSub14,
		color: CustomTheme.textPrimary,
	},
	textInputIdPw: {
		width: "100%",
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
	containerRetransmit: {
		width: 59,
		height: 28,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 4,
		position: "absolute",
		top: 15.5,
		right: 12,
	},
	textResend: {
		...fontSub14,
		color: "#FBFBFB",
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
