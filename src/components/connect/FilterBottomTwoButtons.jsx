import React, { Children } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { CustomTheme } from "@styles/CustomTheme";

import IconCircleNumber from "@components/community/IconCircleNumber";

const { fontSub16, fontNaviBold } = CustomTheme;

const FilterBottomTwoButtons = ({ children }) => {
	const buttons = Children.map(children, (child, index) => {
		const isDisabled = child.props.disabled;
		const totalSelection =
			Children.toArray(children)[0]?.props?.totalSelection;

		return (
			<TouchableOpacity
				style={[
					index === 0 ? styles.button1 : styles.button2,
					isDisabled && styles.buttonDisabled,
				]}
				onPress={isDisabled ? null : child.props.onPress}
				disabled={isDisabled}
			>
				{index === 1 && totalSelection > 0 && (
					<View style={styles.containerImageNumber}>
						<IconCircleNumber style={styles.iconCircleNumber} />
						<Text style={styles.textImageNumber}>
							{totalSelection}
						</Text>
					</View>
				)}
				<Text
					style={[
						index === 0 ? styles.text1 : styles.text2,
						totalSelection === 0 &&
							index === 0 && { color: CustomTheme.bgBasic },
					]}
				>
					{child.props.text}
				</Text>
			</TouchableOpacity>
		);
	});

	return <View style={styles.rectangleShadow}>{buttons}</View>;
};

const styles = StyleSheet.create({
	containerImageNumber: {
		position: "absolute",
		top: -8,
		right: 22,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	iconCircleNumber: {
		position: "absolute",
	},
	textImageNumber: {
		...fontNaviBold,
		color: CustomTheme.primaryMedium,
		zIndex: 11,
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
		backgroundColor: CustomTheme.primaryBg,
		borderWidth: 3,
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
	buttonDisabled: {
		backgroundColor: CustomTheme.borderColor,
		borderColor: CustomTheme.borderColor,
	},
});

export default FilterBottomTwoButtons;
