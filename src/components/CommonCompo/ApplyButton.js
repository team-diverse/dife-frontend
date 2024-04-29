import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';
import { useNavigation } from '@react-navigation/native';

const { fontSub16 } = CustomTheme;

const ApplyButton = ({ text="applyBtn", background=false, onPress=null, disabled=false }) => {
  const navigation = useNavigation();

  const rectangleStyle = background ? styles.rectangle : {};

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <View style={rectangleStyle}>
        <View style={[styles.apply, disabled && styles.disabled]}>
          <Text style={styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    flexDirection: 'row',
    width: '100%',
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.bgBasic,
    shadowColor: '#3C454E',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  apply: {
    flexDirection: 'row',
    width: '90%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CustomTheme.primaryMedium,
    borderRadius: 27,
    marginHorizontal: 24,
    marginVertical: 14,
  },
  text: {
    ...fontSub16,
    color: CustomTheme.bgBasic,
    paddingHorizontal: 59,
    paddingVertical: 10,
  },
  disabled: {
    backgroundColor: CustomTheme.borderColor,
  },
});

export default ApplyButton;
