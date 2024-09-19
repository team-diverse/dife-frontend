import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import BookmarkStyles from "@pages/chat/BookmarkStyles";
import { getBookmarkedPostChat } from "config/api";

import TopBar from "@components/common/TopBar";
import Bookmark from "@components/chat/Bookmark";

const BookmarkPage = () => {
	const { t } = useTranslation();

	const [bookmarkedList, setBookmarkPostList] = useState();

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				const response = await getBookmarkedPostChat();
				const filterdBookmark = response.data.filter(
					(item) => item.post === null,
				);
				setBookmarkPostList(filterdBookmark);
			} catch (error) {
				Sentry.captureException(error);
				console.error(
					"북마크한 채팅 조회 오류:",
					error.response ? error.response.data : error.message,
				);
			}
		};
		handleBookmarkPost();
	}, []);

	return (
		<SafeAreaView
			style={[BookmarkStyles.container, { alignItems: "center" }]}
		>
			<TopBar topBar={t("bookmarkTitle")} color="#000" />
			<FlatList
				style={BookmarkStyles.flatlist}
				data={bookmarkedList}
				renderItem={({ item }) => (
					<Bookmark
						bookmarkedId={item.id}
						username={"Dann"}
						context={item.message}
						created={item.created}
						translations={item.translations || []}
					/>
				)}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
};

export default BookmarkPage;
