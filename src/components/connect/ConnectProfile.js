import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const ConnectProfile = ({ profile = null }) => {
    return (
        <View style={[styles.rectangle]}>
            <Image source={profile} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        width: 156,
        height: 183,
        backgroundColor: CustomTheme.textDisable,
        borderRadius: 20,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default ConnectProfile;
