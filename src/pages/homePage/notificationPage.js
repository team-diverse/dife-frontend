import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import EventStyles from './eventStyles';
import TopBar from '../../components/TobBar.js';

const NotificationPage = () => {
    return (
        <SafeAreaView style={[EventStyles.container, { alignItems: 'center' }]}>
            <TopBar tobBar="알림"/>
        </SafeAreaView>
    )
}

export default NotificationPage;