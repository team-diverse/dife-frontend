import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontBody16 } = CustomTheme;

const SecurityStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryBg,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	containerContent: {
		marginHorizontal: 24,
	},
	backgroundWhite: {
		width: "100%",
		height: 48,
		borderRadius: 14,
		backgroundColor: CustomTheme.bgBasic,
		justifyContent: "center",
		paddingHorizontal: 13,
		paddingVertical: 16,
		marginVertical: 6,
	},
	containerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textContent: {
		...fontBody16,
	},
	line: {
		width: "100%",
		height: 2,
		backgroundColor: CustomTheme.bgBasic,
		marginVertical: 34,
	},
});

export default SecurityStyles;
