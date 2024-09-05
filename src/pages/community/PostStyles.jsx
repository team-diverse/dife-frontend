import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14, fontCaption, fontNavi } = CustomTheme;

const PostStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerWhite: {
		paddingHorizontal: 24,
		paddingBottom: 14,
		backgroundColor: CustomTheme.bgBasic,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	containerWriterRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 8,
	},
	containerWriterText: {
		marginLeft: 8,
	},
	textWriter: {
		...fontBody14,
	},
	textDate: {
		...fontNavi,
		color: "#9FA0A4",
	},
	textTitle: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 20,
	},
	textContext: {
		...fontBody14,
		marginTop: 12,
	},
	containerImage: {
		marginTop: 12,
		alignItems: "center",
	},
	singleImage: {
		borderRadius: 10,
	},
	images: {
		width: 100,
		height: 100,
		borderRadius: 10,
		marginHorizontal: 6,
	},
	containerIconRow: {
		flexDirection: "row",
		marginTop: 20,
		alignItems: "center",
	},
	iconRow: {
		flexDirection: "row",
		marginRight: 15,
		alignItems: "center",
	},
	textIcon: {
		...fontCaption,
		marginLeft: 4,
	},
	textTranslation: {
		...fontNavi,
		color: CustomTheme.primaryMedium,
		textDecorationLine: "underline",
		position: "absolute",
		bottom: 0,
		right: 0,
	},
	containerBackground: {
		alignItems: "center",
		marginTop: -30,
		paddingTop: 30,
		paddingBottom: 40,
		paddingHorizontal: 22,
		backgroundColor: CustomTheme.primaryBg,
		zIndex: -1,
		overflow: "hidden",
	},
	difeLine: {
		position: "absolute",
		marginTop: 30,
	},
	containerInputComment: {
		flexDirection: "row",
		height: 51,
		backgroundColor: CustomTheme.bgBasic,
		borderTopLeftRadius: 14,
		borderTopRightRadius: 14,
		justifyContent: "space-between",
		marginTop: -15,
	},
	checkbox: {
		justifyContent: "center",
		marginLeft: 24,
		marginRight: 12,
	},
	textInputComment: {
		...fontBody14,
		flex: 1,
		width: "100%",
	},
	iconChatSend: {
		justifyContent: "center",
		marginLeft: 12,
		marginRight: 24,
		marginVertical: 12,
	},
});

export default PostStyles;
