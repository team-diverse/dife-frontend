import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const { fontHead20, fontHead18, fontSub16, fontCaption } = CustomTheme;

const ChatRoomStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
        justifyContent: 'space-between',
    },
    containerTopBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerBackName: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconArrow: {
        marginLeft: 12,
    },
    textTopBar: {
        ...fontHead18,
        marginLeft: 11,
    },
    iconHamburgerMenu: {
        marginRight: 12,
    },
});

export default ChatRoomStyles;