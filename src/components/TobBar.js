import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
import ArrowRight from './icon_32/ArrowRight_32_.js';

const { fontHead20 } = customTheme;

const TopBar = ({tobBar="상단바"}) => {
    return (
        <View style={styles.rectangle}>
          <View style={styles.container}>
            <ArrowRight style={styles.arrow}/>
            <View style={styles.text}>
              <Text style={styles.textStyle}>{tobBar}</Text>
            </View>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  rectangle: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    height: 48,
    backgroundColor: customTheme.bgBasic,
  },
  container: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrow: {
    marginLeft: 20,
  },
  textStyle: {
    ...fontHead20,
  },
});

export default TopBar;
