import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import {CustomTheme} from '@styles/CustomTheme';

const RadioButtonItem = ({value, isSelected, onValueChange, mainColor, borderColor, onboarding}) => {
    return (
        <Pressable onPress={() => onValueChange(value)} style={styles.radioButtonItemContainer}>
            <View
                style={[
                    styles.radioButtonCircle,
                    {
                        borderColor: isSelected ? borderColor : CustomTheme.textDisable,
                        backgroundColor: isSelected ? borderColor : CustomTheme.bgBasic,
                    }
                ]}>
                {isSelected && (
                    <View style={[
                        styles.radioButtonInnerCircle,
                        {backgroundColor: !isSelected ? CustomTheme.bgBasic : mainColor}
                    ]}/>
                )}
            </View>
            <Text
                style={[
                    styles.label,
                    {color: onboarding && isSelected ? mainColor : (isSelected ? borderColor : CustomTheme.textSecondary)}
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