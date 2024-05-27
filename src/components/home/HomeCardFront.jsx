import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomTheme } from '@styles/CustomTheme';

import Tag from '@components/Tag';
import HomeProfile from '@components/home/HomeProfile';
import IconHeart24 from '@components/Icon24/IconHeart24';
import IconAddFriend24 from '@components/Icon24/IconAddFriend24';
import IconChat24 from '@components/Icon24/IconChat24';
import HomeLine from '@components/home/HomeLine';
import HomecardDifeF from '@components/home/HomecardDifeF';

const { fontCaption } = CustomTheme;

const HomeCardFront = ({ profileImg, tags, introduction, name, country, age, onPress, isLikedOnPress, isLikedActive }) => {
  return (
    <View style={styles.rectangle}>
      <View style={styles.homecardDifeF}>
        <HomecardDifeF />
      </View>
      <View style={styles.homeProfile}>
        <HomeProfile profile={profileImg}/>
        <View style={styles.tagContainer}>
          <Tag tag={tags}/>
        </View>
        <Text style={styles.introduction}>{introduction}</Text>
        <View style={styles.myinfoContainer}>
          <Text style={styles.textName}>{name}</Text>
          <Text style={styles.myinfo}> | {country} | {age}</Text>
        </View>
      </View>
      <View style={styles.connectIconContainer}>
          <TouchableOpacity style={styles.iconTouchable} onPress={isLikedOnPress}>
            <IconHeart24 style={styles.connectIcon} active={isLikedActive} />
          </TouchableOpacity>
          <HomeLine style={styles.connectIcon}/>
          <TouchableOpacity style={styles.iconTouchable} onPress={onPress}>
            <IconAddFriend24 style={styles.connectIcon} active='true' />
          </TouchableOpacity>
          <HomeLine style={styles.connectIcon}/>
          <TouchableOpacity style={styles.iconTouchable}>
            <IconChat24 style={styles.connectIcon} active='true'/>
          </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 260,
    height: 360,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 20,
  },
  homecardDifeF: {
    position: 'absolute',
    top: 69,
  },
  homeProfile: {
      position: 'absolute',
      left: 20,
      top: 20,
  },
  tagContainer: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 6,
  },
  introduction: {
      ...fontCaption,
      width: 200,
      height: 51,
      marginTop: 6,
      marginBottom: 6,
  },
  myinfoContainer: {
      flexDirection: 'row',
  },
  textName: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'NotoSansCJKkr-Bold',
  },
  myinfo: {
      ...fontCaption,
  },
  connectIconContainer: {
      position: 'absolute',
      left: 10,
      bottom: 28,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },
  iconTouchable: {
    height: '100%',
    justifyContent: 'center',
  },
  connectIcon: {
      marginHorizontal: 28,
  },
});

export default HomeCardFront;
