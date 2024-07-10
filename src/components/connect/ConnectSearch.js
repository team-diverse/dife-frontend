import React from "react";
import { View, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const ConnectSearch = () => {
	return <View style={styles.rectangle} />;
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		height: 48,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 24,
	},
});

export default ConnectSearch;
