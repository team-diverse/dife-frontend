import * as React from 'react';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const IconPostPlus = (props) => {
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
                style={styles.postPlus}
                xmlns="http://www.w3.org/2000/svg"
                width={36}
                height={36}
                fill="none"
                {...props}
            >
                <G fill="#2964E0" fillRule="evenodd" clipRule="evenodd">
                <Path d="M14.752 11.327a.429.429 0 0 0-.6.095L8.23 19.497a9.155 9.155 0 0 0-1.483 7.733c.273 1.023 1.224 1.728 2.275 1.67a9.047 9.047 0 0 0 6.94-3.715l5.936-8.061a.428.428 0 0 0-.088-.602c-1.45-1.066-5.798-4.268-7.057-5.195ZM23.087 14.775c.193.142.463.1.605-.094l.795-1.09a4.805 4.805 0 0 0-1.022-6.71 4.82 4.82 0 0 0-6.725 1.023l-.797 1.092a.428.428 0 0 0 .09.6l7.054 5.18ZM28.471 27.914h-8.908a1.08 1.08 0 0 0 0 2.16h8.908a1.08 1.08 0 0 0 0-2.16Z" />
                </G>
            </Svg>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        position: 'relative',
    },
    postPlus: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -18 }, { translateY: -18 }]
    },
});
export default IconPostPlus;
