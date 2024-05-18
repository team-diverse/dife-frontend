import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';
import * as Notifications from 'expo-notifications';
import { OnboardingProvider } from 'src/states/OnboardingContext.js';

import ChattingPage from '@pages/chat/ChattingPage';
import ConnectPage from '@pages/connect/ConnectPage.js';
import HomePage from '@pages/home/HomePage.js';
import CommunityPage from '@pages/community/CommuityPage.js';
import MemberPage from '@pages/member/MemberPage.js';

import EventPage from '@pages/home/EventPage.js';
import NotificationPage from '@pages/home/NotificationPage';
import ConnectLikeUserPage from '@pages/connect/ConnectLikeUserPage';
import ConnectProfilePage from '@pages/connect/ConnectProfilePage';
import LoginPage from '@pages/login/LoginPage';
import FindPasswordPage from '@pages/login/FindPasswordPage';
import FindPasswordVerifyingPage from '@pages/login/FindPasswordVerifyingPage';
import SignUpPage from '@pages/login/SignUpPage';
import AccessPage from '@pages/login/AccessPage';
import NicknamePage from '@pages/OnboadingPages/NicknamePage'
import ProfilePage from '@pages/OnboadingPages/ProfilePage'
import ProfileMbtiPage from '@pages/OnboadingPages/ProfileMbtiPage'
import ProfileHobbyPage from '@pages/OnboadingPages/ProfileHobbyPage'
import ProfileLanguagePage from '@pages/OnboadingPages/ProfileLanguagePage'
import StudentVerificationPage from '@pages/OnboadingPages/StudentVerificationPage'
import CompleteProfilePage from '@pages/OnboadingPages/CompleteProfilePage'
import LoadingVerificationPage from '@pages/OnboadingPages/LoadingVerificationPage'
import BookmarkPage from '@pages/chat/BookmarkPage';
import FriendListPage from '@pages/chat/FriendListPage'
import ChatRoomPage from '@pages/chat/ChatRoomPage'

import ChatDf24 from '@components/Icon24/ChatDf24.js';
import ConnectDf24 from '@components/Icon24/ConnectDf24.js';
import HomeDf24 from '@components/Icon24/HomeDf24.js';
import CommuDf24 from '@components/Icon24/CommuDf24.js';
import MyDf24 from '@components/Icon24/MyDf24.js';

import ChatAc32 from '@components/Icon32/ChatAc32.js';
import ConnectAc32 from '@components/Icon32/ConnectAc32.js';
import HomeAc32 from '@components/Icon32/HomeAc32.js';
import CommuAc32 from '@components/Icon32/CommuAc32.js';
import MyAc32 from '@components/Icon32/MyAc32.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const iconMapping = {
  Chat: {active: ChatAc32, default: ChatDf24},
  Connect: {active: ConnectAc32, default: ConnectDf24},
  Home: {active: HomeAc32, default: HomeDf24},
  Community: {active: CommuAc32, default: CommuDf24},
  Member: {active: MyAc32, default: MyDf24}
}

// const getTabBarIcon = (route, focused, color, size) => {
//   const IconActive = iconMapping[route.name].active;
//   const IconDefault = iconMapping[route.name].default;
//   return focused
//       ? <IconActive width={32} height={32} fill={color}/>
//       : <IconDefault width={size} height={size} fill={color}/>;
// };

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePage" component={HomePage} options={{headerShown: false}}/>
            <Stack.Screen name="EventPage" component={EventPage} options={{headerShown: false}}/>
            <Stack.Screen name="NotificationPage" component={NotificationPage} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

function ConnectStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ConnectPage" component={ConnectPage} options={{headerShown: false}}/>
            <Stack.Screen name="ConnectLikeUserPage" component={ConnectLikeUserPage} options={{headerShown: false}}/>
            <Stack.Screen name="ConnectProfilePage" component={ConnectProfilePage} options={{headerShown: false}}/>
            {/* ConnectProfile 페이지 연결은 임시로.. 각 프로필 연결 시, 삭제하거나 수정 */}
        </Stack.Navigator>
    );
}

function ChattingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChattingPage" component={ChattingPage} options={{headerShown: false}}/>
            <Stack.Screen name="BookmarkPage" component={BookmarkPage} options={{headerShown: false}}/>
            <Stack.Screen name="FriendListPage" component={FriendListPage} options={{headerShown: false}}/>
            <Stack.Screen name="ChatRoomPage" component={ChatRoomPage} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

export default function App() {
    const [initialRoute, setInitialRoute] = useState('Access');

  const CheckAccess = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    
    switch (status) {
      case 'granted':
        console.log('알림 권한 부여');
        setInitialRoute('Login');
        break;
      case 'denied':
        console.log('알림 권한 거부');
        break;
      default:
        console.log('자세히 확인하기..');
        break;
        }
    };

    useEffect(() => {
        CheckAccess();
    }, []);

    const [loaded] = useFonts({
        'NotoSansCJKkr-Bold': require('@assets/fonts/NotoSansCJKkr-Bold.otf'),
        'NotoSansCJKkr-Medium': require('@assets/fonts/NotoSansCJKkr-Medium.otf'),
        'NotoSansCJKkr-Regular': require('@assets/fonts/NotoSansCJKkr-Regular.otf'),
    });

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    if (!loaded) {
        return null;
    }

    return (
        <OnboardingProvider>
            <NavigationContainer>
            {isLoggedIn ? (
                <Tab.Navigator initialRouteName="Home"
                            screenOptions={({route}) => ({
                                headerShown: false,
                                tabBarStyle: {
                                    height: 90,
                                    marginBottom: -10
                                },
                                // tabBarIcon: ({focused, color, size}) => getTabBarIcon(route, focused, color, size),
                                tabBarLabel: () => null,
                            })}
                >
                    <Tab.Screen name="Chat" component={ChattingStack}/>
                    <Tab.Screen name="Connect" component={ConnectStack}/>
                    <Tab.Screen name="Home" component={HomeStack}/>
                    <Tab.Screen name="Community" component={CommunityPage}/>
                    <Tab.Screen name="Member" component={MemberPage}/>
                </Tab.Navigator>
                
            ) : (
                <Stack.Navigator initialRouteName={initialRoute}>
                    <Stack.Screen name="Access" component={AccessPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                    <Stack.Screen name="FindPassword" component={FindPasswordPage} options={{ headerShown: false }} />
                    <Stack.Screen name="FindPasswordVerifying" component={FindPasswordVerifyingPage} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUpPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Nickname" component={NicknamePage} options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileMbti" component={ProfileMbtiPage} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileHobby" component={ProfileHobbyPage} options={{ headerShown: false }} />
                    <Stack.Screen name="ProfileLanguage" component={ProfileLanguagePage} options={{ headerShown: false }} />
                    <Stack.Screen name="StudentVerification" component={StudentVerificationPage} options={{ headerShown: false }} />
                    <Stack.Screen name="CompleteProfile" component={CompleteProfilePage} options={{ headerShown: false }} />
                    <Stack.Screen name="LoadingVerification" component={LoadingVerificationPage} options={{ headerShown: false }} />
                </Stack.Navigator>
            )}
            </NavigationContainer>
        </OnboardingProvider>
    );
}
