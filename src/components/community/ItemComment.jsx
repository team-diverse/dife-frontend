import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '@styles/CustomTheme';

import IconHeart from '@components/community/IconHeart';
import IconBookmark from '@components/community/IconBookmark';
import IconComment from '@components/community/IconComment';
import IconKebabMenu from './IconKebabMenu';

const { fontCaption, fontNavi } = CustomTheme;

const ItemComment = ({ props }) => {
  const navigation = useNavigation();

  return (
    <>
    {props.map((post, index) => (
      <View key={index} style={styles.ItemCommunity}>
        <View style={styles.containerRow}>
          <View>
            <Text style={styles.textPostTitle}>{post.title}</Text>
            <Text style={styles.textPostContext}>{post.context}</Text>
          
            <View style={styles.containerTextRow}>
              <View style={styles.containerText}>
                <IconHeart />
                <Text style={styles.text}>{post.heart}</Text>
              </View>
              <View style={styles.containerText}>
                <IconBookmark /> 
                <Text style={styles.text}>{post.bookmark}</Text>
              </View>
              <View style={styles.containerText}>
                <Text style={styles.text}>{post.date}</Text>
              </View>
            </View>
            </View>

        <IconKebabMenu style={styles.iconKebabMenu}/>
        <TouchableOpacity style={styles.textTranslation}>
            <Text style={styles.textTranslation}>번역하기</Text>
        </TouchableOpacity>
        </View>
      </View>
    ))}
    </>
  );
};

const styles = StyleSheet.create({
    ItemCommunity: {
      width: '100%',
      minHeight: 78,
      backgroundColor: CustomTheme.bgBasic,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#D9EAFF',
      paddingHorizontal: 20,
      paddingVertical: 11,
      justifyContent: 'center',
      marginTop: 4,
      marginBottom: 4,
    },
    containerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textPostTitle: {
      fontSize: 12,
      lineHeight: 16,
      fontFamily: 'NotoSansCJKkr-Bold',
      width: 272,
      height: 17,
    },
    textPostContext: {
      ...fontCaption,
      width: 288,
      marginTop: 3,
    },
    iconKebabMenu: {
        position: 'absolute',
        top: 0,
        right: -11,
    },
    textTranslation: {
        ...fontNavi,
        color: CustomTheme.primaryMedium,
        textDecorationLine: 'underline',
        position: 'absolute',
        bottom: 0,
        right: -2,
    },
    containerTextRow: {
      flexDirection: 'row',
      marginTop: 8,
    },
    containerText: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 8,
    },
    text: {
      ...fontNavi,
      color: '#8C8D91',
      marginLeft: 1,
    },

});

export default ItemComment;