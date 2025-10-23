import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import BookmarkedPostStyles from "@pages/member/BookmarkedPostStyles";
import { getBookmarkedByBoardType } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";
import { useStatusBar } from "util/useStatusBar";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";
import { CustomTheme } from "@styles/CustomTheme";

const BookmarkedPostPage = ({ route }) => {
	const { t } = useTranslation();
	const [bookmarkPostList, setBookmarkPostList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(
		route?.params?.category || t("entire"),
	);

	useStatusBar({
		color: CustomTheme.bgBasic,
		barStyle: "dark-content",
	});

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				let category = "";
				if (selectedCategory === t("tipBoard")) {
					category = "TIP";
				} else if (selectedCategory === t("freeBoard")) {
					category = "FREE";
				}
				const bookmarkPostResponse =
					await getBookmarkedByBoardType(category);
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
	}, [selectedCategory]);

	const handleCategoryPress = (category) => {
		setSelectedCategory(category);
	};

	return (
		<SafeAreaView style={BookmarkedPostStyles.container}>
			<TopBar topBar={t("bookmarkedPosts")} color="#000" />

			<View style={BookmarkedPostStyles.containerCategory}>
				<TouchableOpacity
					style={[
						BookmarkedPostStyles.category,
						selectedCategory === t("entire") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("entire"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("entire") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("entire")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						BookmarkedPostStyles.category,
						selectedCategory === t("tipBoard") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("tipBoard"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("tipBoard") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("tipBoard")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						BookmarkedPostStyles.category,
						selectedCategory === t("freeBoard") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("freeBoard"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("freeBoard") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("freeBoard")}
					</Text>
				</TouchableOpacity>
			</View>

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
