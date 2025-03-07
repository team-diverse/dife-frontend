import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontHead18, fontSub14, fontCaption } = CustomTheme;

const ChatRoomStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D9EAFF",
		justifyContent: "space-between",
		paddingTop: Constants.statusBarHeight,
	},
	containerTopBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 56,
	},
	containerChat: {
		flex: 1,
		paddingRight: -10,
		paddingLeft: 15,
	},
	dateHeaderContainer: {
		alignItems: "center",
		marginVertical: 16,
	},
	dateHeaderText: {
		...fontCaption,
		color: "#6F6D6C",
	},
	containerBackName: {
		flexDirection: "row",
		alignItems: "center",
	},
	iconArrow: {
		marginLeft: 12,
	},
	textTopBar: {
		...fontHead18,
		marginLeft: 11,
	},
	iconHamburgerMenu: {
		marginRight: 12,
	},
	menuBackground: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	menu: {
		position: "absolute",
		height: "100%",
		backgroundColor: "#fff",
	},
	containerGray: {
		flexDirection: "row",
		width: "100%",
		height: 38,
		backgroundColor: CustomTheme.bgList,
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
	containerIcon: {
		flexDirection: "row",
		marginRight: 6,
	},
	containerChatPeople: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 14,
		marginVertical: 8,
	},
	textChatPeople: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 15,
	},
	line: {
		width: 251,
		height: 1,
		backgroundColor: CustomTheme.bgList,
	},
	containerDrawer: {
		flexDirection: "row",
		width: "100%",
		height: 55,
		justifyContent: "space-between",
		alignItems: "center",
	},
	containerDrawerTextCount: {
		flexDirection: "row",
	},
	textDrawer: {
		fontSize: 20,
		lineHeight: 28,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 14,
	},
	containerDrawerCount: {
		width: 21,
		height: 21,
		borderRadius: 8,
		backgroundColor: "#FFD600",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: 6,
	},
	textDrawerCount: {
		...fontCaption,
		color: CustomTheme.bgBasic,
	},
	iconReverseArrow: {
		transform: [{ scaleX: -1 }],
		marginRight: 11,
	},
	chatInput: {
		backgroundColor: CustomTheme.bgBasic,
	},
	chatInputBottom: {
		height: 34,
		backgroundColor: "white",
	},
	iconGuideChatBubble: {
		position: "absolute",
		...fontSub14,
		color: CustomTheme.primaryMedium,
		left: 12,
	},
	containerCheck: {
		position: "absolute",
		left: "50%",
		bottom: 121,
		transform: [{ translateX: -233 / 2 }, { translateY: 0 }],
		backgroundColor: "#fff",
		width: 233,
		height: 45,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
	},
	textCheck: {
		...fontCaption,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
});

export default ChatRoomStyles;
