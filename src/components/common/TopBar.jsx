import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';
import { useNavigation } from '@react-navigation/native';

import ArrowRight32 from '@components/Icon32/ArrowRight32.js';

const { fontHead20 } = CustomTheme;

const TopBar = ({ topBar = "TopBar" }) => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.rectangle}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleGoBack}>
                    <View style={styles.arrow}>
                        <ArrowRight32 />
                    </View>
                </TouchableOpacity>
                <View style={styles.text}>
                    <Text style={styles.textStyle}>{topBar}</Text>
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
        backgroundColor: CustomTheme.bgBasic,
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
