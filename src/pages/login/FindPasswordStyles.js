import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontHead24, fontSub16, fontSub14, fontCaption } = CustomTheme;

const FindPasswordStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	textTitle: {
		...fontHead24,
		marginTop: 28,
		marginLeft: 24,
	},
	textSubTitle: {
		...fontSub16,
		color: CustomTheme.textSecondary,
		marginTop: 12,
		marginLeft: 22,
	},
	textId: {
		...fontSub14,
		color: CustomTheme.textPrimary,
		marginTop: 120,
		marginLeft: 24,
	},
	containerTextInputId: {
		marginHorizontal: 24,
	},
	textInputId: {
		width: "100%",
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		marginTop: 8,
		alignItems: "center",
	},
	containerNotMember: {
		flexDirection: "row",
		marginTop: 8,
		marginLeft: 25,
	},
	textNotMember: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	applyButton: {
		...Platform.select({
			ios: {
				position: "absolute",
				bottom: 126,
			},
			android: {
				marginTop: 32,
			},
		}),
	},
});

export default FindPasswordStyles;
