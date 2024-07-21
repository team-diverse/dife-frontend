import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontSub16 } = CustomTheme;

const ApplyButton = ({
	text = "applyBtn",
	background = false,
	onPress = null,
	disabled = false,
}) => {
	const rectangleStyle = background
		? styles.rectangleShadow
		: styles.rectangle;

	return (
		<View>
			<View style={rectangleStyle}>
				<TouchableOpacity
					style={[styles.apply, disabled && styles.disabled]}
					onPress={onPress}
					disabled={disabled}
				>
					<Text style={styles.text}>{text}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
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
	apply: {
		flexDirection: "row",
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginHorizontal: 24,
		marginVertical: 14,
	},
	text: {
		...fontSub16,
		color: CustomTheme.bgBasic,
		paddingHorizontal: 59,
		paddingVertical: 10,
	},
	disabled: {
		backgroundColor: CustomTheme.borderColor,
	},
});

export default ApplyButton;
