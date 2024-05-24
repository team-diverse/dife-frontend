import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

import IconChatProfile from '@components/chat/IconChatProfile';
import { useNavigation } from '@react-navigation/native';

const { fontCaption, fontNavi } = CustomTheme;

const ChatRoomList = ({icon, name='name', context='context', time='time'}) => {
  const navigation = useNavigation('')

  return (
    <TouchableOpacity style={styles.rectangle} onPress={() => navigation.navigate('ChatRoomPage')}>
        <View style={styles.notify}>
            <View style={styles.iconTextContainer}>
              <View style={styles.icon}>
                <IconChatProfile />
              </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textName}>{name}</Text>
                  <Text style={styles.textContext}>{context}</Text>
                </View>
            </View>
              <Text style={styles.textTime}>{time}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    width: '100%',
    height: 80,
    backgroundColor: CustomTheme.bgBasic,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notify: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginTop: 14,
    marginBottom: 18,
    marginLeft: 24,
  },
  textContainer: {
    marginLeft: 22,
  },
  textName: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  textContext: {
    ...fontCaption,
    width: 187,
    height: 34,
    marginTop: 4,
  },
  textTime: {
    ...fontNavi,
    color: CustomTheme.textDisable,
    marginTop: 14,
    marginRight: 25,
  },
});

export default ChatRoomList;