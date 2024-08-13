import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody18, fontBody14, fontNaviBold } = CustomTheme;

const WriteStyles = StyleSheet.create({
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
	containerImage: {
		marginHorizontal: -10,
	},
	iconDelete: {
		width: 20,
		height: 20,
		position: "absolute",
		zIndex: 10,
		top: 6,
		right: 7,
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 6,
		marginHorizontal: 6,
	},
	containerIconCheckbox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginTop: 15,
		marginBottom: 6,
	},
	containerImageNumber: {
		position: "absolute",
		top: -2,
		right: -3,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	iconCircleNumber: {
		position: "absolute",
	},
	textImageNumber: {
		...fontNaviBold,
		color: CustomTheme.primaryMedium,
		zIndex: 11,
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

export default WriteStyles;
