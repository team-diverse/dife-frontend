import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import LikeUserOneToOne from "@pages/connect/LikeUserOneToOne";
import LikeUserGroup from "@pages/connect/LikeUserGroup";

const ConnectLikeUserPage = () => {
	const { t } = useTranslation();
	const Tab = createMaterialTopTabNavigator();

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar={t("likeListTitle")} />
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
						options={{ tabBarLabel: t("oneToOne") }}
					/>
					<Tab.Screen
						name="그룹"
						component={LikeUserGroup}
						options={{ tabBarLabel: t("group") }}
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
