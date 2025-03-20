import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";
import Constants from "expo-constants";

const { fontHead24, fontBody18 } = CustomTheme;

const OnboardingStep4Styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Constants.statusBarHeight,
	},
	iconArrow: {
		position: "absolute",
		marginTop: 5,
		marginLeft: 14,
	},
	iconProgress: {
		alignItems: "center",
		marginTop: 5,
	},
	textTitle: {
		...fontHead24,
		marginTop: 4,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontBody18,
		marginTop: 12,
		marginLeft: 24,
	},
	containerHobby: {
		marginTop: 47,
	},
	rowHobby: {
		flexDirection: "row",
		justifyContent: "center",
	},
	buttonCheck: {
		position: "absolute",
		bottom: 104,
	},
});

export default OnboardingStep4Styles;
