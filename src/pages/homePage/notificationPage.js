import React from 'react';
import { View, SafeAreaView, FlatList } from 'react-native';
import TopBar from '../../components/TobBar.js';
import NotificationCard from '../../components/notificationCompo/NotificationCard.js'
import NotificationStyles from './notificationStyles.js';
import ChatDf24 from '../../components/icon_24/chat_df_24.js';

const NotificationPage = () => {
    const notificationData = [
        {
            id: '1',
            icon: 'chat',
            name: 'Dann',
            context: '님이 새로 채팅을 보냈습니다. \n “Hi there!”',
            time: '09 : 25',
        },
        {
            id: '2',
            icon: 'heart',
            name: 'Dann',
            context: '님이 “교환학생 잘가는법” 게시물에 좋아요를 눌렀습니다.',
            time: '09 : 25',
        },
        {
            id: '3',
            icon: 'connect',
            name: 'Dann',
            context: '님이 회원님에게 커넥트 요청을 보냈습니다.',
            time: '09 : 25',
        },
    ]

    return (
        <SafeAreaView style={[NotificationStyles.container, { alignItems: 'center' }]}>
            <TopBar tobBar="알림"/>
            <FlatList style={NotificationStyles.flatlist}
                data={notificationData}
                renderItem={({ item }) => (
                    <NotificationCard
                        icon={item.icon}
                        name={item.name}
                        context={item.context}
                        time={item.time}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default NotificationPage;