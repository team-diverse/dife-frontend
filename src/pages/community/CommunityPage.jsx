import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import CommunityStyles from '@pages/community/CommunityStyles';

import ConnectTop from '@components/connect/ConnectTop';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import IconCommunityTitle from '@components/community/IconCommunityTitle'
import ArrowRight32 from '@components/Icon32/ArrowRight32';
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
                  <ArrowRight32 style={CommunityStyles.iconArrow} />
                </View>
              </View>
              <View style={CommunityStyles.itemCommunityPreview}>
                <ItemCommunityPreview props={[
                  { title: '성곡도서관 가는 길', context: '북악관 머시기저시기 와라라라라라랄 지나서...' },
                  { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...' },
                  { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...' },
                ]} />
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
                  <ArrowRight32 style={CommunityStyles.iconArrow} />
                </View>
              </View>
              <View style={CommunityStyles.itemCommunityPreview}>
                <ItemCommunityPreview props={[
                  { title: '성곡도서관 가는 길', context: '북악관 머시기저시기 와라라라라라랄 지나서...' },
                  { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...' },
                  { title: '교환학생 잘 가는 방법', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...' },
                ]} />
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
  );
}

export default CommunityPage;
