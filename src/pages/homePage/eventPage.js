import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import EventStyles from './eventStyles';
import TopBar from '../../components/TobBar.js';
import EventCard from '../../components/eventCompo/EventCard.js';

const EventPage = () => {
    return (
        <SafeAreaView style={[EventStyles.container, { alignItems: 'center' }]}>
            <TopBar tobBar="이벤트"/>
            <EventCard title="[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보" date="2022.02.14 ~ 2022.02.15" eventImg={require('../../assets/images/test_img/test_haedam.jpg')} />
        </SafeAreaView>
    )
}

export default EventPage;