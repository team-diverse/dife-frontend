import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const BookmarkedPostStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	itemCommunity: {
		alignItems: "center",
		marginTop: 16,
		marginHorizontal: 24,
	},
});

export default BookmarkedPostStyles;
