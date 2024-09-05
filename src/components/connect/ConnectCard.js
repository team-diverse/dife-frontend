import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import {
	createLikeMember,
	deleteLikeMember,
	createLikeChatroom,
	deleteLikeChatroom,
} from "config/api";

import IconHeart24 from "@components/Icon24/IconHeart24";
import ConnectPlusIcon from "@components/connect/ConnectPlusIcon";
import Tag from "@components/common/Tag";
import IconGroupHeadcount from "@components/connect/IconGroupHeadcount";
import IconSearchFail from "@components/common/IconSearchFail";

const { fontSub14, fontCaption } = CustomTheme;

const ConnectCard = ({
	id,
	isLiked = false,
	profilePresignUrl = null,
	username,
	country,
	major,
	bio,
	tags,
	groupName,
	description,
	count,
	fail = false,
}) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const [heart, setHeart] = useState(isLiked);
	const [groupHeart, setGroupHeart] = useState(isLiked);

	const handleCreateHeart = async () => {
		try {
			await createLikeMember(id);
			setHeart(true);
		} catch (error) {
			console.error(
				"멤버 좋아요 생성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleDeleteHeart = async () => {
		try {
			await deleteLikeMember(id);
			setHeart(false);
		} catch (error) {
			console.error(
				"멤버 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleGroupCreateHeart = async () => {
		try {
			await createLikeChatroom(id);
			setGroupHeart(true);
		} catch (error) {
			console.error(
				"그룹 좋아요 생성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleGroupDeleteHeart = async () => {
		try {
			await deleteLikeChatroom(id);
			setGroupHeart(false);
		} catch (error) {
			console.error(
				"그룹 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleNavigation = () => {
		if (count) {
			navigation.navigate("GroupProfilePage", { groupId: id });
		} else {
			navigation.navigate("ConnectProfilePage", { memberId: id });
		}
	};

	return (
		<View style={[styles.rectangle, fail && { justifyContent: "center" }]}>
			{fail ? (
				<View style={styles.containerFail}>
					<IconSearchFail />
					<Text style={styles.textFail}>{t("searchNoResults")}</Text>
				</View>
			) : (
				<>
					<View style={styles.profile}>
						<Image
							source={{ uri: profilePresignUrl }}
							style={styles.imgProfile}
						/>
					</View>

					<View style={styles.cardContainer}>
						<Text style={styles.textName}>
							{groupName ? groupName : username}
						</Text>
						{count ? (
							<View style={styles.containerHeadcount}>
								<IconGroupHeadcount />
								<View style={styles.containerTextHeadcount}>
									<Text style={styles.textHeadcount}>
										{count}
									</Text>
									<Text style={styles.textMaxHeadcount}>
										{" "}
										/ 30
									</Text>
								</View>
							</View>
						) : (
							<View style={styles.containerBasicInfo}>
								<Text
									style={styles.textBasicInfo}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{country}
								</Text>
								<Text style={styles.textBasicInfo}> | </Text>
								<Text
									style={styles.textBasicInfo}
									numberOfLines={1}
									ellipsizeMode="tail"
								>
									{major}
								</Text>
							</View>
						)}

						<Text
							style={styles.textIntroduction}
							numberOfLines={3}
							ellipsizeMode="tail"
						>
							{description ? description : bio}
						</Text>
						<View style={styles.tagContainer}>
							<Tag tag={tags} />
						</View>

						<View style={styles.iconContainer}>
							<IconHeart24
								active={count ? groupHeart : heart}
								onPress={
									count
										? groupHeart
											? handleGroupDeleteHeart
											: handleGroupCreateHeart
										: heart
											? handleDeleteHeart
											: handleCreateHeart
								}
							/>
							<TouchableOpacity onPress={handleNavigation}>
								<ConnectPlusIcon style={{ marginLeft: 9 }} />
							</TouchableOpacity>
						</View>
					</View>
				</>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		flexDirection: "row",
		width: "100%",
		height: 173,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		overflow: "hidden",
		marginVertical: 10,
	},
	profile: {
		width: 92,
		height: 173,
		backgroundColor: CustomTheme.textDisable,
		overflow: "hidden",
	},
	imgProfile: {
		width: "100%",
		height: "100%",
	},
	cardContainer: {
		flex: 1,
		marginVertical: 8,
		marginHorizontal: 12,
	},
	iconContainer: {
		position: "absolute",
		top: 0,
		right: 0,
		flexDirection: "row",
		alignItems: "center",
	},
	textName: {
		fontSize: 14,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	containerHeadcount: {
		flexDirection: "row",
		marginBottom: 8,
	},
	containerTextHeadcount: {
		flexDirection: "row",
	},
	textHeadcount: {
		...fontCaption,
	},
	textMaxHeadcount: {
		...fontCaption,
		color: CustomTheme.borderColor,
	},
	containerBasicInfo: {
		flexDirection: "row",
	},
	textBasicInfo: {
		...fontCaption,
		marginBottom: 6,
		maxWidth: 93,
		overflow: "hidden",
	},
	textIntroduction: {
		...fontSub14,
		width: "100%",
		marginBottom: 6,
	},
	tagContainer: {
		flexDirection: "row",
		width: "100%",
	},
	containerFail: {
		justifyContent: "center",
		alignItems: "center",
	},
	textFail: {
		...fontCaption,
		color: CustomTheme.textSecondary,
		marginTop: 13,
	},
});

export default ConnectCard;
