import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import GestureRecognizer from "react-native-swipe-gestures";

import HomeStyles from "@pages/home/HomeStyles";
import { getNotifications } from "config/api";
import { useStatusBar } from "util/useStatusBar";
import LogoBr from "@components/Logo/LogoBr.js";
import Notification32 from "@components/Icon32/Notification32.js";
import HomeSchEv from "@components/home/HomeSchEv.js";
import HomeSchoolInfo from "@components/home/HomeScoolInfo.js";
import HomeEvent from "@components/home/HomeEvent.js";
import HomeArrow from "@components/home/HomeArrow.js";
import HomeCardBack from "@components/home/HomeCardBack";
import HomeCardFront from "@components/home/HomeCardFront";
import HomeCard from "@components/home/HomeCard";
import HomeCardLast from "@components/home/HomeCardLast";
import { useMatchQueue } from "context/MatchQueueContext";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";

const HomePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const {
		homeProfiles,
		canFetch,
		fetchAndDistributeProfiles,
		likesById,
		toggleLike,
	} = useMatchQueue();
	const [notificationNumber, setNotificationNumber] = useState(0);

	useStatusBar({
		color: "#0029F4",
		barStyle: "light-content",
	});

	const getNotificationNumber = async () => {
		try {
			const deviceId = await SecureStore.getItemAsync("deviceId");
			const notificationResponse = await getNotifications(deviceId);
			const count = await SecureStore.getItemAsync(
				"readNotificationCount",
			);
			const unreadNotificationCount =
				notificationResponse.data.length -
				(count ? parseInt(count, 10) : 0);
			setNotificationNumber(
				unreadNotificationCount > 0 ? unreadNotificationCount : 0,
			);
		} catch (error) {
			console.error(
				"홈페이지 알림 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getNotificationNumber();
		}, []),
	);

	const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
	const [showMoreProfiles, setShowMoreProfiles] = useState(false);

	const handleNextProfile = () => {
		setShowNewCard(false);
		if (currentProfileIndex < homeProfiles.length - 1) {
			setCurrentProfileIndex(currentProfileIndex + 1);
		} else if (currentProfileIndex === homeProfiles.length - 1) {
			setShowMoreProfiles(true);
		} else if (showMoreProfiles && canFetch) {
			fetchAndDistributeProfiles();
			setShowMoreProfiles(false);
			setCurrentProfileIndex(0);
		}
	};

	const handlePrevProfile = () => {
		setShowNewCard(false);
		if (showMoreProfiles) {
			setShowMoreProfiles(false);
		} else if (currentProfileIndex > 0) {
			setCurrentProfileIndex(currentProfileIndex - 1);
		}
	};

	useEffect(() => {
		if (homeProfiles.length > 0 && showMoreProfiles) {
			setShowMoreProfiles(false);
			setCurrentProfileIndex(0);
		}
	}, [homeProfiles]);

	useEffect(() => {
		setShowNewCard(false);
		if (
			currentProfileIndex >= homeProfiles.length &&
			currentProfileIndex > 0
		) {
			setCurrentProfileIndex((prev) => prev - 1);
		}
	}, [homeProfiles.length, currentProfileIndex]);

	const profileData = homeProfiles[currentProfileIndex];

	const isLiked =
		profileData && likesById[profileData.id] !== undefined
			? likesById[profileData.id]
			: profileData?.liked;

	const [showNewCard, setShowNewCard] = useState(false);

	const handleNaviNotification = () => {
		setNotificationNumber(0);
		navigation.navigate("NotificationPage");
	};

	const { width: screenWidth } = Dimensions.get("window");
	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	const canShowPrevArrow = () => {
		return (
			(homeProfiles.length > 0 && currentProfileIndex > 0) ||
			showMoreProfiles
		);
	};

	const canShowNextArrow = () => {
		return (
			!showMoreProfiles && currentProfileIndex <= homeProfiles.length - 1
		);
	};

	const renderHome = () => (
		<LinearGradient
			style={HomeStyles.linearGradient}
			colors={["#0029F4", "#6199C1", "#6199C1"]}
		>
			<View style={HomeStyles.containerCircle}>
				<ConnectProfileBackground />
			</View>

			<View style={HomeStyles.topContainer}>
				<View style={HomeStyles.logo}>
					<LogoBr />
				</View>
				<TouchableOpacity
					style={HomeStyles.notify}
					onPress={handleNaviNotification}
				>
					<Notification32 count={notificationNumber} />
				</TouchableOpacity>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TouchableOpacity
					onPress={handlePrevProfile}
					style={{
						opacity: canShowPrevArrow() ? 1 : 0,
						pointerEvents: canShowPrevArrow() ? "auto" : "none",
						zIndex: 10,
					}}
				>
					<HomeArrow style={{ transform: [{ scaleX: -1 }] }} />
				</TouchableOpacity>

				{homeProfiles.length > 0 ? (
					<GestureRecognizer
						onSwipeLeft={handleNextProfile}
						onSwipeRight={handlePrevProfile}
						style={{ zIndex: 10 }}
					>
						<View style={HomeStyles.textConnectWithContainer}>
							<Text style={HomeStyles.textConnect}>
								{t("connect")}
							</Text>
							<Text style={HomeStyles.textWithnewfriend}>
								{t("newFriendText")}
							</Text>
						</View>

						{showNewCard ? (
							<View style={HomeStyles.homecard}>
								<HomeCardBack
									memberId={profileData.id}
									fileId={profileData.profileImg?.id}
									name={profileData.username}
									onPress={() => setShowNewCard(false)}
								/>
							</View>
						) : showMoreProfiles ? (
							<View style={HomeStyles.homecard}>
								<HomeCardLast />
							</View>
						) : (
							<View style={HomeStyles.homecard}>
								<HomeCardFront
									memberId={profileData.id}
									fileId={profileData.profileImg?.id}
									tags={profileData.tags}
									introduction={profileData.bio}
									name={profileData.username}
									country={profileData.country}
									onPress={() => setShowNewCard(true)}
									isLikedOnPress={() =>
										toggleLike(profileData.id, !isLiked)
									}
									isLikedActive={isLiked}
								/>
							</View>
						)}
					</GestureRecognizer>
				) : (
					<View style={HomeStyles.homecard}>
						<HomeCardLast />
					</View>
				)}

				{homeProfiles.length > 0 && !showMoreProfiles && (
					<>
						{currentProfileIndex === homeProfiles.length - 1 ? (
							<View style={HomeStyles.backgroundHomecard}>
								<HomeCard />
							</View>
						) : currentProfileIndex < homeProfiles.length - 1 ? (
							<>
								<View
									style={[
										HomeStyles.backgroundHomecard,
										{
											right:
												Platform.OS === "android"
													? screenWidth * 0.1
													: 30,
										},
									]}
								>
									<HomeCard />
								</View>
								<View
									style={[
										HomeStyles.backgroundHomecard,
										{
											transform: [{ scale: 0.8 }],
											right:
												Platform.OS === "android"
													? screenWidth * 0.01
													: -5,
											zIndex: 0,
										},
									]}
								>
									<HomeCard />
								</View>
							</>
						) : null}
					</>
				)}

				<TouchableOpacity
					onPress={handleNextProfile}
					style={{
						opacity: canShowNextArrow() ? 1 : 0,
						pointerEvents: canShowNextArrow() ? "auto" : "none",
						zIndex: 10,
					}}
				>
					<HomeArrow />
				</TouchableOpacity>
			</View>

			<View
				style={[
					HomeStyles.containerShoolInfoEvents,
					isSmallScreen && { marginBottom: 36 },
				]}
			>
				<TouchableOpacity
					style={HomeStyles.containerShoolInfoEventsMargin}
					onPress={() => navigation.navigate("PreparingPage")}
				>
					<HomeSchEv />
					<Text style={HomeStyles.textSchoolInfoEvents}>
						{t("schoolInfo")}
					</Text>
					<HomeSchoolInfo style={HomeStyles.iconSchoolInfo} />
				</TouchableOpacity>
				<TouchableOpacity
					style={HomeStyles.containerShoolInfoEventsMargin}
					onPress={() => navigation.navigate("EventPage")}
				>
					<HomeSchEv />
					<Text style={HomeStyles.textSchoolInfoEvents}>
						{t("events")}
					</Text>
					<HomeEvent style={HomeStyles.iconEvents} />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);

	return (
		<SafeAreaView style={HomeStyles.container}>
			{isSmallScreen ? (
				<>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						{renderHome()}
					</ScrollView>
					<View style={HomeStyles.containerWhite} />
				</>
			) : (
				<>
					{renderHome()}
					<View style={HomeStyles.containerWhite} />
				</>
			)}
		</SafeAreaView>
	);
};

export default HomePage;
