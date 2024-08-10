import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { createLike } from "config/api";

import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import IconKebabMenu from "@components/community/IconKebabMenu";
import IconComment from "@components/community/IconComment";
import IconReply from "@components/community/IconReply";

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ commentList = [], id, onReply }) => {
	const date = (date) => {
		const datePart = date.split("T")[0];
		const monthDay = datePart.slice(5);
		return monthDay.replace("-", "/");
	};

	const [pressHeart, setPressHeart] = useState({});
	const initialHeartCounts = props.map((post) => ({
		id: post.id,
		likesCount: post.likesCount,
	}));
	const [heartCounts, setHeartCounts] = useState(initialHeartCounts);

	useEffect(() => {
		setHeartCounts(
			props.map((post) => ({ id: post.id, likesCount: post.likesCount })),
		);
	}, [props]);

	const handleCommentHeart = async (commentId) => {
		try {
			await createLikeComment(id, commentId);
			setPressHeart((prevState) => ({
				...prevState,
				[commentId]: true,
			}));
			setHeartCounts((prevHeartCounts) =>
				prevHeartCounts.map((item) =>
					item.id === commentId
						? { ...item, likesCount: item.likesCount + 1 }
						: item,
				),
			);
		} catch (error) {
			console.error(
				"댓글 좋아요 실패:",
				error.response ? error.response.data : error.message,
			);
		}

	const renderComments = (comments) => {
		return comments.map((post) => {
			const replies = commentList.filter(
				(reply) =>
					reply.parentComment && reply.parentComment.id === post.id,
			);

			return (
				<View key={post.id}>
					<View style={styles.ItemCommunity}>
						<View style={styles.containerRow}>
							<View>
								<Text style={styles.textPostTitle}>
									{post.isPublic
										? "익명"
										: post.writer.username}
								</Text>
								<Text style={styles.textPostContext}>
									{post.content}
								</Text>

								<View style={styles.containerTextRow}>
									<TouchableOpacity
										style={styles.containerText}
										onPress={() =>
											handleCommentHeart(post.id)
										}
									>
										<IconHeart
											active={pressHeart[post.id]}
										/>
										<Text style={styles.text}>
											{heartCounts.find(
												(item) => item.id === post.id,
											)?.likesCount != null
												? heartCounts.find(
														(item) =>
															item.id === post.id,
													).likesCount
												: 0}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={styles.containerText}
										onPress={() => onReply(post.id)}
									>
										<IconComment
											color={CustomTheme.borderColor}
										/>
										<Text style={styles.text}>
											{post.commentsCount}
										</Text>
									</TouchableOpacity>
									<View style={styles.containerText}>
										<Text style={styles.text}>
											{date(post.created)}
										</Text>
									</View>
								</View>
							</View>

							<IconKebabMenu style={styles.iconKebabMenu} />
							<TouchableOpacity style={styles.textTranslation}>
								<Text style={styles.textTranslation}>
									번역하기
								</Text>
							</TouchableOpacity>
						</View>
					</View>

					{replies.map((reply) => (
						<View key={reply.id} style={{ flexDirection: "row" }}>
							<IconReply style={{ marginRight: 4 }} />
							<View
								style={[styles.ItemCommunity, { width: 308 }]}
							>
								<View style={styles.containerRow}>
									<View>
										<Text style={styles.textPostTitle}>
											{reply.isPublic
												? "익명"
												: reply.writer.username}
										</Text>
										<Text style={styles.textPostContext}>
											{reply.content}
										</Text>

										<View style={styles.containerTextRow}>
											<TouchableOpacity
												style={styles.containerText}
												onPress={() =>
													handleCommentHeart(reply.id)
												}
											>
												<IconHeart
													active={
														pressHeart[reply.id]
													}
												/>
												<Text style={styles.text}>
													{heartCounts.find(
														(item) =>
															item.id ===
															reply.id,
													)?.likesCount != null
														? heartCounts.find(
																(item) =>
																	item.id ===
																	reply.id,
															).likesCount
														: 0}
												</Text>
											</TouchableOpacity>
											<View style={styles.containerText}>
												<Text style={styles.text}>
													{date(reply.created)}
												</Text>
											</View>
										</View>
									</View>

									<IconKebabMenu
										style={styles.iconKebabMenu}
									/>
									<TouchableOpacity
										style={styles.textTranslation}
									>
										<Text style={styles.textTranslation}>
											번역하기
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))}
				</View>
			);
		});
	};

	return <>{renderComments(commentList)}</>;
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
