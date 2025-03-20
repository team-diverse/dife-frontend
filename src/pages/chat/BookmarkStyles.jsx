import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const BookmarkStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Constants.statusBarHeight,
	},
	flatlist: {
		width: "100%",
	},
});

export default BookmarkStyles;
