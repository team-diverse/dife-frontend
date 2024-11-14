import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useWebSocket } from "context/WebSocketContext";

const StatusIndicator = () => {
	const { isConnected } = useWebSocket();

	return (
		<View style={styles.container}>
			<View
				style={[
					styles.indicator,
					{ backgroundColor: isConnected ? "green" : "red" },
				]}
			/>
			<Text style={styles.text}>
				{isConnected ? "Connected" : "Disconnected"}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		backgroundColor: "#f8f8f8",
		borderRadius: 5,
		margin: 10,
	},
	indicator: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 8,
	},
	text: {
		fontSize: 14,
		color: "#333",
	},
});

export default StatusIndicator;
