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
    <SafeAreaView style={[ConnectStyles.container, { alignItems: 'center' }]}>
      <ConnectTop />
      <ConnectSearch />
      <ConnectSearchIcon />
      <ConnectSearchCancel />
      <ConnectAddUser />
      <ConnectSearchFilter />
    </SafeAreaView>
  );
}

export default ConnectPage;