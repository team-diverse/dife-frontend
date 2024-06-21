import React from 'react';
import { View, ScrollView } from 'react-native';

import LikePostStyles from '@pages/member/LikePostStyles';

import ItemLikeBookmark from '@components/member/ItemLikeBookmark';

const LikePostPage = () => {
    const likePostList = [
        {title: '좋아요 화면입니다', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
        {title: '성곡도서관 가는 길', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
        {title: '성곡도서관 가는 길', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
        {title: '성곡도서관 가는 길', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
        {title: '성곡도서관 가는 길', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
        {title: '성곡도서관 가는 길', content: '북악관 머시기저시기 와라라라라라랄 지나서...'},
    ]

  return (
    <View style={LikePostStyles.container}>
        <ScrollView>
            <View style={LikePostStyles.itemLikeBookmark}>
                <ItemLikeBookmark props={likePostList} />
            </View>
        </ScrollView>
      </View>
  );
}

export default LikePostPage;
