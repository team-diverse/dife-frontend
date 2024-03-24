import React from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
import { useNavigation } from '@react-navigation/native';

=======
import { View, Text, StyleSheet } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
=======
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
import { useNavigation } from '@react-navigation/native';

>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
import ArrowRight from './icon_32/ArrowRight_32_.js';

const { fontHead20 } = customTheme;

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
const TopBar = ({ tobBar = "상단바" }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

<<<<<<< HEAD
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
=======
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
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
<<<<<<< HEAD
          </View>
>>>>>>> a6584a8 (feat: 상단바 컴포넌트 생성 및 eventPage 적용)
=======
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
        </View>
    );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
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
<<<<<<< HEAD
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
=======
>>>>>>> 1f30a5d (feat: EventCard 컴포넌트 제작 및 EventPage에 적용)
});

export default TopBar;
