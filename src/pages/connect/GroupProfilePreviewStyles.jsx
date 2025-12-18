import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16, fontBody14, fontCaption } = CustomTheme;

const GroupProfilePreviewStyles = StyleSheet.create({
	container: {
		flex: 1,
		position: "relative",
		backgroundColor: CustomTheme.bgBasic,
	},
	containerText: {
		marginTop: 23,
	},
	textPreview: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 23,
		color: CustomTheme.primaryMedium,
	},
	infoTextContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		marginLeft: 26,
	},
	infoText: {
		...fontCaption,
		color: "#8C8D91",
		marginLeft: 3,
	},
	simpleProfileContainer: {
		alignItems: "center",
		marginTop: 13,
	},
	detailProfileContainer: {
		marginLeft: 17,
		marginRight: 17,
		matginTop: 25,
		marginBottom: 70,
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
	fontSub16: {
		...fontSub16,
		marginBottom: 11,
	},
	fontBody14: {
		...fontBody14,
		marginBottom: 16,
	},
	bottomTwoButtons: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
});

export default GroupProfilePreviewStyles;
