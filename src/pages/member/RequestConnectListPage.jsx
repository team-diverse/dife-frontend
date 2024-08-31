import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";

import RequestConnectListStyles from "@pages/member/RequestConnectListStyles";
import { getMyPendingConnects } from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

import ItemRequestConnectList from "@components/member/ItemRequestConnectList";

const RequestConnectListPage = () => {
	const [sentConnects, setSentConnects] = useState([]);
	const [receivedConnects, setReceivedConnects] = useState([]);

	const filterConnects = async (connects) => {
		const myMemberId = await getMyMemberId();
		const sent = connects.filter(
			(connect) => connect.from_member.id === myMemberId,
		);
		const received = connects.filter(
			(connect) => connect.to_member.id === myMemberId,
		);
		return { sent, received };
	};

	const getPenddingConnects = async () => {
		try {
			const response = await getMyPendingConnects();
			const { sent, received } = await filterConnects(response.data);
			setSentConnects(sent);
			setReceivedConnects(received);
		} catch (error) {
			console.error(
				"PENNDING 커넥트 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getPenddingConnects();
	}, [receivedConnects]);

	return (
		<SafeAreaView style={RequestConnectListStyles.container}>
			<View style={RequestConnectListStyles.containerList}>
				<Text style={RequestConnectListStyles.textRequest}>
					받은 요청{"   "}
					<Text style={RequestConnectListStyles.textRequestNumber}>
						{receivedConnects.length}
					</Text>
				</Text>
				<FlatList
					style={RequestConnectListStyles.flatlist}
					data={receivedConnects}
					renderItem={({ item }) => (
						<ItemRequestConnectList
							received={true}
							connectId={item.id}
							memberId={item.from_member.id}
							name={item.from_member.username}
							imageName={item.from_member.profileImg}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
			<View style={RequestConnectListStyles.line} />
			<View style={RequestConnectListStyles.containerList}>
				<Text style={RequestConnectListStyles.textRequest}>
					보낸 요청{"   "}
					<Text style={RequestConnectListStyles.textRequestNumber}>
						{sentConnects.length}
					</Text>
				</Text>
				<FlatList
					style={RequestConnectListStyles.flatlist}
					data={sentConnects}
					renderItem={({ item }) => (
						<ItemRequestConnectList
							connectId={item.id}
							memberId={item.to_member.id}
							name={item.to_member.username}
							imageName={item.to_member.profileImg}
						/>
					)}
					keyExtractor={(item, index) => index.toString()}
				/>
			</View>
		</SafeAreaView>
	);
};

export default RequestConnectListPage;
