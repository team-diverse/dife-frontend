import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontHead18, fontSub16 } = CustomTheme;

const CompleteProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textTitle: {
		...fontHead24,
		marginTop: 60,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontHead18,
		color: CustomTheme.textPrimary,
		marginTop: 12,
		marginHorizontal: 24,
	},
	textDescription: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		marginTop: 4,
		marginHorizontal: 24,
	},
	iconLoading: {
		alignItems: "center",
		marginTop: 156,
	},
	buttonCheck: {
		position: "absolute",
		bottom: 104,
	},
});

export default CompleteProfileStyles;
