import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14, fontCaption } = CustomTheme;

const SettingStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerTitle: {
		width: "100%",
		height: 40,
		backgroundColor: CustomTheme.bgList,
		justifyContent: "center",
	},
	textTitle: {
		...fontCaption,
		color: CustomTheme.textSecondary,
		marginLeft: 25,
	},
	containerContent: {
		flexDirection: "row",
		width: "100%",
		height: 48,
		alignItems: "center",
		justifyContent: "space-between",
		paddingLeft: 24,
		paddingRight: 20,
	},
	containerIconText: {
		flexDirection: "row",
		alignItems: "center",
	},
	textContent: {
		...fontBody14,
		color: "#393A3F",
		marginLeft: 9,
	},
	line: {
		width: "100%",
		height: 1,
		backgroundColor: CustomTheme.bgList,
	},
});

export default SettingStyles;
