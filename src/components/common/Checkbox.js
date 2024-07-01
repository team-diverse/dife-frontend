import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import FilterNotCheckIcon from "@components/connect/FilterNotCheckIcon.js";
import FilterCheckIcon from "@components/connect/FilterCheckIcon.js";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16, fontBody14 } = CustomTheme;

const Checkbox = ({ checked, onPress, text, basic = false }) => {
    const checkboxStyle = basic ? styles.checkboxBasic : styles.checkbox;
    const checkboxTextStyle = basic ? styles.textBasic : styles.text;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[checkboxStyle, checked && styles.checked]}
        >
            {checked && <FilterCheckIcon />}
            {!checked && <FilterNotCheckIcon />}
            <Text style={checkboxTextStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkbox: {
        flexDirection: "row",
        marginHorizontal: 24,
        paddingVertical: 15,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: CustomTheme.bgList,
    },
    checkboxBasic: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        ...fontSub16,
        marginLeft: 6,
    },
    textBasic: {
        ...fontBody14,
        color: CustomTheme.textSecondary,
        marginLeft: 5,
    },
});

export default Checkbox;
