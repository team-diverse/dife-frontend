import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const NotificationStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	flatlist: {
		width: "100%",
		marginTop: 10,
	},
	line: {
		width: "100%",
		height: 1,
		backgroundColor: CustomTheme.bgList,
	},
});

export default NotificationStyles;
