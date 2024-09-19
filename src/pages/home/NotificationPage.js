import React, { useState, useEffect } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

import NotificationStyles from "@pages/home/NotificationStyles.js";
import { getNotifications } from "config/api";
import { formatDate } from "util/formatDate";

import TopBar from "@components/common/TopBar";
import NotificationCard from "@components/notification/NotificationCard.js";

const NotificationPage = () => {
	const { t } = useTranslation();

	const [notificationData, setNotificationData] = useState([]);

	const handleNotification = async () => {
		try {
			const deviceId = await SecureStore.getItemAsync("deviceId");
			const response = await getNotifications(deviceId);
			setNotificationData(response.data.reverse());
			await SecureStore.setItemAsync(
				"readNotificationCount",
				response.data.length.toString(),
			);
		} catch (error) {
			console.error(
				"알림 조회 오류: ",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		handleNotification();
	}, [notificationData]);

	return (
		<SafeAreaView
			style={[NotificationStyles.container, { alignItems: "center" }]}
		>
			<TopBar topBar={t("notifications")} />
			<FlatList
				style={NotificationStyles.flatlist}
				data={notificationData}
				renderItem={({ item }) => {
					return (
						<>
							<NotificationCard
								notificationId={item.id}
								type={item.type}
								typeId={item.typeId}
								created={formatDate(item.created)}
								content={item.message}
							/>
							<View style={NotificationStyles.line} />
						</>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default NotificationPage;
