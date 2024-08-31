import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const TabLikedPostStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerTitle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 35,
		marginRight: 25,
		height: 38,
	},
	textTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: "#393A3F",
	},
	containerMore: {
		flexDirection: "row",
		alignItems: "center",
	},
	textMore: {
		...fontCaption,
		color: CustomTheme.textSecondary,
	},
	iconArrowRight: {
		transform: [{ rotate: "180deg" }],
		marginLeft: 2,
	},
	itemLikeBookmark: {
		alignItems: "center",
		marginHorizontal: 24,
	},
});

export default TabLikedPostStyles;
