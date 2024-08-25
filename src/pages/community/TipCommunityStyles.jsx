import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead20, fontSub16, fontCaption } = CustomTheme;

const TipCommunityStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
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
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		zIndex: 2,
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	connectTop: {
		marginTop: -47,
		zIndex: 1,
	},
	containerTextIcon: {
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		marginTop: 55,
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
		marginTop: 100,
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
	},
	iconArrowRightSearch: {
		position: "absolute",
		left: 8,
	},
	searchIcon: {
		position: "absolute",
		right: 12,
	},
	itemCommunity: {
		alignItems: "center",
		marginTop: 18,
		marginHorizontal: 24,
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
});

export default TipCommunityStyles;
