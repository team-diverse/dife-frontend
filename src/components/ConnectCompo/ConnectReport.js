import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub14 } = CustomTheme;

const ConnectReport = ({reportTitle='reportTitle', report1='report1', report2='report2', report3='report3', report4='report4'}) => {
  return (
    <View style={styles.rectangle}>
        <Text style={styles.reportTitle}>{reportTitle}</Text>
        <Text style={styles.report}>{report1}</Text>
        <Text style={styles.report}>{report2}</Text>
        <Text style={styles.report}>{report3}</Text>
        <Text style={styles.report}>{report4}</Text>
        <View style={styles.buttonContainer}>
            <View style={styles.buttonNo}>
                <Text style={styles.textNo}>아니오</Text>
            </View>
            <View style={styles.buttonReport}>
                <Text style={styles.textReport}>신고하기</Text>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    width: 260,
    height: 360,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 20,
  },
  reportTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NotoSansCJKkr-Bold',
    alignItems: 'center',
  },
  report: {
    ...fontSub14,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  buttonNo: {
    width: 102,
    padding: 10,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CustomTheme.textPrimary,
  },
  textNo: {
    ...fontSub14,
  },
  buttonReport: {
    width: 102,
    padding: 10,
    backgroundColor: '#FF3E3E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF3E3E',
  },
  textReport: {
    ...fontSub14,
    color: CustomTheme.bgBasic,
  },
});

export default ConnectReport;