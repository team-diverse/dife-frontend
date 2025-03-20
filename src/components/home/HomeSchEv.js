import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const HomeSchEv = () => {
	return <View style={styles.rectangle} />;
};

const styles = StyleSheet.create({
	rectangle: {
		width: 120,
		height: 148,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
});

export default HomeSchEv;
