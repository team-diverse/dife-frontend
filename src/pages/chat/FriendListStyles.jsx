import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import Constants from "expo-constants";

const { fontBody14, fontCaption } = CustomTheme;

const FriendListStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
		paddingTop: Platform.OS === "android" ? 0 : Constants.statusBarHeight,
	},
	flatlist: {
		width: "100%",
	},
	containerFriendNumber: {
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 24,
		marginTop: 8,
		marginBottom: 12,
	},
	textFriend: {
		...fontBody14,
		marginRight: 7,
	},
	textNumber: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		marginLeft: 3,
	},
});

export default FriendListStyles;
