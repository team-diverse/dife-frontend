import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";

import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles.js";
import ConnectStyles from "@pages/connect/ConnectStyles";
import { getLikeMember } from "config/api";
import { formatProfileData } from "util/formatProfileData";

import ConnectCard from "@components/connect/ConnectCard.js";

const LikeUserOneToOne = () => {
	const [connectData, setConnectData] = useState(null);

	const getLikedMember = async () => {
		try {
			const response = await getLikeMember();
			const updatedData = formatProfileData(response.data);
			setConnectData(updatedData);
		} catch (error) {
			console.error(
				"멤버 좋아요 목록 조회 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getLikedMember();
	}, []);

	return (
		<SafeAreaView style={ConnectLikeUserStyles.container}>
			<View style={[ConnectStyles.cardContainer, { marginTop: 14 }]}>
				{connectData ? (
					<View style={ConnectStyles.flatlist}>
						<FlatList
							contentContainerStyle={
								ConnectStyles.flatlistContent
							}
							data={connectData}
							renderItem={({ item }) => (
								<View style={ConnectStyles.cardContainer}>
									<ConnectCard {...item} tag={item.tags} />
								</View>
							)}
							keyExtractor={(item) => item.id}
						/>
					</View>
				) : (
					<></>
				)}
			</View>
		</SafeAreaView>
	);
};

export default LikeUserOneToOne;
