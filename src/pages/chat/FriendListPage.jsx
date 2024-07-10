import React from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";

import FriendListStyles from "@pages/chat/FriendListStyles";

import TopBar from "@components/common/TopBar";
import IconFriendNumber from "@components/chat/IconFriendNumber";
import FriendList from "@components/chat/FriendList";

const FriendListPage = () => {
	const FriendData = [
		{
			id: "1",
			name: "Dann",
		},
		{
			id: "2",
			name: "Amy",
		},
		{
			id: "3",
			name: "Haedam",
		},
		{
			id: "4",
			name: "Jenny",
		},
	];

	return (
		<SafeAreaView style={FriendListStyles.container}>
			<TopBar topBar="친구 목록" />
			<View style={FriendListStyles.containerFriendNumber}>
				<Text style={FriendListStyles.textFriend}>내 친구</Text>
				<IconFriendNumber />
				<Text style={FriendListStyles.textNumber}>{"23"}</Text>
			</View>
			<FlatList
				style={FriendListStyles.flatlist}
				data={FriendData}
				renderItem={({ item }) => <FriendList name={item.name} />}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default FriendListPage;
