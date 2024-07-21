import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontBody18, fontSub16, fontSub14, fontCaption } =
	CustomTheme;

const ProfileStyles = StyleSheet.create({
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
	containerImage: {
		flexDirection: "row",
		marginTop: 12,
		marginLeft: 23,
	},
	imageProfile: {
		width: 94,
		height: 110,
		borderRadius: 20,
		resizeMode: "cover",
		marginRight: 16,
	},
	imageBorder: {
		position: "absolute",
		top: -2,
		left: -2,
		right: 0,
		bottom: 0,
		zIndex: 10,
	},
	containerRadioButton: {
		flexDirection: "row",
		marginLeft: 23,
	},
	textRadioButton: {
		...fontSub14,
		marginRight: 28,
	},
	textNationIntroduction: {
		...fontSub16,
		color: CustomTheme.textPrimary,
		marginTop: 28,
		marginLeft: 23,
	},
	containerTextInput: {
		position: "relative",
		flexDirection: "row",
		justifyContent: "center",
		marginLeft: 23,
		marginRight: 23,
	},
	textInputIntroduction: {
		...fontSub14,
		width: "100%",
		height: 82,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 14,
		paddingTop: 12,
		padding: 12,
		marginTop: 12,
	},
	textIntroductionCount: {
		...fontCaption,
		position: "absolute",
		right: 20,
		bottom: 10,
		fontSize: 12,
		color: "#666",
	},
});

export default ProfileStyles;
