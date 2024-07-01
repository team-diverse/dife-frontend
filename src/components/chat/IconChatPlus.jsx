import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
import { View, StyleSheet } from "react-native";

const IconChatPlus = (props) => {
    return (
        <View style={styles.container}>
            <Svg
                style={styles.circle}
                width={48}
                height={48}
                fill="#D9EAFF"
                xmlns="http://www.w3.org/2000/svg"
            >
                <Circle cx={24} cy={24} r={24} fill="#D9EAFF" />
            </Svg>
            <Svg
                style={styles.chatplus}
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="none"
                {...props}
            >
                <Path
                    fill="#2964E0"
                    d="M13.19 5c6.343 0 11.145 5.2 11.145 11.15 0 6.901-5.629 11.185-11.168 11.185-1.831 0-3.864-.492-5.494-1.454-.57-.347-1.05-.604-1.664-.403l-2.256.671c-.57.18-1.083-.268-.915-.872l.748-2.506c.123-.346.1-.715-.078-1.006C2.548 19.998 2 18.063 2 16.185 2 10.3 6.701 5 13.19 5Zm5.103 9.764c-.793 0-1.43.637-1.43 1.431 0 .783.637 1.432 1.43 1.432.793 0 1.43-.649 1.43-1.432 0-.794-.637-1.431-1.43-1.431Zm-5.148 0a1.424 1.424 0 0 0-1.43 1.42c0 .794.637 1.432 1.43 1.443.793 0 1.43-.649 1.43-1.432 0-.794-.637-1.431-1.43-1.431Zm-5.148 0c-.793 0-1.43.637-1.43 1.431a1.44 1.44 0 0 0 1.43 1.432 1.44 1.44 0 0 0 1.43-1.432c0-.794-.637-1.431-1.43-1.431Z"
                />
                <Path
                    fill="#2964E0"
                    fillRule="evenodd"
                    d="M29.496 8.277h-1.473V6.852a.852.852 0 0 0-1.703 0v1.425h-1.468a.852.852 0 0 0 0 1.703h1.468v1.425a.852.852 0 0 0 1.703 0V9.98h1.473a.852.852 0 0 0 0-1.703Z"
                    clipRule="evenodd"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        position: "relative",
    },
    chatplus: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -15 }, { translateY: -16 }],
    },
});
export default IconChatPlus;
