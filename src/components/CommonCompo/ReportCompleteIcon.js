import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { View, StyleSheet } from 'react-native';

const ReportCompleteIcon = (props) => (
    <View style={styles.container}>
        <Svg
            style={styles.circle}
            width={80}
            height={80}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Circle cx={40} cy={40} r={40} fill="#FF3E3E" />
        </Svg>
        <Svg
            style={styles.check}
            xmlns="http://www.w3.org/2000/svg"
            width={45}
            height={45}
            fill="none"
            {...props}
        >
            <Path
            fill="#fff"
            d="M30.735 14.105a2.034 2.034 0 0 1 2.901 2.847l-10.82 13.532a2.034 2.034 0 0 1-2.929.055l-7.175-7.176a2.035 2.035 0 1 1 2.874-2.875l5.679 5.676 9.418-12 .052-.06Z"
            />
        </Svg>
  </View>
)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: {
        position: 'absolute',
    },
    circle: {
        position: 'relative',
    },
});
export default ReportCompleteIcon;
