import { StyleSheet, Platform, StatusBar } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const LikedPostStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	itemCommunity: {
		alignItems: "center",
		marginTop: 16,
		marginHorizontal: 24,
	},
});

export default LikedPostStyles;
