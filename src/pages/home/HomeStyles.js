import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead18, fontSub16, fontCaption } = CustomTheme;

const HomeStyles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#0029F4",
	},
	linearGradient: {
		flex: 1,
		alignItems: "center",
	},
	homebg: {
		position: "absolute",
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
		marginRight: 83,
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
	homecardContainer: {
		flexDirection: "row",
		alignItems: "center",
		zIndex: 10,
	},
	homecard: {
		position: "relative",
		top: 8,
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.71,
		shadowRadius: 6,
	},
	homeSchEv: {
		flexDirection: "row",
		marginTop: 28,
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.29,
		shadowRadius: 6,
	},
	textHomeSchool: {
		...fontSub16,
		position: "absolute",
		top: 12,
		left: 12,
	},
	homeSchIcon: {
		position: "absolute",
		top: 35,
		left: 40,
	},
	homeEvent: {
		position: "relative",
		marginLeft: 21,
	},
	textHomeEvent: {
		...fontSub16,
		position: "absolute",
		top: 12,
		left: 12,
	},
	iconHomeEvent: {
		position: "absolute",
		top: 48,
		left: 47,
	},

	backgroundHomecard: {
		position: "absolute",
		top: 10,
		bottom: 10,
		right: 30,
		transform: [{ scale: 0.9 }],
		opacity: 0.5,
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.71,
		shadowRadius: 6,
		zIndex: 0,
	},
});

export default HomeStyles;
