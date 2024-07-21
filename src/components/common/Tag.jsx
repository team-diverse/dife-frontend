import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const Tag = ({ tag = ["tag"] }) => {
	return (
		<View style={styles.container}>
			{tag.map((item, index) => (
				<View
					key={index}
					style={[styles.rectangle, { width: item.length + 50 }]}
				>
					<Text style={styles.text}>{item}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	rectangle: {
		height: 19,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: "#B0D0FF",
		borderRadius: 40,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 8,
		marginBottom: 8,
	},
	text: {
		...fontCaption,
	},
});

export default Tag;
