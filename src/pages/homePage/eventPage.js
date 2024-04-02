import React, { useState } from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import EventStyles from './eventStyles';
import TopBar from '../../components/TopBar.js';
import EventCard from '../../components/eventCompo/EventCard.js';

const EventPage = () => {
    const eventData = [
        {
            id: '1',
            title: '[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보',
            date: '2022.02.14 ~ 2022.02.15',
            eventImg: require('../../assets/images/test_img/test_event.png')
        },
        {
            id: '2',
            title: '[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보',
            date: '2022.02.14 ~ 2022.02.15',
            eventImg: require('../../assets/images/test_img/test_event2.png')
        },
        {
            id: '3',
            title: '[프로그램] 해담이 탐구회',
            date: '2022.11.13 ~ 2022.11.13',
            eventImg: require('../../assets/images/test_img/test_haedam.jpg')
        },
        {
            id: '4',
            title: '[프로그램] 해담이 탐구회',
            date: '2022.11.13 ~ 2022.11.13',
            eventImg: require('../../assets/images/test_img/test_haedam.jpg')
        },
    ];

    return (
        <SafeAreaView style={[EventStyles.container, { alignItems: 'center' }]}>
            <TopBar topBar="이벤트"/>
            <FlatList
                data={eventData}
                renderItem={({ item }) => (
                    <EventCard
                        title={item.title}
                        date={item.date}
                        eventImg={item.eventImg}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default EventPage;