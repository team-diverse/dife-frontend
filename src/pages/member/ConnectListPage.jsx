import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import TopBar from "@components/common/TopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { CustomTheme } from "@styles/CustomTheme";

import FriendListPage from "@pages/chat/FriendListPage";
import RequestConnectListPage from "@pages/member/RequestConnectListPage";

const ConnectListPage = () => {
	const Tab = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar="커넥트 목록" color="#000" />
			<View style={styles.tabContainer}>
				<Tab.Navigator
					initialRouteName="LikeUserOneToOne"
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
						component={FriendListPage}
						initialParams={{ member: true }}
						options={{ tabBarLabel: "친구" }}
					/>
					<Tab.Screen
						name="그룹"
						component={RequestConnectListPage}
						options={{ tabBarLabel: "커넥트 요청" }}
					/>
				</Tab.Navigator>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	tabContainer: {
		flex: 1,
	},
});

export default ConnectListPage;
