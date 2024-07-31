import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontBody18 } = CustomTheme;

const ProfileMbtiStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	iconArrow: {
		position: "absolute",
		marginTop: 5,
		marginLeft: 14,
	},
	iconProgress: {
		alignItems: "center",
		marginTop: 5,
	},
	textTitle: {
		...fontHead24,
		marginTop: 41,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontBody18,
		marginTop: 12,
		marginLeft: 24,
	},
	containerMbti: {
		alignItems: "center",
		marginTop: 47,
	},
	flexStartMbti: {
		alignItems: "flex-start",
	},
	rowMbti: {
		flexDirection: "row",
	},
	buttonCheck: {
		marginTop: 134,
		marginHorizontal: 10,
	},
});

export default ProfileMbtiStyles;
