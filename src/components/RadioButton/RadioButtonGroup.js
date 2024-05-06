import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import RadioButtonItem from "@components/RadioButton/RadioButtonItem";

const RadioButtonGroup = ({values, onValueChange}) => {
    const [selected, setSelected] = useState('');

    const handleChange = (value) => {
        setSelected(value);
        onValueChange(value);
    }

    return (
        <RadioButton.Group style={styles.radioButtonItemContainer} value={values[0]}
                           onValueChange={handleChange}>
            <View>
                {
                    values.map((value, index) => {
                        return (
                            <RadioButtonItem
                                key={index}
                                value={value}
                                isSelected={value === selected}
                                onValueChange={handleChange} label={value}/>
                        )
                    })
                }
            </View>
        </RadioButton.Group>
    )
};


const styles = StyleSheet.create({
    radioButtonItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RadioButtonGroup;