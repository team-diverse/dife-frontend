import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub14 } = CustomTheme;

const ConnectProfileLanguage = ({ language = "language" }) => {
    return (
        <View>
            {language.map((item, index) => (
                <View style={styles.rectangle}>
                    <Text key={index} style={styles.language}>
                        {item}
                    </Text>
                    <View style={styles.line} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        width: "100%",
        height: 46,
        backgroundColor: CustomTheme.bgBasic,
    },
    line: {
        width: 343,
        height: 1,
        backgroundColor: CustomTheme.bgList,
    },
    language: {
        ...fontSub14,
        marginLeft: 5,
        marginBottom: 11,
    },
});

export default ConnectProfileLanguage;
