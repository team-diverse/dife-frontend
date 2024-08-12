import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { createLikeComment, deleteLikeByCommentId } from "config/api";
import { useOnboarding } from "src/states/OnboardingContext.js";

import IconHeart from "@components/community/IconHeart";
import IconKebabMenu from "@components/community/IconKebabMenu";
import IconComment from "@components/community/IconComment";
import IconReply from "@components/community/IconReply";
import ModalKebabMenu from "@components/community/ModalKebabMenu";

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ commentList = [], onReply }) => {
	const date = (date) => {
		const datePart = date.split("T")[0];
		const monthDay = datePart.slice(5);
		return monthDay.replace("-", "/");
	};

	const initialHeartStates = commentList.map((post) => ({
		id: post.id,
		likesCount: post.likesCount,
		isLiked: post.isLiked,
	}));
	const [heartStates, setHeartStates] = useState(initialHeartStates);

	useEffect(() => {
		const newHeartStates = commentList.map((post) => ({
			id: post.id,
			likesCount: post.likesCount,
			isLiked: post.isLiked,
		}));

		if (JSON.stringify(newHeartStates) !== JSON.stringify(heartStates)) {
			setHeartStates(newHeartStates);
		}
	}, [commentList]);

	const handleCommentHeart = async (commentId, isLiked) => {
		try {
			if (isLiked) {
				await deleteLikeByCommentId(commentId);
				setHeartStates((prevHeartStates) =>
					prevHeartStates.map((item) =>
						item.id === commentId
							? {
									...item,
									isLiked: !item.isLiked,
									likesCount: item.isLiked
										? item.likesCount - 1
										: item.likesCount + 1,
								}
							: item,
					),
				);
			} else {
				await createLikeComment(commentId);
				setHeartStates((prevHeartStates) =>
					prevHeartStates.map((item) =>
						item.id === commentId
							? {
									...item,
									isLiked: !item.isLiked,
									likesCount: !item.isLiked
										? item.likesCount + 1
										: item.likesCount - 1,
								}
							: item,
					),
				);
			}
		} catch (error) {
			console.error(
				"좋아요 처리 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const [modalData, setModalData] = useState({
		modalVisible: false,
		commentId: null,
		commentWriterId: null,
		commentIsPublic: false,
		commentIsMe: false,
	});

	const { onboardingData } = useOnboarding();

	const handleCommentKebabMenu = (
		commentId,
		commentWriterId,
		isPublic,
		isMe,
	) => {
		setModalData({
			modalVisible: true,
			commentId,
			commentWriterId,
			commentIsPublic: isPublic,
			commentIsMe: isMe,
		});
	};

	const closeModal = () => {
		setModalData((prevData) => ({
			...prevData,
			modalVisible: false,
		}));
	};

	const modalPosition = {
		top: 300,
		width: 200,
	};

	const renderComment = (comment) => {
		const replies = commentList.filter(
			(reply) =>
				reply.parentComment && reply.parentComment.id === comment.id,
		);

		return (
			<View key={comment.id}>
				<View style={styles.ItemCommunity}>
					<View style={styles.containerRow}>
						<View>
							<Text style={styles.textPostTitle}>
								{comment.isPublic
									? "익명"
									: comment.writer.username}
							</Text>
							<Text style={styles.textPostContext}>
								{comment.content}
							</Text>

							<View style={styles.containerTextRow}>
								<TouchableOpacity
									style={styles.containerText}
									onPress={() =>
										handleCommentHeart(
											comment.id,
											comment.isLiked,
										)
									}
								>
									<IconHeart
										active={
											heartStates.find(
												(item) =>
													item.id === comment.id,
											)?.isLiked
										}
									/>
									<Text style={styles.text}>
										{heartStates.find(
											(item) => item.id === comment.id,
										)?.likesCount ?? 0}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.containerText}
									onPress={() => onReply(comment.id)}
								>
									<IconComment
										color={CustomTheme.borderColor}
									/>
									<Text style={styles.text}>
										{comment.commentsCount}
									</Text>
								</TouchableOpacity>
								<View style={styles.containerText}>
									<Text style={styles.text}>
										{date(comment.created)}
									</Text>
								</View>
							</View>
						</View>

						<TouchableOpacity
							style={styles.iconKebabMenu}
							onPress={() =>
								handleCommentKebabMenu(
									comment.id,
									comment.writer.id,
									comment.isPublic,
									onboardingData.id === comment.writer.id,
								)
							}
						>
							<IconKebabMenu />
						</TouchableOpacity>
						<ModalKebabMenu
							modalVisible={
								modalData.modalVisible &&
								modalData.commentId === comment.id
							}
							setModalVisible={closeModal}
							memberId={modalData.commentWriterId}
							commentId={modalData.commentId}
							isPublic={modalData.commentIsPublic}
							isMe={modalData.commentIsMe}
							position={modalPosition}
						/>
						<TouchableOpacity style={styles.textTranslation}>
							<Text style={styles.textTranslation}>번역하기</Text>
						</TouchableOpacity>
					</View>
				</View>

				{replies.map((reply) => (
					<View key={reply.id} style={{ flexDirection: "row" }}>
						<IconReply style={{ marginRight: 4 }} />
						<View style={[styles.ItemCommunity, { width: 308 }]}>
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
												handleCommentHeart(
													reply.id,
													reply.isLiked,
												)
											}
										>
											<IconHeart
												active={
													heartStates.find(
														(item) =>
															item.id ===
															reply.id,
													)?.isLiked
												}
											/>
											<Text style={styles.text}>
												{heartStates.find(
													(item) =>
														item.id === reply.id,
												)?.likesCount ?? 0}
											</Text>
										</TouchableOpacity>
										<View style={styles.containerText}>
											<Text style={styles.text}>
												{date(reply.created)}
											</Text>
										</View>
									</View>
								</View>

								<TouchableOpacity
									style={styles.iconKebabMenu}
									onPress={() =>
										handleCommentKebabMenu(
											reply.id,
											reply.writer.id,
											reply.isPublic,
											reply.writer.id ===
												onboardingData.id,
										)
									}
								>
									<IconKebabMenu />
								</TouchableOpacity>
								<ModalKebabMenu
									modalVisible={
										modalData.modalVisible &&
										modalData.commentId === reply.id
									}
									setModalVisible={closeModal}
									memberId={modalData.commentWriterId}
									commentId={modalData.commentId}
									isPublic={modalData.commentIsPublic}
									isMe={modalData.commentIsMe}
									position={modalPosition}
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
	};

	return (
		<>
			{commentList
				.filter((comment) => !comment.parentComment)
				.map((comment) => renderComment(comment))}
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
