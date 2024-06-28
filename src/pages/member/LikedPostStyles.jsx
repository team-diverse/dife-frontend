import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme';

const LikedPostStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    itemLikeBookmark: {
        alignItems: 'center',
        marginTop: 12,
        marginHorizontal: 24,
    },
});

export default LikedPostStyles;