import React, { useRef, useEffect } from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { Animated } from 'react-native';

const ConnectRequestIcon = (props) => {
  const scaleAnimation = useRef(new Animated.Value(0)).current;
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: false,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 1,
            duration: 1250,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(opacityAnimation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }),
        ]),
      ]),
      { iterations: -1 }
    ).start();
  }, []);

  const animatedStyle = {
    transform: [
      { scale: scaleAnimation },
    ],
    opacity: opacityAnimation,
  };

  return (
    <Animated.View style={[animatedStyle]}>
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      fill="#2964E0"
      d="M26.739.898a2.63 2.63 0 0 0-2.618-.679L2.295 6.526A2.596 2.596 0 0 0 .42 8.576C.226 9.586.9 10.872 1.78 11.41l6.824 4.168c.7.428 1.603.321 2.182-.26L18.6 7.504a.997.997 0 0 1 1.438 0c.393.392.393 1.03 0 1.438l-7.828 7.814c-.58.58-.69 1.482-.262 2.183l4.17 6.85a2.597 2.597 0 0 0 2.252 1.275c.108 0 .23 0 .339-.015a2.637 2.637 0 0 0 2.21-1.872L27.39 3.516A2.635 2.635 0 0 0 26.74.898Z"
    />
    <Path
      fill="#2964E0"
      d="M10.495 23.366a1.02 1.02 0 0 1 0 1.44l-1.853 1.851a1.01 1.01 0 0 1-.72.299 1.016 1.016 0 0 1-.719-1.736l1.853-1.854a1.02 1.02 0 0 1 1.439 0Zm-1.063-5.138a1.02 1.02 0 0 1 0 1.44l-1.853 1.85a1.01 1.01 0 0 1-.72.3c-.26 0-.52-.1-.718-.3a1.016 1.016 0 0 1 0-1.437l1.851-1.853a1.02 1.02 0 0 1 1.44 0ZM4.33 16.61a1.02 1.02 0 0 1 0 1.44L2.477 19.9a1.01 1.01 0 0 1-.72.299 1.016 1.016 0 0 1-.719-1.736L2.89 16.61a1.02 1.02 0 0 1 1.44 0Z"
      opacity={0.8}
    />
  </Svg>
  </Animated.View>
)
};
export default ConnectRequestIcon;
