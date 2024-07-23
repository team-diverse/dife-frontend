import React from "react";
import { Animated, StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
	dot: {
		width: 12,
		height: 12,
		borderRadius: 10,
		backgroundColor: "#2964E0",
		margin: 5,
	},
});

export default Dot;
