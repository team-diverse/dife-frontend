import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const HomeLine = () => {
	return <View style={styles.line} />;
};

const styles = StyleSheet.create({
	line: {
		width: 1,
		height: 39,
		backgroundColor: CustomTheme.borderColor,
	},
});

export default HomeLine;
