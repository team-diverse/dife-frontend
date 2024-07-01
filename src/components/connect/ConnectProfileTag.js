import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14 } = CustomTheme;

const ConnectProfileTag = ({ tag = ["tag"] }) => {
    return (
        <View style={styles.container}>
            {tag.map((item, index) => (
                <View style={[styles.rectangle]}>
                    <Text key={index} style={styles.text}>
                        {item}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
    },
    rectangle: {
        width: 80,
        height: 32,
        backgroundColor: CustomTheme.bgBasic,
        borderWidth: 1,
        borderColor: "#B0D0FF",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 8,
        marginBottom: 8,
    },
    text: {
        ...fontBody14,
    },
});

export default ConnectProfileTag;
