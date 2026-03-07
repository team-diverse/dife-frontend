import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const Tag = ({ tag = [], style, textStyle, containerStyle, maxPerRow }) => {
	const { t, i18n } = useTranslation();
	const tags = Array.isArray(tag) ? tag : [];

	const translatedTags = tags.map((item) => {
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

		return translatedHobby;
	});

	const renderTagItem = (translatedHobby, key) => (
		<View
			key={key}
			style={[
				styles.rectangle,
				{
					width:
						translatedHobby.length >= 6
							? translatedHobby.length * 10
							: 60,
				},
				style,
			]}
		>
			<Text
				style={[
					styles.text,
					style?.color && { color: style.color },
					textStyle,
				]}
			>
				{translatedHobby}
			</Text>
		</View>
	);

	if (maxPerRow && maxPerRow > 0) {
		const rows = [];

		for (let i = 0; i < translatedTags.length; i += maxPerRow) {
			rows.push(translatedTags.slice(i, i + maxPerRow));
		}

		return (
			<View style={[styles.container, containerStyle]}>
				{rows.map((row, rowIndex) => (
					<View key={`row-${rowIndex}`} style={styles.row}>
						{row.map((translatedHobby, colIndex) =>
							renderTagItem(
								translatedHobby,
								`tag-${rowIndex}-${colIndex}`,
							),
						)}
					</View>
				))}
			</View>
		);
	}

	return (
		<View style={[styles.container, containerStyle]}>
			{translatedTags.map((translatedHobby, index) =>
				renderTagItem(translatedHobby, `tag-${index}`),
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		flexWrap: "wrap",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
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
