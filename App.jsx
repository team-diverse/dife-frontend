import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFonts} from 'expo-font';

import ChattingPage from '@pages/chat/ChattingPage.js';
import HomePage from '@pages/home/HomePage.js';
import EventPage from '@pages/home/EventPage.js';
import CommunityPage from '@pages/community/CommuityPage.js';
import MemberPage from '@pages/member/MemberPage.js';
import NotificationPage from '@pages/home/NotificationPage.js';
import ConnectPage from '@pages/connect/ConnectPage.js';
import ConnectLikeUserPage from '@pages/connect/ConnectLikeUserPage';
import ConnectProfilePage from '@pages/connect/ConnectProfilePage';

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

const getTabBarIcon = (route, focused, color, size) => {
    const IconActive = iconMapping[route.name].active;
    const IconDefault = iconMapping[route.name].default;
    return focused
        ? <IconActive width={32} height={32} fill={color}/>
        : <IconDefault width={size} height={size} fill={color}/>;
};

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

export default function App() {
    const [loaded] = useFonts({
        'NotoSansCJKkr-Bold': require('@assets/fonts/NotoSansCJKkr-Bold.otf'),
        'NotoSansCJKkr-Medium': require('@assets/fonts/NotoSansCJKkr-Medium.otf'),
        'NotoSansCJKkr-Regular': require('@assets/fonts/NotoSansCJKkr-Regular.otf'),
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home"
                           screenOptions={({route}) => ({
                               headerShown: false,
                               tabBarStyle: {
                                   height: 90,
                                   marginBottom: -10
                               },
                               tabBarIcon: ({focused, color, size}) => getTabBarIcon(route, focused, color, size),
                               tabBarLabel: () => null,
                           })}
            >
                <Tab.Screen name="Chat" component={ChattingPage}/>
                <Tab.Screen name="Connect" component={ConnectStack}/>
                <Tab.Screen name="Home" component={HomeStack}/>
                <Tab.Screen name="Community" component={CommunityPage}/>
                <Tab.Screen name="Member" component={MemberPage}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}
