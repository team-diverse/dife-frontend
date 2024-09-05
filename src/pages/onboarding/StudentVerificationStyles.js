import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontSub16 } = CustomTheme;

const StudentVerificationStyles = StyleSheet.create({
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
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		justifyContent: "center",
		overflow: "hidden",
	},
	containerModalContent: {
		alignItems: "center",
		marginTop: 42,
	},
	imageModal: {
		width: 176,
		height: 162,
	},
	textModal: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		marginTop: 20,
	},
	buttonModalCheck: {
		marginTop: 31,
		marginBottom: 25,
	},
	containerUploadOnkookmin: {
		position: "relative",
		alignItems: "center",
		marginTop: 82,
	},
	imageOnkookmin: {
		position: "absolute",
		width: 323,
		height: 255,
		top: 4,
		borderRadius: 20,
		resizeMode: "cover",
	},
	iconUploadOnkookmin: {
		position: "absolute",
		top: 61,
		zIndex: 2,
	},
	textUploadOnkookmin: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		position: "absolute",
		top: 175,
		zIndex: 2,
	},
	buttonCheck: {
		position: "absolute",
		bottom: 104,
	},
});

export default StudentVerificationStyles;
