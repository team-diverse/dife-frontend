import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import FreeCommunityStyles from '@pages/community/FreeCommunityStyles';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ConnectTop from '@components/connect/ConnectTop';
import IconPostPlus from '@components/community/IconPostPlus';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import ItemCommunity from '@components/community/ItemCommunity';

const FreeCommunityPage = () => {
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

  useEffect(() => {
    axios.get('http://192.168.45.176:8080/api/posts', {
      params: { boardCategory: 'FREE' },
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
  }, []);

  return (
    <View style={FreeCommunityStyles.container}>
      <View style={FreeCommunityStyles.backgroundBlue} />
        <TouchableOpacity style={FreeCommunityStyles.iconPostPlus} onPress={() => navigation.navigate('WhitePage', { noticeboard: '자유게시판' })}>
          <IconPostPlus />
        </TouchableOpacity>
        <SafeAreaView style={FreeCommunityStyles.safeAreaView}>
          <View style={FreeCommunityStyles.connectTop}>
            <ConnectTop/>
          </View>
          <View style={FreeCommunityStyles.containerTextIcon}>
            <Text style={FreeCommunityStyles.textChattingTitle}>자유게시판</Text>
            <IconBookmark style={FreeCommunityStyles.iconBookmark} />
          </View>
          <View style={FreeCommunityStyles.containerSearch}>
            <View style={FreeCommunityStyles.containerSearchIcon}>
              <TextInput
                  style={FreeCommunityStyles.search}
                  placeholder="검색"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isSearching ? (
                  <ConnectSearchCancel style={FreeCommunityStyles.searchIcon} onPress={handleCancel} />
                ) : (
                  <ConnectSearchIcon style={FreeCommunityStyles.searchIcon} onPress={handleSearch} />
              )}
            </View>
          </View>

          <ScrollView>
            <View style={FreeCommunityStyles.itemCommunity}>
              <ItemCommunity props={postList} />
            </View>
          </ScrollView>
          
        </SafeAreaView>
      </View>
  );
}

export default FreeCommunityPage;
