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
			date: "2022.02.14 ~ 2022.02.15",
		},
		{
			id: "2",
			title: "[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보",
			date: "2022.02.14 ~ 2022.02.15",
			eventImg: require("../../assets/images/test_img/test_event2.png"),
		},
		{
			id: "3",
			title: "[프로그램] 해담이 탐구회",
			date: "2022.11.13 ~ 2022.11.13",
			eventImg: require("../../assets/images/test_img/test_haedam.jpg"),
		},
		{
			id: "4",
			title: "[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보",
			date: "2022.02.14 ~ 2022.02.15",
			eventImg: require("../../assets/images/test_img/test_event.png"),
		},
		{
			id: "5",
			title: "[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보",
			date: "2022.02.14 ~ 2022.02.15",
			eventImg: require("../../assets/images/test_img/test_event2.png"),
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
