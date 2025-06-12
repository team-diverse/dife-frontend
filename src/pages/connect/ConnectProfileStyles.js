import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontSub16, fontBody14 } = CustomTheme;

const ConnectProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryMedium,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	scrollView: {
		width: "100%",
	},
	background: {
		position: "absolute",
		marginTop: 72,
	},
	simpleProfileContainer: {
		alignItems: "center",
		marginTop: 9,
		marginBottom: 30,
	},
	detailProfileContainer: {
		marginLeft: 17,
		marginRight: 17,
		matginTop: 25,
		marginBottom: 50,
	},
	username: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 10,
	},
	countryAgeMajor: {
		...fontBody14,
		marginTop: 11,
		marginBottom: 9,
	},
	fontSub16: {
		...fontSub16,
		marginBottom: 11,
	},
	fontBody14: {
		...fontBody14,
		marginBottom: 16,
	},
	margin: {
		marginBottom: 70,
	},
	bottomTwoButtons: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
});

export default ConnectProfileStyles;
