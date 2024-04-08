import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';


const { fontSub14 } = CustomTheme;

const ConnectProfileLanguage = ({language='language'}) => {
    
    return (
        <View style={styles.rectangle}>
          <Text style={styles.language}>{language}</Text>
          <View style={styles.line}/>
        </View>
    )
};

const styles = StyleSheet.create({
  rectangle: {
      width: '100%',
      height: 46,
      backgroundColor: CustomTheme.bgBasic,
  },
  line: {
    width: 343,
    height: 1,
    backgroundColor: CustomTheme.bgList,
  },
  language: {
    ...fontSub14,
    marginLeft: 5,
    marginVertical: 11,
  },
});

export default ConnectProfileLanguage;