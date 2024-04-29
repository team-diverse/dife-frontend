import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '@styles/CustomTheme.js';
import ConnectRequest from '@components/ConnectRequest';

const { fontSub16 } = CustomTheme;

const BottomTwoButtons = ({ button1, button2 }) => {
  const [ modalVisible, setModalVisible ] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  const pressButton1 = () => {
    if (button1 === '회원가입') {
      navigation.navigate('SignUp');
    }
  }
  const containerStyle = button2 === '커넥트 요청하기' ? styles.rectangle : styles.rectangleLogin;

  const pressButton2 = () => {
    if (button2 === '커넥트 요청하기') {
      setModalVisible(true);
    } else if (button2 === '로그인') {
      setIsLoggedIn(true);
    }
  }

  return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.chat} onPress={pressButton1}>
          <Text style={styles.TXchat}>{button1}</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.request} onPress={pressButton2}>
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
  rectangleLogin: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.bgBasic,
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
