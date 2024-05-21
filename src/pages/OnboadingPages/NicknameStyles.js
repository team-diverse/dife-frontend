import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontBody18, fontSub14, fontBody14 } = CustomTheme;

const NicknameStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    iconArrow: {
        position: 'absolute',
        marginTop: 5,
        marginLeft: 14,
    },
    iconProgress: {
        alignItems: 'center',
        marginTop: 5,
    },
    backgroundLogin: {
        position: 'absolute',
        top: 124,
        left: -70,
    },
    textTitle: {
        fontSize: 32,
        lineHeight: 37,
        fontFamily: 'NotoSansCJKkr-Bold',
        marginTop: 67,
        marginLeft: 24,
    },
    textSubTitle: {
        fontSize: 18,
        lineHeight: 24,
        fontFamily: 'NotoSansCJKkr-Bold',
        marginTop: 67,
        marginTop: 12,
        marginLeft: 24,
    },
    containerInput: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    textInputNickname: {
        ...fontBody18,
        width: 327,
        height: 44,
        paddingVertical: 11,
        borderBottomWidth: 2,
        marginTop: 116,
        marginHorizontal: 27,
        alignItems: 'center',
    },
    iconDelete: {
        position: 'absolute',
        right: 45,
        bottom: 16,
    },
    textAvailableNickname: {
        ...fontBody14,
        color: CustomTheme.primaryMedium,
        marginTop: 8,
        marginLeft: 27,
    },
    textUnavailableNickname: {
        ...fontBody14,
        color: CustomTheme.warningRed,
        marginTop: 8,
        marginLeft: 27,
    },
    buttonCheck: {
        marginTop: 24,
        marginHorizontal: 10,
    },
});

export default NicknameStyles;