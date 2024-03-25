import { StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme';

const EventStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customTheme.bgBasic,
    },
    flatlist: {
        flex: 1,
        width: '100%',
    },
    flatlistContent: {
        alignItems: 'center',
    },
});

export default EventStyles;