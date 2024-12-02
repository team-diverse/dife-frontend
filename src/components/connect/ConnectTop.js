import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const ConnectTop = (isSmallScreen = false) => {
	return (
		<View style={[styles.rectangle, isSmallScreen && { height: 180 }]} />
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		height: 172,
		backgroundColor: CustomTheme.primaryMedium,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
	},
});

export default ConnectTop;
