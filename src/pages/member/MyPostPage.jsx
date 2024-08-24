import React, { useState, useCallback } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyPosts, getMyComments } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import ItemCommunity from "@components/community/ItemCommunity";

const MyPostPage = () => {
	const navigation = useNavigation();

	const [myPostList, setMyPostList] = useState();
	const [myCommentList, setMyCommentList] = useState();

	const getMyPostList = async () => {
		try {
			const myPost = await getMyPosts();
			const presignUrl = await communityPresignUrl(myPost.data);
			setMyPostList(presignUrl.slice(0, 3));

			const myComment = await getMyComments();
			setMyCommentList(myComment.data.slice(0, 3));
		} catch (error) {
			console.error(
				"내가 쓴 글 및 쓴 댓글 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyPostList();
		}, []),
	);

	return (
		<SafeAreaView style={MyPostStyles.container}>
			<TopBar
				topBar="나의 글"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={{ marginTop: 14 }}>
				<View style={MyPostStyles.containerTitle}>
					<Text style={MyPostStyles.textTitle}>내가 쓴 글</Text>
					<TouchableOpacity
						style={MyPostStyles.containerMore}
						onPress={() => navigation.navigate("MyWrotePage")}
					>
						<Text style={MyPostStyles.textMore}>더보기</Text>
						<ArrowRight
							style={MyPostStyles.arrowRight}
							color={CustomTheme.textSecondary}
							size={18}
						/>
					</TouchableOpacity>
				</View>

				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={myPostList} />
				</View>

				<View style={MyPostStyles.line} />

				<View style={MyPostStyles.containerTitle}>
					<Text style={MyPostStyles.textTitle}>내가 단 댓글</Text>
					<TouchableOpacity
						style={MyPostStyles.containerMore}
						onPress={() => navigation.navigate("MyCommentPage")}
					>
						<Text style={MyPostStyles.textMore}>더보기</Text>
						<ArrowRight
							style={MyPostStyles.arrowRight}
							color={CustomTheme.textSecondary}
							size={18}
						/>
					</TouchableOpacity>
				</View>

				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={myCommentList} comment={true} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default MyPostPage;
