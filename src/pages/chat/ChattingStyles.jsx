import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead20, fontHead18, fontSub16, fontCaption } = CustomTheme;

const ChattingStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundBlue: {
        position: 'absolute',
        width: '100%',
        height: 100,
        backgroundColor: CustomTheme.primaryMedium,
    },
    iconChatPlus: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        shadowColor: '#3C454E',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        zIndex: 2,
    },
    safeAreaView: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    connectTop: {
        marginTop: -47,
        zIndex: 1,
    },
    containerTextIcon: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        marginTop: 55,
        zIndex: 2,
    },
    textChattingTitle: {
        flex: 1,
        ...fontHead20,
        color: CustomTheme.primaryBg,
        marginLeft: 24,
    },
    iconBookmark: {
        flex: 1,
        marginRight: 24,
    },
    containerSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        marginTop: 100,
        zIndex: 2,
    },
    containerSearchIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginLeft: 25,
        marginRight: 25,
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
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 30,
    },
    textTab: {
        ...fontHead18,
        color: '#8C8D91',
        textDecorationLine: 'underline',
        marginRight: 18,
    },
    textActiveTab: {
        ...fontHead18,
        color: CustomTheme.primaryMedium,
        textDecorationLine: 'underline',
        marginRight: 18,
    },
    flatlist: {
        flex: 1,
        marginTop: 22,
        width: '100%',
    },
    flatlistContent: {
        alignItems: 'center',
    },
    containerChatItems: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerTextNoChat: {
        alignItems: 'center',
        marginTop: 32,
    },
    textNoChat: {
        ...fontCaption,
        color: CustomTheme.textSecondary,
        textAlign: 'center',
    },
});

export default ChattingStyles;