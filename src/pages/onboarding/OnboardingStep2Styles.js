import { StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontBody18, fontSub16, fontSub14, fontCaption } =
	CustomTheme;

const OnboardingStep2Styles = StyleSheet.create({
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
		marginLeft: 24,
		marginTop: 4,
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
	containerNation: {
		marginHorizontal: 23,
	},
	containerBirthDate: {
		marginHorizontal: 23,
	},
	textNationIntroduction: {
		...fontSub16,
		color: CustomTheme.textPrimary,
		marginTop: 28,
		marginLeft: 23,
	},
	textInputBirthDate: {
		...fontSub14,
		height: 43,
		marginTop: 12,
		justifyContent: "center",
		paddingHorizontal: 13,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#B0D0FF",
	},
	containerNationInput: {
		...fontSub14,
		height: 43,
		marginTop: 12,
		justifyContent: "center",
		paddingHorizontal: 13,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: "#B0D0FF",
	},
	textNation: {
		...fontSub14,
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
		padding: 12,
		marginTop: 12,
		...Platform.select({
			android: {
				textAlignVertical: "top",
			},
		}),
	},
	textIntroductionCount: {
		...fontCaption,
		position: "absolute",
		right: 20,
		bottom: 10,
		fontSize: 12,
		color: "#666",
	},
	buttonCheck: {
		marginTop: 28,
	},
	modalBackdrop: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.3)",
	},
	modalContainer: {
		width: 286,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingTop: 44.5,
		paddingBottom: 20,
		alignItems: "center",
	},
	modalTitle: {
		...fontSub16,
		color: CustomTheme.textPrimary,
	},
	modalDescription: {
		...fontSub14,
		color: CustomTheme.primaryMedium,
		textAlign: "center",
		marginTop: 16,
		marginBottom: 36.5,
	},
	modalButtonRow: {
		flexDirection: "row",
		width: "100%",
	},
	modalButton: {
		flex: 1,
		padding: 10,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	modalButtonSpacing: {
		marginLeft: 16,
	},
	modalPrevButtonText: {
		...fontSub14,
		color: CustomTheme.textPrimary,
	},
	modalConfirmButtonText: {
		...fontSub14,
		color: CustomTheme.bgBasic,
	},
});

export default OnboardingStep2Styles;
