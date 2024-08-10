import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme";

import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import IconComment from "@components/community/IconComment";

const { fontCaption, fontNavi } = CustomTheme;

const ItemCommunity = ({ props, comment }) => {
	const navigation = useNavigation();

	const date = (date) => {
		const datePart = date.split("T")[0];
		const monthDay = datePart.slice(5);
		return monthDay.replace("-", "/");
	};

	return (
		<>
			{props.map((post, index) => {
				const commentText = comment
					? `'${post.title}' 글에 댓글`
					: post.title;

				return (
					<TouchableOpacity
						key={index}
						style={styles.ItemCommunity}
						onPress={() =>
							navigation.navigate("PostPage", {
								postId: post.id,
							})
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
									{commentText}
								</Text>
								<Text
									style={[
										styles.textPostContext,
										post.image ? { width: 196 } : {},
									]}
								>
									{post.content}
								</Text>

								<View style={styles.containerTextRow}>
									<View style={styles.containerText}>
										<IconHeart />
										<Text style={styles.text}>
											{post.likesCount}
										</Text>
									</View>
									<View style={styles.containerText}>
										<IconBookmark />
										<Text style={styles.text}>
											{post.bookmark}
										</Text>
									</View>
									<View style={styles.containerText}>
										<IconComment />
										<Text style={styles.text}>
											{post.commentCount}
										</Text>
									</View>
									<View style={styles.containerText}>
										<Text style={styles.text}>
											{date(post.created)}
										</Text>
									</View>
								</View>
							</View>

							{post.image && (
								<Image
									source={post.image}
									style={styles.imagePost}
								/>
							)}
						</View>
					</TouchableOpacity>
				);
			})}
		</>
	);
};

const styles = StyleSheet.create({
	ItemCommunity: {
		width: "100%",
		height: 78,
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
	imagePost: {
		width: 48,
		height: 48,
		borderRadius: 10,
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
});

export default ItemCommunity;
