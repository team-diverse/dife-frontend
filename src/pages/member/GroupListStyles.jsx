import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14, fontCaption } = CustomTheme;

const GroupListStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	flatlist: {
		width: "100%",
	},
	textFriend: {
		...fontBody14,
		marginTop: 16,
		marginBottom: 12,
		marginLeft: 24,
	},
	textNumber: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		marginLeft: 3,
	},
	line: {
		width: "100%",
		height: 2,
		backgroundColor: CustomTheme.bgList,
	},
});

export default GroupListStyles;
