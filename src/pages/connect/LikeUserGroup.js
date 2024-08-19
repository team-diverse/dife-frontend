import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";

import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles";
import ConnectStyles from "@pages/connect/ConnectStyles";
import { getLikeChatroom } from "config/api";

import ConnectCard from "@components/connect/ConnectCard";

const LikeUserGroup = () => {
	const [groupConnectData, setGroupConnectData] = useState(null);

	const getLikedMember = async () => {
		try {
			const response = await getLikeChatroom();
			setGroupConnectData(response.data);
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
				<View style={ConnectStyles.flatlist}>
					<FlatList
						contentContainerStyle={ConnectStyles.flatlistContent}
						data={groupConnectData}
						renderItem={({ item }) => (
							<View style={ConnectStyles.cardContainer}>
								<ConnectCard
									{...item}
									isLiked={true}
									groupName={item.name}
									tag={item.tags}
								/>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LikeUserGroup;
