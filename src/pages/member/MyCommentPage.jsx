import React, { useState, useCallback } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyComments } from "config/api";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";
import * as Sentry from "@sentry/react-native";

const MyCommentPage = () => {
	const { t } = useTranslation();
	const [myCommentList, setMyCommentList] = useState();

	const getMyCommentList = async () => {
		try {
			const response = await getMyComments();
			setMyCommentList(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"내가 쓴 글 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyCommentList();
		}, []),
	);

	return (
		<SafeAreaView style={MyPostStyles.container}>
			<TopBar
				topBar={t("myComments")}
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView>
				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={myCommentList} comment={true} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyCommentPage;
