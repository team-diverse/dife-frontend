import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, FlatList, Keyboard, TouchableOpacity } from 'react-native';
import ConnectStyles from '@pages/ConnectPages/ConnectStyles.js';
import ConnectTop from '@components/ConnectCompo/ConnectTop.js';
import ConnectSearchIcon from '@components/ConnectCompo/ConnectSearchIcon.js';
import ConnectSearchCancel from '@components/ConnectCompo/ConnectSearchCancel.js';
import ConnectLikeUser from '@components/ConnectCompo/ConnectLikeUser.js';
import FilterIcon from '@components/ConnectCompo/FilterIcon.js';
import FilterBottomSlide from '@components/ConnectCompo/FilterBottomSlide.js';
import ConnectCard from '@components/ConnectCompo/ConnectCard.js';
import ConnectDife from '@components/ConnectCompo/ConnectDife.js';
import ConnectReset from '@components/ConnectCompo/ConnectReset.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
      tag1: 'enfp',
      tag2: 'Sports',
      tag3: 'Drawing',
    },
  ]

  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [ modalVisible, setModalVisible ] = useState(false);

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

  return (
    <View style={ConnectStyles.container}>
      <View style={ConnectStyles.topDifeContainer}>
        <ConnectTop style={ConnectStyles.connectTop}/>
        <ConnectDife style={ConnectStyles.connectDife}/>
      </View>
        <SafeAreaView style={ConnectStyles.safeAreaView}>
          <View style={ConnectStyles.textIconContainer}>
            <Text style={ConnectStyles.connectTitle}>Connect</Text>
            <ConnectLikeUser style={ConnectStyles.addUserIcon}
              onPress={() => navigation.navigate('ConnectLikeUser')}/>
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
            <View style={ConnectStyles.tabContainer}>
              <Text style={ConnectStyles.TXtab}>1 : 1</Text>
              <Text style={ConnectStyles.TXtab}>그룹</Text>
            </View>
            <View style={ConnectStyles.resetContainer}>
              <Text style={ConnectStyles.TXreset}>Reset</Text>
              <ConnectReset />
            </View>
          </View>
          <View style={ConnectStyles.cardContainer}>
            <View style={ConnectStyles.flatlist}>
            <FlatList
            contentContainerStyle={ConnectStyles.flatlistContent}
                data={connectData}
                renderItem={({ item }) => (
                    <View style={ConnectStyles.cardContainer}>
                    <ConnectCard
                      profile={item.profile}
                      name={item.name}
                      country={item.country}
                      major={item.major}
                      introduction={item.introduction}
                      tag1={item.tag1}
                      tag2={item.tag2}
                      tag3={item.tag3}
                    />
                    </View>
                )}
                keyExtractor={item => item.id}
            />
            </View>
          </View>
        </SafeAreaView>
      </View>
  );
}

export default ConnectPage;
