import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontHead18, fontSub14, fontBody14 } = CustomTheme;

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
    TextTitle: {
        fontSize: 32,
        lineHeight: 37,
        fontFamily: 'NotoSansCJKkr-Bold',
        color: CustomTheme.primaryDefault,
        marginTop: 67,
        marginLeft: 24,
    },
    TextSubTitle: {
        ...fontHead18,
        color: CustomTheme.textSecondary,
        marginTop: 12,
        marginLeft: 24,
    },
    TextId: {
        ...fontSub14,
        color: CustomTheme.textPrimary,
        marginTop: 127,
        marginLeft: 24,
    },
    TextInputId: {
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
    TextPw: {
        ...fontSub14,
        color: CustomTheme.textPrimary,
        marginTop: 12,
        marginLeft: 24,
    },
    TextInputPwContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
      },
    TextInputPw: {
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
    checkboxRememberMe: {
        color: CustomTheme.textSecondary,
        marginLeft: 24,
    },
    ButtonSignupPwContainer: {
        marginTop: 144,
        alignItems: 'center',
    },
    TextReport: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        textDecorationLine: 'underline',
        marginTop: 20,
    },
});

export default LoginStyles;