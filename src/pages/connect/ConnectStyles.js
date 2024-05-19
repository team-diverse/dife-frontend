import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead20, fontHead18, fontSub16, fontCaption } = CustomTheme;

const ConnectStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    topDifeContainer: {
        alignItems: 'center',
    },
    connectTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    connectDife: {
        alignItems: 'center',
        marginTop: -1,
    },
    safeAreaView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    textIconContainer: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        marginTop: 55,
    },
    connectTitle: {
        flex: 1,
        ...fontHead20,
        color: CustomTheme.primaryBg,
        marginLeft: 24,
    },
    addUserIcon: {
        flex: 1,
        marginRight: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        marginTop: 100,
    },
    searchFilter: {
        flex: 1,
        marginLeft: 20,
    },
    searchFilterContent: {
        backgroundColor: '#fff',
        padding: 16,
        height: 450,
    },
    searchIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 12,
        marginRight: 24,
    },
    search: {
        ...fontSub16,
        position: 'relative',
        width: '100%',
        height: 48,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 24,
        paddingLeft: 20,
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
    },
    midContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 145,
    },
    tabContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 30,
    },
    textTab: {
        ...fontHead18,
        color: '#8C8D91',
        textDecorationLine: 'underline',
        marginRight: 18,
    },
    resetContainer: {
        flexDirection: 'row',
        marginRight: 30,
        alignItems: 'center',
    },
    textReset: {
        ...fontCaption,
        color: CustomTheme.primaryMedium,
    },
    flatlist: {
        flex: 1,
        marginTop: 22,
        width: '100%',
    },
    flatlistContent: {
        alignItems: 'center',
    },
    cardContainer: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 25,
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.71,
        shadowRadius: 6,
    },
});

export default ConnectStyles;