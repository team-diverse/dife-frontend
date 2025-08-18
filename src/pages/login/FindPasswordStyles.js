import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontSub16, fontSub14, fontCaption } = CustomTheme;

const FindPasswordStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
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
	textInputId: {
		height: 44,
		padding: 12,
		borderWidth: 1,
		borderColor: CustomTheme.borderColor,
		borderRadius: 6,
		marginTop: 8,
		marginHorizontal: 25,
		justifyContent: "center",
	},
<<<<<<< HEAD

	containerNotMember: {
=======
	containerRetransmit: {
		width: 59,
		height: 28,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 4,
		position: "absolute",
		top: 15.5,
		right: 12,
	},
	textResend: {
		...fontSub14,
		color: "#FBFBFB",
	},
	containerError: {
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
		flexDirection: "row",
		marginTop: 8,
		marginHorizontal: 25,
	},
	textNotMember: {
		...fontCaption,
		color: CustomTheme.warningRed,
		marginLeft: 3,
	},
	applyButton: {
		position: "absolute",
		bottom: 126,
	},
});

export default FindPasswordStyles;
