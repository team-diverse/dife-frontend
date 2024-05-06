import React from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import ConnectLikeUserStyles from '@pages/connect/ConnectLikeUserStyles.js';
import ConnectStyles from './ConnectStyles';
import ConnectCard from '@components/connect/ConnectCard.js';

const LikeUserOneToOne = () => {
    const connectData = [
        {
          id: '1',
          profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
          name: 'Amy',
          country: 'France',
          age: '23',
          major: 'Industrial Design',
          introduction: 'adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.',
          tag1: 'enfp',
          tag2: 'Sports',
          tag3: 'Drawing',
        },
      ]

    return (
        <SafeAreaView style={[ConnectLikeUserStyles.container, { alignItems: 'center' }]}>
            <View style={ConnectStyles.cardContainer}>
            <View style={ConnectStyles.flatlist}>
            <FlatList
            contentContainerStyle={ConnectStyles.flatlistContent}
                data={connectData}
                renderItem={({ item }) => (
                    <View style={ConnectStyles.cardContainer}>
                    <ConnectCard
                      profile={item.profile}
                      name={item.name}
                      country={item.country}
                      major={item.major}
                      introduction={item.introduction}
                      tag1={item.tag1}
                      tag2={item.tag2}
                      tag3={item.tag3}
                    />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            </View>
          </View>
        </SafeAreaView>
    )
}

export default LikeUserOneToOne;