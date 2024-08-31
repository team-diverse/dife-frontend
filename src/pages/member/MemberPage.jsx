import React, { useState, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MemberStyles from "@pages/member/MemberStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getMyProfile } from "config/api";

import DifeLogo from "@components/member/DifeLogo";
import CircleBackground from "@components/member/CircleBackground";
import DifeLine from "@components/member/DifeLine";
import IconSetting from "@components/member/IconSetting";
import ProfileKBackground from "@components/member/ProfileKBackground";
import ProfileK from "@components/member/ProfileK";
import IconFriendList from "@components/member/IconFriendList";
import IconMyPost from "@components/member/IconMyPost";
import TabLikedPostPage from "@pages/member/TabLikedPostPage";
import TabBookmarkPostPage from "@pages/member/TabBookmarkPostPage";
import IconProfileEdit from "@components/member/IconProfileEdit";
import IconLike from "@components/member/IconLike";
import IconBookmark from "@components/member/IconBookmark";
import * as Sentry from "@sentry/react-native";

const MemberPage = () => {
	const navigation = useNavigation();
	const Tab = createMaterialTopTabNavigator();

	const [name, setName] = useState("");
	const [profileImage, setProfileImage] = useState(null);

	const handleProfile = async () => {
		try {
			const response = await getMyProfile();
			setName(response.data.username);
			setProfileImage(response.data.profilePresignUrl);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"마이페이지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			handleProfile();
		}, [profileImage]),
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
						<CircleBackground />
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
						<ProfileKBackground profileImage={profileImage} />
						{profileImage ? null : (
							<View style={MemberStyles.profileK}>
								<ProfileK />
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
								커넥트 목록
							</Text>
						</TouchableOpacity>
						<View style={MemberStyles.line} />
						<TouchableOpacity
							style={MemberStyles.icon}
							onPress={() => navigation.navigate("MyPostPage")}
						>
							<IconMyPost />
							<Text style={MemberStyles.textIcon}>나의 글</Text>
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
