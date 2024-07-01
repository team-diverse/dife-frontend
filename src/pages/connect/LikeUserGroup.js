import React from "react";
import { SafeAreaView, Text } from "react-native";
import ConnectLikeUserStyles from "@pages/connect/ConnectLikeUserStyles.js";

const LikeUserGroup = () => {
    return (
        <SafeAreaView
            style={[ConnectLikeUserStyles.container, { alignItems: "center" }]}
        >
            <Text>그룹</Text>
        </SafeAreaView>
    );
};

export default LikeUserGroup;
