import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead20 } = CustomTheme;

const PreparingStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		alignItems: "center",
		justifyContent: "center",
	},
	containerText: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 10,
	},
	textTitle: {
		fontSize: 36,
		lineHeight: 40,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
		marginBottom: 60,
	},
	textSubTitle: {
		...fontHead20,
		color: CustomTheme.primaryMedium,
		marginHorizontal: 20,
		textAlign: "center",
	},
});

export default PreparingStyles;
