import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useTranslation } from "react-i18next";

import GroupListStyles from "@pages/member/GroupListStyles";
import { getChatroomsByType } from "config/api";

import TopBar from "@components/common/TopBar";
import GroupList from "@components/member/GroupList";

const GroupListPage = () => {
	const { t } = useTranslation();
	const [chiefChatRoomList, setChiefChatRoomList] = useState([]);
	const [belongToChatRoomList, setBelongToChatRoomList] = useState([]);

	const getGroupList = async () => {
		try {
			const responseChief = await getChatroomsByType();
			setChiefChatRoomList(responseChief.data);

			const responseBelongTo = await getChatroomsByType("GROUP");
			const chiefIds = new Set(responseChief.data.map((item) => item.id));
			const filteredBelongToChatRooms = responseBelongTo.data.filter(
				(item) => !chiefIds.has(item.id),
			);
			setBelongToChatRoomList(filteredBelongToChatRooms);
		} catch (error) {
			console.error(
				"그룹 목록 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getGroupList();
	}, []);

	return (
		<SafeAreaView style={GroupListStyles.container}>
			<TopBar topBar={t("groupList")} color="#000" />
			<Text style={[GroupListStyles.textFriend, { marginTop: 22 }]}>
				{t("myGroups")}
				{"   "}
				<Text style={GroupListStyles.textNumber}>
					{chiefChatRoomList.length}
				</Text>
			</Text>
			<FlatList
				style={GroupListStyles.flatlist}
				data={chiefChatRoomList}
				renderItem={({ item }) => <GroupList {...item} />}
				keyExtractor={(item, index) => index.toString()}
			/>
			<View style={GroupListStyles.line} />
			<Text style={GroupListStyles.textFriend}>
				{t("joinedGroups")}
				{"   "}
				<Text style={GroupListStyles.textNumber}>
					{belongToChatRoomList.length}
				</Text>
			</Text>
			<FlatList
				style={GroupListStyles.flatlist}
				data={belongToChatRoomList}
				renderItem={({ item }) => <GroupList {...item} />}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
};

export default GroupListPage;
