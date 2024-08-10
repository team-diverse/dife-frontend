import React, { useState, useEffect } from "react";
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
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import PostStyles from "@pages/community/PostStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { usePostModify } from "src/states/PostModifyContext";
import {
	getPostById,
	getCommentById,
	postCommentSend,
	createLike,
	createBookmark,
	getLikedPost,
	getBookmarkPost,
} from "config/api";

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

const PostPage = ({ route }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const { postId } = route.params;
	const { onboardingData } = useOnboarding();
	const { updatePostModifyData } = usePostModify();

	const [memberId, setMemberId] = useState("");
	const [title, setTitle] = useState("");
	const [context, setContext] = useState("");
	const [heart, setHeart] = useState();
	const [bookmark, setBookmark] = useState();
	const [writerName, setWriterName] = useState("");
	const [isPublic, setIsPublic] = useState();
	const [created, setCreated] = useState("");
	const [isMe, setIsMe] = useState(false);
	const [comments, setComments] = useState([]);
	const [valueComment, onChangeComment] = useState("");
	const [isChecked, setIsChecked] = useState(false);

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	const difeLinesCount = Math.floor(comments.length / 1.5);

	const date = (date) => {
		const datePart = date.split("T")[0];
		const monthDay = datePart.slice(5);
		return monthDay.replace("-", "/");
	};

	useFocusEffect(
		React.useCallback(() => {
			const postComment = async () => {
				try {
					const postByIdResponse = await getPostById(postId);
					setTitle(postByIdResponse.data.title);
					setContext(postByIdResponse.data.content);
					setHeart(postByIdResponse.data.likesCount);
					setBookmark(postByIdResponse.data.bookmarkCount);
					setCreated(date(postByIdResponse.data.created));
					setIsPublic(postByIdResponse.data.isPublic);
					setMemberId(postByIdResponse.data.writer.id);

					if (postByIdResponse.data.isPublic === false) {
						setWriterName(postByIdResponse.data.writer.username);
					} else if (postByIdResponse.data.isPublic === true) {
						setWriterName("익명");
					}

					if (onboardingData.id === postByIdResponse.data.writer.id) {
						setIsMe(true);
						updatePostModifyData({
							memberId: postByIdResponse.data.writer.id,
							id: postId,
							title: postByIdResponse.data.title,
							context: postByIdResponse.data.content,
							boardType: postByIdResponse.data.boardType,
							isPublic: postByIdResponse.data.isPublic,
						});
					}

<<<<<<< HEAD
					const commentByIdResponse = await getCommentById(id);
					setComments(commentByIdResponse.data);

					console.log("게시글 및 댓글 조회 성공");
=======
					const commentByIdResponse =
						await getCommentByPostId(postId);
					setComments(commentByIdResponse.data);
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
				} catch (error) {
					console.error(
						"게시글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
					console.error(
						"댓글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			postComment();
		}, []),
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
			iconPosition.height +
			iconPosition.y +
			topBarPosition.height +
			topBarPosition.y -
			scrollY,
		width: iconPosition.width,
	};

	const windowHeight = Dimensions.get("window").height;

	const handleCommentSend = async () => {
		try {
<<<<<<< HEAD
			const commentSendResponse = await postCommentSend(
				id,
=======
			const commentSendResponse = await createComment(
				postId,
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
				valueComment,
				isChecked,
			);
			console.log("댓글 작성 성공");

			onChangeComment("");
			setComments((prevComments) => [
				...prevComments,
				commentSendResponse.data,
			]);
		} catch (error) {
			console.error(
				"댓글 작성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const [pressHeart, setPressHeart] = useState();

	const handleHeart = async () => {
		try {
<<<<<<< HEAD
			await createLike("POST", id);
			console.log("게시글 좋아요 성공");
=======
			await createLikePost(postId);
			setHeart((prevHeart) => prevHeart + 1);
			setPressHeart(true);
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
		} catch (error) {
			console.error(
				"게시글 좋아요 실패:",
				error.response ? error.response.data : error.message,
			);
			setHeart((prevHeart) => prevHeart - 1);
			setPressHeart(false);
		}
	};

<<<<<<< HEAD
	const heartAlert = () => {
		Alert.alert(
			"",
			"이 게시물에 좋아요를 누르시겠습니까?",
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						setHeart((prevHeart) => prevHeart + 1);
						setPressHeart(true);
						handleHeart();
					},
				},
			],
			{ cancelable: false },
		);
=======
	const handleHeartDelete = async () => {
		try {
			await deleteLikeByPostId(postId);
			setPressHeart(false);
			setHeart(heart !== 0 ? (prevHeart) => prevHeart - 1 : 0);
		} catch (error) {
			console.error(
				"게시글 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressHeart(true);
			setHeart((prevHeart) => prevHeart + 1);
		}
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
	};

	const likedPosts = async () => {
		try {
			const response = await getLikedPost();
			const likedPostIdList = response.data.map((item) => item.id);
			setPressHeart(likedPostIdList.includes(postId));
		} catch (error) {
			console.error(
				"좋아요 상태 조회 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const [pressBookmark, setPressBookmark] = useState();

	const handleBookmark = async () => {
		try {
<<<<<<< HEAD
			await createBookmark(null, null, id);
			console.log("게시글 북마크 성공");
=======
			await createPostBookmark(postId);
			setBookmark((prevBookmark) => prevBookmark + 1);
			setPressBookmark(true);
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
		} catch (error) {
			console.error(
				"게시글 북마크 실패:",
				error.response ? error.response.data : error.message,
			);
			setBookmark((prevBookmark) => prevBookmark - 1);
			setPressBookmark(false);
		}
	};

<<<<<<< HEAD
	const bookmarkAlert = () => {
=======
	const handleDeleteBookmark = async () => {
		try {
			await deleteBookmarkByPostId(postId);
		} catch (error) {
			console.error(
				"게시글 북마크 삭제 실패:",
				error.response ? error.response.data : error.message,
			);
			setPressBookmark(true);
			setBookmark((prevBookmark) => prevBookmark + 1);
		}
	};

	const bookmarkDeleteAlert = () => {
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
		Alert.alert(
			"",
			"이 게시물을 북마크하시겠습니까?",
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						setBookmark((prevBookmark) => prevBookmark + 1);
						setPressBookmark(true);
						handleBookmark();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const bookmarkedPosts = async () => {
		try {
<<<<<<< HEAD
			const response = await getBookmarkPost();
			const bookmarkedPostIdList = response.data.map((item) => item.id);
			setPressBookmark(bookmarkedPostIdList.includes(id));
=======
			const response = await getBookmarkedPost();
			const bookmarkedPostIdList = response.data.map(
				(item) => item.post.id,
			);
			setPressBookmark(bookmarkedPostIdList.includes(postId));
>>>>>>> c3ddea7 (feat: 실명 게시글일 때, 프로필 상세를 클릭하면 프로필 상세 페이지로 연결되도록 및 변수명 수정)
		} catch (error) {
			console.error(
				"북마크 상태 조회 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		likedPosts();
		bookmarkedPosts();
	}, [id]);

	return (
		<SafeAreaView style={PostStyles.container}>
			<View onLayout={handleTopBarLayout}>
				<TopBar topBar="게시판" color="#000" />
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
						/>
					</View>
					<Text style={PostStyles.textTitle}>{title}</Text>
					<Text style={PostStyles.textContext}>{context}</Text>
					<View style={PostStyles.containerIconRow}>
						<TouchableOpacity
							style={PostStyles.iconRow}
							onPress={heartAlert}
						>
							<IconHeart active={pressHeart} />
							<Text style={PostStyles.textIcon}>{heart}</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={PostStyles.iconRow}
							onPress={bookmarkAlert}
						>
							<IconBookmark active={pressBookmark} />
							<Text style={PostStyles.textIcon}>{bookmark}</Text>
						</TouchableOpacity>
						<TouchableOpacity style={PostStyles.textTranslation}>
							<Text style={PostStyles.textTranslation}>
								번역하기
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View
					style={[
						PostStyles.containerBackground,
						{ minHeight: windowHeight - 300 },
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
						<ItemComment commentList={comments} id={postId} />
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
							text="익명"
							basic="true"
						/>
					</View>
					<TextInput
						style={PostStyles.textInputComment}
						placeholder="댓글을 입력해주세요"
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
