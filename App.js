import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { customTheme } from './src/styles/customTheme.js';

import ChattingPage from './src/pages/chattingPage/chattingPage.js';
import MatchingPage from './src/pages/matchingPage/matchingPage.js';
import HomePage from './src/pages/homePage/homePage.js';
import CommunityPage from './src/pages/commuityPage/commuityPage.js';
import MemberPage from './src/pages/memberPage/memberPage.js';

import ChatDf24 from './src/components/icon_24/svg_js/chat_df_24.js';
import ConnectDf24 from './src/components/icon_24/svg_js/connect_df_24.js';
import HomeDf24 from './src/components/icon_24/svg_js/home_df_24.js';
import CommuDf24 from './src/components/icon_24/svg_js/commu_df_24.js';
import MyDf24 from './src/components/icon_24/svg_js/my_df_24.js';

const Tab = createBottomTabNavigator();

export default function App() {
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
        <Tab.Screen name="homePage" component={HomePage} options={{ headerShown: false }} />
        <Tab.Screen name="communityPage" component={CommunityPage} options={{ headerShown: false }} />
        <Tab.Screen name="memberPage" component={MemberPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
