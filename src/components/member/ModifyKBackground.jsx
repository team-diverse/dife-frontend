import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
import { CustomTheme } from '@styles/CustomTheme';
import ProfileK from '@components/member/ProfileK';

const ModifyKBackground = (props) => {
  return (
    <View style={styles.container}>
      <Svg
        style={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
        width={85}
        height={85}
        fill="none"
        {...props}
      >
        <Defs>
          <ClipPath id="clipPath">
            <Rect width="85" height="85" rx="20" ry="20" />
          </ClipPath>
          <LinearGradient
            id="a"
            x1={79.138}
            x2={2.198}
            y1={85}
            y2={-32.241}
            gradientUnits="userSpaceOnUse"
          >
            <Stop offset={0.046} stopColor="#D9EAFF" />
            <Stop offset={1} stopColor="#fff" />
          </LinearGradient>
        </Defs>
        <Rect width="85" height="85" fill="url(#a)" clipPath="url(#clipPath)" />
      </Svg>
      <View style={styles.icon}>
        <ProfileK />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 85,
  },
  svg: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: CustomTheme.bgBasic,
    borderRadius: 20,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default ModifyKBackground;
