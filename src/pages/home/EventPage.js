import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';

import EventStyles from '@pages/home/EventStyles.js';

import TopBar from '@components/TobBar.js';
import EventCard from '@components/event/EventCard.js';


const EventPage = () => {
    const eventData = [
        {
            id: '1',
            date: '2022.02.14 ~ 2022.02.15',
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
        <SafeAreaView style={[EventStyles.container, { alignItems: 'center' }]}>
            <TopBar tobBar="이벤트"/>
            <View style={EventStyles.flatlist}>
            <FlatList
            contentContainerStyle={EventStyles.flatlistContent}
                data={eventData}
                renderItem={({ item }) => (
                    <View style={EventStyles.eventCard}>
                    <EventCard
                        title={item.title}
                        date={item.date}
                        eventImg={item.eventImg}
                    />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            </View>
        </SafeAreaView>
    )
}

export default EventPage;