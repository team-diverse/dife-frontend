import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontBody14, fontSub16 } = CustomTheme;

const InquiryStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryBg,
	},
	containerContent: {
		flex: 1,
		alignItems: "center",
		marginTop: 74,
		marginHorizontal: 24,
	},
	textTitle: {
		...fontHead24,
		marginTop: 17,
	},
	textContent: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginTop: 17,
	},
	containerEmail: {
		position: "absolute",
		bottom: 45,
		flexDirection: "row",
		width: "100%",
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 27,
	},
	textEmail: {
		...fontSub16,
		color: CustomTheme.bgBasic,
		paddingHorizontal: 59,
		paddingVertical: 10,
	},
	disabled: {
		backgroundColor: CustomTheme.borderColor,
	},
});

export default InquiryStyles;
