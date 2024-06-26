import React from "react";
import { SafeAreaView, View, Text } from "react-native";

import MyPostStyles from "@pages/member/MyPostStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import ItemCommunity from "@components/community/ItemCommunity";

const MyPostPage = () => {
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
    ];

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
                    <View style={MyPostStyles.containerMore}>
                        <Text style={MyPostStyles.textMore}>더보기</Text>
                        <ArrowRight
                            style={MyPostStyles.arrowRight}
                            color={CustomTheme.textSecondary}
                            size={18}
                        />
                    </View>
                </View>

                <View style={MyPostStyles.itemCommunity}>
                    <ItemCommunity props={MyPostList} />
                </View>

                <View style={MyPostStyles.line} />

                <View style={MyPostStyles.containerTitle}>
                    <Text style={MyPostStyles.textTitle}>내가 단 댓글</Text>
                    <View style={MyPostStyles.containerMore}>
                        <Text style={MyPostStyles.textMore}>더보기</Text>
                        <ArrowRight
                            style={MyPostStyles.arrowRight}
                            color={CustomTheme.textSecondary}
                            size={18}
                        />
                    </View>
                </View>

                <View style={MyPostStyles.itemCommunity}>
                    <ItemCommunity props={MyPostList} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MyPostPage;
