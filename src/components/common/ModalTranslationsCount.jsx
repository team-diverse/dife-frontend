import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import { CustomTheme } from "@styles/CustomTheme";

import IconTranslation from "@components/common//IconTranslation";
import ProfileK from "@components/member/ProfileK";

const { fontSub16, fontSub14 } = CustomTheme;

const ModalTranslationsCount = ({
	modalVisible,
	setModalVisible,
	translationCount,
}) => {
	const handleClose = () => {
		setModalVisible(false);
	};

	return (
		<Modal
			isVisible={modalVisible}
			onBackdropPress={() => setModalVisible(false)}
			style={styles.modal}
		>
			<View style={styles.rectangle}>
				{translationCount === 0 ? (
					<View style={styles.container}>
						<IconTranslation style={styles.iconTranslation} />
						<Text style={styles.textTitle}>번역 기능 안내</Text>
						<View>
							<Text style={styles.textSubTitle}>
								Dife는{" "}
								<Text style={styles.textSubTitleBlue}>
									15회
								</Text>
								{"\n"}무료 번역 서비스를 제공합니다!
							</Text>
							<Text style={styles.textContent}>
								번역 서비스 사용 페이지: {"\n"}채팅, 커뮤니티,
								북마크
							</Text>
							<Text style={styles.textContent}>
								제공 언어: {"\n"}영어, 한국어, 중국어, 일본어,
								스페인어
							</Text>
						</View>
						<TouchableOpacity
							style={styles.rectangleBlue}
							onPress={handleClose}
						>
							<Text style={styles.textRectangleBlue}>확인</Text>
						</TouchableOpacity>
					</View>
				) : (
					<View style={styles.container}>
						<Text style={styles.textTitle}>
							번역 횟수 소진 안내
						</Text>
						<View>
							<Text style={styles.textSubTitle}>
								Dife는 무료 번역 서비스 횟수가{"\n"}모두
								소진되었습니다 :(
							</Text>
							<Text
								style={[
									styles.textSubTitleBlue,
									{
										fontSize: 20,
										lineHeight: 24,
										marginTop: 7,
									},
								]}
							>
								15/15
							</Text>
							<View style={styles.containerIconText}>
								<ProfileK />
								<Text style={styles.textBetaTest}>
									베타테스트 기간에는{"\n"}유료구독 서비스를
									제공하지 않습니다.
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={styles.rectangleBlue}
							onPress={handleClose}
						>
							<Text style={styles.textRectangleBlue}>확인</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		position: "relative",
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
	iconTranslation: {
		position: "absolute",
		top: 112,
		right: 0,
		zIndex: -10,
	},
	textTitle: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 21,
	},
	textSubTitle: {
		...fontSub16,
		color: CustomTheme.textPrimary,
		marginTop: 24,
	},
	textSubTitleBlue: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
	textContent: {
		...fontSub14,
		color: CustomTheme.textSecondary,
		marginTop: 30,
	},
	containerIconText: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 47,
	},
	textBetaTest: {
		fontSize: 10,
		lineHeight: 12,
		fontFamily: "NotoSansCJKkr-Medium",
		color: "#B0D0FF",
		marginLeft: 12,
		marginBottom: 20,
	},
	rectangleBlue: {
		position: "absolute",
		bottom: 34,
		width: 220,
		height: 37,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: CustomTheme.primaryMedium,
	},
	textRectangleBlue: {
		...fontSub14,
		color: "#FBFBFB",
	},
});

export default ModalTranslationsCount;
