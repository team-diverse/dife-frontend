import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption, fontSub16, fontBody14 } = CustomTheme;

const GroupProfileStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryMedium,
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
	},
	detailProfileContainer: {
		marginLeft: 17,
		marginRight: 17,
		matginTop: 25,
		marginBottom: 50,
	},
	name: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 10,
	},
	containerHeadcount: {
		flexDirection: "row",
		marginBottom: 8,
	},
	containerTextHeadcount: {
		flexDirection: "row",
	},
	textHeadcount: {
		...fontCaption,
	},
	textMaxHeadcount: {
		...fontCaption,
		color: CustomTheme.borderColor,
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
		paddingBottom: 70,
	},
	textReport: {
		...fontBody14,
		color: CustomTheme.textDisable,
		textDecorationLine: "underline",
	},
	applyButton: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
});

export default GroupProfileStyles;
