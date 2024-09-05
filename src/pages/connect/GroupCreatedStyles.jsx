import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14, fontCaption } = CustomTheme;

const GroupCreatedStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.primaryBg,
	},
	textTitle: {
		...fontSub14,
		marginHorizontal: 24,
		marginTop: 26,
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
	containerTextInput: {
		position: "relative",
		marginHorizontal: 24,
	},
	textInputName: {
		...fontSub14,
		width: "100%",
		height: 48,
		paddingLeft: 12,
		marginTop: 12,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#B0D0FF",
	},
	textInputBio: {
		...fontSub14,
		width: "100%",
		height: 82,
		paddingTop: 11,
		paddingLeft: 12,
		marginTop: 12,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 14,
	},
	textCount: {
		...fontCaption,
		position: "absolute",
		bottom: 12,
		right: 12,
		color: "#666",
	},
	bottomTwoButtons: {
		position: "absolute",
		width: "100%",
		bottom: 0,
	},
});

export default GroupCreatedStyles;
