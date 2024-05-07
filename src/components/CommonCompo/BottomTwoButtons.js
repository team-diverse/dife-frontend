import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { CustomTheme } from '@styles/CustomTheme.js';
import ConnectRequest from '@components/ConnectRequest';
import { useOnboarding } from 'src/states/OnboardingContext.js';

const { fontSub16 } = CustomTheme;

const BottomTwoButtons = ({ button1, button2, email=null, pw=null }) => {
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
      handleLogin();
    }
  }

  const { updateOnboardingData } = useOnboarding();

  const handleLogin = () => {
    axios.post(`http://192.168.45.64:8080/api/members/login?email=${email}&password=${pw}`, {
    email: {email},
    password: {pw},
    }, {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
      }
      })
    .then(response => {
        console.log('로그인 성공:', response.data);
        updateOnboardingData({
          token: response.data.accessToken,
          id: response.data.member_id
          });
        navigation.navigate('Nickname');
    })
    .catch(error => {
        console.error('로그인 오류:', error.response ? error.response.data : error.message);
      });
    };

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