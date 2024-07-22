import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { createLikeComment } from "config/api";

import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import IconKebabMenu from "@components/community/IconKebabMenu";

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ commentList, id }) => {
	const date = (date) => {
		const datePart = date.split("T")[0];
		const monthDay = datePart.slice(5);
		return monthDay.replace("-", "/");
	};

	const [pressHeart, setPressHeart] = useState({});
	const initialHeartCounts = commentList.map((post) => ({
		id: post.id,
		likesCount: post.likesCount,
	}));
	const [heartCounts, setHeartCounts] = useState(initialHeartCounts);

	useEffect(() => {
		setHeartCounts(
			commentList.map((post) => ({
				id: post.id,
				likesCount: post.likesCount,
			})),
		);
	}, [commentList]);

	const heartCommentAlert = async (commentId) => {
		try {
			await createLikeComment(id, commentId);
			console.log("댓글 좋아요 성공");
		} catch (error) {
			console.error(
				"댓글 좋아요 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressHeart((prevState) => ({
				...prevState,
				[commentId]: false,
			}));
			setHeartCounts((prevHeartCounts) =>
				prevHeartCounts.map((item) =>
					item.id === commentId
						? { ...item, likesCount: item.likesCount - 1 }
						: item,
				),
			);
		}
	};

	const handleHeart = (commentId) => {
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
						setPressHeart((prevState) => ({
							...prevState,
							[commentId]: true,
						}));
						setHeartCounts((prevHeartCounts) =>
							prevHeartCounts.map((item) =>
								item.id === commentId
									? {
											...item,
											likesCount: item.likesCount + 1,
										}
									: item,
							),
						);
						heartCommentAlert(commentId);
					},
				},
			],
			{ cancelable: false },
		);
	};

	return (
		<>
			{commentList.map((post, index) => (
				<View key={index} style={styles.ItemCommunity}>
					<View style={styles.containerRow}>
						<View>
							<Text style={styles.textPostTitle}>
								{post.isPublic ? "익명" : post.writer.username}
							</Text>
							<Text style={styles.textPostContext}>
								{post.content}
							</Text>

							<View style={styles.containerTextRow}>
								<TouchableOpacity
									style={styles.containerText}
									onPress={() => handleHeart(post.id)}
								>
									<IconHeart active={pressHeart[post.id]} />
									<Text style={styles.text}>
										{heartCounts.find(
											(item) => item.id === post.id,
										)?.likesCount !== undefined
											? heartCounts.find(
													(item) =>
														item.id === post.id,
												).likesCount
											: post.likesCount}
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
