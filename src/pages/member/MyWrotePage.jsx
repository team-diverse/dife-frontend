import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import ItemCommunity from "@components/community/ItemCommunity";

const MyWrotePage = () => {
	const MyPostList = [
		{
			title: "좋아요 화면입니다",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "좋아요 화면입니다",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "좋아요 화면입니다",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
		{
			title: "성곡도서관 가는 길",
			content: "북악관 머시기저시기 와라라라라라랄 지나서...",
			heart: 2,
			bookmark: 2,
			comment: 0,
			created: "2024-06-22T10:30:00",
		},
	];

	return (
		<SafeAreaView style={MyPostStyles.container}>
			<TopBar
				topBar="내가 쓴 글"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView>
				<View style={MyPostStyles.itemCommunity}>
					<ItemCommunity postList={MyPostList} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default MyWrotePage;
