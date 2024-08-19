import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";

import FriendListStyles from "@pages/chat/FriendListStyles";

import TopBar from "@components/common/TopBar";
import IconFriendNumber from "@components/chat/IconFriendNumber";
import FriendList from "@components/chat/FriendList";
import { getMyConnects } from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

const FriendListPage = ({ route }) => {
	const { member } = route.params || {};
	const [connects, setConnects] = useState([]);
	const [myMemberId, setMyMemberId] = useState(null);

	const filterAcceptedConnects = (connects) => {
		return connects.filter((connect) => connect.status === "ACCEPTED");
	};

	const getOtherMemberFromConnect = (connect) => {
		return connect.from_member.id === myMemberId
			? connect.to_member
			: connect.from_member;
	};

	useEffect(() => {
		const fetchMyMemberIDAndConnects = async () => {
			const myMemberId = await getMyMemberId();
			const response = await getMyConnects();
			const acceptedConnects = filterAcceptedConnects(response.data);
			setMyMemberId(myMemberId);
			setConnects(acceptedConnects);
		};
		fetchMyMemberIDAndConnects();
	}, []);

	return (
		<SafeAreaView style={FriendListStyles.container}>
			{member ? (
				<View style={{ marginTop: 7 }} />
			) : (
				<TopBar topBar="친구 목록" />
			)}
			<View style={FriendListStyles.containerFriendNumber}>
				<Text style={FriendListStyles.textFriend}>내 친구</Text>
				<IconFriendNumber />
				<Text style={FriendListStyles.textNumber}>
					{connects.length}
				</Text>
			</View>
			<FlatList
				style={FriendListStyles.flatlist}
				data={connects}
				renderItem={({ item }) => {
					const otherMember = getOtherMemberFromConnect(item);
					return (
						<FriendList
							memberId={otherMember.id}
							name={otherMember.username}
							imageName={otherMember.profileImg.originalName}
						/>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default FriendListPage;
