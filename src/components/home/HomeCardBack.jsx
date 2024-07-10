import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import HomecardDifeB from "@components/home/HomecardDifeB";
import HomeProfile from "@components/home/HomeProfile";
import HomecardBackBtn from "@components/home/HomecardBackBtn.js";
import ConnectRequest from "@components/ConnectRequest";

const { fontCaption } = CustomTheme;

const HomeCardBack = ({ profileImg, name, onPress }) => {
	const [modalVisible, setModalVisible] = useState(false);

	const pressButton = () => {
		setModalVisible(true);
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.homecardDifeB}>
				<HomecardDifeB />
			</View>
			<View style={styles.homecardBack}>
				<HomeProfile profile={profileImg} back={true} />
				<Text style={styles.viewProfile}>프로필 상세보기</Text>
				<View style={styles.addFriendOk}>
					<Text style={styles.textConnect}>
						<Text style={styles.textNameBold}>{name}</Text>에게
						{"\n"}커넥트 요청하시겠습니까?
					</Text>
				</View>
			</View>
			<View style={styles.homecardBackBtn}>
				<HomecardBackBtn btnText="아니오" onPress={onPress} />
				<HomecardBackBtn btnText="신청하기" onPress={pressButton} />
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
