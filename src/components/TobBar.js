import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
import { useNavigation } from '@react-navigation/native';

=======
import { View, Text, StyleSheet } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
import ArrowRight from './icon_32/ArrowRight_32_.js';

const { fontHead20 } = customTheme;

<<<<<<< HEAD
const TopBar = ({ tobBar = "상단바" }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.rectangle}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight style={styles.arrow} />
                </TouchableOpacity>
                <View style={styles.text}>
                    <Text style={styles.textStyle}>{tobBar}</Text>
                </View>
            </View>
=======
const TopBar = ({tobBar="상단바"}) => {
    return (
        <View style={styles.rectangle}>
          <View style={styles.container}>
            <ArrowRight style={styles.arrow}/>
            <View style={styles.text}>
              <Text style={styles.textStyle}>{tobBar}</Text>
            </View>
          </View>
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
        </View>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
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
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
});

export default TopBar;
