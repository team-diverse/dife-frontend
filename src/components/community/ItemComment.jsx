import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Keyboard,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import {
	createLikeComment,
	deleteLikeByCommentId,
	translationByCommentId,
	getMyProfile,
} from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";
import { formatDate } from "util/formatDate";

import IconHeart from "@components/community/IconHeart";
import IconKebabMenu from "@components/community/IconKebabMenu";
import IconComment from "@components/community/IconComment";
import IconReply from "@components/community/IconReply";
import ModalKebabMenu from "@components/community/ModalKebabMenu";
import ModalTranslationsCount from "@components/common/ModalTranslationsCount";
import LoadingDots from "@components/common/loading/LoadingDots";

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ commentList = [], onReply }) => {
	const { t } = useTranslation();
	const initialHeartStates = commentList.map((post) => ({
		id: post.id,
		likesCount: post.likesCount,
		isLiked: post.isLiked,
	}));
	const [heartStates, setHeartStates] = useState(initialHeartStates);
	const [translations, setTranslations] = useState({});
	const [showTranslations, setShowTranslations] = useState({});
	const [replyTranslations, setReplyTranslations] = useState({});
	const [replyShowTranslations, setReplyShowTranslations] = useState({});
	const [modalTranslationVisible, setModalTranslationVisible] =
		useState(false);
	const [translationCount, setTranslationCount] = useState();
	const [focusParentComment, setFocusParentComment] = useState(null);
	const [translating, setTranslating] = useState({});

	useEffect(() => {
		const newHeartStates = commentList.map((post) => ({
			id: post.id,
			likesCount: post.likesCount,
			isLiked: post.isLiked,
		}));

		if (JSON.stringify(newHeartStates) !== JSON.stringify(heartStates)) {
			setHeartStates(newHeartStates);
		}

		const newCommentTranslations = {};
		const newReplyTranslations = {};

		commentList.forEach((comment) => {
			if (comment.translatedText) {
				newCommentTranslations[comment.id] = comment.translatedText;
			}
			if (comment.parentComment) {
				if (comment.translatedText) {
					newReplyTranslations[comment.id] = comment.translatedText;
				}
			}
		});

		setTranslations((prev) => ({
			...prev,
			...newCommentTranslations,
		}));
		setReplyTranslations((prev) => ({
			...prev,
			...newReplyTranslations,
		}));
	}, [commentList]);

	const handleTranslate = async (commentId, isComment) => {
		if (isComment && translations[commentId]) return;
		if (!isComment && replyTranslations[commentId]) return;

		setTranslating((prev) => ({ ...prev, [commentId]: true }));

		try {
			const responseCount = await getMyProfile();
			const count =
				responseCount.data.translationCount === 0
					? 0
					: responseCount.data.translationCount + 1;
			setTranslationCount(count);

			const setTranslationsForType = isComment
				? setTranslations
				: setReplyTranslations;
			if (count === 0) {
				setModalTranslationVisible(true);
				const response = await translationByCommentId(commentId);
				const translationText = response.data.translations[0]?.text;
				setTranslationsForType((prev) => ({
					...prev,
					[commentId]: translationText,
				}));
			} else if (count <= 15) {
				setModalTranslationVisible(false);
				const response = await translationByCommentId(commentId);
				const translationText = response.data.translations[0]?.text;
				setTranslationsForType((prev) => ({
					...prev,
					[commentId]: translationText,
				}));
			} else if (count > 15) {
				handleToggleTranslation(commentId, isComment);
				setModalTranslationVisible(true);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"댓글 번역 오류:",
				error.response ? error.response.data : error.message,
			);
		} finally {
			setTranslating((prev) => ({ ...prev, [commentId]: false }));
		}
	};

	const handleToggleTranslation = (commentId, isComment) => {
		if (isComment) {
			setShowTranslations((prevState) => ({
				...prevState,
				[commentId]: !prevState[commentId],
			}));
		} else {
			setReplyShowTranslations((prevState) => ({
				...prevState,
				[commentId]: !prevState[commentId],
			}));
		}
	};

	const handleCommentHeart = async (commentId, isLiked) => {
		const previousHeartState = heartStates.find(
			(item) => item.id === commentId,
		);

		const updatedHeartState = {
			...previousHeartState,
			isLiked: !isLiked,
			likesCount: isLiked
				? previousHeartState.likesCount - 1
				: previousHeartState.likesCount + 1,
		};

		setHeartStates((prevHeartStates) =>
			prevHeartStates.map((item) =>
				item.id === commentId ? updatedHeartState : item,
			),
		);

		try {
			if (isLiked) {
				await deleteLikeByCommentId(commentId);
			} else {
				await createLikeComment(commentId);
			}
		} catch (error) {
			setHeartStates((prevHeartStates) =>
				prevHeartStates.map((item) =>
					item.id === commentId ? previousHeartState : item,
				),
			);
			Sentry.captureException(error);
			console.error(
				"댓글 좋아요 처리 실패:",
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

	const iconRefs = useRef({});

	const [modalPosition, setModalPosition] = useState({
		x: 0,
		y: 0,
		width: 0,
		height: 0,
	});

	const handleIconPress = (commentId, commentWriterId, isPublic, isMe) => {
		const iconRef = iconRefs.current[commentId];
		if (iconRef) {
			iconRef.measureInWindow((x, y, width, height) => {
				setModalPosition({ x, y, width, height });
			});
		}
		handleCommentKebabMenu(commentId, commentWriterId, isPublic, isMe);
	};

	const handleCommentKebabMenu = (
		commentId,
		commentWriterId,
		isPublic,
		isMe,
	) => {
		const iconRef = iconRefs.current[commentId];
		if (iconRef) {
			iconRef.measureInWindow((x, y, width, height) => {
				setModalPosition({ x, y, width, height });
			});
		}
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

	const [myMemberId, setMyMemberId] = useState(null);

	useEffect(() => {
		const getMyId = async () => {
			const memberId = await getMyMemberId();
			setMyMemberId(memberId);
		};
		getMyId();
	}, []);

	useEffect(() => {
		const keyboardHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setFocusParentComment(null);
			},
		);

		return () => {
			keyboardHideListener.remove();
		};
	}, []);

	const focusParent = (commentId) => {
		onReply(commentId);
		setFocusParentComment(commentId);
	};

	const renderComment = (comment) => {
		const replies = commentList.filter(
			(reply) =>
				reply.parentComment && reply.parentComment.id === comment.id,
		);

		const commentText = showTranslations[comment.id]
			? translations[comment.id] || comment.content
			: comment.content;
		const commentHeartState = heartStates.find(
			(item) => item.id === comment.id,
		);
		const commentHeartColor = commentHeartState?.isLiked
			? CustomTheme.warningRed
			: CustomTheme.borderColor;

		return (
			<View key={comment.id}>
				<View
					style={[
						styles.ItemCommunity,
						focusParentComment === comment.id && {
							borderColor: CustomTheme.primaryMedium,
						},
					]}
				>
					<View style={styles.containerRow}>
						<View>
							<Text style={styles.textPostTitle}>
								{comment.isPublic
									? t("anonymousCheckboxLabel")
									: comment.writer.username}
							</Text>
							<Text style={styles.textPostContext}>
								{commentText}
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
									<IconHeart color={commentHeartColor} />
									<Text style={styles.text}>
										{commentHeartState?.likesCount ?? 0}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.containerText}
									onPress={() => focusParent(comment.id)}
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
										{formatDate(comment.created)}
									</Text>
								</View>
							</View>
						</View>

						<TouchableOpacity
							style={styles.iconKebabMenu}
							onPress={() =>
								handleIconPress(
									comment.id,
									comment.writer.id,
									comment.isPublic,
									myMemberId === comment.writer.id,
								)
							}
						>
							<View
								ref={(ref) =>
									(iconRefs.current[comment.id] = ref)
								}
							>
								<IconKebabMenu />
							</View>
						</TouchableOpacity>
						{modalPosition && (
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
						)}

						{translating[comment.id] ? (
							<View style={styles.textTranslation}>
								<LoadingDots />
							</View>
						) : (
							<TouchableOpacity
								style={styles.textTranslation}
								onPress={() => {
									handleTranslate(comment.id, true);
									handleToggleTranslation(comment.id, true);
								}}
							>
								<Text style={styles.textTranslation}>
									{showTranslations[comment.id]
										? t("viewOriginalButton")
										: t("translateButton")}
								</Text>
							</TouchableOpacity>
						)}

						<ModalTranslationsCount
							modalVisible={modalTranslationVisible}
							setModalVisible={setModalTranslationVisible}
							translationCount={translationCount}
						/>
					</View>
				</View>

				{replies.map((reply) => {
					const replyHeartState = heartStates.find(
						(item) => item.id === reply.id,
					);
					const replyHeartColor = replyHeartState?.isLiked
						? CustomTheme.warningRed
						: CustomTheme.borderColor;

					return (
						<View key={reply.id} style={styles.replyRow}>
							<IconReply style={{ marginRight: 4 }} />
							<View style={styles.ItemCommunity}>
								<View style={styles.containerRow}>
									<View>
										<Text style={styles.textPostTitle}>
											{reply.isPublic
												? t(
														"anonymousCheckboxLabel",
													)
												: reply.writer.username}
										</Text>
										<Text style={styles.textPostContext}>
											{replyShowTranslations[reply.id]
												? replyTranslations[reply.id] ||
													reply.content
												: reply.content}
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
													color={replyHeartColor}
												/>
												<Text style={styles.text}>
													{replyHeartState?.likesCount ??
														0}
												</Text>
											</TouchableOpacity>
											<View
												style={styles.containerText}
											>
												<Text style={styles.text}>
													{formatDate(reply.created)}
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
												reply.writer.id === myMemberId,
											)
										}
									>
										<View
											ref={(ref) =>
												(iconRefs.current[reply.id] =
													ref)
											}
										>
											<IconKebabMenu />
										</View>
									</TouchableOpacity>
									{modalPosition && (
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
									)}

									{translating[reply.id] ? (
										<View style={styles.textTranslation}>
											<LoadingDots />
										</View>
									) : (
										<TouchableOpacity
											style={styles.textTranslation}
											onPress={() => {
												handleTranslate(reply.id, false);
												handleToggleTranslation(
													reply.id,
													false,
												);
											}}
										>
											<Text
												style={styles.textTranslation}
											>
												{replyShowTranslations[reply.id]
													? t("viewOriginalButton")
													: t("translateButton")}
											</Text>
										</TouchableOpacity>
									)}

									<ModalTranslationsCount
										modalVisible={modalTranslationVisible}
										setModalVisible={
											setModalTranslationVisible
										}
										translationCount={translationCount}
									/>
								</View>
							</View>
						</View>
					);
				})}
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
		marginVertical: 4,
	},
	containerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	replyRow: {
		flexDirection: "row",
		marginRight: 24,
	},
	textPostTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		height: 17,
	},
	textPostContext: {
		...fontCaption,
		paddingRight: 8,
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
