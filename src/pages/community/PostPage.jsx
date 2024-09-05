import React, { useState, useEffect, useRef, useCallback } from "react";
import {
	TouchableOpacity,
	Text,
	TextInput,
	View,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	Alert,
	Keyboard,
	FlatList,
	Image,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import PostStyles from "@pages/community/PostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyMemberId } from "util/secureStoreUtils";
import { usePostModify } from "src/states/PostModifyContext";
import {
	getPostById,
	getCommentByPostId,
	createComment,
	createReplyComment,
	createLikePost,
	deleteLikeByPostId,
	createPostBookmark,
	deleteBookmarkByPostId,
	getProfileImageByFileName,
	translationByPostId,
} from "config/api";
import { formatDate } from "util/formatDate";

import TopBar from "@components/common/TopBar";
import IconProfileK from "@components/community/IconProfileK";
import IconKebabMenu from "@components/community/IconKebabMenu";
import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import DifeLine from "@components/community/DifeLine";
import Checkbox from "@components/common/Checkbox";
import IconChatSend from "@components/chat/IconChatSend";
import ItemComment from "@components/community/ItemComment";
import ModalKebabMenu from "@components/community/ModalKebabMenu";
import * as Sentry from "@sentry/react-native";

const PostPage = ({ route }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);

	const { postId } = route.params;
	const { updatePostModifyData } = usePostModify();

	const [memberId, setMemberId] = useState("");
	const [title, setTitle] = useState("");
	const [context, setContext] = useState("");
	const [heart, setHeart] = useState();
	const [pressHeart, setPressHeart] = useState();
	const [bookmark, setBookmark] = useState();
	const [pressBookmark, setPressBookmark] = useState();
	const [writerName, setWriterName] = useState("");
	const [isPublic, setIsPublic] = useState();
	const [created, setCreated] = useState("");
	const [isMe, setIsMe] = useState(false);
	const [images, setImages] = useState([]);
	const [comments, setComments] = useState([]);
	const [valueComment, onChangeComment] = useState("");
	const [isChecked, setIsChecked] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [parentCommentId, setParentCommentId] = useState(null);
	const [isTranslation, setIsTranslation] = useState(false);

	const commentRef = useRef(null);

	const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

	useEffect(() => {
		if (images.length === 1) {
			Image.getSize(images[0], (width, height) => {
				const screenWidth = Dimensions.get("window").width;
				const ratio = width / screenWidth;
				const imageHeight = height / ratio;
				setImageSize({ width: screenWidth, height: imageHeight });
			});
		}
	}, [images]);

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	const difeLinesCount = Math.max(1, Math.floor(comments.length / 1.5));

	const getPost = async () => {
		try {
			const myMemberId = await getMyMemberId();

			const postByIdResponse = await getPostById(postId);
			setTitle(postByIdResponse.data.title);
			setContext(postByIdResponse.data.content);
			setCreated(formatDate(postByIdResponse.data.created));
			setIsPublic(postByIdResponse.data.isPublic);
			setMemberId(postByIdResponse.data.writer.id);
			const fileNames = postByIdResponse.data.files.map(
				(file) => file.originalName,
			);
			const responses = await Promise.all(
				fileNames.map((fileName) =>
					getProfileImageByFileName(fileName),
				),
			);
			const responseImages = responses.map((response) => response.data);
			setImages(responseImages);

			if (postByIdResponse.data.isPublic === false) {
				setWriterName(postByIdResponse.data.writer.username);
			} else if (postByIdResponse.data.isPublic === true) {
				setWriterName(t("anonymousCheckboxLabel"));
			}

			if (myMemberId === postByIdResponse.data.writer.id) {
				setIsMe(true);
				updatePostModifyData({
					memberId: myMemberId,
					id: postId,
					title: postByIdResponse.data.title,
					context: postByIdResponse.data.content,
					boardType: postByIdResponse.data.boardType,
					isPublic: postByIdResponse.data.isPublic,
				});
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 제목 및 내용 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getPost();
	}, []);

	useFocusEffect(
		useCallback(() => {
			const getHeartBookmakrComment = async () => {
				try {
					const postByIdResponse = await getPostById(postId);
					setHeart(postByIdResponse.data.likesCount);
					setBookmark(postByIdResponse.data.bookmarkCount);

					const commentByIdResponse =
						await getCommentByPostId(postId);
					setComments(commentByIdResponse.data);
				} catch (error) {
					Sentry.captureException(error);
					console.error(
						"게시글 좋아요 및 북마크 조회 오류:",
						error.response ? error.response.data : error.message,
					);
					console.error(
						"댓글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};
			getHeartBookmakrComment();
		}, [pressHeart, pressBookmark, comments]),
	);

	const [scrollY, setScrollY] = useState(0);
	const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
	const [topBarPosition, setTopBarPosition] = useState({ x: 0, y: 0 });

	const handleScroll = (event) => {
		const { y } = event.nativeEvent.contentOffset;
		setScrollY(y);
	};

	const handleKebabMenuLayout = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;
		setIconPosition({ x, y, width, height });
	};

	const handleTopBarLayout = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;
		setTopBarPosition({ x, y, width, height });
	};

	const handleKebabMenu = () => {
		setModalVisible(true);
	};

	const modalPosition = {
		top:
			topBarPosition.height +
			topBarPosition.y +
			iconPosition.height -
			scrollY,
		width: iconPosition.width,
	};

	const windowHeight = Dimensions.get("window").height;

	const handleCommentSend = async () => {
		try {
			if (valueComment.trim() === "") {
				return;
			}
			if (isReplying && parentCommentId) {
				onChangeComment("");
				const commentSendResponse = await createReplyComment(
					postId,
					valueComment,
					isChecked,
					parentCommentId,
				);
				setComments((prevComments) => [
					...prevComments,
					commentSendResponse.data,
				]);
				setIsReplying(false);
				setParentCommentId(null);
			} else {
				onChangeComment("");
				const commentSendResponse = await createComment(
					postId,
					valueComment,
					isChecked,
				);
				onChangeComment("");
				setComments((prevComments) => [
					...prevComments,
					commentSendResponse.data,
				]);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"댓글 작성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleReply = (commentId) => {
		if (commentRef.current) {
			commentRef.current.focus();
		}
		setIsReplying(true);
		setParentCommentId(commentId);
	};

	const handleCancelReply = () => {
		Keyboard.dismiss();
		setIsReplying(false);
		setParentCommentId(null);
	};

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			handleCancelReply,
		);
		return () => {
			keyboardDidHideListener.remove();
		};
	}, []);

	const handleHeart = async () => {
		try {
			await createLikePost(postId);
			setHeart((prevHeart) => prevHeart + 1);
			setPressHeart(true);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 좋아요 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressHeart(false);
			setHeart(heart !== 0 ? (prevHeart) => prevHeart - 1 : 0);
		}
	};

	const handleHeartDelete = async () => {
		try {
			await deleteLikeByPostId(postId);
			setPressHeart(false);
			setHeart(heart !== 0 ? (prevHeart) => prevHeart - 1 : 0);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressHeart(true);
			setHeart((prevHeart) => prevHeart + 1);
		}
	};

	const handleBookmark = async () => {
		try {
			await createPostBookmark(postId);
			setBookmark((prevBookmark) => prevBookmark + 1);
			setPressBookmark(true);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 북마크 실패:",
				error.response ? error.response.data : error.message,
			);
			setBookmark((prevBookmark) => prevBookmark - 1);
			setPressBookmark(false);
		}
	};

	const handleDeleteBookmark = async () => {
		try {
			await deleteBookmarkByPostId(postId);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 북마크 삭제 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressBookmark(true);
			setBookmark((prevBookmark) => prevBookmark + 1);
		}
	};

	const bookmarkDeleteAlert = () => {
		Alert.alert(
			"",
			t("bookmarkCancelConfirmation"),
			[
				{
					text: t("cancelButton"),
					style: "cancel",
				},
				{
					text: t("confirmButtonText"),
					onPress: () => {
						setBookmark((prevBookmark) => prevBookmark - 1);
						setPressBookmark(false);
						handleDeleteBookmark();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const getLikedAndBookmarkedStatus = async () => {
		try {
			const response = await getPostById(postId);
			setPressHeart(response.data.isLiked);
			setPressBookmark(response.data.isBookmarked);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"좋아요 및 북마크 상태 조회 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getLikedAndBookmarkedStatus();
	}, [pressHeart, pressBookmark]);

	const handleTranslations = async () => {
		try {
			if (isTranslation) {
				setIsTranslation(false);
				getPost();
			} else {
				setIsTranslation(true);
				const response = await translationByPostId(postId);
				setTitle(response.data.translations[0].text);
				setContext(response.data.translations[1].text);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 번역 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView style={PostStyles.container}>
			<View onLayout={handleTopBarLayout}>
				<TopBar topBar={t("boardTitle")} color="#000" />
			</View>
			<ScrollView onScroll={handleScroll}>
				<View style={PostStyles.containerWhite}>
					<View style={PostStyles.containerWriterRow}>
						<View style={{ flexDirection: "row" }}>
							<IconProfileK />
							<View style={PostStyles.containerWriterText}>
								<Text style={PostStyles.textWriter}>
									{writerName}
								</Text>
								<Text style={PostStyles.textDate}>
									{created}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							onPress={handleKebabMenu}
							onLayout={handleKebabMenuLayout}
						>
							<IconKebabMenu />
						</TouchableOpacity>
						<ModalKebabMenu
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							memberId={memberId}
							postId={postId}
							isPublic={isPublic}
							isMe={isMe}
							position={modalPosition}
							onNavigation={navigation}
						/>
					</View>
					<Text style={PostStyles.textTitle}>{title}</Text>
					<Text style={PostStyles.textContext}>{context}</Text>
					{images && (
						<View style={PostStyles.containerImage}>
							{images.length === 1 ? (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(
											"EnlargeImagePage",
											{
												images: images,
											},
										)
									}
								>
									<Image
										source={{ uri: images[0] }}
										style={[
											PostStyles.singleImage,
											{
												width: imageSize.width - 48,
												height: imageSize.height,
											},
										]}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							) : (
								<FlatList
									data={images}
									renderItem={({ item, index }) => (
										<TouchableOpacity
											onPress={() =>
												navigation.navigate(
													"EnlargeImagePage",
													{
														images: images,
														initialIndex: index,
													},
												)
											}
										>
											<Image
												source={{ uri: item }}
												style={PostStyles.images}
												resizeMode="cover"
											/>
										</TouchableOpacity>
									)}
									keyExtractor={(item, index) =>
										index.toString()
									}
									horizontal={true}
								/>
							)}
						</View>
					)}
					<View style={PostStyles.containerIconRow}>
						<TouchableOpacity
							style={PostStyles.iconRow}
							onPress={
								pressHeart ? handleHeartDelete : handleHeart
							}
						>
							<IconHeart active={pressHeart} />
							<Text style={PostStyles.textIcon}>{heart}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={PostStyles.iconRow}
							onPress={
								pressBookmark
									? bookmarkDeleteAlert
									: handleBookmark
							}
						>
							<IconBookmark active={pressBookmark} />
							<Text style={PostStyles.textIcon}>{bookmark}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={PostStyles.textTranslation}
							onPress={handleTranslations}
						>
							<Text style={PostStyles.textTranslation}>
								{isTranslation
									? t("viewOriginalButton")
									: t("translateButton")}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={[
						PostStyles.containerBackground,
						{
							minHeight:
								images.length !== 0
									? windowHeight - 400
									: windowHeight - 300,
						},
					]}
				>
					<View style={PostStyles.difeLine}>
						{Array.from({ length: difeLinesCount }).map(
							(_, index) => (
								<DifeLine key={index} />
							),
						)}
					</View>
					<View style={{ marginTop: 48 }}>
						<ItemComment
							commentList={comments}
							onReply={handleReply}
						/>
					</View>
				</View>
			</ScrollView>

			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<View style={PostStyles.containerInputComment}>
					<View style={PostStyles.checkbox}>
						<Checkbox
							checked={isChecked}
							onPress={() => {
								handlePress();
							}}
							text={t("anonymousCheckboxLabel")}
							basic="true"
						/>
					</View>
					<TextInput
						style={PostStyles.textInputComment}
						ref={commentRef}
						placeholder={
							isReplying ? t("replyPrompt") : t("commentPrompt")
						}
						onChangeText={(text) => onChangeComment(text)}
						value={valueComment}
					/>
					<TouchableOpacity
						style={PostStyles.iconChatSend}
						onPress={handleCommentSend}
					>
						<IconChatSend color={CustomTheme.primaryMedium} />
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default PostPage;
