import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const HomecardBackBtn = ({ btnText, onPress }) => {
	const { t } = useTranslation();

	const btnStyle =
		btnText === t("noButtonText") || btnText === t("backButton")
			? styles.btnCancel
			: styles.btnApply;
	const btnTextStyle =
		btnText === t("noButtonText") || btnText === t("backButton")
			? styles.btnTextC
			: styles.btnTextA;

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={[styles.btn, btnStyle]}>
				<Text style={btnTextStyle}>{btnText}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: 102,
		height: 37,
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 8,
	},
	btnApply: {
		backgroundColor: CustomTheme.primaryMedium,
	},
	btnCancel: {
		backgroundColor: CustomTheme.bgBasic,
	},
	btnTextA: {
		...fontCaption,
		color: CustomTheme.bgBasic,
	},
	btnTextC: {
		...fontCaption,
	},
});

export default HomecardBackBtn;
