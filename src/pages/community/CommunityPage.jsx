import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import CommunityStyles from '@pages/community/CommunityStyles';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import ConnectTop from '@components/connect/ConnectTop';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import IconCommunityTitle from '@components/community/IconCommunityTitle'
import ArrowRight from '@components/common/ArrowRight';
import ItemCommunityPreview from '@components/community/ItemCommunityPreview';

const CommunityPage = () => {
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

  const [tipPostList, setTipPostList] = useState([]);
  const [freePostList, setFreePostList] = useState([]);
  const { onboardingData } = useOnboarding();

  const handleFreeCommunity = () => {
    axios.get('http://10.224.101.45:8080/api/posts', {
      params: { boardCategory: 'TIP' },
      headers: {
        'Authorization': `Bearer ${onboardingData.accessToken}`,
        'Accept': 'application/json'
      },
      })
      .then(response => {
        setTipPostList(response.data.slice(0, 3));
      })
      .catch(error => {
        console.error('게시글 조회 오류:', error.response ? error.response.data : error.message);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      handleFreeCommunity();
    }, [])
  );

  const handleTipCommunity = () => {
    axios.get('http://10.224.101.45:8080/api/posts', {
      params: { boardCategory: 'FREE' },
      headers: {
        'Authorization': `Bearer ${onboardingData.accessToken}`,
        'Accept': 'application/json'
      },
      })
      .then(response => {
        setFreePostList(response.data.slice(0, 3));
      })
      .catch(error => {
        console.error('게시글 조회 오류:', error.response ? error.response.data : error.message);
      });
  };

  useEffect(() => {
    handleTipCommunity();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleTipCommunity();
    }, [])
  );

  return (
    <View style={CommunityStyles.container}>
        <ConnectTop style={CommunityStyles.connectTop}/>
        <SafeAreaView style={CommunityStyles.safeAreaView}>
          <View style={CommunityStyles.containerTextIcon}>
            <Text style={CommunityStyles.textChattingTitle}>게시판</Text>
            <IconBookmark
              style={CommunityStyles.iconBookmark} />
          </View>
          <View style={CommunityStyles.containerSearch}>
            <View style={CommunityStyles.containerSearchIcon}>
              <TextInput
                  style={CommunityStyles.search}
                  placeholder="검색"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isSearching ? (
                  <ConnectSearchCancel style={CommunityStyles.searchIcon} onPress={handleCancel} />
                ) : (
                  <ConnectSearchIcon style={CommunityStyles.searchIcon} onPress={handleSearch} />
              )}
            </View>
          </View>

          <View style={{marginTop: 130}}>
            <TouchableOpacity onPress={() => navigation.navigate('TipCommunityPage')}>
              <View style={CommunityStyles.containerCommunityTop}>
                <View style={CommunityStyles.containerTitle}>
                  <IconCommunityTitle style={CommunityStyles.iconCommunity} />
                  <Text style={CommunityStyles.textCommunityTitle}>꿀팁게시판</Text>
                </View>
                <View style={CommunityStyles.containerMore}>
                  <Text style={CommunityStyles.textCommunityMore}>더보기</Text>
                  <ArrowRight style={CommunityStyles.iconArrow} />
                </View>
              </View>
              <View style={CommunityStyles.itemCommunityPreview}>
                <ItemCommunityPreview props={tipPostList} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('FreeCommunityPage')}>
              <View style={CommunityStyles.containerCommunityTop}>
                <View style={CommunityStyles.containerTitle}>
                  <IconCommunityTitle style={CommunityStyles.iconCommunity} />
                  <Text style={CommunityStyles.textCommunityTitle}>자유게시판</Text>
                </View>
                <View style={CommunityStyles.containerMore}>
                  <Text style={CommunityStyles.textCommunityMore}>더보기</Text>
                  <ArrowRight style={CommunityStyles.iconArrow} />
                </View>
              </View>
              <View style={CommunityStyles.itemCommunityPreview}>
                <ItemCommunityPreview props={freePostList} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
  );
}

export default CommunityPage;
