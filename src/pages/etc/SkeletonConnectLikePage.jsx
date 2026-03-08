import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles";
import ConnectStyles from "@pages/connect/ConnectStyles";

import TopBar from "@components/common/TopBar";

const SkeletonConnectLikePage = () => {
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
		<SafeAreaView style={ConnectLikeUserStyles.container}>
			<TopBar topBar="좋아요 목록" />
			<View style={[ConnectStyles.cardContainer, { marginTop: 14 }]}>
				<View style={[ConnectStyles.flatlist, styles.listContent]}>
					{Array.from({ length: 4 }).map((_, index) => (
						<ConnectItem key={index} />
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	listContent: {
		paddingHorizontal: 24,
		paddingBottom: 24,
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
	headerRow: {
		position: "absolute",
		top: 14,
		left: 104,
		right: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default SkeletonConnectLikePage;
