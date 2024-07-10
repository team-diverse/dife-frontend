import React, { Children } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme.js";

const { fontSub16 } = CustomTheme;

const BottomTwoButtons = ({ shadow = false, children }) => {
	const containerStyle = shadow ? styles.rectangleShadow : styles.rectangle;

	const buttons = Children.map(children, (child, index) => (
		<TouchableOpacity
			style={index === 0 ? styles.button1 : styles.button2}
			onPress={child.props.onPress}
		>
			<Text style={index === 0 ? styles.text1 : styles.text2}>
				{child.props.text}
			</Text>
		</TouchableOpacity>
	));

	return <View style={containerStyle}>{buttons}</View>;
};

const styles = StyleSheet.create({
	rectangle: {
		flexDirection: "row",
		width: "100%",
		height: 72,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
	},
	rectangleShadow: {
		flexDirection: "row",
		width: "100%",
		height: 72,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		shadowColor: "#3C454E",
		shadowOffset: { width: 0, height: -1 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	button1: {
		width: 156,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginLeft: 24,
		marginRight: 8,
		marginVertical: 14,
	},
	button2: {
		width: 156,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginRight: 24,
		marginLeft: 8,
		marginVertical: 14,
	},
	text1: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		paddingVertical: 10,
	},
	text2: {
		...fontSub16,
		color: CustomTheme.bgBasic,
		paddingVertical: 10,
	},
});

export default BottomTwoButtons;
