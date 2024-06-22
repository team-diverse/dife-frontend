import React from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';

import GroupListStyles from '@pages/member/GroupListStyles';

import TopBar from '@components/common/TopBar';
import IconFriendNumber from '@components/chat/IconFriendNumber'
import GroupList from '@components/member/GroupList'

const GroupListPage = () => {
    const FriendData = [
        {
            id: '1',
            name: 'Study English!',
            headcount: 23,
        },
        {
            id: '2',
            name: 'From Italy💞💞',
            headcount: 7,
        },
        {
            id: '3',
            name: 'From Italy',
            headcount: 8,
        },
        {
            id: '4',
            name: 'Study English!',
            headcount: 23,
        },
    ]

    return (
        <SafeAreaView style={GroupListStyles.container}>
            <TopBar topBar="그룹 목록" color='#000' />
            <View style={GroupListStyles.containerFriendNumber}>
                <Text style={GroupListStyles.textFriend}>내 그룹</Text>
                <IconFriendNumber />
                <Text style={GroupListStyles.textNumber}>{'12'}</Text>
            </View>
            <FlatList style={GroupListStyles.flatlist}
                data={FriendData}
                renderItem={({ item }) => (
                    <GroupList
                        name={item.name}
                        headcount={item.headcount}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

export default GroupListPage;