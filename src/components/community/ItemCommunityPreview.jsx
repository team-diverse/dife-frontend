import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption } = CustomTheme;

const ItemCommunityPreview = ({ postList = [] }) => {
	return (
		<View style={styles.containerCommunity}>
			{postList.map((post, index) => (
				<View key={index} style={styles.ItemCommunity}>
					<Text style={styles.textPostTitle}>{post.title}</Text>
					<Text style={styles.textPostContext}>{post.content}</Text>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	containerCommunity: {
		width: "100%",
		height: 222,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 26,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		shadowColor: "#7797C6",
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
	},
	ItemCommunity: {
		width: "100%",
		height: 62,
		borderRadius: 20,
		borderWidth: 3,
		borderColor: CustomTheme.primaryBg,
		paddingHorizontal: 25,
		justifyContent: "center",
		marginTop: 4,
		marginBottom: 4,
	},
	textPostTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	textPostContext: {
		...fontCaption,
		height: 17,
		marginTop: 3,
	},
});

export default ItemCommunityPreview;
