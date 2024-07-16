import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

import MemberStyles from '@pages/member/MemberStyles';
import { CustomTheme } from '@styles/CustomTheme';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import DifeLogo from "@components/member/DifeLogo";
import CircleBackground from "@components/member/CircleBackground";
import DifeLine from "@components/member/DifeLine";
import IconSetting from "@components/member/IconSetting";
import ProfileKBackground from "@components/member/ProfileKBackground";
import ProfileK from "@components/member/ProfileK";
import IconFriendList from "@components/member/IconFriendList";
import IconGroup from "@components/member/IconGroup";
import IconMyPost from "@components/member/IconMyPost";
import LikedPostPage from "@pages/member/LikedPostPage";
import BookmarkPostPage from "@pages/member/BookmarkPostPage";
import IconProfileEdit from "@components/member/IconProfileEdit";
import IconLike from "@components/member/IconLike";
import IconBookmark from "@components/member/IconBookmark";

const MemberPage = () => {
	const navigation = useNavigation();
	const Tab = createMaterialTopTabNavigator();

  const { onboardingData } = useOnboarding();

  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const response = await axios.get(`http://192.168.45.135:8080/api/members/profile`, {
          headers: {
            'Authorization': `Bearer ${onboardingData.accessToken}`,
            'Accept': 'application/json'
          },
        });
        setName(response.data.username);
        setProfileImage(response.data.profilePresignUrl);
      } catch (error) {
          console.error('마이페이지 조회 오류:', error.response ? error.response.data : error.message);
      }
    };
    handleProfile();
  }, [profileImage]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('알림', '설정에서 이미지 권한을 허용해주세요.');
      return;
    };

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      }

    handleProfileImage();
  };

  const handleProfileImage = () => {
    const formData = new FormData();
    if (profileImage) {
      const file = {
        uri: profileImage,
        type: 'image/jpeg',
        name: `${onboardingData.id}_profile.jpg`
      };
      formData.append('profileImg', file);
    }

    axios.put(`http://192.168.45.135:8080/api/members/${onboardingData.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'Authorization': `Bearer ${onboardingData.accessToken}`,
      }
    })
    .then(response => {
      console.log('프로필 이미지 변경 성공:', response.data.message);
    })
    .catch(error => {
      console.error('프로필 이미지 변경 실패:', error.response ? error.response.data : error.message);
    });
  };

  return (
    <>
      <LinearGradient
        colors={['#0029F4', '#6199C1']}
        locations={[0, 0.8]}
        start={{ x: 0.7, y: 0 }}
        end={{ x: 1, y: 1 }}>
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
            <ProfileKBackground profileImage={profileImage}/>
            {profileImage === null && (
              <View style={MemberStyles.profileK}>
                <ProfileK />
              </View>
            )}
            <TouchableOpacity style={MemberStyles.iconProfileEdit} onPress={pickImage}>
              <IconProfileEdit />
            </TouchableOpacity>
          </View>
            
          <Text style={MemberStyles.textName}>{name}</Text>

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
					initialRouteName="LikedPostPage"
					screenOptions={{
						tabBarIndicatorStyle: {
							backgroundColor: "#B0D0FF",
						},
					}}
				>
					<Tab.Screen
						name="좋아요"
						component={LikedPostPage}
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
