import React from "react";
import { View, ScrollView } from "react-native";

import LikedPostStyles from "@pages/member/LikedPostStyles";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";

const LikedPostPage = () => {
    const likedPostList = [
        {
            title: "좋아요 화면입니다",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
        {
            title: "성곡도서관 가는 길",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
        {
            title: "성곡도서관 가는 길",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
        {
            title: "성곡도서관 가는 길",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
        {
            title: "성곡도서관 가는 길",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
        {
            title: "성곡도서관 가는 길",
            content: "북악관 머시기저시기 와라라라라라랄 지나서...",
        },
    ];

    return (
        <View style={LikedPostStyles.container}>
            <ScrollView>
                <View style={LikedPostStyles.itemLikeBookmark}>
                    <ItemLikeBookmark props={likedPostList} />
                </View>
            </ScrollView>
        </View>
    );
};

export default LikedPostPage;
