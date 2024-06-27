import * as React from 'react';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const IconNewGroup = (props) => {
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
                style={styles.iconNewGroup}
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                fill="none"
                {...props}
            >
                <G fill="#2964E0" fillRule="evenodd" clipRule="evenodd">
                <Path d="M17.633 16.984a9.132 9.132 0 0 0-3.52.693c3.588 1.045 6.12 3.532 6.178 6.427 1.862-.25 3.86-.942 3.86-2.873 0-2.305-2.986-4.247-6.518-4.247ZM17.602 15.35h.034a4.386 4.386 0 0 0 4.383-4.384A4.386 4.386 0 0 0 16.273 6.8a7.212 7.212 0 0 1 1.238 4.054 7.205 7.205 0 0 1-1.374 4.235c.454.17.954.261 1.465.261Z" />
                <Path d="M10.286 18.846c-4.5 0-8.3 2.458-8.3 5.368 0 3.338 4.737 3.724 8.3 3.724 2.053 0 8.3 0 8.3-3.746 0-2.898-3.801-5.346-8.3-5.346ZM10.25 16.38h.034a5.53 5.53 0 0 0 5.524-5.522 5.53 5.53 0 0 0-5.524-5.525 5.529 5.529 0 0 0-5.522 5.522 5.463 5.463 0 0 0 1.597 3.899 5.476 5.476 0 0 0 3.89 1.627ZM28.5 9.828h-1.473V8.403a.852.852 0 0 0-1.703 0v1.425h-1.469a.852.852 0 0 0 0 1.703h1.469v1.425a.852.852 0 0 0 1.703 0v-1.425H28.5a.852.852 0 0 0 0-1.703Z" />
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
    iconNewGroup: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -15 }, { translateY: -16 }]
    },
});

export default IconNewGroup;
