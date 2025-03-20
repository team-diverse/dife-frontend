import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";
import Constants from "expo-constants";

const { fontBody18, fontBody14 } = CustomTheme;

const OnboardingStep1Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Constants.statusBarHeight,
	},
	iconArrow: {
		position: "absolute",
		top: 5,
		left: 14,
		bottom: 5,
	},
	iconProgress: {
		alignItems: "center",
		marginTop: 5,
		marginBottom: 30,
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
		marginTop: 35,
		marginLeft: 24,
	},
	textSubTitle: {
		fontSize: 18,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 12,
		marginLeft: 24,
	},
	containerInput: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 116,
		marginHorizontal: 27,
		paddingTop: 0,
		paddingBottom: 0,
	},
	textInputNickname: {
		...fontBody18,
		width: "100%",
		borderBottomWidth: 2,
		alignItems: "center",
		...Platform.select({
			ios: {
				paddingVertical: 11,
			},
			android: {
				height: 40,
				paddingTop: 0,
				paddingBottom: -20,
			},
		}),
	},
	iconDelete: {
		position: "absolute",
		right: 10,
	},
	textAvailableNickname: {
		...fontBody14,
		color: CustomTheme.primaryMedium,
		marginTop: 8,
		marginLeft: 27,
	},
	textUnavailableNickname: {
		...fontBody14,
		color: CustomTheme.warningRed,
		marginTop: 8,
		marginLeft: 27,
	},
	buttonCheck: {
		marginTop: 28,
	},
});

export default OnboardingStep1Styles;
