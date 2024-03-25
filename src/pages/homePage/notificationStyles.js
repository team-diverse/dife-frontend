import { StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme';

const NotificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customTheme.bgBasic,
    },
    flatlist: {
        width: '100%',
    },
});

export default NotificationStyles;