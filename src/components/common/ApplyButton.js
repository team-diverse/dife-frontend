import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';
import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';

const { fontSub16 } = CustomTheme;

const ApplyButton = ({ text="applyBtn", background=false, onPress=null, disabled=false, access=false }) => {
  const rectangleStyle = background ? styles.rectangle : {};
  const navigation = useNavigation();

  const requestPermissions = async () => {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
  
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
  
    if (finalStatus !== 'granted') {
      Alert.alert(
        '알림',
        '설정에서 알림 권한을 허용해주세요.',
        [
          { text: '취소', style: 'cancel' },
          { text: '설정으로 이동', onPress: () => Linking.openSettings() }
        ]
      );
    }
    else {
      navigation.navigate('Login');
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if ({access}) {
      requestPermissions();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View style={rectangleStyle}>
        <View style={[styles.apply, disabled && styles.disabled]}>
          <Text style={styles.text}>{text}</Text>
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
  apply: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.primaryMedium,
    borderRadius: 27,
    marginHorizontal: 24,
    marginVertical: 14,
  },
  text: {
    ...fontSub16,
    color: CustomTheme.bgBasic,
    paddingHorizontal: 59,
    paddingVertical: 10,
  },
  disabled: {
    backgroundColor: CustomTheme.borderColor,
  },
});

export default ApplyButton;
