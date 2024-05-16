import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import ChattingStyles from '@pages/chat/ChattingStyles';

import ConnectTop from '@components/connect/ConnectTop';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import IconBookmark from '@components/chat/IconBookmark';
import ChatRoomList from '@components/chat/ChatRoomList';
import ConnectReset from '@components/connect/ConnectReset';
import IconChatPlus from '@components/chat/IconChatPlus';

const ChattingPage = () => {
  const navigation = useNavigation();

  const chatData = [
    {
      id: '1',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '2',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '3',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '4',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '5',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '6',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
    {
      id: '7',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      context: 'nec non. lorem. luctus ac Donec non, efficitur. diam vitae ame ...',
      time: '09:25',
    },
  ]

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [chatListCount, setChatListCount] = useState(1);

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
    <View style={ChattingStyles.container}>
        <ConnectTop style={ChattingStyles.connectTop}/>
        <TouchableOpacity style={ChattingStyles.iconChatPlus}>
          <IconChatPlus />
        </TouchableOpacity>
        <SafeAreaView style={ChattingStyles.safeAreaView}>
          <View style={ChattingStyles.containerTextIcon}>
            <Text style={ChattingStyles.textChattingTitle}>Chatting</Text>
            <IconBookmark
              style={ChattingStyles.iconBookmark}
              onPress={() => navigation.navigate('BookmarkPage')} />
          </View>
          <View style={ChattingStyles.containerSearch}>
            <View style={ChattingStyles.containerSearchIcon}>
              <TextInput
                  style={ChattingStyles.search}
                  placeholder="검색"
                  value={searchTerm}
                  onChangeText={setSearchTerm}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                {isSearching ? (
                  <ConnectSearchCancel style={ChattingStyles.searchIcon} onPress={handleCancel} />
                ) : (
                  <ConnectSearchIcon style={ChattingStyles.searchIcon} onPress={handleSearch} />
              )}
            </View>
          </View>

          <View style={ChattingStyles.containerMiddle}>
            <View style={ChattingStyles.containerTab}>
              <Text style={ChattingStyles.textTab}>1 : 1</Text>
              <Text style={ChattingStyles.textTab}>그룹</Text>
            </View>
            <View style={ChattingStyles.containerReset}>
              <Text style={ChattingStyles.textReset}>Reset</Text>
              <ConnectReset />
            </View>
          </View>

          {chatListCount != 0 ? (
            <View style={ChattingStyles.containerChatItems}>
              <View style={ChattingStyles.flatlist}>
                <FlatList
                  contentContainerStyle={ChattingStyles.flatlistContent}
                  data={chatData}
                  renderItem={({ item }) => (
                      <ChatRoomList
                        name={item.name}
                        context={item.context}
                        time={item.time}
                      />
                    )}
                    keyExtractor={item => item.id}
                />
              </View>
            </View>
          ) : (
            <View style={ChattingStyles.containerTextNoChat} >
              <Text style={ChattingStyles.textNoChat}>아직 채팅방이 없습니다.{'\n'}친구와 새로운 채팅을 시작해보세요!</Text>
            </View>
          )}
        </SafeAreaView>
      </View>
  );
}

export default ChattingPage;
