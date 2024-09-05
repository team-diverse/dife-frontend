import React, { useState, useCallback } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyPosts } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";
import * as Sentry from "@sentry/react-native";

const MyWrotePage = () => {
	const { t } = useTranslation();
	const [myPostList, setMyPostList] = useState();

	const getMyPostList = async () => {
		try {
			const response = await getMyPosts();
			const presignUrl = await communityPresignUrl(response.data);
			setMyPostList(presignUrl);
		} catch (error) {
			Sentry.captureException(error);
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
				topBar={t("myWritePosts")}
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
