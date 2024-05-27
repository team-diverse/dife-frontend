import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import ConnectStyles from '@pages/connect/ConnectStyles';

import ConnectTop from '@components/connect/ConnectTop';
import ConnectSearchIcon from '@components/connect/ConnectSearchIcon';
import ConnectSearchCancel from '@components/connect/ConnectSearchCancel';
import ConnectLikeUser from '@components/connect/ConnectLikeUser';
import FilterIcon from '@components/connect/FilterIcon';
import FilterBottomSlide from '@components/connect/FilterBottomSlide';
import ConnectCard from '@components/connect/ConnectCard';
import ConnectDife from '@components/connect/ConnectDife';
import ConnectReset from '@components/connect/ConnectReset';

const ConnectPage = () => {
  const navigation = useNavigation();

  const connectData = [
    {
      id: '1',
      profile: require('@assets/images/test_img/test_connectProfile.jpeg'),
      name: 'Amy',
      country: 'France',
      age: '23',
      major: 'Industrial Design',
      introduction: 'adipiscing varius eu sit nulla, luctus tincidunt ex at ullamcorper cursus odio laoreet placerat.',
      tags: ['enfp', 'Sports', 'Drawing'],
    },
    {
      id: '2',
      profile: require('@assets/images/test_img/test_haedam.jpg'),
      name: 'haedam',
      country: 'Korean',
      age: '1',
      major: 'Software',
      introduction: 'Hello!',
      tags: ['istp', 'Walking', 'Eating'],
    },
  ]

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [ modalVisible, setModalVisible ] = useState(false);

  const [isIndividualTab, setIsIndividualTab] = useState(false);

  const pressButton = () => {
      setModalVisible(true);
  }

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

  const handleMoveOnetoone = () => {
    setIsIndividualTab(false);
  };

  const handleMoveGroup = () => {
    setIsIndividualTab(true);
  };

  return (
    <View style={ConnectStyles.container}>
      <View style={ConnectStyles.topDifeContainer}>
        
        <View style={ConnectStyles.connectDife}>
          <ConnectDife />
        </View>
        <ConnectTop />
      </View>
        <SafeAreaView style={ConnectStyles.safeAreaView}>
          <View style={ConnectStyles.textIconContainer}>
            <Text style={ConnectStyles.connectTitle}>Connect</Text>
            <ConnectLikeUser style={ConnectStyles.addUserIcon}
              onPress={() => navigation.navigate('ConnectLikeUserPage')}/>
          </View>
          <View style={ConnectStyles.searchContainer}>
            <TouchableOpacity onPress={pressButton}>
              <FilterIcon style={ConnectStyles.searchFilter}/>
            </TouchableOpacity>
            <FilterBottomSlide
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
            <View style={ConnectStyles.searchIconContainer}>
            <TextInput
                style={ConnectStyles.search}
                placeholder="검색"
                value={searchTerm}
                onChangeText={setSearchTerm}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              {isSearching ? (
              <ConnectSearchCancel style={ConnectStyles.searchIcon} onPress={handleCancel} />
            ) : (
              <ConnectSearchIcon style={ConnectStyles.searchIcon} onPress={handleSearch} />
            )}
            </View>
          </View>

          <View style={ConnectStyles.midContainer}>
            <View style={ConnectStyles.tabContainer} >
                <Text style={isIndividualTab ? ConnectStyles.textTab : ConnectStyles.textActiveTab} onPress={handleMoveOnetoone}>1 : 1</Text>
                <Text style={isIndividualTab ? ConnectStyles.textActiveTab : ConnectStyles.textTab} onPress={handleMoveGroup}>그룹</Text>
            </View>
            <View style={ConnectStyles.resetContainer}>
              <Text style={ConnectStyles.textReset}>Reset</Text>
              <ConnectReset />
            </View>
          </View>

          {isIndividualTab ? (
            <></>
          ) : (
            <View style={ConnectStyles.cardContainer}>
              <View style={ConnectStyles.flatlist}>
                <FlatList
                  contentContainerStyle={ConnectStyles.flatlistContent}
                  data={connectData}
                  renderItem={({ item }) => (
                    <ConnectCard
                      {...item}
                      tag={item.tags} />
                  )}
                  keyExtractor={item => item.id}
                />
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
  );
}

export default ConnectPage;
