import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import {
	getConnectById,
	requestConnectById,
	rejectedConnectByConnectId,
} from "config/api";
import { getMyMemberId } from "util/secureStoreUtils";

import HomecardDifeB from "@components/home/HomecardDifeB";
import HomeProfile from "@components/home/HomeProfile";
import HomecardBackBtn from "@components/home/HomecardBackBtn.js";
import ModalRequest from "@components/common/ModalRequest";

const { fontCaption } = CustomTheme;

const HomeCardBack = ({ memberId, profileImg, name, onPress }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	const [connectStatus, setConnectStatus] = useState(undefined);
	const [connectId, setConnectId] = useState();
	const [requestSent, setRequestSent] = useState(false);

	const getConnectStatus = async () => {
		try {
			const response = await getConnectById(memberId);
			setConnectStatus(response.data.status);
			setConnectId(response.data.id);

			const myMebmberId = await getMyMemberId();
			setRequestSent(response.data.from_member.id == myMebmberId);
		} catch (error) {
			Sentry.captureException(error);
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
			Sentry.captureException(error);
			console.error(
				"커넥트 요청 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getConnectStatus();
	}, [connectStatus]);

	const deleteConnect = async () => {
		try {
			await rejectedConnectByConnectId(connectId);
			setConnectStatus(undefined);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 삭제 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const pressButton = () => {
		if (connectStatus === undefined) {
			setModalVisible(true);
			requestConnect();
		} else {
			deleteConnect();
		}
	};

	const translation = t("connectRequestConfirmation", { username: name });
	const [beforeUsername, afterUsername] = translation.split(name);

	const translation2 = t("connectRequestSuccess", { username: name });
	const [beforeUsername2, afterUsername2] = translation2.split(name);
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
					<Text style={styles.viewProfile}>
						{t("viewProfileText")}
					</Text>
				</TouchableOpacity>
				<View style={styles.addFriendOk}>
					<Text style={styles.textConnect}>
						{connectStatus === undefined ? (
							<>
								<Text>{beforeUsername}</Text>
								<Text style={styles.textNameBold}>{name}</Text>
								<Text>{afterUsername}</Text>
							</>
						) : (
							<>
								<Text>{beforeUsername2}</Text>
								<Text style={styles.textNameBold}>{name}</Text>
								<Text>{afterUsername2}</Text>
							</>
						)}
					</Text>
				</View>
			</View>
			<View style={styles.homecardBackBtn}>
				<HomecardBackBtn
					btnText={
						connectStatus === undefined
							? t("noButtonText")
							: t("backButton")
					}
					onPress={onPress}
				/>
				<HomecardBackBtn
					btnText={
						connectStatus === undefined
							? t("requestButtonText")
							: connectStatus === "PENDING"
								? requestSent
									? t("cancelRequestButtonText")
									: t("acceptRequestButtonText")
								: t("cancelConnectButtonText")
					}
					onPress={pressButton}
				/>
			</View>
			<ModalRequest
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				textLoading={t("connectRequestInProgress")}
				textComplete={t("connectRequestComplete")}
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
		marginHorizontal: 30,
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
