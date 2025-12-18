import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14 } = CustomTheme;

const TremsStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryBg,
	},
	scrollView: {
		paddingHorizontal: 25,
		paddingVertical: 50,
	},
	textTremsTitle: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
	textTremsBold: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
	textTrems: {
		...fontBody14,
		color: CustomTheme.primaryMedium,
	},
});

export default TremsStyles;
