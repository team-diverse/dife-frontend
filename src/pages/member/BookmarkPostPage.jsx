import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";

import BookmarkPostStyles from "@pages/member/BookmarkPostStyles";
import { getBookmarkedPost } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";

const BookmarkPostPage = () => {
	const [bookmarkPostList, setBookmarkPostList] = useState([]);

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				const bookmarkPostResponse = await getBookmarkedPost();
				const presignUrl = await communityPresignUrl(
					bookmarkPostResponse.data,
				);
				setBookmarkPostList(presignUrl);
			} catch (error) {
				console.error(
					"북마크한 게시글 조회 오류:",
					error.response ? error.response.data : error.message,
				);
			}
		};
		handleBookmarkPost();
	}, []);

	return (
		<View style={BookmarkPostStyles.container}>
			<ScrollView>
				<View style={BookmarkPostStyles.itemLikeBookmark}>
					<ItemLikeBookmark
						likedAndBookmarkPostList={bookmarkPostList}
						type="bookmark"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default BookmarkPostPage;
