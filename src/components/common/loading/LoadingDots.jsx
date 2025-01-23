import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, SafeAreaView } from "react-native";

const INITAL_OPACITY = 0.2;
const DOT_COUNT = 3;

const createAnimatedValues = (count, initialValue) => {
	const animatedValues = [];
	for (let i = 0; i < count; i++) {
		animatedValues.push(new Animated.Value(initialValue));
	}
	return animatedValues;
};

const Dot = ({ opacity, translateY }) => {
	return (
		<Animated.View
			style={[
				styles.dot,
				{
					opacity,
					transform: [{ translateY }],
				},
			]}
		/>
	);
};

const LoadingDots = () => {
	const dotOpacities = useRef(
		createAnimatedValues(DOT_COUNT, INITAL_OPACITY),
	).current;

	const createAnimationConfig = (isOn) => {
		return {
			toValue: isOn ? 1 : INITAL_OPACITY,
			duration: 500,
			useNativeDriver: true,
		};
	};

	const createSequence = (animatedValue) => {
		return Animated.sequence([
			Animated.timing(animatedValue, createAnimationConfig(true)),
			Animated.timing(animatedValue, createAnimationConfig(false)),
		]);
	};

	useEffect(() => {
		const animate = () => {
			Animated.loop(
				Animated.stagger(400, dotOpacities.map(createSequence)),
			).start();
		};
		animate();
	}, [dotOpacities]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.dots}>
				{dotOpacities.map((opacity, index) => (
					<Dot
						key={index}
						opacity={opacity}
						translateY={opacity.interpolate({
							inputRange: [0, 1],
							outputRange: [0, -6],
						})}
					/>
				))}
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	dot: {
		width: 6.16,
		height: 6.16,
		borderRadius: 10,
		backgroundColor: "#2964E0",
		marginHorizontal: 3,
	},
	dots: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default LoadingDots;
