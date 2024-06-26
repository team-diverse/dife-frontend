import * as React from "react";
import Svg, {
    Path,
    Circle,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";
import { View, StyleSheet } from "react-native";

const IconProfileK = (props) => {
    return (
        <View style={styles.container}>
            <Svg
                style={styles.circle}
                xmlns="http://www.w3.org/2000/svg"
                width={36}
                height={36}
                fill="none"
                {...props}
            >
                <Circle cx={18} cy={18} r={18} fill="url(#a)" />
                <Defs>
                    <LinearGradient
                        id="a"
                        x1={18}
                        x2={39.549}
                        y1={0}
                        y2={36}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopColor="#EDF3FF" />
                        <Stop offset={1} stopColor="#B0D0FF" />
                    </LinearGradient>
                </Defs>
            </Svg>

            <Svg
                style={styles.profileK}
                xmlns="http://www.w3.org/2000/svg"
                width={16}
                height={19}
                fill="none"
                {...props}
            >
                <Path
                    fill="#2964E0"
                    d="M6.897 12.149c-.02 1.109-.123 2.177-.226 3.244-.144 1.54-1.006 2.752-2.71 2.752-1.746 0-2.588-1.212-2.732-2.752a59.32 59.32 0 0 1 0-12.074C1.373 1.799 2.215.587 3.96.587 5.665.587 6.527 1.8 6.67 3.32c.124 1.334.165 2.525.247 3.922.575-1.664 1.438-3.286 2.074-4.456.842-1.54 2.26-2.567 4.21-1.746 1.643.698 2.218 2.013 1.602 3.594-.842 2.177-2.465 4.497-3.984 5.709-.267.184-.02.595.287.37.309-.247.596-.493.863-.781 1.232 1.314 2.177 3.142 2.69 4.58.452 1.375-.185 2.73-1.787 3.388-1.683.657-3.203-.02-4.148-1.602-.513-.883-1.293-2.67-1.827-4.148Z"
                />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 36,
        height: 36,
        justifyContent: "center",
        alignItems: "center",
    },
    circle: {
        position: "relative",
    },
    profileK: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [{ translateX: -8 }, { translateY: -9.5 }],
    },
});
export default IconProfileK;
