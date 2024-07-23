import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";
import { getConnectById, requestConnectById } from "config/api";

import HomecardDifeB from "@components/home/HomecardDifeB";
import HomeProfile from "@components/home/HomeProfile";
import HomecardBackBtn from "@components/home/HomecardBackBtn.js";
import ConnectRequest from "@components/ConnectRequest";

const { fontCaption } = CustomTheme;

const HomeCardBack = ({ memberId, profileImg, name, onPress }) => {
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	const [connectStatus, setConnectStatus] = useState(undefined);

	const getConnectStatus = async () => {
		try {
			const response = await getConnectById(memberId);
			setConnectStatus(response.data.status);
		} catch (error) {
			console.error(
				"커넥트 상태 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const requestConnect = async () => {
		try {
			const response = await requestConnectById(memberId);
			setConnectStatus(response.data.status);
		} catch (error) {
			console.error(
				"커넥트 요청 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getConnectStatus();
	}, [connectStatus]);

	const pressButton = () => {
		if (connectStatus === undefined) {
			setModalVisible(true);
			requestConnect();
		}
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.homecardDifeB}>
				<HomecardDifeB />
			</View>
			<View style={styles.homecardBack}>
				<HomeProfile profile={profileImg} back={true} />
				<TouchableOpacity
					onPress={() =>
						navigation.navigate("ConnectProfilePage", {
							memberId: memberId,
						})
					}
				>
					<Text style={styles.viewProfile}>프로필 상세보기</Text>
				</TouchableOpacity>
				<View style={styles.addFriendOk}>
					<Text style={styles.textConnect}>
						<Text style={styles.textNameBold}>{name}</Text>에게
						{"\n"}커넥트 요청하시겠습니까?
					</Text>
				</View>
			</View>
			<View style={styles.homecardBackBtn}>
				<HomecardBackBtn btnText="아니오" onPress={onPress} />
				<HomecardBackBtn
					btnText={
						connectStatus === undefined
							? "신청하기"
							: connectStatus === "PENDING"
								? "요청 취소"
								: "커넥트 완료"
					}
					onPress={pressButton}
				/>
			</View>
			<ConnectRequest
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		alignItems: "center",
	},
	homecardDifeB: {
		position: "absolute",
		top: 69,
	},
	homecardBack: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		top: 30,
	},
	viewProfile: {
		...fontCaption,
		color: CustomTheme.textSecondary,
		marginTop: 20,
		textDecorationLine: "underline",
	},
	addFriendOk: {
		flexDirection: "row",
		marginTop: 33,
	},
	textConnect: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Regular",
		textAlign: "center",
	},
	textNameBold: {
		fontFamily: "NotoSansCJKkr-Bold",
	},
	homecardBackBtn: {
		position: "absolute",
		flexDirection: "row",
		bottom: 20,
	},
});

export default HomeCardBack;
