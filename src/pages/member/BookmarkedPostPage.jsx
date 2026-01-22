import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import BookmarkedPostStyles from "@pages/member/BookmarkedPostStyles";
import { getBookmarkedByBoardType } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";
import { CustomTheme } from "@styles/CustomTheme";

const BookmarkedPostPage = ({ route }) => {
	const { t } = useTranslation();
	const [bookmarkPostList, setBookmarkPostList] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(
		route?.params?.category || t("entire"),
	);

	useEffect(() => {
		const handleBookmarkPost = async () => {
			try {
				let category = "";
				if (selectedCategory === t("tip")) {
					category = "TIP";
				} else if (selectedCategory === t("free")) {
					category = "FREE";
				} else if (selectedCategory === t("gathering")) {
					category = "GATHERING";
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

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				style={BookmarkedPostStyles.scrollCategory}
				contentContainerStyle={BookmarkedPostStyles.containerCategory}
			>
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
						selectedCategory === t("tip") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("tip"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("tip") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("tip")}
						{t("boardTitle")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						BookmarkedPostStyles.category,
						selectedCategory === t("free") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("free"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("free") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("free")}
						{t("boardTitle")}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						BookmarkedPostStyles.category,
						selectedCategory === t("gathering") && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
					onPress={() => handleCategoryPress(t("gathering"))}
				>
					<Text
						style={[
							BookmarkedPostStyles.textCategory,
							selectedCategory === t("gathering") && {
								color: CustomTheme.primaryMedium,
							},
						]}
					>
						{t("gathering")}
						{t("boardTitle")}
					</Text>
				</TouchableOpacity>
			</ScrollView>

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
