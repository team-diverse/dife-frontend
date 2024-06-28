import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import LikedPostStyles from '@pages/member/LikedPostStyles';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ItemLikeBookmark from '@components/member/ItemLikeBookmark';

const LikedPostPage = () => {
    const [likedPostList, setLikedPostList] = useState([]);
    const { onboardingData } = useOnboarding();

    useEffect(() => {
        const handleLikedPost = async () => {
          try {
            const response = await axios.get(`http://192.168.45.135:8080/api/likes`, {
              headers: {
                'Authorization': `Bearer ${onboardingData.accessToken}`,
                'Accept': 'application/json'
              },
            });
            setLikedPostList(response.data);
          } catch (error) {
              console.error('좋아요한 게시글 조회 오류:', error.response ? error.response.data : error.message);
          }
        };
        handleLikedPost();
      }, []);

  return (
    <View style={LikedPostStyles.container}>
        <ScrollView>
            <View style={LikedPostStyles.itemLikeBookmark}>
                <ItemLikeBookmark props={likedPostList} />
            </View>
        </ScrollView>
      </View>
  );
}

export default LikedPostPage;
