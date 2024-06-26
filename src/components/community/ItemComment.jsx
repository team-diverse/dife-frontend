import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";

import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import IconKebabMenu from "@components/community/IconKebabMenu";

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ props, id }) => {
    const date = (date) => {
        const datePart = date.split("T")[0];
        const [year, month, day] = datePart.split("-");
        return `${month}/${day}`;
    };

    const { onboardingData } = useOnboarding();
    const [pressHeart, setPressHeart] = useState({});

    useEffect(() => {
        const loadPressHeart = async () => {
            try {
                const savedPressHeart = await AsyncStorage.getItem(
                    `pressHeart_${id}`,
                );
                if (savedPressHeart !== null) {
                    setPressHeart(JSON.parse(savedPressHeart));
                }
            } catch (error) {
                console.error("좋아요 상태 저장 오류:", error);
            }
        };
        loadPressHeart();
    }, [id]);

    useEffect(() => {
        const savePressHeart = async () => {
            try {
                await AsyncStorage.setItem(
                    `pressHeart_${id}`,
                    JSON.stringify(pressHeart),
                );
            } catch (error) {
                console.error("좋아요 상태 저장 오류:", error);
            }
        };
        if (Object.keys(pressHeart).length > 0) {
            savePressHeart();
        }
    }, [pressHeart, id]);

    const heartCommentAlert = (commentId) => {
        Alert.alert(
            "",
            "이 댓글에 좋아요를 누르시겠습니까?",
            [
                {
                    text: "취소",
                    style: "cancel",
                },
                {
                    text: "확인",
                    onPress: () => {
                        axios
                            .post(
                                "http://192.168.45.135:8080/api/likes",
                                {
                                    type: "COMMENT",
                                    postId: id,
                                    commentId: commentId,
                                },
                                {
                                    headers: {
                                        "Content-Type": "application/json",
                                        Accept: "application/json",
                                        Authorization: `Bearer ${onboardingData.accessToken}`,
                                    },
                                },
                            )
                            .then((response) => {
                                console.log("댓글 좋아요 성공");
                                setPressHeart((prevState) => ({
                                    ...prevState,
                                    [commentId]: true,
                                }));
                            })
                            .catch((error) => {
                                console.error(
                                    "댓글 좋아요 실패:",
                                    error.response
                                        ? error.response.data
                                        : error.message,
                                );
                                Alert.alert("", "이미 좋아요를 눌렀습니다.");
                            });
                    },
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <>
            {props.map((post, index) => (
                <View key={index} style={styles.ItemCommunity}>
                    <View style={styles.containerRow}>
                        <View>
                            <Text style={styles.textPostTitle}>
                                {post.title}
                            </Text>
                            <Text style={styles.textPostContext}>
                                {post.context}
                            </Text>

                            <View style={styles.containerTextRow}>
                                <TouchableOpacity
                                    style={styles.containerText}
                                    onPress={() =>
                                        heartCommentAlert(post.commentId)
                                    }
                                >
                                    <IconHeart
                                        active={pressHeart[post.commentId]}
                                    />
                                    <Text style={styles.text}>
                                        {post.heart}
                                    </Text>
                                </TouchableOpacity>
                                <View style={styles.containerText}>
                                    <IconBookmark />
                                    <Text style={styles.text}>
                                        {post.bookmark}
                                    </Text>
                                </View>
                                <View style={styles.containerText}>
                                    <Text style={styles.text}>
                                        {date(post.date)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <IconKebabMenu style={styles.iconKebabMenu} />
                        <TouchableOpacity style={styles.textTranslation}>
                            <Text style={styles.textTranslation}>번역하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </>
    );
};

const styles = StyleSheet.create({
    ItemCommunity: {
        width: "100%",
        minHeight: 78,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#D9EAFF",
        paddingHorizontal: 20,
        paddingVertical: 11,
        justifyContent: "center",
        marginTop: 4,
        marginBottom: 4,
    },
    containerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textPostTitle: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: "NotoSansCJKkr-Bold",
        width: 272,
        height: 17,
    },
    textPostContext: {
        ...fontCaption,
        width: 288,
        marginTop: 3,
    },
    iconKebabMenu: {
        position: "absolute",
        top: 0,
        right: -11,
    },
    textTranslation: {
        ...fontNavi,
        color: CustomTheme.primaryMedium,
        textDecorationLine: "underline",
        position: "absolute",
        bottom: 0,
        right: -2,
    },
    containerTextRow: {
        flexDirection: "row",
        marginTop: 8,
    },
    containerText: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 8,
    },
    text: {
        ...fontNavi,
        color: "#8C8D91",
        marginLeft: 1,
    },
});

export default ItemComment;
