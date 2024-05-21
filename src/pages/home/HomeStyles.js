import { StyleSheet, Dimensions } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead18, fontSub16, fontCaption, fontButton } = CustomTheme;

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0029F4',
    },
    linearGradient: {
        flex: 1,
        alignItems: 'center',
    },
    homebg: {
        position: 'absolute',
    },
    topContainer: {
        flexDirection: 'row',
    },
    logo: {
        flex: 1,
        marginTop: 4,
        marginLeft: -8
    },
    notify: {
        marginTop: 10,
        marginRight: 20,
    },
    textConnectWithContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 25,
        marginRight: 83,
    },
    textConnect: {
        ...fontHead18,
        color: CustomTheme.bgList,
        marginRight: 4,
    },
    textWithnewfriend: {
        ...fontCaption,
        color: CustomTheme.bgList,
    },
    homecardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 10,
    },
    homecard: {
        position: 'relative',
        top: 8,
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.71,
        shadowRadius: 6,
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
    tagContainer: {
        flexDirection: 'row',
        marginTop: 12,
        marginBottom: 6,
    },
    introduction: {
        ...fontCaption,
        width: 200,
        height: 51,
        marginTop: 6,
        marginBottom: 6,
    },
    myinfoContainer: {
        flexDirection: 'row',
    },
    textName: {
        fontSize: 12,
        lineHeight: 16,
        fontFamily: 'NotoSansCJKkr-Bold',
    },
    myinfo: {
        ...fontCaption,
    },
    connectIconContainer: {
        position: 'absolute',
        left: 10,
        bottom: 28,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    connectIcon: {
        marginHorizontal: 28,
    },
    homeSchEv: {
        flexDirection: 'row',
        marginTop: 28,
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 6,
    },
    textHomeSchool: {
        ...fontSub16,
        position: 'absolute',
        top: 12,
        left: 12,
    },
    homeSchIcon: {
        position: 'absolute',
        top: 35,
        left: 40,
    },
    homeEvent: {
        position: 'relative',
        marginLeft: 21,
    },
    textHomeEvent: {
        ...fontSub16,
        position: 'absolute',
        top: 12,
        left: 12,
    },
    iconHomeEvent: {
        position: 'absolute',
        top: 48,
        left: 47,
    },
    
    
    homecardBack: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 30,
    },
    viewProfile: {
        ...fontCaption,
        color: CustomTheme.textSecondary,
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    addFriendOk: {
        flexDirection: 'row',
        marginTop: 33,
    },
    homecardBackBtn: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
    },
    backgroundHomecard: {
        position: 'absolute',
        top: 10,
        bottom: 10,
        right: 30,
        transform: [{ scale: 0.9 }],
        opacity: 0.5,
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.71,
        shadowRadius: 6,
        zIndex: 0,
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

export default HomeStyles;