import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { I18nextProvider } from "react-i18next";
import i18n from "src/i18n.js";

import { OnboardingProvider } from "src/states/OnboardingContext.js";
import { PostModifyProvider } from "src/states/PostModifyContext";
import { AuthProvider, useAuth } from "src/states/AuthContext";
import { getMyProfile } from "config/api";

import ChattingPage from "@pages/chat/ChattingPage";
import ConnectPage from "@pages/connect/ConnectPage";
import HomePage from "@pages/home/HomePage";
import CommunityPage from "@pages/community/CommunityPage";
import MemberPage from "@pages/member/MemberPage";

import EventPage from "@pages/home/EventPage";
import NotificationPage from "@pages/home/NotificationPage";
import ConnectLikeUserPage from "@pages/connect/ConnectLikeUserPage";
import ConnectProfilePage from "@pages/connect/ConnectProfilePage";
import LoginPage from "@pages/login/LoginPage";
import FindPasswordPage from "@pages/login/FindPasswordPage";
import FindPasswordVerifyingPage from "@pages/login/FindPasswordVerifyingPage";
import SignUpPage from "@pages/login/SignUpPage";
import AccessPage from "@pages/login/AccessPage";
import NicknamePage from "@pages/onboarding/NicknamePage";
import ProfilePage from "@pages/onboarding/ProfilePage";
import ProfileMbtiPage from "@pages/onboarding/ProfileMbtiPage";
import ProfileHobbyPage from "@pages/onboarding/ProfileHobbyPage";
import ProfileLanguagePage from "@pages/onboarding/ProfileLanguagePage";
import StudentVerificationPage from "@pages/onboarding/StudentVerificationPage";
import CompleteProfilePage from "@pages/onboarding/CompleteProfilePage";
import LoadingVerificationPage from "@pages/onboarding/LoadingVerificationPage";
import BookmarkPage from "@pages/chat/BookmarkPage";
import FriendListPage from "@pages/chat/FriendListPage";
import ChatRoomPage from "@pages/chat/ChatRoomPage";
import TipCommunityPage from "@pages/community/TipCommunityPage";
import FreeCommunityPage from "@pages/community/FreeCommunityPage";
import WritePage from "@pages/community/WritePage";
import PostPage from "@pages/community/PostPage";
import MyPostPage from "@pages/member/MyPostPage";
import PostModifyPage from "@pages/community/PostModifyPage";

import ChatDf24 from "@components/Icon24/ChatDf24";
import ConnectDf24 from "@components/Icon24/ConnectDf24";
import HomeDf24 from "@components/Icon24/HomeDf24";
import CommuDf24 from "@components/Icon24/CommuDf24";
import MyDf24 from "@components/Icon24/MyDf24";

import ChatAc32 from "@components/Icon32/ChatAc32";
import ConnectAc32 from "@components/Icon32/ConnectAc32";
import HomeAc32 from "@components/Icon32/HomeAc32";
import CommuAc32 from "@components/Icon32/CommuAc32";
import MyAc32 from "@components/Icon32/MyAc32";
import "text-encoding";
import * as Sentry from "@sentry/react-native";

Sentry.init({
	dsn: "https://5a585cef4237affff9605bb2182bf1d1@o4507762694422528.ingest.us.sentry.io/4507769192448000",
	debug: true,
});

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

import { WebSocketProvider } from "./src/context/WebSocketContext";
import MyWrotePage from "@pages/member/MyWrotePage";
import MyCommentPage from "@pages/member/MyCommentPage";
import ModifyProfilePage from "@pages/member/ModifyProfilePage";
import ModifyProfileInputPage from "@pages/member/ModifyProfileInputPage";
import SettingPage from "@pages/member/SettingPage";
import SecurityPage from "@pages/member/SecurityPage";
import BlockListPage from "@pages/member/BlockListPage";
import InquiryPage from "@pages/member/InquiryPage";
import TremsPage from "@pages/member/TremsPage";
import CountrySelectionPage from "@pages/onboarding/CountrySelectionPage";
import ConnectListPage from "@pages/member/ConnectListPage";
import DefaultLanguagePage from "@pages/member/DefaultLanguagePage";
import EnlargeImagePage from "@pages/community/EnlargeImagePage";
import PreparingPage from "@pages/etc/PreparingPage";
import StudentVerificationErrorPage from "@pages/onboarding/StudentVerificationErrorPage";
import SkeletonHomePage from "@pages/etc/SkeletonHomePage";
import SkeletonEventPage from "@pages/etc/SkeletonEventPage";
import SkeletonConnectPage from "@pages/etc/SkeletonConnectPage";
import SkeletonConnectLikePage from "@pages/etc/SkeletonConnectLikePage";
import DeleteMemberPage from "@pages/member/DeleteMemberPage";
import LikedPostPage from "@pages/member/LikedPostPage";
import BookmarkedPostPage from "@pages/member/BookmarkedPostPage";
import LikeUserOneToOne from "@pages/connect/LikeUserOneToOne";
import LandingPage from "@pages/login/LandingPage";
import SetPasswordPage from "@pages/login/SetPasswordPage";
import ChatBookmarkPage from "@pages/chat/ChatBookmarkPage";

const iconMapping = {
	Chat: { active: ChatAc32, default: ChatDf24 },
	Connect: { active: ConnectAc32, default: ConnectDf24 },
	Home: { active: HomeAc32, default: HomeDf24 },
	Community: { active: CommuAc32, default: CommuDf24 },
	Member: { active: MyAc32, default: MyDf24 },
};

const getTabBarIcon = (route, focused, color, size) => {
	const IconActive = iconMapping[route.name].active;
	const IconDefault = iconMapping[route.name].default;
	return focused ? (
		<IconActive width={32} height={32} fill={color} />
	) : (
		<IconDefault width={size} height={size} fill={color} />
	);
};

function HomeStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="HomePage" component={HomePage} />
		</Stack.Navigator>
	);
}

function ConnectStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ConnectPage" component={ConnectPage} />
		</Stack.Navigator>
	);
}

function ChattingStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="ChattingPage" component={ChattingPage} />
		</Stack.Navigator>
	);
}

function MainTabs() {
	return (
		<Tab.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: {
					height: 90,
					marginBottom: -10,
				},
				tabBarIcon: ({ focused, color, size }) =>
					getTabBarIcon(route, focused, color, size),
				tabBarLabel: () => null,
			})}
		>
			<Tab.Screen name="Chat" component={ChattingStack} />
			<Tab.Screen name="Connect" component={ConnectStack} />
			<Tab.Screen name="Home" component={HomeStack} />
			<Tab.Screen name="Community" component={CommunityPage} />
			<Tab.Screen name="Member" component={MemberPage} />
		</Tab.Navigator>
	);
}

function App() {
	return (
		<AuthProvider>
			<I18nextProvider i18n={i18n}>
				<NavigationContainer>
					<AppContent />
				</NavigationContainer>
			</I18nextProvider>
		</AuthProvider>
	);
}

function AppContent() {
	const { isLoggedIn, setIsLoggedIn } = useAuth();
	const [initialRoute, setInitialRoute] = useState("Access");

	useEffect(() => {
		const checkAutoLogin = async () => {
			try {
				const memberId = await SecureStore.getItemAsync("memberId");
				const accessToken =
					await SecureStore.getItemAsync("accessToken");
				const refreshToken =
					await SecureStore.getItemAsync("refreshToken");

				if (memberId && (accessToken || refreshToken)) {
					try {
						const profileResponse = await getMyProfile();
						if (profileResponse.data.isVerified) {
							setIsLoggedIn(true);
						} else {
							setIsLoggedIn(false);
						}
					} catch (error) {
						if (error.response && error.response.status === 403) {
							setIsLoggedIn(false);
						}
					}
				}
			} catch (error) {
				console.error(
					"자동 로그인 오류: ",
					error.response ? error.response.data : error.message,
				);
				setIsLoggedIn(false);
			}
		};

		checkAutoLogin();
	}, []);

	useEffect(() => {
		const checkAccess = async () => {
			const { status } = await Notifications.getPermissionsAsync();
			if (status === "granted") {
				console.log("알림 권한 부여");
				setInitialRoute("Login");
			} else {
				console.log("알림 권한 거부");
			}
		};

		checkAccess();
	}, []);

	Notifications.setNotificationHandler({
		handleNotification: async () => ({
			shouldShowAlert: true,
			shouldPlaySound: false,
			shouldSetBadge: false,
		}),
	});

	const [loaded] = useFonts({
		"NotoSansCJKkr-Bold": require("@assets/fonts/NotoSansCJKkr-Bold.otf"),
		"NotoSansCJKkr-Medium": require("@assets/fonts/NotoSansCJKkr-Medium.otf"),
		"NotoSansCJKkr-Regular": require("@assets/fonts/NotoSansCJKkr-Regular.otf"),
	});

	if (!loaded) {
		return null;
	}

	return isLoggedIn ? (
		<WebSocketProvider>
			<PostModifyProvider>
				<MainNavigator />
			</PostModifyProvider>
		</WebSocketProvider>
	) : (
		<OnboardingProvider>
			<AuthNavigator initialRoute={initialRoute} />
		</OnboardingProvider>
	);
}

function MainNavigator() {
	return (
		<Stack.Navigator
			initialRouteName="Main"
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen
				name="Main"
				component={MainTabs}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ConnectProfilePage"
				component={ConnectProfilePage}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotificationPage"
				component={NotificationPage}
			/>
			<Stack.Screen name="EventPage" component={EventPage} />
			<Stack.Screen
				name="ConnectLikeUserPage"
				component={ConnectLikeUserPage}
			/>
			<Stack.Screen name="BookmarkPage" component={BookmarkPage} />
			<Stack.Screen name="FriendListPage" component={FriendListPage} />
			<Stack.Screen name="ChatRoomPage" component={ChatRoomPage} />
			<Stack.Screen
				name="TipCommunityPage"
				component={TipCommunityPage}
			/>
			<Stack.Screen
				name="FreeCommunityPage"
				component={FreeCommunityPage}
			/>
			<Stack.Screen name="WritePage" component={WritePage} />
			<Stack.Screen name="PostPage" component={PostPage} />
			<Stack.Screen name="PostModifyPage" component={PostModifyPage} />
			<Stack.Screen name="MyPostPage" component={MyPostPage} />
			<Stack.Screen name="MyWrotePage" component={MyWrotePage} />
			<Stack.Screen name="MyCommentPage" component={MyCommentPage} />
			<Stack.Screen
				name="ModifyProfilePage"
				component={ModifyProfilePage}
			/>
			<Stack.Screen
				name="ModifyProfileInputPage"
				component={ModifyProfileInputPage}
			/>
			<Stack.Screen name="SettingPage" component={SettingPage} />
			<Stack.Screen name="SecurityPage" component={SecurityPage} />
			<Stack.Screen
				name="FindPasswordPage"
				component={FindPasswordPage}
			/>
			<Stack.Screen name="BlockListPage" component={BlockListPage} />
			<Stack.Screen name="InquiryPage" component={InquiryPage} />
			<Stack.Screen name="TremsPage" component={TremsPage} />
			<Stack.Screen name="ConnectListPage" component={ConnectListPage} />
			<Stack.Screen
				name="DefaultLanguagePage"
				component={DefaultLanguagePage}
			/>
			<Stack.Screen
				name="EnlargeImagePage"
				component={EnlargeImagePage}
			/>
			<Stack.Screen name="PreparingPage" component={PreparingPage} />
			<Stack.Screen
				name="SkeletonHomePage"
				component={SkeletonHomePage}
			/>
			<Stack.Screen
				name="SkeletonEventPage"
				component={SkeletonEventPage}
			/>
			<Stack.Screen
				name="SkeletonConnectPage"
				component={SkeletonConnectPage}
			/>
			<Stack.Screen
				name="SkeletonConnectLikePage"
				component={SkeletonConnectLikePage}
			/>
			<Stack.Screen
				name="DeleteMemberPage"
				component={DeleteMemberPage}
			/>
			<Stack.Screen name="LikedPostPage" component={LikedPostPage} />
			<Stack.Screen
				name="BookmarkedPostPage"
				component={BookmarkedPostPage}
			/>
			<Stack.Screen
				name="LikeUserOneToOne"
				component={LikeUserOneToOne}
			/>
			<Stack.Screen
				name="ChatBookmarkPage"
				component={ChatBookmarkPage}
			/>
		</Stack.Navigator>
	);
}

function AuthNavigator({ initialRoute }) {
	return (
		<Stack.Navigator
			initialRouteName={initialRoute}
			screenOptions={{ headerShown: false }}
		>
			<Stack.Screen name="Access" component={AccessPage} />
			<Stack.Screen name="LandingPage" component={LandingPage} />
			<Stack.Screen name="Login" component={LoginPage} />
			<Stack.Screen name="SignUp" component={SignUpPage} />
			<Stack.Screen name="FindPassword" component={FindPasswordPage} />
			<Stack.Screen
				name="FindPasswordVerifying"
				component={FindPasswordVerifyingPage}
			/>
			<Stack.Screen name="Nickname" component={NicknamePage} />
			<Stack.Screen name="Profile" component={ProfilePage} />
			<Stack.Screen name="ProfileMbti" component={ProfileMbtiPage} />
			<Stack.Screen name="ProfileHobby" component={ProfileHobbyPage} />
			<Stack.Screen
				name="ProfileLanguage"
				component={ProfileLanguagePage}
			/>
			<Stack.Screen
				name="StudentVerification"
				component={StudentVerificationPage}
			/>
			<Stack.Screen
				name="CompleteProfile"
				component={CompleteProfilePage}
			/>
			<Stack.Screen
				name="LoadingVerification"
				component={LoadingVerificationPage}
			/>
			<Stack.Screen name="Home" component={HomeStack} />
			<Stack.Screen
				name="CountrySelectionPage"
				component={CountrySelectionPage}
			/>
			<Stack.Screen
				name="StudentVerificationErrorPage"
				component={StudentVerificationErrorPage}
			/>
			<Stack.Screen name="SetPasswordPage" component={SetPasswordPage} />
		</Stack.Navigator>
	);
}

export default Sentry.wrap(App);
