import { StyleSheet } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';

const { fontSub14, fontBody14 } = CustomTheme;

const LoadingVerificationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    imageimageBackgroud: {
        position: 'relative',
        resizeMode: 'stretch',
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: 260,
        height: 360,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 20,
        justifyContent: 'center',
    },
    containerModalContent: {
        alignItems: 'center',
    },
    textModal: {
        ...fontSub14,
        marginTop: 18,
        marginBottom: 24,
    },
    iconLoading: {
        marginBottom: 6,
    },
    checkboxRememberMe: {
        color: CustomTheme.textSecondary,
        marginTop: 4,
    },
    textMove: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        textDecorationLine: 'underline',
        marginTop: 32,
        marginBottom: 25,
    },
});

export default LoadingVerificationStyles;