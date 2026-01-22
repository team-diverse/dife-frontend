import React, { forwardRef } from "react";
import { TextInput as RNTextInput, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
	androidSingleLine: {
		includeFontPadding: false,
		textAlignVertical: "center",
	},
});

const TextInput = forwardRef(
	({ style, multiline, androidCursorFix = false, ...rest }, ref) => {
		const androidStyle =
			Platform.OS === "android" && (androidCursorFix || !multiline)
				? styles.androidSingleLine
				: null;

		return (
			<RNTextInput
				ref={ref}
				multiline={multiline}
				style={[androidStyle, style]}
				{...rest}
			/>
		);
	},
);

TextInput.displayName = "TextInput";

export default TextInput;
