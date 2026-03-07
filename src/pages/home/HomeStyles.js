import { Platform, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead18, fontCaption, fontNavi } = CustomTheme;

const HomeStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0029F4",
	},
	linearGradient: {
		width: "100%",
		alignItems: "center",
		paddingBottom: 8,
	},
	containerCircle: {
		alignItems: "center",
		position: "absolute",
		marginTop: 165,
	},
	homebg: {
		position: "absolute",
		marginTop: 13,
	},
	topContainer: {
		flexDirection: "row",
	},
	logo: {
		flex: 1,
		marginTop: 4,
		marginLeft: -8,
	},
	notify: {
		marginTop: 10,
		marginRight: 20,
	},
	textConnectWithContainer: {
		marginTop: 25,
		marginLeft: 9,
	},
	textConnect: {
		...fontHead18,
		color: CustomTheme.bgList,
	},
	textWithnewfriend: {
		...fontCaption,
		color: CustomTheme.bgList,
	},
	carouselSection: {
		width: "100%",
	},
	carouselGesture: {
		width: "100%",
		zIndex: 10,
	},
	carouselViewport: {
		width: "100%",
		height: 360,
		marginTop: 8,
	},
	carouselTrack: {
		width: "100%",
		height: "100%",
	},
	carouselCard: {
		position: "absolute",
		top: 0,
		height: 360,
	},
	carouselCenterCard: {
		zIndex: 2,
		backfaceVisibility: "hidden",
		renderToHardwareTextureAndroid: true,
	},
	carouselSideCard: {
		zIndex: 1,
	},
	containerWhite: {
		width: "100%",
		backgroundColor: CustomTheme.bgBasic,
		marginTop: 26,
		paddingBottom: 100,
	},
	sectionBoard: {
		width: "100%",
	},
	sectionBoardTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	sectionBoardTitleRow: {
		flexDirection: "row",
		alignItems: "baseline",
	},
	textBoardTitleMain: {
		...fontHead18,
		color: CustomTheme.primaryMedium,
		marginRight: 4,
	},
	textBoardTitleSub: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
	},
	buttonMore: {
		flexDirection: "row",
		alignItems: "center",
	},
	textMore: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Medium",
		color: CustomTheme.primaryMedium,
	},
	cardPopularPost: {
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 12,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginBottom: 14,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	containerPopularPost: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textPopularTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.textPrimary,
	},
	countainerPopularMeta: {
		flexDirection: "row",
		alignItems: "center",
	},
	textPopularMeta: {
		...fontNavi,
		color: CustomTheme.textSecondary,
		marginLeft: 1,
	},
	textPopularContent: {
		...fontCaption,
		color: "#212228",
		marginTop: 8,
	},
	textPopularEmpty: {
		...fontCaption,
		color: "#8C8D91",
	},
});

export default HomeStyles;
