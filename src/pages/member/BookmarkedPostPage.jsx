import React, { useState, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import BookmarkedPostStyles from "@pages/member/BookmarkedPostStyles";
import { getBookmarkedPostChat } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

const BookmarkedPostPage = () => {
	const { t } = useTranslation();
	const [bookmarkPostList, setBookmarkPostList] = useState([]);

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				const bookmarkPostResponse = await getBookmarkedPostChat();
				const filterdBookmark = bookmarkPostResponse.data.filter(
					(item) => item.post !== null,
				);
				const presignUrl = await communityPresignUrl(filterdBookmark);
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
			<TopBar topBar={t("bookmarkedPosts")} color="#000" />

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
