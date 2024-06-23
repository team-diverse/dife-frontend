import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import TipCommunityStyles from '@pages/community/TipCommunityStyles';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ConnectTop from '@components/connect/ConnectTop';
import IconPostPlus from '@components/community/IconPostPlus';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import ItemCommunity from '@components/community/ItemCommunity';

const TipCommunityPage = () => {
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      axios.get(`${searchTerm}`)
        .then(response => {
          setSearchData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

  const handleFocus = () => {
    setIsSearching(true);
  };

  const handleBlur = () => {
    setIsSearching(false);
  };

  const handleCancel = () => {
    setSearchTerm('');
    setIsSearching(false);
    Keyboard.dismiss();
  };

  const [postList, setPostList] = useState([]);
  const { onboardingData } = useOnboarding();

  const handleTipCommunity = () => {
    axios.get('http://10.224.101.45:8080/api/posts', {
      params: { boardCategory: 'TIP' },
      headers: {
        'Authorization': `Bearer ${onboardingData.accessToken}`,
        'Accept': 'application/json'
      },
      })
      .then(response => {
        setPostList(response.data);
      })
      .catch(error => {
        console.error('게시글 조회 오류:', error.response ? error.response.data : error.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleTipCommunity();
    }, [])
  );

  return (
    <View style={TipCommunityStyles.container}>
      <View style={TipCommunityStyles.backgroundBlue} />
        <TouchableOpacity style={TipCommunityStyles.iconPostPlus} onPress={() => navigation.navigate('WhitePage', { noticeboard: '꿀팁게시판' })}>
          <IconPostPlus />
        </TouchableOpacity>
        <SafeAreaView style={TipCommunityStyles.safeAreaView}>
          <View style={TipCommunityStyles.connectTop}>
            <ConnectTop />
          </View>
          <View style={TipCommunityStyles.containerTextIcon}>
            <Text style={TipCommunityStyles.textChattingTitle}>꿀팁게시판</Text>
            <IconBookmark style={TipCommunityStyles.iconBookmark} />
          </View>
          <View style={TipCommunityStyles.containerSearch}>
            <View style={TipCommunityStyles.containerSearchIcon}>
              <TextInput
                  style={TipCommunityStyles.search}
                  placeholder="검색"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isSearching ? (
                  <ConnectSearchCancel style={TipCommunityStyles.searchIcon} onPress={handleCancel} />
                ) : (
                  <ConnectSearchIcon style={TipCommunityStyles.searchIcon} onPress={handleSearch} />
              )}
            </View>
          </View>

          <ScrollView>
            <View style={TipCommunityStyles.itemCommunity}>
              <ItemCommunity props={postList} />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
  );
}

export default TipCommunityPage;