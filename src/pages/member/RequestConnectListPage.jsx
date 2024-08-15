import React from "react";
import { SafeAreaView, View, Text, FlatList } from "react-native";

import RequestConnectListStyles from "@pages/member/RequestConnectListStyles";

import ItemRequestConnectList from "@components/member/ItemRequestConnectList";

const RequestConnectListPage = () => {
	const connectsPending = [
		{
			memberId: 1,
			name: "이름",
			imageName: null,
			status: "PENDING",
		},
		{
			memberId: 2,
			name: "이름2",
			imageName: null,
			status: "PENDING",
		},
		{
			memberId: 3,
			name: "이름2",
			imageName: null,
			status: "RECEIVED",
		},
		{
			memberId: 2,
			name: "이름2",
			imageName: null,
			status: "ACCEPTED",
		},
	];

	const filterPendingConnects = (connects) => {
		return connects.filter((connect) => connect.status === "PENDING");
	};

	const filterReceivedConnects = (connects) => {
		return connects.filter((connect) => connect.status === "RECEIVED");
	};

	return (
		<SafeAreaView style={RequestConnectListStyles.container}>
			<Text style={RequestConnectListStyles.textRequest}>
				받은 요청{"   "}
				<Text style={RequestConnectListStyles.textRequestNumber}>
					{filterReceivedConnects(connectsPending).length}
				</Text>
			</Text>
			<FlatList
				style={RequestConnectListStyles.flatlist}
				data={filterReceivedConnects(connectsPending)}
				renderItem={({ item }) => <ItemRequestConnectList {...item} />}
				keyExtractor={(item, index) => index.toString()}
			/>
			<View style={RequestConnectListStyles.line} />
			<Text style={RequestConnectListStyles.textRequest}>
				보낸 요청{"   "}
				<Text style={RequestConnectListStyles.textRequestNumber}>
					{filterPendingConnects(connectsPending).length}
				</Text>
			</Text>
			<FlatList
				style={RequestConnectListStyles.flatlist}
				data={filterPendingConnects(connectsPending)}
				renderItem={({ item }) => <ItemRequestConnectList {...item} />}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
};

export default RequestConnectListPage;
