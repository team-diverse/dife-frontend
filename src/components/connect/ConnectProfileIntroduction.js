import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14 } = CustomTheme;

const ConnectProfileIntroduction = ({ introduction }) => {
	return (
		<View style={styles.rectangle}>
			<Text style={styles.text}>{introduction}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 14,
		justifyContent: "center",
		paddingHorizontal: 15,
		paddingVertical: 16,
		marginBottom: 16,
	},
	text: {
		...fontBody14,
	},
});

export default ConnectProfileIntroduction;
