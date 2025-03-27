import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
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
import { useMatchQueue } from "context/MatchQueueContext";

import HomecardDifeB from "@components/home/HomecardDifeB";
import HomeProfile from "@components/home/HomeProfile";
import HomecardBackBtn from "@components/home/HomecardBackBtn";

const { fontCaption } = CustomTheme;

const HomeCardBack = ({ memberId, fileId, name, onPress }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { removeProfile } = useMatchQueue();

	const [connectStatus, setConnectStatus] = useState(undefined);
	const [connectId, setConnectId] = useState();
	const [requestSent, setRequestSent] = useState(false);
	const [buttonText1, setButtonText1] = useState(t("noButtonText"));
	const [buttonText2, setButtonText2] = useState(t("requestButtonText"));

	const getConnectStatus = async () => {
		try {
			const response = await getConnectById(memberId);
			setConnectStatus(response.data.status);
			setConnectId(response.data.id);

			const myMebmberId = await getMyMemberId();
			setRequestSent(response.data.from_member.id === myMebmberId);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 상태 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getConnectStatus();
	}, []);

	const requestConnect = async () => {
		try {
			const response = await requestConnectById(memberId);
			setConnectStatus(response.data.status);
			getConnectStatus();
			removeProfile(memberId);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 요청 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const deleteConnect = async () => {
		try {
			await rejectedConnectByConnectId(connectId);
			setConnectStatus(undefined);
			getConnectStatus();
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
			requestConnect();
		} else {
			deleteConnect();
		}
	};

	const translation = t("connectRequestConfirmation", { username: name });
	const [beforeUsername, afterUsername] = translation.split(name);

	const translation2 = t("connectRequestSuccess", { username: name });
	const [beforeUsername2, afterUsername2] = translation2.split(name);

	useEffect(() => {
		if (requestSent) {
			const timer = setTimeout(() => {
				setButtonText1(
					connectStatus === undefined
						? t("noButtonText")
						: t("backButton"),
				);
				setButtonText2(
					connectStatus === undefined
						? t("requestButtonText")
						: connectStatus === "PENDING"
							? requestSent
								? t("cancelRequestButtonText")
								: t("acceptRequestButtonText")
							: t("cancelConnectButtonText"),
				);
			}, 100);
			return () => clearTimeout(timer);
		}
	}, [requestSent, connectStatus, t]);

	return (
		<View style={styles.rectangle}>
			<View style={styles.homecardDifeB}>
				<HomecardDifeB />
			</View>
			<View style={styles.homecardBack}>
				<HomeProfile fileId={fileId} back={true} />
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
				<HomecardBackBtn btnText={buttonText1} onPress={onPress} />
				<HomecardBackBtn btnText={buttonText2} onPress={pressButton} />
			</View>
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
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 6,
			},
			android: {
				elevation: 3,
			},
		}),
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
