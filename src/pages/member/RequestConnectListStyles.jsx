import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14 } = CustomTheme;

const RequestConnectListStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textRequest: {
		...fontBody14,
		color: CustomTheme.textPrimary,
		marginLeft: 24,
		marginTop: 15,
		marginBottom: 6,
	},
	textRequestNumber: {
		...fontBody14,
		color: CustomTheme.primaryMedium,
		marginLeft: 24,
		marginTop: 15,
		marginBottom: 6,
	},
	line: {
		width: "100%",
		height: 2,
		backgroundColor: CustomTheme.bgList,
	},
});

export default RequestConnectListStyles;
