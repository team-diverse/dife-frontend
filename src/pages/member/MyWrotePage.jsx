import React, { useState, useCallback } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyPosts } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

const MyWrotePage = () => {
	const [myPostList, setMyPostList] = useState();

	const getMyPostList = async () => {
		try {
			const response = await getMyPosts();
			const presignUrl = await communityPresignUrl(response.data);
			setMyPostList(presignUrl);
		} catch (error) {
			console.error(
				"내가 쓴 글 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyPostList();
		}, []),
	);

	return (
		<SafeAreaView style={MyPostStyles.container}>
			<TopBar
				topBar="내가 쓴 글"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView>
				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={myPostList} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyWrotePage;
