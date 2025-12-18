import React, { Children } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme.js";

const { fontSub16 } = CustomTheme;

const BottomTwoButtons = ({ shadow = false, children }) => {
	const containerStyle = shadow ? styles.rectangleShadow : styles.rectangle;

	const buttons = Children.map(children, (child, index) => {
		const isDisabled = child.props.disabled;

		return (
			<TouchableOpacity
				style={[
					index === 0 ? styles.button1 : styles.button2,
					isDisabled && styles.buttonDisabled,
				]}
				onPress={isDisabled ? null : child.props.onPress}
				disabled={isDisabled}
			>
				<Text style={index === 0 ? styles.text1 : styles.text2}>
					{child.props.text}
				</Text>
			</TouchableOpacity>
		);
	});

	return <View style={containerStyle}>{buttons}</View>;
};

const styles = StyleSheet.create({
	rectangle: {
		flexDirection: "row",
		width: "100%",
		height: 110,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
	},
	rectangleShadow: {
		flexDirection: "row",
		width: "100%",
		height: 110,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		paddingVertical: 14,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E",
				shadowOffset: { width: 0, height: -4 },
				shadowOpacity: 0.07,
				shadowRadius: 3,
			},
			android: {
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor: "rgba(205, 207, 213, 0.3)",
			},
		}),
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
		marginVertical: 9,
		marginBottom: 14,
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
		marginVertical: 9,
		marginBottom: 14,
	},
	text1: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
		paddingVertical: 9,
	},
	text2: {
		...fontSub16,
		color: CustomTheme.bgBasic,
		paddingVertical: 9,
	},
	buttonDisabled: {
		backgroundColor: CustomTheme.borderColor,
		borderColor: CustomTheme.borderColor,
	},
});

export default BottomTwoButtons;
