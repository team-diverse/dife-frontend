import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontHead20, fontSub16, fontCaption } = CustomTheme;

const TipCommunityStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	backgroundBlue: {
		position: "absolute",
		width: "100%",
		height: 100,
		backgroundColor: CustomTheme.primaryMedium,
	},
	iconPostPlus: {
		position: "absolute",
		right: 12,
		bottom: 46,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E",
				shadowOffset: { width: 0, height: 4 },
				shadowOpacity: 0.4,
				shadowRadius: 2,
			},
		}),
		zIndex: 2,
	},
	connectTop: {
		marginTop: Platform.OS === "android" ? -45 : -52,
		zIndex: 1,
	},
	containerTextIcon: {
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		marginTop: Platform.OS === "android" ? 12 : 59,
		zIndex: 2,
	},
	iconArrowRight: {
		marginLeft: 18,
		marginRight: 4,
	},
	textChattingTitle: {
		flex: 1,
		...fontHead20,
		color: CustomTheme.primaryBg,
	},
	iconBookmark: {
		flex: 1,
		marginRight: 24,
	},
	containerSearch: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		marginTop: Platform.OS === "android" ? 58 : 105,
		zIndex: 2,
	},
	containerSearchIcon: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
		marginLeft: 25,
		marginRight: 25,
	},
	search: {
		...fontSub16,
		position: "relative",
		width: "100%",
		height: 48,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 24,
		paddingLeft: 20,
		paddingTop: 0,
		paddingBottom: 0,
	},
	iconArrowRightSearch: {
		position: "absolute",
		left: 8,
	},
	searchIcon: {
		position: "absolute",
		right: 12,
	},
	containerFail: {
		alignItems: "center",
		marginTop: 78,
	},
	textFail: {
		...fontCaption,
		color: CustomTheme.textSecondary,
		marginTop: 13,
	},
	itemCommunity: {
		alignItems: "center",
		marginTop: 18,
		marginHorizontal: 24,
	},
});

export default TipCommunityStyles;
