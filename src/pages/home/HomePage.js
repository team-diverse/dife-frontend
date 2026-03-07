import React, {
	useState,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
	View,
	Text,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	Animated,
	Easing,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import GestureRecognizer from "react-native-swipe-gestures";
import * as SecureStore from "expo-secure-store";

import { getNotifications, getPosts } from "config/api";
import { useStatusBar } from "util/useStatusBar";
import { useMatchQueue } from "context/MatchQueueContext";

import HomeStyles from "@pages/home/HomeStyles";
import LogoBr from "@components/Logo/LogoBr";
import Notification32 from "@components/Icon32/Notification32";
import HomeCardBack from "@components/home/HomeCardBack";
import HomeCardFront from "@components/home/HomeCardFront";
import HomeCardLast from "@components/home/HomeCardLast";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import IconHeart from "@components/community/IconHeart";
import ArrowRight from "@components/common/ArrowRight";

const RECENCY_BONUS_WEIGHT = 20;
const HOURS_PER_DAY = 24;

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
	const [popularPosts, setPopularPosts] = useState([]);

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

	const getPopularityScore = (post) => {
		const likesCount = Number(post?.likesCount) || 0;
		const createdAt = post?.created
			? new Date(post.created).getTime()
			: NaN;

		if (Number.isNaN(createdAt)) {
			return likesCount;
		}

		const ageHours = Math.max(0, (Date.now() - createdAt) / 3600000);
		const recencyWeight = 1 / (1 + ageHours / HOURS_PER_DAY);

		return likesCount + recencyWeight * RECENCY_BONUS_WEIGHT;
	};

	const getPopularPosts = async () => {
		try {
			const response = await getPosts();
			const postList = Array.isArray(response.data) ? response.data : [];
			const topPosts = [...postList]
				.sort((a, b) => {
					const scoreDiff =
						getPopularityScore(b) - getPopularityScore(a);

					if (scoreDiff !== 0) {
						return scoreDiff;
					}

					const createdA = a?.created
						? new Date(a.created).getTime()
						: 0;
					const createdB = b?.created
						? new Date(b.created).getTime()
						: 0;

					return createdB - createdA;
				})
				.slice(0, 2);

			setPopularPosts(topPosts);
		} catch (error) {
			console.error(
				"홈페이지 인기 게시글 조회 오류:",
				error.response ? error.response.data : error.message,
			);
			setPopularPosts([]);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getNotificationNumber();
			getPopularPosts();
		}, []),
	);

	const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
	const [showMoreProfiles, setShowMoreProfiles] = useState(false);
	const [showNewCard, setShowNewCard] = useState(false);
	const swipeTranslateX = useRef(new Animated.Value(0)).current;
	const isSwipeAnimatingRef = useRef(false);
	const pendingSwipeResetRef = useRef(false);

	const applyNextProfile = () => {
		setShowNewCard(false);

		if (showMoreProfiles && canFetch) {
			fetchAndDistributeProfiles();
			setShowMoreProfiles(false);
			setCurrentProfileIndex(0);
			return;
		}

		if (showMoreProfiles) {
			return;
		}

		if (currentProfileIndex < homeProfiles.length - 1) {
			setCurrentProfileIndex((prev) => prev + 1);
		} else if (
			currentProfileIndex === homeProfiles.length - 1 &&
			homeProfiles.length > 0
		) {
			setShowMoreProfiles(true);
		}
	};

	const applyPrevProfile = () => {
		setShowNewCard(false);
		if (showMoreProfiles) {
			setShowMoreProfiles(false);
		} else if (currentProfileIndex > 0) {
			setCurrentProfileIndex((prev) => prev - 1);
		}
	};

	const canSwipeNext = () => {
		if (showMoreProfiles) {
			return canFetch;
		}

		if (homeProfiles.length === 0) {
			return false;
		}

		return currentProfileIndex <= homeProfiles.length - 1;
	};

	const canSwipePrev = () => {
		if (showMoreProfiles) {
			return homeProfiles.length > 0;
		}

		return currentProfileIndex > 0;
	};

	const animateSwipe = (direction) => {
		if (isSwipeAnimatingRef.current) {
			return;
		}

		const canSwipe = direction === "next" ? canSwipeNext() : canSwipePrev();
		if (!canSwipe) {
			return;
		}

		if (direction === "next" && showMoreProfiles && canFetch) {
			applyNextProfile();
			return;
		}

		isSwipeAnimatingRef.current = true;

		Animated.timing(swipeTranslateX, {
			toValue: direction === "next" ? -cardStep : cardStep,
			duration: 240,
			easing: Easing.out(Easing.cubic),
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (!finished) {
				swipeTranslateX.setValue(0);
				isSwipeAnimatingRef.current = false;
				return;
			}

			pendingSwipeResetRef.current = true;

			if (direction === "next") {
				applyNextProfile();
				return;
			}

			applyPrevProfile();
		});
	};

	const handleNextProfile = () => animateSwipe("next");
	const handlePrevProfile = () => animateSwipe("prev");

	useEffect(() => {
		if (homeProfiles.length > 0 && showMoreProfiles) {
			setShowMoreProfiles(false);
			setCurrentProfileIndex(0);
		}
	}, [homeProfiles]);

	useLayoutEffect(() => {
		if (!pendingSwipeResetRef.current) {
			return;
		}

		swipeTranslateX.setValue(0);
		isSwipeAnimatingRef.current = false;
		pendingSwipeResetRef.current = false;
	}, [
		currentProfileIndex,
		showMoreProfiles,
		homeProfiles.length,
		swipeTranslateX,
	]);

	useEffect(() => {
		setShowNewCard(false);
		if (
			currentProfileIndex >= homeProfiles.length &&
			currentProfileIndex > 0
		) {
			setCurrentProfileIndex((prev) => prev - 1);
		}
	}, [homeProfiles.length, currentProfileIndex]);

	const handleNaviNotification = () => {
		setNotificationNumber(0);
		navigation.navigate("NotificationPage");
	};

	const handleNaviCommunity = () => {
		navigation.navigate("Community");
	};

	const { width: screenWidth } = Dimensions.get("window");
	const { height: screenHeight } = Dimensions.get("window");
	const cardWidth = screenWidth - 64;
	const cardLeftInset = (screenWidth - cardWidth) / 2;
	const sidePeekWidth = 16;
	const cardStep = cardWidth + sidePeekWidth;
	const isSmallScreen = screenHeight < 700;
	const centerCardRotateY = swipeTranslateX.interpolate({
		inputRange: [-cardStep, 0, cardStep],
		outputRange: ["-7deg", "0deg", "7deg"],
		extrapolate: "clamp",
	});
	const centerCardScale = swipeTranslateX.interpolate({
		inputRange: [-cardStep, 0, cardStep],
		outputRange: [0.98, 1, 0.98],
		extrapolate: "clamp",
	});
	const centerCardTransform =
		Platform.OS === "ios"
			? [
					{ perspective: 1200 },
					{ rotateY: centerCardRotateY },
					{ scale: centerCardScale },
				]
			: [{ scale: centerCardScale }];

	const currentProfile = homeProfiles[currentProfileIndex];

	const getLikedState = (profile) => {
		if (!profile) {
			return false;
		}

		return likesById[profile.id] !== undefined
			? likesById[profile.id]
			: profile.liked;
	};

	const renderFrontCard = (profile, isInteractive = false) => {
		if (!profile) {
			return <HomeCardLast />;
		}

		const likedState = getLikedState(profile);

		return (
			<HomeCardFront
				profile={profile}
				onPress={isInteractive ? () => setShowNewCard(true) : () => {}}
				isLikedOnPress={
					isInteractive
						? () => toggleLike(profile.id, !likedState)
						: () => {}
				}
				isLikedActive={likedState}
			/>
		);
	};

	const renderCenterCard = () => {
		if (!currentProfile || showMoreProfiles) {
			return <HomeCardLast />;
		}

		if (showNewCard) {
			return (
				<HomeCardBack
					memberId={currentProfile.id}
					fileId={currentProfile.profileImg?.id}
					name={currentProfile.username}
					onPress={() => setShowNewCard(false)}
				/>
			);
		}

		return renderFrontCard(currentProfile, true);
	};

	const prevPreviewProfile = showMoreProfiles
		? currentProfile
		: currentProfileIndex > 0
			? homeProfiles[currentProfileIndex - 1]
			: null;

	const nextPreviewProfile =
		!showMoreProfiles && currentProfileIndex < homeProfiles.length - 1
			? homeProfiles[currentProfileIndex + 1]
			: null;

	const showLastPreview =
		!showMoreProfiles &&
		homeProfiles.length > 0 &&
		currentProfileIndex === homeProfiles.length - 1;

	const renderPopularPosts = () => (
		<View
			style={[
				HomeStyles.sectionBoard,
				{ width: cardWidth, alignSelf: "center" },
			]}
		>
			<View style={HomeStyles.sectionBoardTop}>
				<View style={HomeStyles.sectionBoardTitleRow}>
					<Text style={HomeStyles.textBoardTitleMain}>
						{t("boardTitle")}
					</Text>
					<Text style={HomeStyles.textBoardTitleSub}>
						{t("popularPost")}
					</Text>
				</View>
				<TouchableOpacity
					style={HomeStyles.buttonMore}
					onPress={handleNaviCommunity}
				>
					<Text style={HomeStyles.textMore}>{t("moreButton")}</Text>
					<ArrowRight color="#0029F4" size={24} isFlipped={true} />
				</TouchableOpacity>
			</View>

			{popularPosts.length > 0 ? (
				popularPosts.map((post) => (
					<TouchableOpacity
						key={post.id}
						style={HomeStyles.cardPopularPost}
						onPress={() =>
							navigation.navigate("PostPage", {
								postId: post.id,
							})
						}
					>
						<View style={HomeStyles.containerPopularPost}>
							<Text
								style={HomeStyles.textPopularTitle}
								numberOfLines={1}
							>
								{post.title}
							</Text>
							<View style={HomeStyles.countainerPopularMeta}>
								<IconHeart
									likedPostBlue={false}
									active={post.isLiked}
								/>
								<Text style={HomeStyles.textPopularMeta}>
									{post.likesCount ?? 0}
								</Text>
							</View>
						</View>
						<Text
							style={HomeStyles.textPopularContent}
							numberOfLines={1}
						>
							{post.content}
						</Text>
					</TouchableOpacity>
				))
			) : (
				<View style={HomeStyles.cardPopularPost}>
					<Text style={HomeStyles.textPopularEmpty}>
						{t("noPopularPosts")}
					</Text>
				</View>
			)}
		</View>
	);

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

			<View style={HomeStyles.carouselSection}>
				<GestureRecognizer
					onSwipeLeft={handleNextProfile}
					onSwipeRight={handlePrevProfile}
					style={HomeStyles.carouselGesture}
				>
					<View
						style={[
							HomeStyles.textConnectWithContainer,
							{ marginLeft: cardLeftInset },
						]}
					>
						<Text style={HomeStyles.textConnect}>
							{t("connect")}
						</Text>
						<Text style={HomeStyles.textWithnewfriend}>
							{t("newFriendText")}
						</Text>
					</View>

					<View style={HomeStyles.carouselViewport}>
						<Animated.View
							style={[
								HomeStyles.carouselTrack,
								{
									transform: [
										{ translateX: swipeTranslateX },
									],
								},
							]}
						>
							{prevPreviewProfile && (
								<View
									pointerEvents="none"
									style={[
										HomeStyles.carouselCard,
										HomeStyles.carouselSideCard,
										{
											width: cardWidth,
											left: 32 - cardStep,
										},
									]}
								>
									{renderFrontCard(prevPreviewProfile)}
								</View>
							)}

							<Animated.View
								style={[
									HomeStyles.carouselCard,
									HomeStyles.carouselCenterCard,
									{
										width: cardWidth,
										left: 32,
										transform: centerCardTransform,
									},
								]}
							>
								{renderCenterCard()}
							</Animated.View>

							{nextPreviewProfile && (
								<View
									pointerEvents="none"
									style={[
										HomeStyles.carouselCard,
										HomeStyles.carouselSideCard,
										{
											width: cardWidth,
											left: 32 + cardStep,
										},
									]}
								>
									{renderFrontCard(nextPreviewProfile)}
								</View>
							)}

							{showLastPreview && (
								<View
									pointerEvents="none"
									style={[
										HomeStyles.carouselCard,
										HomeStyles.carouselSideCard,
										{
											width: cardWidth,
											left: 32 + cardStep,
										},
									]}
								>
									<HomeCardLast />
								</View>
							)}
						</Animated.View>
					</View>
				</GestureRecognizer>
			</View>
			<View style={HomeStyles.containerWhite}>
				{renderPopularPosts()}
			</View>
		</LinearGradient>
	);

	return (
		<SafeAreaView style={HomeStyles.container}>
			{isSmallScreen ? (
				<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
					{renderHome()}
				</ScrollView>
			) : (
				renderHome()
			)}
		</SafeAreaView>
	);
};

export default HomePage;
