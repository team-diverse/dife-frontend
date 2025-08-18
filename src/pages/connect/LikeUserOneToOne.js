import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { useTranslation } from "react-i18next";

import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles.js";
import ConnectStyles from "@pages/connect/ConnectStyles";
import { getLikeMember } from "config/api";
import { formatProfileData } from "util/formatProfileData";
import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";
import { useMatchQueue } from "context/MatchQueueContext";

import ConnectCard from "@components/connect/ConnectCard.js";
import TopBar from "@components/common/TopBar";

const LikeUserOneToOne = () => {
	const { t } = useTranslation();
	const { likesById, toggleLike } = useMatchQueue();
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
			<TopBar topBar={t("likeListTitle")} />
			<View style={[ConnectStyles.cardContainer, { marginTop: 14 }]}>
				{connectData ? (
					<View style={ConnectStyles.flatlist}>
						<FlatList
							contentContainerStyle={
								ConnectStyles.flatlistContent
							}
							data={connectData.filter((item) => {
								const isLiked =
									likesById[item.id] !== undefined
										? likesById[item.id]
										: item.isLiked;
								return isLiked;
							})}
							renderItem={({ item }) => (
								<View style={ConnectStyles.cardContainer}>
									<ConnectCard
										{...item}
										tag={item.tags}
										fileId={item.profileImg?.id}
										isLiked={
											likesById[item.id] !== undefined
												? likesById[item.id]
												: item.isLiked
										}
										onToggleLike={toggleLike}
									/>
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
