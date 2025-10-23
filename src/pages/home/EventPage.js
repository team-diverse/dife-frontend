import React from "react";
import { View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import EventStyles from "@pages/home/EventStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";

import TopBar from "@components/common/TopBar";
import EventCard from "@components/event/EventCard";

const EventPage = () => {
	const { t } = useTranslation();

	useStatusBar({
		color: CustomTheme.bgBasic,
		barStyle: "dark-content",
	});

	const eventData = [
		{
			id: "1",
			title: "🤿 Dife 베타 테스트 설문 / Dife Beta Test Questions",
			date: "2024.11.25 ~ 2024.12.01",
			// eslint-disable-next-line @typescript-eslint/no-require-imports
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
