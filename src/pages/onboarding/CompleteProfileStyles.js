import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontHead24, fontHead18 } = CustomTheme;

const CompleteProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.bgBasic,
    },
    textTitle: {
        ...fontHead24,
        marginTop: 60,
        marginLeft: 24,
    },
    textSubTitle: {
        ...fontHead18,
        color: CustomTheme.primaryMedium,
        marginTop: 67,
        marginTop: 12,
        marginLeft: 24,
    },
    iconLoading: {
        alignItems: "center",
        marginTop: 156,
    },
    buttonCheck: {
        marginTop: 187,
        marginHorizontal: 10,
        marginBottom: 83,
    },
});

export default CompleteProfileStyles;
