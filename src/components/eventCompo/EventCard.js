import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';


const { fontCaption } = customTheme;

const EventCard = ({title='title', date='date', eventImg=null}) => {
  return (
    <View style={styles.rectangle}>
        <Image source={eventImg} style={styles.image}/>
        <View style={styles.eventTextContainer}>
            <Text style={[styles.title, {opacity: 1}]}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    width: 326,
    height: 159,
    backgroundColor: customTheme.textDisable,
    borderRadius: 20,
    marginVertical: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  eventTextContainer: {
    position: 'absolute',
    width: '100%',
    backgroundColor: customTheme.bgBasic,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 11,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    opacity: 0.9,
    bottom: 0,
  },
  title: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'NotoSansCJKkr-Bold',
  },
  date: {
    ...fontCaption,
  },
});

export default EventCard;