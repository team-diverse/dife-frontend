import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead18, fontSub16, fontCaption, fontButton } = CustomTheme;

const MemberStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#0029F4',
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
    },
    difeLine: {
        position: 'absolute',
        marginTop: 30,
        left: -20,
    },
    circleBackground: {
        position: 'absolute',
        marginTop: 100,
    },
    topContainer: {
        flexDirection: 'row',
    },
    difeLogo: {
        flex: 1,
        marginTop: 4,
    },
    iconSetting: {
        marginTop: 10,
        marginRight: 24,
    },
    containerProfile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileK: {
        position: 'absolute',
    },
    iconProfileEdit: {
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    textName: {
        fontSize: 16,
        lineHeight: 17,
        fontFamily: 'NotoSansCJKkr-Bold',
        color: CustomTheme.primaryPressed,
        marginTop: 10,
    },
    containerIcon: {
        flexDirection: 'row',
        marginTop: 18,
    },
    icon: {
        alignItems: 'center'
    },
    textIcon: {
        ...fontCaption,
        color: CustomTheme.primaryPressed,
        marginTop: 5,
    },
    line: {
        width: 1,
        height: 34,
        backgroundColor: '#C7CBD7',
        marginHorizontal: 33,
    },
    tabContainer: {
        flex: 1,
        marginTop: 38,
    },
});

export default MemberStyles;