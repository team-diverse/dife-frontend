import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const DefaultLanguageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	radioButtonGroup: {
		marginTop: 3,
		marginLeft: 24,
	},
});

export default DefaultLanguageStyles;
