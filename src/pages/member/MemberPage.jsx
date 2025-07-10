import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Sentry from "@sentry/react-native";

import MemberStyles from "@pages/member/MemberStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyProfile, getProfileImageByFileId } from "config/api";

import { useStatusBar } from "util/useStatusBar";
import DifeLogo from "@components/member/DifeLogo";
import DifeLine from "@components/member/DifeLine";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import IconSetting from "@components/member/IconSetting";
import MemberProfileBackground from "@components/member/MemberProfileBackground";
import IconFriendList from "@components/member/IconFriendList";
import IconMyPost from "@components/member/IconMyPost";
import TabLikedPostPage from "@pages/member/TabLikedPostPage";
import TabBookmarkPostPage from "@pages/member/TabBookmarkPostPage";
import IconProfileEdit from "@components/member/IconProfileEdit";
import IconLike from "@components/member/IconLike";
import IconBookmark from "@components/member/IconBookmark";
import IconProfileUser64 from "@components/common/IconProfileUser64";

const MemberPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const Tab = createMaterialTopTabNavigator();

	const [name, setName] = useState("");
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useStatusBar({
		color: "#0029F4",
		barStyle: "light-content",
	});

	const handleProfile = async () => {
		try {
			setIsLoading(true);
			const response = await getMyProfile();
			setName(response.data.username);
			if (response.data.profileImg?.id) {
				const presignUrl = await getProfileImageByFileId(
					response.data.profileImg.id,
				);
				setProfilePresignUrl(presignUrl.data);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"마이페이지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		} finally {
			setIsLoading(false);
		}
	};

	useFocusEffect(
		useCallback(() => {
			handleProfile();
		}, []),
	);

	return (
		<>
			<LinearGradient
				colors={["#0029F4", "#6199C1"]}
				locations={[0, 0.8]}
				start={{ x: 0.7, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<SafeAreaView style={MemberStyles.container}>
					<View style={MemberStyles.difeLine}>
						<DifeLine />
					</View>
					<View style={MemberStyles.circleBackground}>
						<ConnectProfileBackground />
					</View>

					<View style={MemberStyles.topContainer}>
						<View style={MemberStyles.difeLogo}>
							<DifeLogo />
						</View>
						<TouchableOpacity
							style={MemberStyles.iconSetting}
							onPress={() => navigation.navigate("SettingPage")}
						>
							<IconSetting />
						</TouchableOpacity>
					</View>

					<View style={MemberStyles.containerProfile}>
						<MemberProfileBackground
							profileImage={profilePresignUrl}
						/>
						{!isLoading && !profilePresignUrl && (
							<View style={MemberStyles.containerProfileUser}>
								<IconProfileUser64 />
							</View>
						)}
						<TouchableOpacity
							style={MemberStyles.iconProfileEdit}
							onPress={() =>
								navigation.navigate("ModifyProfilePage")
							}
						>
							<IconProfileEdit />
						</TouchableOpacity>
					</View>

					<Text style={MemberStyles.textName}>{name}</Text>

					<View style={MemberStyles.containerIcon}>
						<TouchableOpacity
							style={MemberStyles.icon}
							onPress={() =>
								navigation.navigate("ConnectListPage")
							}
						>
							<IconFriendList />
							<Text style={MemberStyles.textIcon}>
								{t("connectList")}
							</Text>
						</TouchableOpacity>
						<View style={MemberStyles.line} />
						<TouchableOpacity
							style={MemberStyles.icon}
							onPress={() => navigation.navigate("MyPostPage")}
						>
							<IconMyPost />
							<Text style={MemberStyles.textIcon}>
								{t("myPosts")}
							</Text>
						</TouchableOpacity>
					</View>
				</SafeAreaView>
			</LinearGradient>

			<View style={MemberStyles.tabContainer}>
				<Tab.Navigator
					initialRouteName="TabLikedPostPage"
					screenOptions={{
						tabBarIndicatorStyle: {
							backgroundColor: "#B0D0FF",
						},
					}}
				>
					<Tab.Screen
						name="좋아요"
						component={TabLikedPostPage}
						options={{
							tabBarIcon: ({ focused }) => (
								<IconLike
									color={
										focused
											? CustomTheme.primaryMedium
											: CustomTheme.borderColor
									}
								/>
							),
							tabBarLabel: () => null,
						}}
					/>
					<Tab.Screen
						name="북마크"
						component={TabBookmarkPostPage}
						options={{
							tabBarIcon: ({ focused }) => (
								<IconBookmark
									color={
										focused
											? CustomTheme.primaryMedium
											: CustomTheme.borderColor
									}
								/>
							),
							tabBarLabel: () => null,
						}}
					/>
				</Tab.Navigator>
			</View>
		</>
	);
};
export default MemberPage;
