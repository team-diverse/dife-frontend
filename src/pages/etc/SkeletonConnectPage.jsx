import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import ConnectStyles from "@pages/connect/ConnectStyles";
import { CustomTheme } from "@styles/CustomTheme";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectLikeUser from "@components/connect/ConnectLikeUser";
import FilterIcon from "@components/connect/FilterIcon";
import ConnectDife from "@components/connect/ConnectDife";
import ConnectReset from "@components/connect/ConnectReset";
import ChatDf24 from "@components/Icon24/ChatDf24";
import ConnectAc32 from "@components/Icon32/ConnectAc32";
import HomeDf24 from "@components/Icon24/HomeDf24";
import CommuDf24 from "@components/Icon24/CommuDf24";
import MyDf24 from "@components/Icon24/MyDf24";

const { fontSub16 } = CustomTheme;

const SkeletonConnectPage = () => {
	const ConnectItem = () => (
		<View style={styles.connectCard}>
			<View style={styles.profile} />
			<View style={styles.connectCardGray} />
			<View style={styles.connectCardGray2} />
			<View style={styles.connectCardGray3} />
			<View style={[styles.connectCardGray3, { marginTop: 119 }]} />
			<View style={styles.connectCardGray4} />
		</View>
	);

	return (
		<>
			<View style={ConnectStyles.container}>
				<View style={ConnectStyles.backgroundBlue} />
				<SafeAreaView style={ConnectStyles.safeAreaView}>
					<View style={ConnectStyles.connectTop}>
						<ConnectTop />
					</View>
					<View style={ConnectStyles.textIconContainer}>
						<Text style={ConnectStyles.connectTitle}>Connect</Text>
						<ConnectLikeUser style={ConnectStyles.addUserIcon} />
					</View>
					<View style={ConnectStyles.searchContainer}>
						<View>
							<FilterIcon style={ConnectStyles.searchFilter} />
						</View>

						<View style={ConnectStyles.searchIconContainer}>
							<View style={styles.containerSearch} />

							<ConnectSearchIcon
								style={ConnectStyles.searchIcon}
							/>
						</View>
					</View>

					<View style={ConnectStyles.containerDife}>
						<View style={ConnectStyles.connectDife}>
							<ConnectDife />
						</View>
					</View>
					<View style={ConnectStyles.midContainer}>
						<View style={ConnectStyles.tabContainer}>
							<Text style={ConnectStyles.textActiveTab}>
								1 : 1
							</Text>
							<Text style={ConnectStyles.textTab}>그룹</Text>
						</View>
						<View style={ConnectStyles.resetContainer}>
							<Text style={ConnectStyles.textReset}>Reset</Text>
							<ConnectReset />
						</View>
					</View>

					<View style={styles.containerConnectCard}>
						{Array.from({ length: 3 }).map((_, index) => (
							<ConnectItem key={index.toString()} />
						))}
					</View>
				</SafeAreaView>
			</View>
			<View style={styles.navigation}>
				<ChatDf24 />
				<ConnectAc32 />
				<HomeDf24 />
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
	containerSearch: {
		...fontSub16,
		position: "relative",
		width: "100%",
		justifyContent: "center",
		height: 48,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 24,
		paddingLeft: 20,
	},
	containerConnectCard: {
		paddingHorizontal: 24,
	},
	connectCard: {
		flexDirection: "row",
		width: "100%",
		height: 173,
		backgroundColor: "#F7F8FD",
		borderRadius: 20,
		marginVertical: 10,
		overflow: "hidden",
	},
	profile: {
		width: 92,
		height: 173,
		backgroundColor: "#E4E6EF",
		overflow: "hidden",
	},
	connectCardGray: {
		position: "absolute",
		width: 55,
		height: 14,
		marginTop: 17,
		marginLeft: 104,
		backgroundColor: "#E4E6EF",
		borderRadius: 10,
	},
	connectCardGray2: {
		position: "absolute",
		width: 140,
		height: 18,
		marginTop: 58,
		marginLeft: 104,
		backgroundColor: "#E4E6EF",
		borderRadius: 10,
	},
	connectCardGray3: {
		position: "absolute",
		width: 199,
		height: 9,
		marginTop: 103,
		marginLeft: 104,
		backgroundColor: "#E4E6EF",
		borderRadius: 10,
	},
	connectCardGray4: {
		position: "absolute",
		width: 80,
		height: 9,
		marginTop: 141,
		marginLeft: 104,
		backgroundColor: "#E4E6EF",
		borderRadius: 10,
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

export default SkeletonConnectPage;
