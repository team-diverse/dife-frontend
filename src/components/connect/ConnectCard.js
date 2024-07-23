import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import IconHeart24 from "@components/Icon24/IconHeart24";
import ConnectPlusIcon from "@components/connect/ConnectPlusIcon";
import Tag from "@components/common/Tag";
import IconGroupHeadcount from "./IconGroupHeadcount";

const { fontSub14, fontCaption } = CustomTheme;

const ConnectCard = ({
	id,
	profilePresignUrl = null,
	username = "username",
	country = "country",
	age = "age",
	major = "major",
	bio = "bio",
	tags = ["tag"],
	headcount,
}) => {
	const navigation = useNavigation();
	const [heart, setHeart] = useState(false);

	const handleHeartPress = () => {
		setHeart(!heart);
	};

	const handleNavigation = () => {
		if (headcount) {
			navigation.navigate("GroupProfilePage");
		} else {
			navigation.navigate("ConnectProfilePage", { memberId: id });
		}
	};

	return (
		<View style={styles.rectangle}>
			<View style={styles.profile}>
				<Image
					source={{ url: profilePresignUrl }}
					style={styles.imgProfile}
				/>
			</View>
			<View style={styles.cardContainer}>
				<View style={styles.textIconContainer}>
					<Text style={styles.textName}>{username}</Text>
					<View style={styles.iconContainer}>
						<IconHeart24
							active={heart}
							onPress={handleHeartPress}
						/>
						<TouchableOpacity onPress={handleNavigation}>
							<ConnectPlusIcon style={{ marginLeft: 9 }} />
						</TouchableOpacity>
					</View>
				</View>
				{headcount && (
					<View style={styles.containerHeadcount}>
						<IconGroupHeadcount />
						<View style={styles.containerTextHeadcount}>
							<Text style={styles.textHeadcount}>
								{headcount}
							</Text>
							<Text style={styles.textMaxHeadcount}> / 30</Text>
						</View>
					</View>
				)}
				<Text style={styles.textBasicInfo}>
					{country} | {age} | {major}
				</Text>
				<Text style={styles.textIntroduction}>{bio}</Text>
				<View style={styles.tagContainer}>
					<Tag tag={tags} />
				</View>
			</View>
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
		marginTop: 8,
		marginLeft: 12,
	},
	textIconContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 6,
	},
	iconContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignSelf: "flex-end",
		marginRight: 11,
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
	textBasicInfo: {
		...fontCaption,
		marginBottom: 6,
	},
	textIntroduction: {
		...fontSub14,
		width: 187,
		marginBottom: 6,
	},
	tagContainer: {
		flexDirection: "row",
		width: 221,
	},
});

export default ConnectCard;
