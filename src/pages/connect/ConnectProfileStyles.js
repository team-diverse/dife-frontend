import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub16, fontBody14 } = CustomTheme;

const ConnectProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: CustomTheme.primaryMedium,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    scrollView: {
        width: '100%',
    },
    background: {
        position: 'absolute',
        marginTop: 72,
    },
    simpleProfileContainer: {
        alignItems: 'center',
        marginTop: 9,
    },
    detailProfileContainer: {
        marginLeft: 17,
        marginRight: 17,
        matginTop: 25,
    },
    name: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'NotoSansCJKkr-Bold',
        marginTop: 10,
    },
    countryAgeMajor: {
        ...fontBody14,
        marginTop: 11,
        marginBottom: 9,
    },
    fontSub16: {
        ...fontSub16,
        marginBottom: 11,
    },
    fontBody14: {
        ...fontBody14,
        marginBottom: 16,
    },
    report: {
        alignItems: 'center',
        marginVertical: 16,
    },
    TXreport: {
        ...fontBody14,
        color: CustomTheme.textDisable,
        textDecorationLine: 'underline',
    },
});

export default ConnectProfileStyles;