import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, SafeAreaView } from "react-native";
import Dot from "./Dot";
import DifeYellowDotLogo from "../DifeYellowDotLogo";

const INITAL_OPACITY = 0.2;
const DOT_COUNT = 3;

const createAnimatedValues = (count, initialValue) => {
	const animatedValues = [];
	for (let i = 0; i < count; i++) {
		animatedValues.push(new Animated.Value(initialValue));
	}
	return animatedValues;
};

const Loading = () => {
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
				Animated.stagger(200, dotOpacities.map(createSequence)),
			).start();
		};
		animate();
	}, [dotOpacities]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={styles.dots}>
					<View style={styles.logo}>
						<DifeYellowDotLogo />
					</View>
					{dotOpacities.map((opacity, index) => (
						<Dot
							key={index}
							opacity={opacity}
							translateY={opacity.interpolate({
								inputRange: [0, 1],
								outputRange: [0, -10],
							})}
						/>
					))}
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		position: "absolute",
		bottom: "100%",
		marginBottom: 3,
	},
	dots: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: 89,
		width: 89,
	},
});

export default Loading;
