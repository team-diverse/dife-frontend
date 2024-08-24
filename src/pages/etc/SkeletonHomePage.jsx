import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import HomeStyles from "@pages/home/HomeStyles.js";
import { CustomTheme } from "@styles/CustomTheme";

import HomeBg from "@assets/images/svg_js/HomeBg";
import LogoBr from "@components/Logo/LogoBr";
import Notification32 from "@components/Icon32/Notification32";
import HomeArrow from "@components/home/HomeArrow.js";
import ChatDf24 from "@components/Icon24/ChatDf24";
import ConnectDf24 from "@components/Icon24/ConnectDf24";
import HomeAc32 from "@components/Icon32/HomeAc32";
import CommuDf24 from "@components/Icon24/CommuDf24";
import MyDf24 from "@components/Icon24/MyDf24";

const SkeletonHomePage = () => {
	return (
		<>
			<SafeAreaView style={HomeStyles.container}>
				<LinearGradient
					style={HomeStyles.linearGradient}
					colors={["#0029F4", "#6199C1", "#6199C1"]}
				>
					<HomeBg
						style={HomeStyles.homebg}
						preserveAspectRatio="none"
					/>

					<View style={HomeStyles.topContainer}>
						<View style={HomeStyles.logo}>
							<LogoBr />
						</View>
						<View style={HomeStyles.notify}>
							<Notification32 count={3} />
						</View>
					</View>

					<View style={HomeStyles.textConnectWithContainer}>
						<Text style={HomeStyles.textConnect}>커넥트</Text>
						<Text style={HomeStyles.textWithnewfriend}>
							새로운 친구와 함께해요!
						</Text>
					</View>

					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<View>
							<HomeArrow
								style={{ transform: [{ scaleX: -1 }] }}
							/>
						</View>

						<View style={styles.homeCard}>
							<View style={styles.homeCardProfile} />
							<View style={styles.homeCardGray} />
							<View style={styles.homeCardGraySmall} />
							<View
								style={[
									styles.homeCardGraySmall,
									{ marginTop: 224 },
								]}
							/>
						</View>

						<View>
							<HomeArrow />
						</View>
					</View>

					<View style={styles.containerSmallCards}>
						<View>
							<View style={styles.smallCard} />
							<View style={styles.smallCardGray} />
						</View>
						<View>
							<View style={styles.smallCard} />
							<View style={styles.smallCardGray} />
						</View>
					</View>
				</LinearGradient>
			</SafeAreaView>
			<View style={styles.navigation}>
				<ChatDf24 />
				<ConnectDf24 />
				<HomeAc32 />
				<CommuDf24 />
				<MyDf24 />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	homeCard: {
		width: 260,
		height: 360,
		backgroundColor: "#F7F8FD",
		borderRadius: 20,
		marginTop: 8,
	},
	homeCardProfile: {
		position: "absolute",
		width: 116,
		height: 136,
		backgroundColor: "#E4E6EF",
		borderRadius: 16,
		marginTop: 20,
		marginLeft: 20,
	},
	homeCardGray: {
		position: "absolute",
		width: 206,
		height: 16,
		marginTop: 180,
		marginLeft: 20,
		backgroundColor: "#E4E6EF",
		borderRadius: 16,
	},
	homeCardGraySmall: {
		position: "absolute",
		width: 124,
		height: 10,
		marginTop: 207,
		marginLeft: 20,
		backgroundColor: "#E4E6EF",
		borderRadius: 16,
	},
	containerSmallCards: {
		flexDirection: "row",
		marginTop: 28,
		shadowRadius: 6,
	},
	smallCard: {
		width: 120,
		height: 148,
		backgroundColor: "#F7F8FD",
		borderRadius: 20,
		marginHorizontal: 10,
	},
	smallCardGray: {
		position: "absolute",
		top: 12,
		left: 24,
		width: 41,
		height: 10,
		backgroundColor: "#E4E6EF",
		borderRadius: 16,
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
