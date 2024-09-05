import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { formatDate } from "util/formatDate";

import IconHeart from "@components/community/IconHeart";
import IconBookmark from "@components/community/IconBookmark";
import IconComment from "@components/community/IconComment";

const { fontCaption, fontNavi } = CustomTheme;

const ItemCommunity = ({
	postList = [],
	comment = false,
	apiPost = false,
	likedPostBlue = false,
	bookmarkedPostBlue = false,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	return (
		<>
			{postList.map((post, index) => {
				const commentText = comment
					? `'${post.post.title}' ${t("commentOnPost")}`
					: post.title;

				return (
					<TouchableOpacity
						key={index}
						style={styles.ItemCommunity}
						onPress={() =>
							navigation.navigate("PostPage", {
								postId:
									apiPost || comment ? post.post.id : post.id,
							})
						}
					>
						<View style={styles.containerRow}>
							<View>
								<Text
									style={[
										styles.textPostTitle,
										(apiPost ? post.post.image : post.image)
											? { width: 196 }
											: {},
									]}
								>
									{apiPost ? post.post.title : commentText}
								</Text>
								<Text
									style={[
										styles.textPostContext,
										(apiPost ? post.post.image : post.image)
											? { width: 196 }
											: {},
									]}
								>
									{apiPost ? post.post.content : post.content}
								</Text>

								<View style={styles.containerTextRow}>
									<View style={styles.containerText}>
										<IconHeart
											likedPostBlue={likedPostBlue}
											active={
												apiPost
													? post.post.isLiked
													: post.isLiked
											}
										/>
										<Text style={styles.text}>
											{apiPost
												? post.post.likesCount
												: post.likesCount}
										</Text>
									</View>
									{comment == false && (
										<View style={styles.containerText}>
											<IconBookmark
												bookmarkedPostBlue={
													bookmarkedPostBlue
												}
												active={
													apiPost
														? post.post.isBookmarked
														: post.isBookmarked
												}
											/>
											<Text style={styles.text}>
												{apiPost
													? post.post.bookmarkCount
													: post.bookmarkCount}
											</Text>
										</View>
									)}
									<View style={styles.containerText}>
										<IconComment />
										<Text style={styles.text}>
											{apiPost || comment
												? post.post.commentCount
												: post.commentCount}
										</Text>
									</View>
									<View style={styles.containerText}>
										<Text style={styles.text}>
											{formatDate(
												apiPost
													? post.post.created
													: post.created,
											)}
										</Text>
									</View>
								</View>
							</View>

							{(apiPost
								? post.post.profilePresignUrl
								: post.profilePresignUrl) && (
								<View style={styles.containerImage}>
									<Image
										source={{
											uri: apiPost
												? post.post.profilePresignUrl
												: post.profilePresignUrl,
										}}
										style={styles.imagePost}
									/>
								</View>
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
