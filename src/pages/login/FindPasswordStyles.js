import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead24, fontSub16, fontSub14, fontCaption } = CustomTheme;

const FindPasswordStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    iconArrow: {
        marginTop: 5,
        marginLeft: 14,
    },
    textTitle: {
        ...fontHead24,
        marginTop: 28,
        marginLeft: 24,
    },
    textSubTitle: {
        ...fontSub16,
        color: CustomTheme.textSecondary,
        marginTop: 12,
        marginLeft: 22,
    },
    textId: {
        ...fontSub14,
        color: CustomTheme.textPrimary,
        marginTop: 120,
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
    containerNotMember: {
        flexDirection: 'row',
        marginTop: 8,
        marginLeft: 25,
    },
    textNotMember: {
        ...fontCaption,
        color: CustomTheme.warningRed,
        marginLeft: 3,
    },
});

export default FindPasswordStyles;