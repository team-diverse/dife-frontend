import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@components/common/TopBar";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";

import FriendListPage from "@pages/chat/FriendListPage";
import RequestConnectListPage from "@pages/member/RequestConnectListPage";
import { TabView } from "react-native-tab-view";
import CustomTabBar from "@components/member/CustomTabBar";

const ConnectListPage = () => {
	const { t } = useTranslation();
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{
			key: "friend",
			title: t("friend"),
		},
		{
			key: "connectRequest",
			title: t("requestButtonText"),
		},
	]);

	useStatusBar({
		color: CustomTheme.bgBasic,
		barStyle: "dark-content",
	});

	return (
		<SafeAreaView style={styles.container}>
			<TopBar topBar={t("connectList")} color="#000" />
			<View style={styles.tabContainer}>
				<TabView
					navigationState={{ index, routes }}
					renderScene={({ route }) => {
						if (route.key === "friend")
							return <FriendListPage member={true} />;
						if (route.key === "connectRequest")
							return <RequestConnectListPage />;
					}}
					onIndexChange={setIndex}
					renderTabBar={(props) => <CustomTabBar {...props} />}
				/>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	tabContainer: { flex: 1 },
});

export default ConnectListPage;
