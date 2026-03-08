import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CustomTheme } from "@styles/CustomTheme";
import HomeStyles from "@pages/home/HomeStyles.js";

import LogoBr from "@components/Logo/LogoBr";
import Notification32 from "@components/Icon32/Notification32";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";

const SKELETON_BLOCK_COLOR = "#E4E6EF";

const SkeletonProfileCard = ({ faded = false }) => (
	<View style={[styles.homeCard, faded && styles.homeCardFaded]}>
		<View style={styles.homeCardProfile} />
		<View style={styles.homeCardGray} />
		<View style={styles.homeCardBodyLine} />
		<View style={styles.homeCardBodyLine} />
	</View>
);

const SkeletonHomePage = () => {
	const { width: screenWidth, height: screenHeight } =
		Dimensions.get("window");
	const cardWidth = screenWidth - 64;
	const sidePeekWidth = 16;
	const cardStep = cardWidth + sidePeekWidth;
	const cardLeftInset = (screenWidth - cardWidth) / 2;
	const isSmallScreen = screenHeight < 700;

	const renderHome = () => (
		<LinearGradient
			style={HomeStyles.linearGradient}
			colors={["#0029F4", "#6199C1", "#6199C1"]}
		>
			<View style={HomeStyles.containerCircle}>
				<ConnectProfileBackground />
			</View>

			<View style={HomeStyles.topContainer}>
				<View style={HomeStyles.logo}>
					<LogoBr />
				</View>
				<View style={HomeStyles.notify}>
					<Notification32 count={0} />
				</View>
			</View>

			<View style={HomeStyles.carouselSection}>
				<View
					style={[
						HomeStyles.textConnectWithContainer,
						{ marginLeft: cardLeftInset },
					]}
				>
					<View style={styles.sectionTitleMain} />
					<View style={styles.sectionTitleSub} />
				</View>

				<View style={HomeStyles.carouselViewport}>
					<View style={HomeStyles.carouselTrack}>
						<View
							pointerEvents="none"
							style={[
								HomeStyles.carouselCard,
								HomeStyles.carouselSideCard,
								{
									width: cardWidth,
									left: 32 - cardStep,
								},
							]}
						>
							<SkeletonProfileCard faded={true} />
						</View>

						<View
							style={[
								HomeStyles.carouselCard,
								HomeStyles.carouselCenterCard,
								{
									width: cardWidth,
									left: 32,
								},
							]}
						>
							<SkeletonProfileCard />
						</View>

						<View
							pointerEvents="none"
							style={[
								HomeStyles.carouselCard,
								HomeStyles.carouselSideCard,
								{
									width: cardWidth,
									left: 32 + cardStep,
								},
							]}
						>
							<SkeletonProfileCard faded={true} />
						</View>
					</View>
				</View>
			</View>

			<View style={HomeStyles.containerWhite}>
				<View
					style={[
						HomeStyles.sectionBoard,
						{ width: cardWidth, alignSelf: "center" },
					]}
				>
					<View style={HomeStyles.sectionBoardTop}>
						<View style={styles.boardTitleMain} />
						<View style={styles.boardMore} />
					</View>

					{Array.from({ length: 2 }).map((_, index) => (
						<View
							style={styles.cardPopularPost}
							key={index.toString()}
						>
							<View style={styles.popularTitle} />
						</View>
					))}
				</View>
			</View>
		</LinearGradient>
	);

	return (
		<SafeAreaView style={HomeStyles.container}>
			{isSmallScreen ? (
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					{renderHome()}
				</ScrollView>
			) : (
				renderHome()
			)}
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	homeCard: {
		width: "100%",
		height: 360,
		backgroundColor: "#F7F8FD",
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingTop: 20,
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
	homeCardFaded: {
		opacity: 0.8,
	},
	homeCardProfile: {
		width: 116,
		height: 136,
		backgroundColor: SKELETON_BLOCK_COLOR,
		borderRadius: 16,
	},
	homeCardGray: {
		width: "80%",
		height: 16,
		marginTop: 16,
		marginBottom: 19,
		backgroundColor: SKELETON_BLOCK_COLOR,
		borderRadius: 16,
	},
	homeCardBodyLine: {
		width: "60%",
		height: 10,
		backgroundColor: SKELETON_BLOCK_COLOR,
		borderRadius: 8,
		marginBottom: 7,
	},
	homeCardActions: {
		position: "absolute",
		left: 20,
		right: 20,
		bottom: 18,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	sectionTitleMain: {
		width: 54,
		height: 18,
		borderRadius: 9,
		backgroundColor: SKELETON_BLOCK_COLOR,
	},
	sectionTitleSub: {
		width: 132,
		height: 14,
		borderRadius: 7,
		backgroundColor: SKELETON_BLOCK_COLOR,
		marginTop: 8,
	},
	boardTitleMain: {
		width: 109,
		height: 18,
		borderRadius: 9,
		backgroundColor: SKELETON_BLOCK_COLOR,
		marginRight: 6,
	},
	boardMore: {
		width: 30,
		height: 12,
		borderRadius: 6,
		backgroundColor: SKELETON_BLOCK_COLOR,
		marginRight: 6,
	},
	cardPopularPost: {
		backgroundColor: "#F7F8FD",
		height: 62,
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
	popularTitle: {
		width: "62%",
		height: 14,
		borderRadius: 7,
		backgroundColor: SKELETON_BLOCK_COLOR,
	},
	navigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 36,
		paddingTop: 13,
		paddingBottom: 39,
		width: "100%",
		height: 90,
		backgroundColor: CustomTheme.bgBasic,
		marginBottom: -10,
		borderTopWidth: 1,
		borderTopColor: CustomTheme.bgList,
		zIndex: 10,
	},
});

export default SkeletonHomePage;
