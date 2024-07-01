import { StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14, fontCaption } = CustomTheme;

const MyPostStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: CustomTheme.primaryBg,
    },
    containerTitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 24,
    },
    textTitle: {
        ...fontSub14,
    },
    containerMore: {
        flexDirection: "row",
        alignItems: "center",
    },
    textMore: {
        ...fontCaption,
        color: CustomTheme.textSecondary,
    },
    arrowRight: {
        transform: [{ scaleX: -1 }],
    },
    itemCommunity: {
        alignItems: "center",
        marginTop: 9,
        marginHorizontal: 24,
    },
    line: {
        width: "100%",
        height: 2,
        backgroundColor: CustomTheme.bgBasic,
        marginTop: 24,
        marginBottom: 24,
    },
});

export default MyPostStyles;
