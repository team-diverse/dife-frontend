import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme.js";

const { fontSub16 } = CustomTheme;

const FilterCategory = ({
	text = "category",
	onPress,
	mbtiCount = null,
	hobbyCount = null,
	isDisabled = false,
	onBoardingMBTI = false,
	selected = false,
}) => {
	useEffect(() => {
		setIsActive(selected);
	}, [selected]);

	const [isActive, setIsActive] = useState(selected);
	const [isPressed, setIsPressed] = useState(false);

	useEffect(() => {
		setIsActive(selected);
	}, [selected]);

	const handlePress = () => {
		if (mbtiCount !== null) {
			if (onBoardingMBTI) {
				if (!isActive && mbtiCount >= 1) {
					onPress(text);
				}
				setIsActive((prev) => !prev);
				onPress(text);
			} else {
				if (!isActive && mbtiCount >= 3) {
					return;
				}
				setIsActive((prev) => !prev);
				onPress(text);
			}
		} else if (hobbyCount !== null) {
			if (!isActive && hobbyCount >= 3) {
				return;
			}
			setIsActive((prev) => !prev);
			onPress(text);
		}
	};

	const getContainerStyle = () => {
		if (isActive) {
			return [
				styles.category,
				{ borderColor: CustomTheme.primaryMedium },
			];
		} else if (isPressed) {
			return [
				styles.category,
				{
					backgroundColor: CustomTheme.primaryBg,
					borderColor: CustomTheme.primaryBg,
				},
			];
		} else {
			return styles.category;
		}
	};

	const getTextStyle = () => {
		if (isActive) {
			return [styles.text, { color: CustomTheme.primaryMedium }];
		} else if (isPressed) {
			return [styles.text, { color: "#8C8D91" }];
		} else {
			return styles.text;
		}
	};

	return (
		<TouchableOpacity
			onPress={handlePress}
			onPressIn={() => setIsPressed(true)}
			onPressOut={() => setIsPressed(false)}
			activeOpacity={1}
			disabled={isDisabled}
		>
			<View style={getContainerStyle()}>
				<Text style={getTextStyle()}>{text}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	category: {
		width: 102,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		marginHorizontal: 5.5,
		marginVertical: 4,
		borderWidth: 2,
		borderColor: "#D9EAFF",
		borderRadius: 43,
	},
	text: {
		...fontSub16,
	},
});

export default FilterCategory;
