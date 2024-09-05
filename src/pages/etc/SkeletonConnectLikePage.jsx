import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";

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

const Connect = () => (
	<SafeAreaView style={styles.container}>
		<View style={styles.containerConnectCard}>
			{Array.from({ length: 4 }).map((_, index) => (
				<ConnectItem key={index.toString()} />
			))}
		</View>
	</SafeAreaView>
);

const SkeletonConnectLikePage = () => {
	const Tab = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar="좋아요 목록" />
			<Tab.Navigator
				// initialRouteName="LikeUserOneToOne"
				screenOptions={{
					tabBarActiveTintColor: CustomTheme.primaryMedium,
					tabBarInactiveTintColor: CustomTheme.bgList,
					tabBarLabelStyle: {
						fontSize: 18,
						lineHeight: 26,
						fontFamily: "NotoSansCJKkr-Bold",
					},
				}}
			>
				<Tab.Screen
					name="1:1"
					component={Connect}
					options={{ tabBarLabel: "1:1" }}
				/>
				<Tab.Screen
					name="그룹"
					component={Connect}
					options={{ tabBarLabel: "그룹" }}
				/>
			</Tab.Navigator>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: CustomTheme.bgBasic,
	},
	containerConnectCard: {
		paddingHorizontal: 24,
		marginTop: 24,
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
});

export default SkeletonConnectLikePage;
