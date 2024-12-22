import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

const { fontBody14 } = CustomTheme;

const ConnectProfileTag = ({ tag = [""] }) => {
	const { t, i18n } = useTranslation();

	const groupedTags = [];
	for (let i = 0; i < tag.length; i += 3) {
		groupedTags.push(tag.slice(i, i + 3));
	}

	return (
		<>
			{groupedTags.map((groupItem, groupIndex) => (
				<View key={groupIndex} style={styles.container}>
					{groupItem.map((item, index) => {
						const resources = i18n.store.data;
						let translatedHobby = item;

						Object.values(resources).forEach((lang) => {
							if (lang.translation?.hobbyOptions) {
								const hobbyOptions =
									lang.translation.hobbyOptions;
								const key = Object.keys(hobbyOptions).find(
									(k) => hobbyOptions[k] === item,
								);

								if (key) {
									translatedHobby = t(`hobbyOptions.${key}`);
								}
							}
						});

						return (
							item && (
								<View
									key={index}
									style={[
										styles.rectangle,
										{
											width:
												translatedHobby.length >= 6
													? translatedHobby.length *
															10 +
														30
													: 80,
										},
									]}
								>
									<Text style={styles.text}>
										{translatedHobby}
									</Text>
								</View>
							)
						);
					})}
				</View>
			))}
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		marginBottom: 8,
	},
	rectangle: {
		height: 32,
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
		...fontBody14,
	},
});

export default ConnectProfileTag;
