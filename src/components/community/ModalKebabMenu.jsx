import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";
import {
	deletePost,
	deleteCommentByCommentId,
	createBlockMemberByMemberId,
	createBlockPostByPostId,
} from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import Report from "@components/Report";
import PostModifyPage from "@pages/community/PostModifyPage";
import IconTrashCan from "./IconTrashCan";
import * as Sentry from "@sentry/react-native";

const { fontBody14 } = CustomTheme;

const ModalKebabMenu = ({
	modalVisible,
	setModalVisible,
	memberId,
	postId,
	commentId,
	isPublic,
	isMe,
	position,
	onNavigation,
}) => {
	const navigation = useNavigation();

	const rectangleStyle = () => {
		if (isMe) {
			return commentId ? styles.rectangleCommentIsMe : styles.rectangle;
		}
		return isPublic ? styles.rectangle : styles.rectangleIsPublic;
	};

	const handleModify = () => {
		setModalVisible(false);
		navigation.navigate(PostModifyPage);
	};

	const handleDelete = () => {
		setModalVisible(false);
		Alert.alert(
			"삭제",
			"이 게시글을 삭제하시겠습니까?",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						deletePost(postId)
							.then(() => {
								onNavigation.goBack();
							})
							.catch((error) => {
								Sentry.captureException(error);
								console.error(
									"게시글 삭제 오류:",
									error.response
										? error.response.data
										: error.message,
								);
							});
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleDeleteComment = async () => {
		try {
			await deleteCommentByCommentId(commentId);
		} catch (error) {
			console.error(
				"댓글 삭제 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleDeleteCommentAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"삭제",
			"이 댓글을 삭제하시겠습니까?",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						handleDeleteComment();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const [modalReportVisible, setModalReportVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
	};

	const handleReportComplete = () => {
		setModalReportVisible(false);
		setModalVisible(false);
	};

	const handleDetailProfile = () => {
		setModalVisible(false);
		navigation.navigate("ConnectProfilePage", { memberId: memberId });
	};

	const handleBlockAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			"사용자를 차단하겠습니까?",
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						handleBlock();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleBlock = async () => {
		try {
			await createBlockMemberByMemberId(memberId);
			Alert.alert(
				"",
				"사용자를 차단하였습니다.",
				[
					{
						text: "확인",
						onPress: () => {
							setModalVisible(false);
							onNavigation.goBack();
						},
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			console.error(
				"차단 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleBlockPostAlert = () => {
		setModalVisible(false);
		Alert.alert(
			"",
			`게시글을 차단하면 다시 해제할 수 없으며, 차단된 게시글은 목록에서 보이지 않습니다.`,
			[
				{
					text: "취소",
					style: "cancel",
				},
				{
					text: "확인",
					onPress: () => {
						handleBlockPost();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleBlockPost = async () => {
		try {
			await createBlockPostByPostId(postId);
			Alert.alert(
				"",
				"게시글을 차단하였습니다.",
				[
					{
						text: "확인",
					},
				],
				{ cancelable: false },
			);
		} catch (error) {
			console.error(
				"차단 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={[
				styles.modal,
				commentId
					? {
							top: position.top,
							left: position.left - 115,
						}
					: {
							top: position.top,
							right: position.width,
							alignItems: "flex-end",
						},
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={rectangleStyle()}>
				{isMe ? (
					<>
						{commentId ? (
							<TouchableOpacity
								style={styles.containerDeleteComment}
								onPress={handleDeleteCommentAlert}
							>
								<Text style={styles.textIsMe}>댓글 삭제</Text>
								<IconTrashCan />
							</TouchableOpacity>
						) : (
							<>
								<TouchableOpacity onPress={handleModify}>
									<Text style={styles.textIsMe}>글 수정</Text>
								</TouchableOpacity>
								<View style={styles.line} />
								<TouchableOpacity onPress={handleDelete}>
									<Text style={styles.textIsMe}>글 삭제</Text>
								</TouchableOpacity>
							</>
						)}
					</>
				) : isPublic ? (
					<>
						<TouchableOpacity onPress={handleBlockPostAlert}>
							<Text style={styles.textIsMe}>차단</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity
							style={styles.containerReport}
							onPress={handleReport}
						>
							<Text
								style={[
									styles.textIsMe,
									{ color: CustomTheme.warningRed },
								]}
							>
								신고
							</Text>
							<InfoCircle color={CustomTheme.warningRed} />
						</TouchableOpacity>
						<Report
							modalVisible={modalReportVisible}
							setModalVisible={setModalReportVisible}
							reportTitle={
								commentId ? "댓글 신고" : "게시글 신고"
							}
							{...(commentId
								? { commentId: commentId }
								: { postId: postId })}
							onReportComplete={handleReportComplete}
						/>
					</>
				) : (
					<>
						<TouchableOpacity onPress={handleDetailProfile}>
							<Text style={styles.textIsMe}>프로필 상세</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity onPress={handleBlockAlert}>
							<Text style={styles.textIsMe}>차단</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity
							style={styles.containerReport}
							onPress={handleReport}
						>
							<Text
								style={[
									styles.textIsMe,
									{ color: CustomTheme.warningRed },
								]}
							>
								신고
							</Text>
							<InfoCircle color={CustomTheme.warningRed} />
						</TouchableOpacity>
						<Report
							modalVisible={modalReportVisible}
							setModalVisible={setModalReportVisible}
							reportTitle={
								commentId ? "댓글 신고" : "게시글 신고"
							}
							{...(commentId
								? { commentId: commentId }
								: { postId: postId })}
							onReportComplete={handleReportComplete}
						/>
					</>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-start",
	},
	rectangle: {
		width: 95,
		height: 72,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	rectangleIsPublic: {
		width: 95,
		height: 110,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	rectangleCommentIsMe: {
		width: 95,
		height: 36,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 10,
		position: "relative",
	},
	containerDeleteComment: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 11,
	},
	line: {
		width: 86,
		height: 1,
		backgroundColor: CustomTheme.bgList,
		marginHorizontal: 5,
	},
	textIsMe: {
		...fontBody14,
		color: CustomTheme.textSecondary,
		marginLeft: 11,
		marginVertical: 8,
	},
	containerReport: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginRight: 11,
	},
});

export default ModalKebabMenu;
