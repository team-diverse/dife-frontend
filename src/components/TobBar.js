import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { customTheme } from '../styles/customTheme.js';
import { useNavigation } from '@react-navigation/native';

import ArrowRight32 from './icon32/ArrowRight32.js';

const { fontHead20 } = customTheme;

const TopBar = ({ tobBar = "상단바" }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.rectangle}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack}>
                    <ArrowRight32 style={styles.arrow} />
                </TouchableOpacity>
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
