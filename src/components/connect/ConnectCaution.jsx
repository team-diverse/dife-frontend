import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const ConnectCaution = ({ text }) => {
	return (
		<View style={styles.container}>
			<Ionicons
				name="information-circle-outline"
				size={18}
				color="#000"
				style={styles.icon}
			/>
			<Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
				{text}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f8f8",
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 8,
		marginVertical: 6,
		marginHorizontal: 25,
	},
	icon: {
		marginRight: 8,
	},
	text: {
		color: "#000",
		fontSize: 13,
		lineHeight: 20,
		flex: 1,
	},
});

export default ConnectCaution;
