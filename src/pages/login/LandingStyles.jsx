import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16 } = CustomTheme;

const LandingStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	center: {
		width: "100%",
		alignItems: "center",
		paddingHorizontal: 24,
	},
	containerTextIcon: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 24,
		marginTop: 58,
	},
	textTitle: {
		fontSize: 32,
		lineHeight: 37,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	textContent: {
		...fontSub16,
	},
	gradient: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "50%",
	},
	apply: {
		position: "absolute",
		bottom: 15,
		flexDirection: "row",
		width: "100%",
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#012CFF",
		borderRadius: 27,
	},
	disabled: {
		backgroundColor: CustomTheme.borderColor,
	},
	textButton: {
		...fontSub16,
		color: CustomTheme.bgBasic,
	},
});

export default LandingStyles;
