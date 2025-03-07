import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const EventStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Constants.statusBarHeight,
	},
	flatlist: {
		flex: 1,
		width: "100%",
	},
	flatlistContent: {
		alignItems: "center",
	},
	eventCard: {
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.71,
		shadowRadius: 6,
	},
});

export default EventStyles;
