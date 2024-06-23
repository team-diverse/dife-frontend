import * as React from "react";
import {Text, StyleSheet, View, Image} from "react-native";
import ChatBubbleTrailSVG from "./ChatBubbleTrailSVG";

const ChatBubble = ({ message, time }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{time}</Text>
            <View style={styles.frameParent}>
                <View style={styles.wrapper}>
                    <Text style={styles.text1}>{message}</Text>
                </View>
				<ChatBubbleTrailSVG />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 8,
        lineHeight: 11,
        color: "#8c8d91",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        width: 33,
        height: 15,
        alignItems: "center",
        fontFamily: "Noto Sans CJK KR",
    },
    text1: {
        fontSize: 14,
        lineHeight: 20,
        color: "#fff",
        textAlign: "left",
        fontFamily: "Noto Sans CJK KR",
    },
    wrapper: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        backgroundColor: "#2964e0",
        overflow: "hidden",
        justifyContent: "flex-end",
        paddingLeft: 12,
        paddingTop: 7,
        paddingBottom: 8,
        maxWidth: 180,
        alignItems: "center",
        flexDirection: "row",
    },
    unionIcon: {
        width: 12,
        height: 35,
    },
    frameParent: {
        marginLeft: 2,
        flexDirection: "row",
    },
    row: {
        flex: 1,
        alignItems: "flex-end",
        flexDirection: "row",
		marginBottom: 5,
		marginLeft: "auto"
    },
});

export default ChatBubble;
