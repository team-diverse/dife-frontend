import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import TabBookmarkPostStyles from "@pages/member/TabBookmarkPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getBookmarkedPostChat } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";
import ArrowRight from "@components/common/ArrowRight";

import * as Sentry from "@sentry/react-native";

const TabBookmarkPostPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [bookmarkPostList, setBookmarkPostList] = useState([]);

	useFocusEffect(
		useCallback(() => {
			const handleBookmarkPost = async () => {
				try {
					const bookmarkPostResponse = await getBookmarkedPostChat();
					const filterdBookmark = bookmarkPostResponse.data.filter(
						(item) => item.post !== null,
					);
					const presignUrl =
						await communityPresignUrl(filterdBookmark);
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
		}, []),
	);

	return (
		<View style={TabBookmarkPostStyles.container}>
			<View style={TabBookmarkPostStyles.containerTitle}>
				<Text style={TabBookmarkPostStyles.textTitle}>
					{t("bookmarkedPosts")}
				</Text>
				<TouchableOpacity
					style={TabBookmarkPostStyles.containerMore}
					onPress={() => navigation.navigate("BookmarkedPostPage")}
				>
					<Text style={TabBookmarkPostStyles.textMore}>
						{t("moreButton")}
					</Text>
					<ArrowRight
						style={TabBookmarkPostStyles.iconArrowRight}
						color={CustomTheme.textSecondary}
						size={18}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={TabBookmarkPostStyles.itemLikeBookmark}>
					<ItemLikeBookmark
						likedAndBookmarkPostList={bookmarkPostList}
						type="bookmark"
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default TabBookmarkPostPage;
