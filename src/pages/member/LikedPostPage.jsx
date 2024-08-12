import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import LikedPostStyles from "@pages/member/LikedPostStyles";

import { getLikedPosts } from "config/api";
import ItemLikeBookmark from "@components/member/ItemLikeBookmark";

const LikedPostPage = () => {
	const [likedPostList, setLikedPostList] = useState([]);

	useEffect(() => {
		const handleLikedPost = async () => {
			try {
				const likedPostResponse = await getLikedPosts();
				setLikedPostList(likedPostResponse.data);
			} catch (error) {
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
