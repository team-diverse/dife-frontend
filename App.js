import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
<<<<<<< HEAD
import { customTheme } from './src/styles/customTheme.js';
=======
>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
import { useFonts } from 'expo-font';

import ChattingPage from './src/pages/ChattingPages/ChattingPage.js';
import MatchingPage from './src/pages/MatchingPages/MatchingPage.js';
import HomePage from './src/pages/HomePages/HomePage.js';
import CommunityPage from './src/pages/CommuityPages/CommuityPage.js';
import MemberPage from './src/pages/MemberPages/MemberPage.js';

<<<<<<< HEAD
import ChatDf24 from './src/components/icon_24/chat_df_24.js';
import ConnectDf24 from './src/components/icon_24/connect_df_24.js';
import HomeDf24 from './src/components/icon_24/home_df_24.js';
import CommuDf24 from './src/components/icon_24/commu_df_24.js';
import MyDf24 from './src/components/icon_24/my_df_24.js';
<<<<<<< HEAD

import EventPage from './src/pages/homePage/eventPage.js';
import NotificationPage from './src/pages/homePage/notificationPage.js';
=======
>>>>>>> 52cdf0d (style: component 폴더 정리)
=======
import ChatDf24 from './src/components/icon24/ChatDf24.js';
import ConnectDf24 from './src/components/icon24/ConnectDf24.js';
import HomeDf24 from './src/components/icon24/HomeDf24.js';
import CommuDf24 from './src/components/icon24/CommuDf24.js';
import MyDf24 from './src/components/icon24/MyDf24.js';
>>>>>>> 43acbdb (refactor: 파일명과 객체명 일치 및 안 쓰이는 부분 정리)

import EventPage from './src/pages/HomePages/EventPage.js';
import NotificationPage from './src/pages/HomePages/NotificationPage.js';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}} />
      <Stack.Screen name="Event" component={EventPage} options={{headerShown: false}} />
<<<<<<< HEAD
<<<<<<< HEAD

      <Stack.Screen name="Notification" component={NotificationPage} options={{headerShown: false}} />
=======
>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
=======
      <Stack.Screen name="Notification" component={NotificationPage} options={{headerShown: false}} />
>>>>>>> 8e3acd5 (feat: notificationPage 상단바 적용 및 homePage에서 notificatinPage로 이동하는 기능 구현)
    </Stack.Navigator>
  );
}

export default function App() {
  const [loaded] = useFonts({
    'NotoSansCJKkr-Bold': require('./src/assets/fonts/NotoSansCJKkr-Bold.otf'),
    'NotoSansCJKkr-Medium': require('./src/assets/fonts/NotoSansCJKkr-Medium.otf'),
    'NotoSansCJKkr-Regular': require('./src/assets/fonts/NotoSansCJKkr-Regular.otf'),
<<<<<<< HEAD
<<<<<<< HEAD
=======
    
>>>>>>> d5df400 (feat: 폰트 사용을 위한 폰트 로드 코드 추가)
=======
>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="homePage"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconComponent;

            if (route.name === 'chattingPage') {
              iconComponent = <ChatDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'matchingPage') {
              iconComponent = <ConnectDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'homePage') {
              iconComponent = <HomeDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'communityPage') {
              iconComponent = <CommuDf24 width={size} height={size} fill={color} />;
            } else if (route.name === 'memberPage') {
              iconComponent = <MyDf24 width={size} height={size} fill={color} />;
            }

            return iconComponent;
          },
          tabBarLabel: () => null,
        })}
      >
        <Tab.Screen name="chattingPage" component={ChattingPage} options={{ headerShown: false }} />
        <Tab.Screen name="matchingPage" component={MatchingPage} options={{ headerShown: false }} />
        <Tab.Screen name="homePage" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="communityPage" component={CommunityPage} options={{ headerShown: false }} />
        <Tab.Screen name="memberPage" component={MemberPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
