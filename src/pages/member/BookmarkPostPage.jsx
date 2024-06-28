import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import BookmarkPostStyles from '@pages/member/BookmarkPostStyles';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ItemLikeBookmark from '@components/member/ItemLikeBookmark';

const BookmarkPostPage = () => {
    const [bookmarkPostList, setBookmarkPostList] = useState([]);
    const { onboardingData } = useOnboarding();

    useEffect(() => {
        const handleBookmarkPost = async () => {
          try {
            const response = await axios.get(`http://192.168.45.135:8080/api/bookmarks`, {
              headers: {
                'Authorization': `Bearer ${onboardingData.accessToken}`,
                'Accept': 'application/json'
              },
            });
            setBookmarkPostList(response.data);
          } catch (error) {
              console.error('북마크한 게시글 조회 오류:', error.response ? error.response.data : error.message);
          }
        };
        handleBookmarkPost();
      }, []);

    return (
        <View style={BookmarkPostStyles.container}>
            <ScrollView>
                <View style={BookmarkPostStyles.itemLikeBookmark}>
                    <ItemLikeBookmark props={bookmarkPostList} />
                </View>
            </ScrollView>
        </View>
    );
}

export default BookmarkPostPage;
