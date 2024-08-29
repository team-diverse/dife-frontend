import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

import HomeStyles from "@pages/home/HomeStyles.js";
import {
	getRandomMembersByCount,
	createLikeMember,
	deleteLikeMember,
	getNotifications,
} from "config/api";
import { formatProfileData } from "util/formatProfileData";

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
import * as Sentry from "@sentry/react-native";

const HomePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [profileDataList, setProfileDataList] = useState([]);
	const [notificationNumber, setNotificationNumber] = useState(0);

	const RANDOM_MEMBER_COUNT = 10;

	const homeProfile = async () => {
		try {
			const response = await getRandomMembersByCount(RANDOM_MEMBER_COUNT);
			const updatedData = formatProfileData(response.data);
			setProfileDataList(updatedData);

			const initialHeart = {};
			updatedData.forEach((profile) => {
				initialHeart[profile.id] = profile.isLiked;
			});
			setHeart(initialHeart);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"홈 카드 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const getNotificationNumber = async () => {
		try {
			const notificationResponse = await getNotifications();
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
			homeProfile();
		}, []),
	);

	const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
	const [showMoreProfiles, setShowMoreProfiles] = useState(false);

	const handleNextProfile = () => {
		if (currentProfileIndex < profileDataList.length - 1) {
			setCurrentProfileIndex(currentProfileIndex + 1);
			setShowNewCard(false);
		} else {
			setShowMoreProfiles(true);
		}
	};

	const handlePrevProfile = () => {
		if (showMoreProfiles) {
			setShowMoreProfiles(false);
		} else if (currentProfileIndex > 0) {
			setCurrentProfileIndex(currentProfileIndex - 1);
			setShowNewCard(false);
		}
	};

	const profileData = profileDataList[currentProfileIndex];
	const { id, profilePresignUrl, tags, bio, username, country } = profileData
		? profileData
		: {
				id: null,
				profilePresignUrl: null,
				tags: ["tag"],
				bio: "bio",
				username: "username",
				country: "country",
			};

	const [showNewCard, setShowNewCard] = useState(false);

	const [heart, setHeart] = useState({});

	const handleCreateHeart = async () => {
		try {
			await createLikeMember(id);
			setHeart((prev) => ({
				...prev,
				[id]: true,
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
			await deleteLikeMember(id);
			setHeart((prev) => ({
				...prev,
				[id]: false,
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

	return (
		<SafeAreaView style={HomeStyles.container}>
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

				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<TouchableOpacity onPress={handlePrevProfile}>
						<HomeArrow style={{ transform: [{ scaleX: -1 }] }} />
					</TouchableOpacity>

					{showNewCard ? (
						<View style={HomeStyles.homecardContainer}>
							<View style={HomeStyles.homecard}>
								<HomeCardBack
									memberId={id}
									profileImg={profilePresignUrl}
									name={username}
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
									profileImg={profilePresignUrl}
									tags={tags}
									introduction={bio}
									name={username}
									country={country}
									onPress={() => setShowNewCard(true)}
									isLikedOnPress={() => {
										heart[id]
											? handleDeleteHeart()
											: handleCreateHeart();
									}}
									isLikedActive={heart[id]}
								/>
							</View>
						</View>
					)}
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

					<TouchableOpacity onPress={handleNextProfile}>
						<HomeArrow />
					</TouchableOpacity>
				</View>

				<View style={HomeStyles.homeSchEv}>
					<TouchableOpacity
						style={HomeStyles.homeEvent}
						onPress={() => navigation.navigate("PreparingPage")}
					>
						<HomeSchEv />
						<Text style={HomeStyles.textHomeSchool}>
							{t("schoolInfo")}
						</Text>
						<HomeSchoolInfo style={HomeStyles.homeSchIcon} />
					</TouchableOpacity>
					<TouchableOpacity
						style={HomeStyles.homeEvent}
						onPress={() => navigation.navigate("EventPage")}
					>
						<HomeSchEv />
						<Text style={HomeStyles.textHomeEvent}>
							{t("events")}
						</Text>
						<HomeEvent style={HomeStyles.iconHomeEvent} />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default HomePage;
