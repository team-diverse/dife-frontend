import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const DefaultLanguageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	radioButtonGroup: {
		marginTop: 3,
		marginLeft: 24,
	},
});

export default DefaultLanguageStyles;
