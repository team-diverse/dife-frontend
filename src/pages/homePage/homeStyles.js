import { StyleSheet, Dimensions } from 'react-native';
import { customTheme } from '../../styles/customTheme';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const { fontHead18, fontSub16, fontCaption } = customTheme;

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
    svg: {
        position: 'absolute',
        width: screenWidth,
        height: screenHeight,
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
        marginRight: 25,
    },
    textConnectWithContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 25,
        marginRight: 83,
    },
    TXconnect: {
        ...fontHead18,
        color: customTheme.bgList,
        marginRight: 4,
    },
    TXwithnewfriend: {
        ...fontCaption,
        color: customTheme.bgList,
    },
    homecardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    homecard: {
        position: 'relative',
        top: 8,
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 6,
    },
    homecardDifeF: {
        position: 'absolute',
        top: 70,
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
    introdution: {
        ...fontCaption,
        width: 200,
        height: 51,
        marginTop: 6,
        marginBottom: 6,
    },
    myinfoContainer: {
        flexDirection: 'row',
        // marginTop: 6,
    },
    TXname: {
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
    TXhomeSch: {
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
    homeEv: {
        position: 'relative',
        marginLeft: 21,
    },
    TXhomeEv: {
        ...fontSub16,
        position: 'absolute',
        top: 12,
        left: 12,
    },
    homeEvIcon: {
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
        color: customTheme.textSecondary,
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
});

export default HomeStyles;