import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontHead20 } = CustomTheme;

const ConnectStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    connectTop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    safeAreaView: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
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
    searchIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 12,
        marginRight: 24,
    },
    search: {
        position: 'relative',
    },
    searchIcon: {
        position: 'absolute',
        right: 12,
    },
});

export default ConnectStyles;