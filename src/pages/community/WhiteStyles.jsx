import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody18, fontBody14 } = CustomTheme;

const WhiteStyles = StyleSheet.create({
	container: {
		backgroundColor: CustomTheme.bgBasic,
	},
	containerWhite: {
		minHeight: 330,
		paddingHorizontal: 24,
		paddingBottom: 10,
		backgroundColor: CustomTheme.bgBasic,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,
	},
	containerNoticeboard: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginVertical: 12,
	},
	textNoticeboard: {
		...fontBody14,
	},
	line: {
		width: "100%",
		height: 1,
		backgroundColor: CustomTheme.bgList,
		marginVertical: 12,
	},
	textInputTitle: {
		...fontBody18,
		width: "100%",
		height: 30,
		marginTop: 12,
	},
	textInputContext: {
		...fontBody14,
		width: "100%",
		minHeight: 177,
	},
	containerIconCheckbox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 10,
		marginBottom: 6,
	},
	containerRule: {
		marginTop: -30,
		paddingTop: 47,
		paddingBottom: 50,
		paddingHorizontal: 22,
		minHeight: 400,
		backgroundColor: CustomTheme.primaryBg,
		zIndex: -1,
	},
	textRule: {
		fontSize: 11,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
		opacity: 0.4,
	},
});

export default WhiteStyles;
