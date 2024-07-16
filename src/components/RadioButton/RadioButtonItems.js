import React, { useContext } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { RadioGroupContext } from "@components/RadioButton/RadioButtonGroup";

const RadioButtonItems = ({
	value,
	children,
	disabled,
	containerStyle,
	color = "#FFC0C0",
	borderColor = CustomTheme.warningRed,
}) => {
	const { onSelected, selected } = useContext(RadioGroupContext);

	const isSelected = selected === value;

	const triggerRadioButton = () => {
		if (!disabled) {
			onSelected(value);
		}
	};

	const radioButtonStyle = [
		styles.radioButtonCircle,
		{
			borderColor: isSelected ? borderColor : CustomTheme.textDisable,
			backgroundColor: disabled
				? "#fff"
				: isSelected
					? color
					: "transparent",
		},
	];

	return (
		<Pressable
			onPress={triggerRadioButton}
			style={[styles.radioButtonItemContainer, containerStyle]}
		>
			<View style={radioButtonStyle}>
				{isSelected && (
					<View
						style={styles.innerCircle(
							disabled ? CustomTheme.bgBasic : color,
						)}
					/>
				)}
			</View>
			{children && (
				<Pressable style={styles.label} onPress={triggerRadioButton}>
					{children}
				</Pressable>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	radioButtonItemContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	radioButtonCircle: {
		borderWidth: 2,
		width: 14,
		height: 14,
		borderRadius: 12,
		alignItems: "center",
		justifyContent: "center",
	},
	label: {
		marginLeft: 8,
		marginTop: 9,
		marginBottom: 13,
	},
	innerCircle: () => ({
		width: 12,
		height: 12,
	}),
});

export default RadioButtonItems;
