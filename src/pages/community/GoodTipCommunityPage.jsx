import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import GoodTipCommunityStyles from '@pages/community/GoodTipCommunityStyles';

import ConnectTop from '@components/connect/ConnectTop';
import IconPostPlus from '@components/community/IconPostPlus';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import ItemCommunity from '@components/community/ItemCommunity';

const GoodTipCommunityPage = () => {
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

  return (
    <View style={GoodTipCommunityStyles.container}>
        <ConnectTop style={GoodTipCommunityStyles.connectTop}/>
        <TouchableOpacity style={GoodTipCommunityStyles.iconPostPlus} onPress={() => navigation.navigate('WhitePage', { noticeboard: '꿀팁게시판' })}>
          <IconPostPlus />
        </TouchableOpacity>
        <SafeAreaView style={GoodTipCommunityStyles.safeAreaView}>
          <View style={GoodTipCommunityStyles.containerTextIcon}>
            <Text style={GoodTipCommunityStyles.textChattingTitle}>꿀팁게시판</Text>
            <IconBookmark style={GoodTipCommunityStyles.iconBookmark} />
          </View>
          <View style={GoodTipCommunityStyles.containerSearch}>
            <View style={GoodTipCommunityStyles.containerSearchIcon}>
              <TextInput
                  style={GoodTipCommunityStyles.search}
                  placeholder="검색"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isSearching ? (
                  <ConnectSearchCancel style={GoodTipCommunityStyles.searchIcon} onPress={handleCancel} />
                ) : (
                  <ConnectSearchIcon style={GoodTipCommunityStyles.searchIcon} onPress={handleSearch} />
              )}
            </View>
          </View>

          <View style={GoodTipCommunityStyles.itemCommunity}>
            <ItemCommunity props={[
              { title: '성곡도서관 가는 길', context: '북악관 머시기저시기 와라라라라라랄...용두리를 지나서...어디지', heart: '24', bookmark: '2', comment: '2', date: '1일전' },
              { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', image: require('@assets/images/test_img/test_haedam.jpg'), heart: '14', bookmark: '4', comment: '2', date: '7일전' },
              { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', heart: '20', bookmark: '1', comment: '3', date: '5/11' },
            ]} />
          </View>
        </SafeAreaView>
      </View>
  );
}

export default GoodTipCommunityPage;
