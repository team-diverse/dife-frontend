import { StyleSheet } from 'react-native';
import { customTheme } from '../../styles/customTheme';

const { fontHead18, fontSub16, fontCaption } = customTheme;

const EventStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: customTheme.bgBasic,
    },
});

export default EventStyles;