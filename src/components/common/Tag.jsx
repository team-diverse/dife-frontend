import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const Tag = ({ tag }) => {
	const { t, i18n } = useTranslation();

	return (
		<View style={styles.container}>
			{tag.map((item, index) => {
				const resources = i18n.store.data;
				let translatedHobby = item;

				Object.values(resources).forEach((lang) => {
					if (lang.translation?.hobbyOptions) {
						const hobbyOptions = lang.translation.hobbyOptions;
						const key = Object.keys(hobbyOptions).find(
							(k) => hobbyOptions[k] === item,
						);

						if (key) {
							translatedHobby = t(`hobbyOptions.${key}`);
						}
					}
				});

				return (
					<View
						key={index}
						style={[
							styles.rectangle,
							{
								width:
									translatedHobby.length >= 6
										? translatedHobby.length * 10
										: 60,
							},
						]}
					>
						<Text style={styles.text}>{translatedHobby}</Text>
					</View>
				);
			})}
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
