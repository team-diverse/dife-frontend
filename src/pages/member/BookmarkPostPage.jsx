import React from "react";
import { View, ScrollView } from "react-native";

import BookmarkPostStyles from "@pages/member/BookmarkPostStyles";

import ItemLikeBookmark from "@components/member/ItemLikeBookmark";

const BookmarkPostPage = () => {
    const bookmartPostList = [
        {
            title: "북마크 화면입니다",
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
        <View style={BookmarkPostStyles.container}>
            <ScrollView>
                <View style={BookmarkPostStyles.itemLikeBookmark}>
                    <ItemLikeBookmark props={bookmartPostList} />
                </View>
            </ScrollView>
        </View>
    );
};

export default BookmarkPostPage;
