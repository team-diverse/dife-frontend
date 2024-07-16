import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead20, fontHead18, fontSub16, fontCaption } = CustomTheme;

const ConnectStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundBlue: {
		position: "absolute",
		width: "100%",
		height: 100,
		backgroundColor: CustomTheme.primaryMedium,
	},
	textIconContainer: {
		flexDirection: "row",
		position: "absolute",
		alignItems: "center",
		marginTop: 55,
		zIndex: 2,
	},
	connectTitle: {
		flex: 1,
		...fontHead20,
		color: CustomTheme.primaryBg,
		marginLeft: 24,
	},
	addUserIcon: {
		flex: 1,
		marginRight: 24,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		position: "absolute",
		marginTop: 100,
		zIndex: 2,
	},
	searchFilter: {
		flex: 1,
		marginLeft: 20,
	},
	searchFilterContent: {
		backgroundColor: "#fff",
		padding: 16,
		height: 450,
	},
	searchIconContainer: {
		flexDirection: "row",
		alignItems: "center",
		flex: 1,
		justifyContent: "flex-end",
		marginLeft: 12,
		marginRight: 24,
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

	containerDife: {
		alignItems: "center",
	},
	connectDife: {
		position: "absolute",
		top: -3,
	},
	connectTop: {
		marginTop: -47,
		zIndex: 1,
	},
	safeAreaView: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	midContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 20,
		marginBottom: 12,
	},
	tabContainer: {
		flex: 1,
		flexDirection: "row",
		marginLeft: 30,
	},
	textTab: {
		...fontHead18,
		color: "#8C8D91",
		textDecorationLine: "underline",
		marginRight: 18,
	},
	textActiveTab: {
		...fontHead18,
		color: CustomTheme.primaryMedium,
		textDecorationLine: "underline",
		marginRight: 18,
	},
	resetContainer: {
		flexDirection: "row",
		marginRight: 30,
		alignItems: "center",
	},
	textReset: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		marginRight: 4,
	},
	flatlist: {
		flex: 1,
		width: "100%",
	},
	flatlistContent: {
		alignItems: "center",
	},
	cardContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#3C454E4A",
		shadowOffset: { width: 0, height: 3 },
		shadowOpacity: 0.71,
		shadowRadius: 6,
	},
	iconNewGroup: {
		position: "absolute",
		right: 12,
		bottom: 12,
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 2,
		zIndex: 2,
	},
});

export default ConnectStyles;
