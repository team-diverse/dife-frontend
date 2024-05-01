<<<<<<< HEAD:src/pages/homePage/eventPage.js
import React, { useState } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { View, Text } from 'react-native';
=======
import { View, Text, SafeAreaView } from 'react-native';
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
=======
import { View, FlatList, SafeAreaView } from 'react-native';
>>>>>>> f2e9e76 (feat: eventPage 스크롤 구현)
import EventStyles from './eventStyles';
=======
import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import EventStyles from './EventStyles.js';

>>>>>>> 43acbdb (refactor: 파일명과 객체명 일치 및 안 쓰이는 부분 정리):src/pages/HomePages/EventPage.js
import TopBar from '../../components/TobBar.js';
import EventCard from '../../components/EventCompo/EventCard.js';


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
            title: '[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보',
            date: '2022.02.14 ~ 2022.02.15',
            eventImg: require('../../assets/images/test_img/test_event.png')
        },
        {
            id: '5',
            title: '[프로그램] 2022-1학기 해외파견교환학생 설명회 홍보',
            date: '2022.02.14 ~ 2022.02.15',
            eventImg: require('../../assets/images/test_img/test_event2.png')
        },
    ];

    return (
<<<<<<< HEAD
<<<<<<< HEAD
        <View>
            <Text>Event</Text>
        </View>
>>>>>>> 9d6afdd (feat: stack navigation 기능 추가 및 eventpage 관련 파일 생성)
=======
        <SafeAreaView style={EventStyles.container}>
=======
        <SafeAreaView style={[EventStyles.container, { alignItems: 'center' }]}>
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
            <TopBar tobBar="이벤트"/>
            <View style={EventStyles.flatlist}>
            <FlatList
            contentContainerStyle={EventStyles.flatlistContent}
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
            </View>
        </SafeAreaView>
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
    )
}

export default EventPage;