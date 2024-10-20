import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead20, fontSub16, fontBody14 } = CustomTheme;

const ChattingStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	connectTop: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	iconChatPlus: {
		position: "absolute",
		right: 12,
		bottom: 12,
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		zIndex: 2,
	},
	safeAreaView: {
		flex: 1,
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	containerTextIcon: {
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		marginTop: 55,
	},
	textChattingTitle: {
		flex: 1,
		...fontHead20,
		color: CustomTheme.primaryBg,
		marginLeft: 24,
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
	searchIcon: {
		position: "absolute",
		right: 12,
	},
	containerCommunityTop: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 12,
	},
	containerTitle: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconCommunity: {
		marginLeft: 24,
	},
	iconArrow: {
		transform: [{ scaleX: -1 }],
		marginRight: 24,
	},
	textCommunityTitle: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
		marginLeft: 9,
	},
	containerMore: {
		flexDirection: "row",
		alignItems: "center",
	},
	textCommunityMore: {
		...fontBody14,
		color: "#8C8D91",
		marginRight: 3,
	},
	itemCommunityPreview: {
		alignItems: "center",
		marginTop: 12,
		marginHorizontal: 24,
	},
});

export default ChattingStyles;
