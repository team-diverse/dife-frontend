import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const EnlargeImageStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	imageBig: {
		resizeMode: "contain",
		marginTop: 15,
		marginBottom: 30,
	},
	containerSmallImage: {
		justifyContent: "center",
		alignItems: "center",
	},
	imageSmall: {
		width: 36,
		height: 48,
		borderRadius: 4,
		marginHorizontal: 2,
	},
	imageSelectedSmall: {
		borderRadius: 4,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
	},
	textImageNumber: {
		fontSize: 10,
		lineHeight: 12,
		fontFamily: "NotoSansCJKkr-Regular",
		color: CustomTheme.primaryMedium,
		marginTop: 8,
	},
	containerDownload: {
		flexDirection: "row",
		width: 205,
		height: 40,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: CustomTheme.primaryBg,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 15,
		marginBottom: 18,
	},
	textDownload: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
		marginLeft: 7,
	},
});

export default EnlargeImageStyles;
