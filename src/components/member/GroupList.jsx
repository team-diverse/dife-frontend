import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

import IconChatProfile from '@components/chat/IconChatProfile';
import IconSend from '@components/common/IconSend';
import IconMenu from '@components/chat/IconMenu';
import IconFriendNumber from '@components/chat/IconFriendNumber';

const { fontCaption } = CustomTheme;

const GroupList = ({icon, name='name', headcount=0 }) => {

    return (
        <>
        <TouchableOpacity
            style={styles.rectangle}>
            <View style={styles.containerContext}>
                <View style={styles.iconTextContainer}>
                    <View style={styles.icon}>
                        <IconChatProfile />
                    </View>
                    <Text style={styles.textName}>{name}</Text>
                    <View style={styles.containerHeadcount}>
                      <IconFriendNumber />
                      <Text style={styles.textNumber}>{headcount}</Text>
                    </View>
                </View>
                <View style={styles.containerIcon}>
                    <View style={styles.rectangleChat}>
                        <IconSend />
                    </View>
                    <View style={styles.iconMenu}>
                        <IconMenu />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    width: '100%',
    height: 72,
    backgroundColor: CustomTheme.bgBasic,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerContext: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 24,
  },
  textName: {
    marginLeft: 22,
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  containerHeadcount: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  textNumber: {
    ...fontCaption,
    color: CustomTheme.primaryMedium,
    marginLeft: 3,
},
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rectangleChat: {
    width: 42,
    height: 42,
    borderWidth: 1,
    borderColor: '#B0D0FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconMenu: {
    marginRight: 16,
  },
});

export default GroupList;