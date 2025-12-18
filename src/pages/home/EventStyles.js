import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const EventStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	flatlist: {
		flex: 1,
		width: "100%",
	},
	flatlistContent: {
		alignItems: "center",
	},
	eventCard: {
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 6,
			},
		}),
	},
});

export default EventStyles;
