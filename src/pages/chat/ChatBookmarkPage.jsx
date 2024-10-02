import React, { useState, useEffect } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import * as SecureStore from "expo-secure-store";

import BookmarkStyles from "@pages/chat/BookmarkStyles";
import { getBookmarkedByChatroomId } from "config/api";

import TopBar from "@components/common/TopBar";
import Bookmark from "@components/chat/Bookmark";

const ChatBookmarkPage = ({ route }) => {
	const { t } = useTranslation();
	const { chatroomId, userName } = route.params;

	const [bookmarkedList, setBookmarkPostList] = useState();

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				const response = await getBookmarkedByChatroomId(chatroomId);
				setBookmarkPostList(response.data);
				await SecureStore.setItemAsync(
					"readBookmarkedCount",
					response.data.length.toString(),
				);
			} catch (error) {
				Sentry.captureException(error);
				console.error(
					"북마크한 개인별 채팅 조회 오류:",
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
			<TopBar
				topBar={`'${userName}' ${t("bookmarkTitle")}`}
				color="#000"
			/>
			<FlatList
				style={BookmarkStyles.flatlist}
				data={bookmarkedList}
				renderItem={({ item }) => (
					<Bookmark
						bookmarkedId={item.id}
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

export default ChatBookmarkPage;
