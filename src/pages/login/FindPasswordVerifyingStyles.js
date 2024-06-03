import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead24, fontSub16, fontBody14 } = CustomTheme;

const FindPasswordVerifyingStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    containerContent: {
        alignItems: 'center',
    },
    iconEmail: {
        marginTop: 80,
    },
    textTitle: {
        ...fontHead24,
        marginTop: 30,
    },
    textSubTitle: {
        ...fontSub16,
        marginTop: 8,
    },
    buttonMove: {
        marginTop: 40,
    },
    textReport: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        textDecorationLine: 'underline',
        marginTop: 2,
    },
});

export default FindPasswordVerifyingStyles;