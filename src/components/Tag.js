import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontCaption } = CustomTheme;

const Tag = ({tag='tag'}) => {
  return (
    <View style={styles.container}>
      {tag.map((item, index) => (
        <View style={[styles.rectangle, { width: item.length * 10 + 1 }]}>
          <Text key={index} style={styles.text}>{item}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rectangle: {
    height: 19,
    backgroundColor: CustomTheme.bgBasic,
    borderWidth: 1,
    borderColor: '#B0D0FF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  text: {
    ...fontCaption,
  },
});

export default Tag;
