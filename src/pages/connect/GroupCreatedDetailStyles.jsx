import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16, fontBody16, fontSub14, fontCaption } = CustomTheme;

const GroupCreatedDetailStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	textGroupChatSetting: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		marginLeft: 23,
	},
	containerItem: {
		marginTop: 24,
	},
	textTitle: {
		...fontBody16,
		marginLeft: 23,
	},
	infoTextContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 8,
		marginBottom: 6,
		marginLeft: 26,
	},
	infoText: {
		...fontCaption,
		color: "#8C8D91",
		marginLeft: 3,
	},
	containerRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	containerSlider: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 24,
		marginBottom: 18,
	},
	textHeadcount: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		marginRight: 24,
	},
	containerRadioButtonGroup: {
		marginHorizontal: 24,
		marginBottom: 107,
	},
	textInputPassword: {
		...fontSub14,
		height: 48,
		paddingLeft: 13,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#B0D0FF",
	},
	bottomTwoButtons: {
		position: "absolute",
		width: "100%",
		bottom: 0,
		zIndex: 2,
	},
});

export default GroupCreatedDetailStyles;
