import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import LikedPostStyles from "@pages/member/LikedPostStyles";
import { getLikedPost } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";
import * as Sentry from "@sentry/react-native";

const LikedPostPage = () => {
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
		<View style={LikedPostStyles.container}>
			<ScrollView>
				<View style={LikedPostStyles.itemLikeBookmark}>
					<ItemLikeBookmark
						likedAndBookmarkPostList={likedPostList}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default LikedPostPage;
