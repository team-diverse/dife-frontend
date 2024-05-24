import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';

import BookmarkStyles from '@pages/chat/BookmarkStyles';

import TopBar from '@components/TobBar';
import Bookmark from '@components/chat/Bookmark'

const BookmarkPage = () => {
    const notificationData = [
        {
            id: '1',
            name: 'Dann',
            context: '“Hello!”',
            date: '2024.05.04',
            time: '09 : 25',
            translation: '안녕!',
        },
        {
            id: '2',
            name: 'Dann',
            context: 'test',
            date: '2024.05.04',
            time: '09 : 25',
            translation: '테스트',
        },
        {
            id: '3',
            name: 'Dann',
            context: '“The warm spring weather makes taking a walk in the park very enjoyable.”',
            date: '2024.05.04',
            time: '09 : 25',
            translation: '“봄 날씨가 따뜻해서 공원에서 산책하는 것이 너무 좋습니다.”',
        },
        {
            id: '4',
            name: 'Dann',
            context: 'Oh, my?!',
            date: '2024.05.04',
            time: '09 : 25',
            translation: '으이?!',
        },
    ]

    return (
        <SafeAreaView style={[BookmarkStyles.container, { alignItems: 'center' }]}>
            <TopBar tobBar="스크랩 보관함"/>
            <FlatList style={BookmarkStyles.flatlist}
                data={notificationData}
                renderItem={({ item }) => (
                    <Bookmark
                        name={item.name}
                        context={item.context}
                        date={item.date}
                        time={item.time}
                        translation={item.translation}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default BookmarkPage;