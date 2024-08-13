import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import HomeStyles from "@pages/home/HomeStyles.js";
import {
	getRandomMembersByCount,
	createLikeMember,
	deleteLikeMember,
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

const HomePage = ({ count = 3 }) => {
	const navigation = useNavigation();

	const [profileDataList, setProfileDataList] = useState([]);
	const RANDOM_MEMBER_COUNT = 10;

	const homeProfile = async () => {
		try {
			const response = await getRandomMembersByCount(RANDOM_MEMBER_COUNT);
			function cleanHobbies(hobbies) {
				return hobbies.map((hobby) => hobby.replace(/[[\]"]/g, ""));
			}
			const updatedData = response.data.map((data) => {
				if (data.mbti !== null) {
					const cleanedHobbies = cleanHobbies(data.hobbies);
					const tags = [data.mbti, ...cleanedHobbies];
					return { ...data, tags };
				}
				return data;
			});
			setProfileDataList(updatedData);

			const initialHeart = {};
			updatedData.forEach((profile) => {
				initialHeart[profile.id] = profile.isLiked;
			});
			setHeart(initialHeart);
		} catch (error) {
			console.error(
				"오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
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
						onPress={() => navigation.navigate("NotificationPage")}
					>
						<Notification32 count={count} />
					</TouchableOpacity>
				</View>

				<View style={HomeStyles.textConnectWithContainer}>
					<Text style={HomeStyles.textConnect}>커넥트</Text>
					<Text style={HomeStyles.textWithnewfriend}>
						새로운 친구와 함께해요!
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
					<HomeSchEv />
					<Text style={HomeStyles.textHomeSchool}>학교정보</Text>
					<HomeSchoolInfo style={HomeStyles.homeSchIcon} />
					<TouchableOpacity
						style={HomeStyles.homeEvent}
						onPress={() => navigation.navigate("EventPage")}
					>
						<HomeSchEv />
						<Text style={HomeStyles.textHomeEvent}>이벤트</Text>
						<HomeEvent style={HomeStyles.iconHomeEvent} />
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</SafeAreaView>
	);
};

export default HomePage;
