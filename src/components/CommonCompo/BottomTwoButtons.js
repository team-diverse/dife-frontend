import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';
import ConnectRequest from '@components/ConnectRequest';

const { fontSub16 } = CustomTheme;

const BottomTwoButtons = ({ button1, button2 }) => {
  const [ modalVisible, setModalVisible ] = useState(false);

  const pressButton = () => {
      setModalVisible(true);
  }

  return (
      <View style={styles.rectangle}>
        <TouchableOpacity style={styles.chat}>
          <Text style={styles.TXchat}>{button1}</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.request} onPress={pressButton}>
            <Text style={styles.TXrequest}>{button2}</Text>
          </TouchableOpacity>
          <ConnectRequest
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
      </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.bgBasic,
    shadowColor: '#3C454E',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chat: {
    height: 44,
    backgroundColor: CustomTheme.bgBasic,
    borderWidth: 2,
    borderColor: CustomTheme.primaryMedium,
    borderRadius: 27,
    marginLeft: 24,
    marginRight: 8,
    marginVertical: 14,
  },
  request: {
    height: 44,
    backgroundColor: CustomTheme.primaryMedium,
    borderWidth: 2,
    borderColor: CustomTheme.primaryMedium,
    borderRadius: 27,
    marginRight: 24,
    marginLeft: 8,
    marginVertical: 14,
  },
  TXchat: {
    ...fontSub16,
    color: CustomTheme.primaryMedium,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  TXrequest: {
    ...fontSub16,
    color: CustomTheme.bgBasic,
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
});

export default BottomTwoButtons;
