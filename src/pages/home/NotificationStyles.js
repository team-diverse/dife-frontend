import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const NotificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    flatlist: {
        width: '100%',
    },
});

export default NotificationStyles;