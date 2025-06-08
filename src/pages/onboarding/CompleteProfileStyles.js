import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";
import Constants from "expo-constants";

const { fontHead24, fontHead18 } = CustomTheme;

const CompleteProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	textTitle: {
		...fontHead24,
		marginTop: 60,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontHead18,
		color: CustomTheme.primaryMedium,
		marginTop: 12,
		marginLeft: 24,
	},
	iconLoading: {
		alignItems: "center",
		marginTop: 156,
	},
	buttonCheck: {
		marginTop: 187,
		marginHorizontal: 10,
		marginBottom: 83,
	},
});

export default CompleteProfileStyles;
