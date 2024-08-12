import React, { useState, useCallback } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyComments } from "config/api";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

const MyCommentPage = () => {
	const [myCommentList, setMyCommentList] = useState();

	const getMyCommentList = async () => {
		try {
			const response = await getMyComments();
			setMyCommentList(response.data);
		} catch (error) {
			console.error(
				"내가 쓴 글 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyCommentList();
		}, []),
	);

	return (
		<SafeAreaView style={MyPostStyles.container}>
			<TopBar
				topBar="내가 단 댓글"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView>
				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={myCommentList} comment={true} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyCommentPage;
