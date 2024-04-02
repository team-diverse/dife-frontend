import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ConnectStyles from '@pages/ConnectPages/ConnectStyles.js';

const ConnectPage = () => {
  return (
    <SafeAreaView style={[ConnectStyles.container, { alignItems: 'center' }]}>
      <Text>ConnectPage</Text>
    </SafeAreaView>
  );
}

export default ConnectPage;