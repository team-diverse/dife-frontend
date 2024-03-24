import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import EventStyles from './eventStyles';
import TopBar from '../../components/TobBar.js';

const EventPage = () => {
    return (
        <SafeAreaView style={EventStyles.container}>
            <TopBar tobBar="이벤트"/>
            {/* <Text>Event</Text> */}
        </SafeAreaView>
    )
}

export default EventPage;