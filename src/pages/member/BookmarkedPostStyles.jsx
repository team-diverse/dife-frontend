import { StyleSheet, Platform, StatusBar } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14 } = CustomTheme;

const BookmarkedPostStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	containerCategory: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		marginHorizontal: 24,
	},
	category: {
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1.51,
		borderColor: "#B0D0FF",
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 4,
	},
	textCategory: {
		...fontSub14,
		color: CustomTheme.textSecondary,
	},
	itemCommunity: {
		alignItems: "center",
		marginTop: 16,
		marginHorizontal: 24,
	},
});

export default BookmarkedPostStyles;
