import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const ConnectStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    flatlist: {
        width: '100%',
    },
});

export default ConnectStyles;