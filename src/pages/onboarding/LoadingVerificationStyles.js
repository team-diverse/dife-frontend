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
        resizeMode: 'cover',
    },
    modalBackground: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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