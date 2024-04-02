import { StyleSheet } from 'react-native';
import { customTheme } from '@styles/customTheme';

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
    eventCard: {
        shadowColor: '#3C454E4A',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.71,
        shadowRadius: 6,
    },
});

export default EventStyles;