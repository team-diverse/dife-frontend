import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';

import ChatInac24 from '../icon_24/chat_inac_24.js';
import AddFriendInac24 from '../icon_24/addFriend_inac_24.js';
import HeartInac24 from '../icon_24/heart_inac_24.js';

const { fontCaption, fontNavi } = customTheme;

const NotificationCard = ({icon='아이콘', name='이름', context='내용', time='시간'}) => {
  let iconSvg;
  if (icon === 'chat') {
    iconSvg = <ChatInac24 />;
  } else if (icon === 'connect') {
    iconSvg = <AddFriendInac24 />;
  } else if (icon === 'heart') {
    iconSvg = <HeartInac24 />;
  }

  return (
    <View style={styles.rectangle}>
        <View style={styles.notify}>
            <View style={styles.iconTextContainer}>
              <View style={styles.icon}>{iconSvg}</View>
                <View style={styles.textContainer}>
                  <Text style={styles.context}>{name}{context}</Text>
                </View>
            </View>
              <Text style={styles.time}>{time}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    width: '100%',
    height: 54,
    backgroundColor: customTheme.bgBasic,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: customTheme.bgList,
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
    width: 24,
    height: 24,
    marginLeft: 24,
    marginRight: 12,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 205,
  },
  context: {
    ...fontCaption,
  },
  time: {
    ...fontNavi,
    color: customTheme.textDisable,
    marginRight: 28,
  },
});

export default NotificationCard;