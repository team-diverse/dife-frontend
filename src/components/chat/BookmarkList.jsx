import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

import IconChatProfile from '@components/chat/IconChatProfile';
import IconBookmark from '@components/chat/IconBookmark';

import ModalNoBookmark from '@components/chat/ModalNoBookmark';
import DashedLine from '@components/chat/DashedLine'

const { fontCaption } = CustomTheme;

const BookmarkList = ({icon, name='name', context='context', date='date', time='time', translation='translation', onPress=null}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpanded = () => {
    setExpanded(!expanded);
  };

  const [ modalVisible, setModalVisible ] = useState(false);

  const pressButton = () => {
      setModalVisible(!modalVisible);
  };

  const rectangleStyle = () => {
    if (expanded) {
      return styles.rectangleExpanded;
    } else {
      return styles.rectangle;
    }
  };
  

  return (
    <>
    <TouchableOpacity
      style={rectangleStyle()}
      onPress={handleExpanded}>
      <View style={styles.containerContext}>
        <View style={styles.iconTextContainer}>
          <View style={styles.icon}>
            <IconChatProfile size='32'/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textContext}>{context}</Text>
          </View>
        </View>
        <View style={styles.containerTextIcon}>
          <View style={styles.containerDateTime}>
            <Text style={styles.textDate}>{date}</Text>
            <Text style={styles.textTime}>{time}</Text>
          </View>
          <TouchableOpacity style={styles.iconBookmark} onPress={pressButton}>
            <IconBookmark color={CustomTheme.primaryMedium}/>
          </TouchableOpacity>

          <ModalNoBookmark
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            name={name}
            context={context}
            date={date}
            time={time}
          />
        </View>
      </View>
    </TouchableOpacity>

    {expanded && (
      <>
      <View style={styles.containerExpanded}>
        <View style={styles.dashedLine}>
          <DashedLine />
        </View>
        <View style={styles.containerTextExpanded}>
          <Text style={styles.textExpandedTitle} >원문:</Text>
          <Text style={styles.textExpandedContext} >{context}</Text>
        </View>
        <View style={styles.containerTextExpanded}>
          <Text style={styles.textExpandedTitle} >번역:</Text>
          <Text style={styles.textExpandedContext} >{translation}</Text>
        </View>
      </View>
      </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    width: '100%',
    height: 57,
    backgroundColor: CustomTheme.bgBasic,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: CustomTheme.bgList,
  },
  rectangleExpanded: {
    position: 'relative',
    width: '100%',
    height: 57,
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
    marginLeft: 15,
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: 9,
  },
  textName: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  textContext: {
    ...fontCaption,
    width: 136,
    height: 17,
    marginTop: 4,
  },
  containerTextIcon: {
    flexDirection: 'row',
  },
  containerDateTime: {
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textDate: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'NotoSansCJKkr-Bold',
    color: CustomTheme.textDisable,
  },
  textTime: {
    fontSize: 11,
    lineHeight: 17,
    fontFamily: 'NotoSansCJKkr-Regular',
    color: CustomTheme.textDisable,
    marginTop: 1,
  },
  iconBookmark: {
    justifyContent: 'center',
    marginRight: 16,
  },
  dashedLine: {
    position: 'absolute',
  },
  containerExpanded: {
    width: '100%',
    backgroundColor: CustomTheme.primaryBg,
    paddingTop: 6,
    paddingBottom: 18,
    paddingHorizontal: 17,
  },
  containerTextExpanded: {
    flexDirection: 'row',
    marginTop: 12,
  },
  textExpandedTitle: {
    ...fontCaption,
  },
  textExpandedContext: {
    ...fontCaption,
    color: CustomTheme.primaryMedium,
    width: '100%',
    marginLeft: 15,
  },
});

export default BookmarkList;