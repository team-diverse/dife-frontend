import React from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import TobBar from '@components/TobBar.js';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LikeUserOneToOne from '@pages/ConnectPages/LikeUserOneToOne';
import LikeUserGroup from '@pages/ConnectPages/LikeUserGroup';
import { CustomTheme } from '@styles/CustomTheme.js';

const ConnectLikeUserPage = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <SafeAreaView style={styles.container}>
            <TobBar tobBar="좋아요 목록"/>
            <View style={styles.tabContainer}>
                <Tab.Navigator
                    initialRouteName="LikeUserOneToOne"
                    screenOptions={{
                        tabBarActiveTintColor: CustomTheme.primaryMedium,
                        tabBarInactiveTintColor: CustomTheme.bgList,
                        tabBarLabelStyle: {
                            fontSize: 18,
                            lineHeight: 26,
                            fontFamily: 'NotoSansCJKkr-Bold', },
                    }}
                >
                    <Tab.Screen
                        name="1:1"
                        component={LikeUserOneToOne}
                        options={{ tabBarLabel: '1:1' }} />
                    <Tab.Screen
                        name="그룹"
                        component={LikeUserGroup}
                        options={{ tabBarLabel: '그룹' }} />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    tabContainer: {
        flex: 1,
    },
});

export default ConnectLikeUserPage;
