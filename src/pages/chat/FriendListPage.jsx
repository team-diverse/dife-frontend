import React, { useState, useCallback } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useFocusEffect } from "@react-navigation/native";

import FriendListStyles from "@pages/chat/FriendListStyles";
import { getMyAcceptedConnects } from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

import TopBar from "@components/common/TopBar";
import IconFriendNumber from "@components/chat/IconFriendNumber";
import FriendList from "@components/chat/FriendList";

const FriendListPage = ({ route }) => {
	const { member } = route.params || {};

	const { t } = useTranslation();

	const [connects, setConnects] = useState([]);
	const [myMemberId, setMyMemberId] = useState(null);

	const getOtherMemberFromConnect = (connect) => {
		return connect.from_member.id === myMemberId
			? connect.to_member
			: connect.from_member;
	};

	useFocusEffect(
		useCallback(() => {
			const fetchMyMemberIDAndConnects = async () => {
				const myMemberId = await getMyMemberId();
				setMyMemberId(myMemberId);

				const response = await getMyAcceptedConnects();
				setConnects(response.data);
			};
			fetchMyMemberIDAndConnects();
		}, []),
	);

	return (
		<SafeAreaView style={FriendListStyles.container}>
			{member ? (
				<View style={{ marginTop: 7 }} />
			) : (
				<TopBar topBar={t("friendListTitle")} />
			)}
			<View style={FriendListStyles.containerFriendNumber}>
				<Text style={FriendListStyles.textFriend}>{t("myFriend")}</Text>
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
							connectId={item.id}
							memberId={otherMember.id}
							name={otherMember.username}
							fileId={otherMember.profileImg?.id}
						/>
					);
				}}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default FriendListPage;
