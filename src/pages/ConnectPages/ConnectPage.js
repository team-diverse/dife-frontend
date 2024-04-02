import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ConnectStyles from '@pages/ConnectPages/ConnectStyles.js';
import ConnectTop from '@components/ConnectCompo/ConnectTop.js';
import ConnectSearch from '@components/ConnectCompo/ConnectSearch.js';
import ConnectSearchIcon from '@components/ConnectCompo/ConnectSearchIcon.js';
import ConnectSearchCancel from '@components/ConnectCompo/ConnectSearchCancel.js';
import ConnectAddUser from '@components/ConnectCompo/ConnectAddUser.js';
import ConnectSearchFilter from '@components/ConnectCompo/ConnectSearchFilter.js';

const ConnectPage = () => {
  return (
    <View style={ConnectStyles.container}>
      <ConnectTop style={ConnectStyles.connectTop}/>
        <SafeAreaView style={ConnectStyles.safeAreaView}>
          <View style={ConnectStyles.textIconContainer}>
            <Text style={ConnectStyles.connectTitle}>Connect</Text>
            <ConnectAddUser style={ConnectStyles.addUserIcon}/>
          </View>
          <View style={ConnectStyles.searchContainer}>
            <ConnectSearchFilter style={ConnectStyles.searchFilter}/>
          <View style={ConnectStyles.searchIconContainer}>
              <ConnectSearch style={ConnectStyles.search}/>
              <ConnectSearchIcon style={ConnectStyles.searchIcon}/>
            </View>
          </View>
        </SafeAreaView>
      </View>
  );
}

export default ConnectPage;