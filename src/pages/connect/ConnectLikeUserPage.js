import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import TopBar from "@components/common/TopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikeUserOneToOne from "@pages/connect/LikeUserOneToOne";
import LikeUserGroup from "@pages/connect/LikeUserGroup";
import { CustomTheme } from "@styles/CustomTheme";

const ConnectLikeUserPage = () => {
	const Tab = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar="좋아요 목록" />
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
						component={LikeUserOneToOne}
						options={{ tabBarLabel: "1:1" }}
					/>
					<Tab.Screen
						name="그룹"
						component={LikeUserGroup}
						options={{ tabBarLabel: "그룹" }}
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

export default ConnectLikeUserPage;
