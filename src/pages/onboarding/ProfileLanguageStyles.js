import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontBody18 } = CustomTheme;

const ProfileLanguageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
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
		marginTop: 41,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontBody18,
		marginTop: 17,
		marginLeft: 24,
	},
	containerCheckbox: {
		marginTop: 44,
	},
	buttonCheck: {
		position: "absolute",
		bottom: 104,
	},
});

export default ProfileLanguageStyles;
