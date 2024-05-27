import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomTheme } from '@styles/CustomTheme';

import HomecardDifeF from '@components/home/HomecardDifeF';
import IconTwoUsers from '@components/home/IconTwoUsers';

const { fontCaption, fontButton } = CustomTheme;

const HomeCardLast = () => {
  return (
    <View style={styles.rectangle}>
        <View style={styles.homecardDifeF}>
            <HomecardDifeF />
        </View>
        <View style={styles.homeProfile}>
            <View style={styles.containerImage}>
            <IconTwoUsers />
            </View>
            <Text style={styles.textMoreProfile}>커넥트 페이지에서{"\n"}더 많은 프로필을 탐색할 수 있어요!</Text>
            <Text style={styles.textLoadProfile}>프로필 추가 로딩까지 20:00분</Text>
            <TouchableOpacity style={styles.buttonAddProfile}>
            <Text style={styles.textAddProfile}>더 많은 프로필 탐색하기</Text>
            </TouchableOpacity>
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
    homecardDifeF: {
        position: 'absolute',
        top: 69,
    },
    homeProfile: {
        position: 'absolute',
        left: 20,
        top: 20,
    },
    containerImage: {
        width: 116,
        height: 136,
        backgroundColor: CustomTheme.primaryBg,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMoreProfile: {
        ...fontButton,
        color: CustomTheme.primaryMedium,
        marginTop: 16,
    },
    textLoadProfile: {
        ...fontCaption,
        color: '#8C8D91',
        textDecorationLine: 'underline',
        marginTop: 8,
    },
    buttonAddProfile: {
        width: 220,
        height: 37,
        backgroundColor: CustomTheme.primaryMedium,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },
    textAddProfile: {
        ...fontButton,
        color: CustomTheme.bgBasic,
    },
});

export default HomeCardLast;
