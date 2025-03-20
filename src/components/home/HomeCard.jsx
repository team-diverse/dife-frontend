import React from "react";
import { View, StyleSheet, Platform } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

const HomeCard = () => {
	return <View style={styles.rectangle} />;
};

const styles = StyleSheet.create({
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		opacity: 0.6,
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

export default HomeCard;
