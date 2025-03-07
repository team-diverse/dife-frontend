import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontHead18, fontSub16, fontCaption } = CustomTheme;

const HomeStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0029F4",
		paddingTop: Constants.statusBarHeight + 10,
	},
	linearGradient: {
		flex: 1,
	},
	homebg: {
		position: "absolute",
		marginTop: Platform.OS === "android" ? 10 : 0,
	},
	topContainer: {
		flexDirection: "row",
	},
	logo: {
		flex: 1,
		marginTop: 4,
		marginLeft: -8,
	},
	notify: {
		marginTop: 10,
		marginRight: 20,
	},
	textConnectWithContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 25,
		marginLeft: 9,
	},
	textConnect: {
		...fontHead18,
		color: CustomTheme.bgList,
		marginRight: 4,
	},
	textWithnewfriend: {
		...fontCaption,
		color: CustomTheme.bgList,
	},
	homecard: {
		marginTop: 8,
	},
	containerShoolInfoEvents: {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 32,
	},
	containerShoolInfoEventsMargin: {
		marginHorizontal: 10,
	},
	textSchoolInfoEvents: {
		...fontSub16,
		position: "absolute",
		top: 12,
		left: 12,
	},
	iconSchoolInfo: {
		position: "absolute",
		top: 35,
		left: 40,
	},
	iconEvents: {
		position: "absolute",
		top: 48,
		left: 47,
	},
	backgroundHomecard: {
		position: "absolute",
		top: 60,
		bottom: 10,
		right: Platform.OS === "android" ? 17 : 30,
		transform: [{ scale: 0.9 }],
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.71,
		shadowRadius: 3,
		zIndex: 1,
	},
	containerWhite: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: 200,
		backgroundColor: CustomTheme.bgBasic,
		zIndex: -1,
	},
});

export default HomeStyles;
