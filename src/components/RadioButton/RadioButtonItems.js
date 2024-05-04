import React, { useContext } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';
import { RadioGroupContext } from '@components/RadioButton/RadioButtonGroup';

const RadioButtonItems = (props) => {
  const { value, children, disabled, containerStyle } = props;
  const { onSelected, selected } = useContext(RadioGroupContext);

  const isSelected = () => {
    return selected === value;
  };

  const triggerRadioButton = () => {
    if (onSelected && !disabled) {
      onSelected(value);
    }
  };

  return (
    <Pressable
      onPress={() => {
        if (onSelected && !disabled) {
          onSelected(value);
        }
      }}
      style={[styles.radioButtonItemContainer, containerStyle]}
    >
      <View
        style={[
          styles.radioButtonCircle,
          { borderColor: isSelected() ? '#FF3E3E' : CustomTheme.textDisable },
          {
            ...(disabled && {
              backgroundColor: '#fff',
              borderColor: CustomTheme.textDisable,
            }),
          },
        ]}
      >
        {isSelected() && (
          <View
            style={{
              backgroundColor: disabled ? CustomTheme.bgBasic : '#FFC0C0',
              width: 10,
              height: 10,
              borderRadius: 50,
            }}
          />
        )}
      </View>
      {children && (
        <Pressable style={styles.label} onPress={triggerRadioButton}>
          {children}
        </Pressable>
      )}
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
      borderColor: '#FF3E3E',
      width: 14,
      height: 14,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      marginLeft: 8,
      marginTop: 9,
      marginBottom: 13,
    },
  });

export default RadioButtonItems;