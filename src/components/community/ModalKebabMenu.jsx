import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CustomTheme } from "@styles/CustomTheme";
import Modal from "react-native-modal";
import InfoCircle from "@components/common/InfoCircle";
import Report from "@components/Report";
import PostModifyPage from "@pages/community/PostModifyPage";
import { deletePost } from "config/api";

const { fontBody14 } = CustomTheme;

const ModalKebabMenu = ({
	modalVisible,
	setModalVisible,
	id,
	isPublic,
	isMe,
	position,
}) => {
	const rectangleStyle = () =>
		isMe
			? styles.rectangle
			: isPublic
				? styles.rectangle
				: styles.rectangleIsPublic;

	const navigation = useNavigation();

	const handleModify = () => {
		setModalVisible(false);
		navigation.navigate(PostModifyPage);
	};

	const handleDelete = () => {
		Alert.alert(
			"삭제",
			"이 게시글을 삭제하시겠습니까?",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						deletePost(id)
							.then(() => {
								navigation.goBack();
							})
							.catch((error) => {
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

	const [modalReportVisible, setModalReportVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
	};

	return (
		<Modal
			isVisible={modalVisible}
			style={[
				styles.modal,
				{ top: position.top, right: position.width / 2 },
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
		>
			<View style={rectangleStyle()}>
				{isMe ? (
					<>
						<TouchableOpacity onPress={handleModify}>
							<Text style={styles.textIsMe}>글 수정</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity onPress={handleDelete}>
							<Text style={styles.textIsMe}>글 삭제</Text>
						</TouchableOpacity>
					</>
				) : isPublic ? (
					<>
						<TouchableOpacity>
							<Text style={styles.textIsMe}>차단</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity style={styles.containerReport}>
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
					</>
				) : (
					<>
						<TouchableOpacity>
							<Text style={styles.textIsMe}>프로필 상세</Text>
						</TouchableOpacity>
						<View style={styles.line} />
						<TouchableOpacity>
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
							reportTitle="개인 프로필 신고"
							report1="혐오적인 컨텐츠"
							report2="욕설/도배"
							report3="다른 사람을 사칭함"
							report4="기타"
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
		alignItems: "flex-end",
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
