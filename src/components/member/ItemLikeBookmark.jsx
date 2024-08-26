import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";

const { fontCaption, fontNavi } = CustomTheme;

const ItemLikeBookmark = ({ likedAndBookmarkPostList, type = "like" }) => {
	const navigation = useNavigation();

	return (
		<>
			{likedAndBookmarkPostList.map((post, index) => (
				<TouchableOpacity
					key={index}
					style={styles.ItemCommunity}
					onPress={() =>
						navigation.navigate("PostPage", { postId: post.id })
					}
				>
					<View style={styles.containerRow}>
						<View>
							<Text
								style={[
									styles.textPostTitle,
									post.image ? { width: 196 } : {},
								]}
							>
								{type === "like" ? post.title : post.post.title}
							</Text>
							<Text
								style={[
									styles.textPostContext,
									post.image ? { width: 196 } : {},
								]}
							>
								{type === "like"
									? post.content
									: post.post.content}
							</Text>
						</View>

						{post.profilePresignUrl && (
							<View style={styles.containerImage}>
								<Image
									source={{ uri: post.profilePresignUrl }}
									style={styles.imagePost}
								/>
							</View>
						)}
					</View>
				</TouchableOpacity>
			))}
		</>
	);
};

const styles = StyleSheet.create({
	ItemCommunity: {
		width: "100%",
		height: 62,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		borderWidth: 2,
		borderColor: CustomTheme.primaryBg,
		paddingHorizontal: 20,
		justifyContent: "center",
		marginTop: 4,
		marginBottom: 4,
	},
	containerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	textPostTitle: {
		fontSize: 12,
		lineHeight: 16,
		fontFamily: "NotoSansCJKkr-Bold",
		width: 272,
		height: 17,
	},
	textPostContext: {
		...fontCaption,
		width: 272,
		height: 17,
		marginTop: 3,
	},
	containerTextRow: {
		flexDirection: "row",
		marginTop: 3,
	},
	containerText: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 8,
	},
	text: {
		...fontNavi,
		color: "#8C8D91",
		marginLeft: 1,
	},
	containerImage: {
		position: "absolute",
		alignItems: "center",
		right: -3,
	},
	imagePost: {
		width: 48,
		height: 48,
		borderRadius: 10,
	},
});

export default ItemLikeBookmark;
