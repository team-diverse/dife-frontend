import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontHead24, fontHead18, fontCaption, fontBody14 } = CustomTheme;

const AccessStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    textTitle: {
        ...fontHead24,
        marginTop: 28,
        marginLeft: 24,
        marginBottom: 10,
    },
    textSubTitle: {
        ...fontHead18,
        color: CustomTheme.textSecondary,
    },
    textId: {
        ...fontCaption,
        color: "#8C8D91",
    },
    containerContent: {
        flexDirection: "row",
        marginLeft: 26,
        marginTop: 37,
    },
    containerText: {
        flexDirection: "column",
        marginLeft: 12,
    },
    guide: {
        alignItems: "center",
        marginTop: 64,
        marginBottom: 84,
    },
    textGuide: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        textDecorationLine: "underline",
        marginTop: 20,
    },
    applyButton: {
        position: "absolute",
        width: "100%",
        bottom: 80,
    },
});

export default AccessStyles;
