import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead18, fontSub14, fontBody14, fontCaption } = CustomTheme;

const LoginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
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
        color: CustomTheme.primaryDefault,
        marginTop: 67,
        marginLeft: 24,
    },
    textSubTitle: {
        ...fontHead18,
        color: CustomTheme.textSecondary,
        marginTop: 12,
        marginLeft: 24,
    },
    textId: {
        ...fontSub14,
        color: CustomTheme.textPrimary,
        marginTop: 127,
        marginLeft: 24,
    },
    textInputId: {
        width: 327,
        height: 44,
        padding: 12,
        borderWidth: 1,
        borderColor: CustomTheme.borderColor,
        borderRadius: 6,
        marginTop: 8,
        marginHorizontal: 25,
        alignItems: 'center',
    },
    textPw: {
        ...fontSub14,
        color: CustomTheme.textPrimary,
        marginTop: 12,
        marginLeft: 24,
    },
    textInputPwContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
      },
    textInputPw: {
        width: 327,
        height: 44,
        padding: 12,
        borderWidth: 1,
        borderColor: CustomTheme.borderColor,
        borderRadius: 6,
        marginTop: 8,
        marginHorizontal: 25,
        alignItems: 'center',
    },
    iconSee: {
        position: 'absolute',
        alignItems: 'center',
        top: 17,
        right: 50,
    },
    containerError: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 25,
    },
    textError: {
        ...fontCaption,
        color: CustomTheme.warningRed,
        marginLeft: 3,
    },
    ButtonSignupPwContainer: {
        marginTop: 170,
        alignItems: 'center',
    },
    textReport: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
});

export default LoginStyles;