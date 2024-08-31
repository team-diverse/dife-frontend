import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";

import BookmarkedPostStyles from "@pages/member/BookmarkedPostStyles";
import { getBookmarkedPost } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

import * as Sentry from "@sentry/react-native";

const BookmarkedPostPage = () => {
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
				Sentry.captureException(error);
				console.error(
					"북마크한 게시글 조회 오류:",
					error.response ? error.response.data : error.message,
				);
			}
		};
		handleBookmarkPost();
	}, []);

	return (
		<SafeAreaView style={BookmarkedPostStyles.container}>
			<TopBar topBar="북마크한 게시글" color="#000" />

			<View style={BookmarkedPostStyles.itemCommunity}>
				<ItemCommunity
					postList={bookmarkPostList}
					apiPost={true}
					bookmarkedPostBlue={true}
				/>
			</View>
		</SafeAreaView>
	);
};

export default BookmarkedPostPage;
