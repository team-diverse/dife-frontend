import React, { useEffect, useState, useCallback } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";

import {
	getProfileById,
	getConnectById,
	requestConnectById,
	acceptedConnectByMemberId,
	rejectedConnectByConnectId,
} from "config/api";
import { formatProfileData } from "util/formatProfileData";
import { getMyMemberId } from "util/secureStoreUtils";
import { useWebSocket } from "context/WebSocketContext";
import { createChatroom } from "util/createChatroom";
import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";

import ConnectProfileTopBar from "@components/connect/ConnectProfileTopBar";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import ConnectProfileStyles from "@pages/connect/ConnectProfileStyles";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import BottomTwoButtons from "@components/common/BottomTwoButtons";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import { useMatchQueue } from "context/MatchQueueContext";

const ConnectProfilePage = ({ route }) => {
	const { memberId } = route.params;
	const { t } = useTranslation();
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	const { chatrooms } = useWebSocket();
	const [profileData, setProfileData] = useState([]);
	const [connectStatus, setConnectStatus] = useState(undefined);
	const [connectId, setConnectId] = useState();
	const [requestSent, setRequestSent] = useState(false);
	const [name, setName] = useState();
	const [buttonText, setButtonText] = useState(t("requestButtonText"));
	const { removeProfile, likesById, toggleLike } = useMatchQueue();
	const isLiked =
		profileData && likesById[memberId] !== undefined
			? likesById[memberId]
			: profileData?.isLiked || false;

	useStatusBar({
		color: CustomTheme.primaryMedium,
		barStyle: "dark-content",
	});

	const getConnectProfile = async () => {
		try {
			const response = await getProfileById(memberId);
			const updatedData = formatProfileData([response.data]);
			setProfileData(updatedData[0]);
			setName(response.data.username);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"디테일 프로필 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

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

	useFocusEffect(
		useCallback(() => {
			getConnectProfile();
		}, []),
	);

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

	const handleAcceptedConnect = async () => {
		try {
			await acceptedConnectByMemberId(memberId);
			getConnectStatus();
		} catch (error) {
			console.error(
				"커넥트 수락 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleRejectedConnect = async () => {
		try {
			await rejectedConnectByConnectId(connectId);
			setConnectStatus(undefined);
			getConnectStatus();
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 거절 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleConnect = () => {
		if (connectStatus === undefined) {
			requestConnect();
		} else if (connectStatus === "PENDING") {
			if (requestSent) {
				handleRejectedConnect();
			} else {
				handleAcceptedConnect();
			}
		} else {
			handleConnectAlert();
		}
	};

	const handleConnectAlert = () => {
		Alert.alert(
			"",
			`${profileData.username} ${t("connectCancelAlert")}`,
			[
				{
					text: t("cancelButton"),
					style: "cancel",
				},
				{
					text: t("confirmButtonText"),
					onPress: () => {
						handleRejectedConnect();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleCreateSingleChatroom = async () => {
		try {
			const chatroomInfo = await createChatroom(
				memberId,
				name,
				chatrooms,
			);
			navigation.navigate("ChatRoomPage", {
				chatroomInfo,
			});
		} catch (error) {
			Sentry.captureException(error);
		}
	};

	useEffect(() => {
		if (requestSent) {
			const timer = setTimeout(() => {
				setButtonText(
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
		<SafeAreaView
			style={[ConnectProfileStyles.container, { alignItems: "center" }]}
		>
			<ConnectProfileTopBar
				topBar={t("profile")}
				active={isLiked}
				onPressHeart={() => toggleLike(memberId, !isLiked)}
				memberId={memberId}
			/>
			<View style={ConnectProfileStyles.scrollView}>
				<ScrollView contentContainerStyle={{ alignItems: "center" }}>
					<View style={ConnectProfileStyles.background}>
						<ConnectProfileBackground />
					</View>
					<View style={ConnectProfileStyles.simpleProfileContainer}>
						<ConnectProfile fileId={profileData.profileImg?.id} />
						<Text style={ConnectProfileStyles.username}>
							{profileData.username}
						</Text>
						<Text style={ConnectProfileStyles.countryAgeMajor}>
							{profileData.country} | {profileData.major}
						</Text>
					</View>
					<View style={ConnectProfileStyles.detailProfileContainer}>
						<Text style={ConnectProfileStyles.fontSub16}>
							{t("realName")}
						</Text>
						<Text style={ConnectProfileStyles.fontBody14}>
							{profileData.name}
						</Text>
						<Text style={ConnectProfileStyles.fontSub16}>
							{t("bio")}
						</Text>
						<View>
							<ConnectProfileIntroduction
								introduction={profileData.bio}
							/>
						</View>
						<Text style={ConnectProfileStyles.fontSub16}>
							{t("tag")}
						</Text>
						<View style={{ marginBottom: 8 }}>
							<ConnectProfileTag tag={profileData.tags} />
						</View>
						<Text style={ConnectProfileStyles.fontSub16}>
							{t("language")}
						</Text>
						<ConnectProfileLanguage
							languages={profileData.languages}
						/>
					</View>
					<View style={ConnectProfileStyles.margin} />
				</ScrollView>
			</View>
			<View
				style={[
					ConnectProfileStyles.bottomTwoButtons,
					{ paddingBottom: insets.bottom },
				]}
			>
				<BottomTwoButtons shadow="true">
					<View
						text={t("chat")}
						onPress={handleCreateSingleChatroom}
					/>
					<View text={buttonText} onPress={handleConnect} />
				</BottomTwoButtons>
			</View>
		</SafeAreaView>
	);
};

export default ConnectProfilePage;
