import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {CustomTheme} from '@styles/CustomTheme';

const RadioButtonItem = ({value, isSelected, onValueChange}) => {

    return (
        <Pressable onPress={() => onValueChange(value)} style={styles.radioButtonItemContainer}>
            <View
                style={[
                    styles.radioButtonCircle,
                    {
                        borderColor: isSelected ? CustomTheme.warningRed : CustomTheme.textDisable,
                        backgroundColor: isSelected ? CustomTheme.warningRed : CustomTheme.bgBasic,
                    }
                ]}>
                {isSelected && (
                    <View style={[
                        styles.radioButtonInnerCircle,
                        {backgroundColor: !isSelected ? CustomTheme.bgBasic : '#FFC0C0'}
                    ]}/>
                )}
            </View>
            <Text
                style={[
                    styles.label,
                    {color: isSelected ? CustomTheme.warningRed : CustomTheme.textSecondary}
                ]}>
                {value}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    radioButtonItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonCircle: {
        borderWidth: 2,
        borderColor: CustomTheme.warningRed,
        width: 14,
        height: 14,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonInnerCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    label: {
        marginLeft: 8,
        marginTop: 9,
        marginBottom: 13,
        ...CustomTheme.fontSub14,
    },
});

export default RadioButtonItem;