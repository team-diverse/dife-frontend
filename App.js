import * as React from 'react';
import { SafeAreaView, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

import ChattingPage from '@pages/chat/ChattingPage.js';
import ConnectPage from '@pages/connect/ConnectPage.js';
import HomePage from '@pages/home/HomePage.js';
import CommunityPage from '@pages/community/CommuityPage.js';
import MemberPage from '@pages/member/MemberPage.js';

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

import EventPage from '@pages/home/EventPage.js';
import NotificationPage from '@pages/home/NotificationPage.js';
import ConnectLikeUserPage from '@pages/connect/ConnectLikeUserPage';
import ConnectProfilePage from '@pages/connect/ConnectProfilePage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
      <Stack.Screen name="Event" component={EventPage} options={{headerShown: false}} />
      <Stack.Screen name="Notification" component={NotificationPage} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function ConnectStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Connect" component={ConnectPage} options={{headerShown: false}} />
      <Stack.Screen name="ConnectLikeUser" component={ConnectLikeUserPage} options={{headerShown: false}} />
      <Stack.Screen name="ConnectProfile" component={ConnectProfilePage} options={{headerShown: false}} />
      {/* ConnectProfile 페이지 연결은 임시로.. 각 프로필 연결 시, 삭제하거나 수정 */}
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    'NotoSansCJKkr-Bold': require('./src/assets/fonts/NotoSansCJKkr-Bold.otf'),
    'NotoSansCJKkr-Medium': require('./src/assets/fonts/NotoSansCJKkr-Medium.otf'),
    'NotoSansCJKkr-Regular': require('./src/assets/fonts/NotoSansCJKkr-Regular.otf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="homePage"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 90,
            marginBottom: -10 },
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;

            if (route.name === 'chattingPage') {
              iconComponent = focused
              ? <ChatAc32 width={32} height={32} fill={color} />
              : <ChatDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'connectPage') {
              iconComponent = focused
              ? <ConnectAc32 width={32} height={32} fill={color} />
              : <ConnectDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'homePage') {
              iconComponent = focused
              ? <HomeAc32 width={32} height={32} fill={color} />
              : <HomeDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'communityPage') {
              iconComponent = focused
              ? <CommuAc32 width={32} height={32} fill={color} />
              : <CommuDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'memberPage') {
              iconComponent = focused
              ? <MyAc32 width={32} height={32} fill={color} />
              : <MyDf24 width={size} height={size} fill={color} />;
            }

            return iconComponent;
          },
          tabBarLabel: () => null,
          
        })}
      >
        <Tab.Screen name="chattingPage" component={ChattingPage} options={{ headerShown: false }} />
        <Tab.Screen name="connectPage" component={ConnectStack} options={{ headerShown: false }} />
        <Tab.Screen name="homePage" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="communityPage" component={CommunityPage} options={{ headerShown: false }} />
        <Tab.Screen name="memberPage" component={MemberPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
