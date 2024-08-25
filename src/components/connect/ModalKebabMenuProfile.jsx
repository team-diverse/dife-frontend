import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Modal from "react-native-modal";

import { CustomTheme } from "@styles/CustomTheme";
import { blockMember } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import Report from "@components/Report";

const { fontBody14 } = CustomTheme;

const ModalKebabMenuProfile = ({
	modalVisible,
	setModalVisible,
	memberId,
	position,
}) => {
	const [modalReportVisible, setModalReportVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
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
			await blockMember(memberId);
			Alert.alert(
				"",
				"사용자를 차단하였습니다.",
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
				{ top: position.top * 2, right: position.width },
			]}
			onBackdropPress={() => setModalVisible(false)}
			backdropColor="rgba(0, 0, 0, 0.3)"
			animationIn="fadeIn"
			animationOut="fadeOut"
		>
			<View style={styles.rectangleIsPublic}>
				<TouchableOpacity>
					<Text style={styles.textIsMe}>프로필 공유</Text>
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
					reportTitle="개인 프로필 신고"
					memberId={memberId}
				/>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "flex-start",
		alignItems: "flex-end",
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

export default ModalKebabMenuProfile;
