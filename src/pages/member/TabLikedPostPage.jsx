import React, { useState, useCallback } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import TabLikedPostStyles from "@pages/member/TabLikedPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getLikedPost } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";
import ArrowRight from "@components/common/ArrowRight";

import * as Sentry from "@sentry/react-native";

const TabLikedPostPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [likedPostList, setLikedPostList] = useState([]);

	useFocusEffect(
		useCallback(() => {
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
		}, []),
	);

	return (
		<View style={TabLikedPostStyles.container}>
			<View style={TabLikedPostStyles.containerTitle}>
				<Text style={TabLikedPostStyles.textTitle}>
					{t("likedPosts")}
				</Text>
				<TouchableOpacity
					style={TabLikedPostStyles.containerMore}
					onPress={() => navigation.navigate("LikedPostPage")}
				>
					<Text style={TabLikedPostStyles.textMore}>
						{t("moreButton")}
					</Text>
					<ArrowRight
						style={TabLikedPostStyles.iconArrowRight}
						color={CustomTheme.textSecondary}
						size={18}
					/>
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View style={TabLikedPostStyles.itemLikeBookmark}>
					<ItemLikeBookmark
						likedAndBookmarkPostList={likedPostList}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default TabLikedPostPage;
