import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const HomeTag = ({ text }) => {
    const calculateWidth = () => {
        return text.length * 10 + 1;
    };

    return (
        <View style={[styles.rectangle, { width: calculateWidth() }]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        height: 19,
        backgroundColor: CustomTheme.bgBasic,
        borderWidth: 1,
        borderColor: "#B0D0FF",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
    },
    text: {
        ...fontCaption,
    },
});

export default HomeTag;
