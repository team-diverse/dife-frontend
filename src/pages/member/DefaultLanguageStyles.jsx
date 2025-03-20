import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const DefaultLanguageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Constants.statusBarHeight,
	},
	radioButtonGroup: {
		marginTop: 3,
		marginLeft: 24,
	},
});

export default DefaultLanguageStyles;
