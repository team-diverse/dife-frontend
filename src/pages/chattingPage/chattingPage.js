import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const chattingPage = () => {
  return (
    <View style={styles.container}>
      <Text>chattingPage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default chattingPage;
