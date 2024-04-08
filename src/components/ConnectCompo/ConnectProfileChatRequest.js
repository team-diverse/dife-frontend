import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub16 } = CustomTheme;

const ConnectProfileChatRequest = () => {
  return (
    <TouchableOpacity>
      <View style={styles.rectangle}>
        <View style={styles.chat}>
          <Text style={styles.TXchat}>채팅하기</Text>
        </View>
        <View style={styles.request}>
          <Text style={styles.TXrequest}>커넥트 요청</Text>
        </View>
      </View>
    </TouchableOpacity>
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

export default ConnectProfileChatRequest;
