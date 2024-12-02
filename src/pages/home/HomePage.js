import React, { useState, useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";
import GestureRecognizer from "react-native-swipe-gestures";

import HomeStyles from "@pages/home/HomeStyles";
import {
	createLikeMember,
	deleteLikeMember,
	getNotifications,
} from "config/api";

import HomeBg from "@assets/images/svg_js/HomeBg.js";
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

const HomePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const { homeProfiles, canFetch, fetchAndDistributeProfiles } =
		useMatchQueue();
	const [notificationNumber, setNotificationNumber] = useState(0);

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

	const [showNewCard, setShowNewCard] = useState(false);

	const [heart, setHeart] = useState({});

	const handleCreateHeart = async () => {
		try {
			await createLikeMember(profileData.id);
			setHeart((prev) => ({
				...prev,
				[profileData.id]: true,
			}));
		} catch (error) {
			console.error(
				"멤버 좋아요 생성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleDeleteHeart = async () => {
		try {
			await deleteLikeMember(profileData.id);
			setHeart((prev) => ({
				...prev,
				[profileData.id]: false,
			}));
		} catch (error) {
			console.error(
				"멤버 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleNaviNotification = () => {
		setNotificationNumber(0);
		navigation.navigate("NotificationPage");
	};

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
			<HomeBg style={HomeStyles.homebg} preserveAspectRatio="none" />

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

			<View style={HomeStyles.textConnectWithContainer}>
				<Text style={HomeStyles.textConnect}>{t("connect")}</Text>
				<Text style={HomeStyles.textWithnewfriend}>
					{t("newFriendText")}
				</Text>
			</View>

			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
				}}
			>
				<TouchableOpacity
					onPress={handlePrevProfile}
					style={{
						opacity: canShowPrevArrow() ? 1 : 0,
						pointerEvents: canShowPrevArrow() ? "auto" : "none",
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
						{showNewCard ? (
							<View style={HomeStyles.homecardContainer}>
								<View style={HomeStyles.homecard}>
									<HomeCardBack
										memberId={profileData.id}
										fileId={profileData.profileImg?.id}
										name={profileData.username}
										onPress={() => setShowNewCard(false)}
									/>
								</View>
							</View>
						) : showMoreProfiles ? (
							<View style={HomeStyles.homecardContainer}>
								<View style={HomeStyles.homecard}>
									<HomeCardLast />
								</View>
							</View>
						) : (
							<View style={HomeStyles.homecardContainer}>
								<View style={HomeStyles.homecard}>
									<HomeCardFront
										memberId={profileData.id}
										fileId={profileData.profileImg?.id}
										tags={profileData.tags}
										introduction={profileData.bio}
										name={profileData.username}
										country={profileData.country}
										onPress={() => setShowNewCard(true)}
										isLikedOnPress={() => {
											heart[profileData.id]
												? handleDeleteHeart()
												: handleCreateHeart();
										}}
										isLikedActive={heart[profileData.id]}
									/>
								</View>
							</View>
						)}
					</GestureRecognizer>
				) : (
					<View style={HomeStyles.homecardContainer}>
						<View style={HomeStyles.homecard}>
							<HomeCardLast />
						</View>
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
								<View style={HomeStyles.backgroundHomecard}>
									<HomeCard />
								</View>
								<View
									style={[
										HomeStyles.backgroundHomecard,
										{
											transform: [{ scale: 0.8 }],
											right: -5,
											zIndex: -1,
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
				<>{renderHome()}</>
			)}
		</SafeAreaView>
	);
};

export default HomePage;
