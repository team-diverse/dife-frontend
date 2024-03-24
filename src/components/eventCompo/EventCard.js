import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme.js';


const { fontCaption } = customTheme;

const EventCard = ({title='제목', date='날짜', eventImg}) => {
  return (
    <View style={styles.rectangle}>
        <Image source={eventImg} style={styles.image}/>
        <View style={styles.eventText}>
            <Text style={styles.title}>{title}</Text>
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
  eventText: {
    position: 'absolute',
    width: '100%',
    backgroundColor: customTheme.bgBasic,
    paddingLeft: 10,
    paddingTop: 8,
    paddingBottom: 11,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    opacity: 0.5,
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
