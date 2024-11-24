import React from "react";
import { View, FlatList, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

import EventStyles from "@pages/home/EventStyles";

import TopBar from "@components/common/TopBar";
import EventCard from "@components/event/EventCard";

const EventPage = () => {
	const { t } = useTranslation();

	const eventData = [
		{
			id: "1",
			title: "🤿 Dife 베타 테스트 설문 / Dife Beta Test Questions",
			date: "2024.11.25 ~ 2024.12.01",
			eventImg: require("src/assets/dife_header.png"),
			url: "https://forms.gle/7kX3YJRKpnk51qvh9",
		},
	];

	return (
		<SafeAreaView style={[EventStyles.container, { alignItems: "center" }]}>
			<TopBar topBar={t("events")} />
			<View style={EventStyles.flatlist}>
				<FlatList
					contentContainerStyle={EventStyles.flatlistContent}
					data={eventData}
					renderItem={({ item }) => (
						<View style={EventStyles.eventCard}>
							<EventCard {...item} />
						</View>
					)}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
};

export default EventPage;
