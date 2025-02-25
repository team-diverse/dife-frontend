import { StyleSheet, Platform, StatusBar } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const MemberStyles = StyleSheet.create({
	container: {
		position: "relative",
		alignItems: "center",
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	difeLine: {
		position: "absolute",
		marginTop: 75,
		left: -20,
	},
	circleBackground: {
		position: "absolute",
		marginTop: 145,
	},
	topContainer: {
		flexDirection: "row",
	},
	difeLogo: {
		flex: 1,
		marginTop: 4,
	},
	iconSetting: {
		marginTop: 10,
		marginRight: 24,
	},
	containerProfile: {
		alignItems: "center",
		justifyContent: "center",
	},
	containerProfileUser: {
		position: "absolute",
	},
	iconProfileEdit: {
		position: "absolute",
		right: 0,
		bottom: 0,
	},
	textName: {
		fontSize: 16,
		lineHeight: 20,
		minHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryPressed,
		marginTop: 10,
	},
	containerIcon: {
		flexDirection: "row",
		marginTop: 18,
		marginBottom: 38,
	},
	icon: {
		alignItems: "center",
	},
	textIcon: {
		...fontCaption,
		color: CustomTheme.primaryPressed,
		marginTop: 5,
	},
	line: {
		width: 2,
		height: 34,
		backgroundColor: "rgba(199, 203, 215, 0.4)",
		marginHorizontal: 33,
	},
	tabContainer: {
		flex: 1,
	},
});

export default MemberStyles;
