import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useTranslation } from "react-i18next";

import LikedPostStyles from "@pages/member/LikedPostStyles";
import { getLikedPost } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

import * as Sentry from "@sentry/react-native";

const LikedPostPage = () => {
	const { t } = useTranslation();
	const [likedPostList, setLikedPostList] = useState([]);

	useEffect(() => {
		const handleLikedPost = async () => {
			try {
				const likedPostResponse = await getLikedPost();
				const presignUrl = await communityPresignUrl(
					likedPostResponse.data,
				);
				setLikedPostList(presignUrl);
			} catch (error) {
				Sentry.captureException(error);
				console.error(
					"좋아요한 게시글 조회 오류:",
					error.response ? error.response.data : error.message,
				);
			}
		};
		handleLikedPost();
	}, []);

	return (
		<SafeAreaView style={LikedPostStyles.container}>
			<TopBar topBar={t("likedPosts")} color="#000" />

			<View style={LikedPostStyles.itemCommunity}>
				<ItemCommunity
					postList={likedPostList}
					apiPost={true}
					likedPostBlue={true}
				/>
			</View>
		</SafeAreaView>
	);
};

export default LikedPostPage;
