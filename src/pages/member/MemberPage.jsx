import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import MemberStyles from "@pages/member/MemberStyles";
import { CustomTheme } from "@styles/CustomTheme";

import DifeLogo from "@components/member/DifeLogo";
import CircleBackground from "@components/member/CircleBackground";
import DifeLine from "@components/member/DifeLine";
import IconSetting from "@components/member/IconSetting";
import ProfileKBackground from "@components/member/ProfileKBackground";
import ProfileK from "@components/member/ProfileK";
import IconFriendList from "@components/member/IconFriendList";
import IconGroup from "@components/member/IconGroup";
import IconMyPost from "@components/member/IconMyPost";
import LikePostPage from "@pages/member/LikePostPage";
import BookmarkPostPage from "@pages/member/BookmarkPostPage";
import IconProfileEdit from "@components/member/IconProfileEdit";
import IconLike from "@components/member/IconLike";
import IconBookmark from "@components/member/IconBookmark";

const MemberPage = () => {
    const navigation = useNavigation();
    const Tab = createMaterialTopTabNavigator();

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
                        <TouchableOpacity style={MemberStyles.iconSetting}>
                            <IconSetting />
                        </TouchableOpacity>
                    </View>

                    <View style={MemberStyles.containerProfile}>
                        <ProfileKBackground />
                        <View style={MemberStyles.profileK}>
                            <ProfileK />
                        </View>
                        <View style={MemberStyles.iconProfileEdit}>
                            <IconProfileEdit />
                        </View>
                    </View>

                    <Text style={MemberStyles.textName}>Name</Text>

                    <View style={MemberStyles.containerIcon}>
                        <TouchableOpacity
                            style={MemberStyles.icon}
                            onPress={() =>
                                navigation.navigate("FriendListPage")
                            }
                        >
                            <IconFriendList />
                            <Text style={MemberStyles.textIcon}>친구목록</Text>
                        </TouchableOpacity>
                        <View style={MemberStyles.line} />
                        <TouchableOpacity
                            style={MemberStyles.icon}
                            onPress={() => navigation.navigate("GroupListPage")}
                        >
                            <IconGroup />
                            <Text style={MemberStyles.textIcon}>그룹</Text>
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
                    initialRouteName="LikePostPage"
                    screenOptions={{
                        tabBarIndicatorStyle: {
                            backgroundColor: "#B0D0FF",
                        },
                    }}
                >
                    <Tab.Screen
                        name="좋아요"
                        component={LikePostPage}
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
                        component={BookmarkPostPage}
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
