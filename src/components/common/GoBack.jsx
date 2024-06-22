import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CustomTheme } from '@styles/CustomTheme';

import ArrowRight32 from '@components/Icon32/ArrowRight32';

const GoBack = () => {
    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <TouchableOpacity onPress={handleGoBack}>
            <ArrowRight32 style={styles.iconArrow} color={CustomTheme.textPrimary} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconArrow: {
        marginTop: 5,
        marginLeft: 14,
    },
});

export default GoBack;
