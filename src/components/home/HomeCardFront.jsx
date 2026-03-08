import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";
import { useWebSocket } from "context/WebSocketContext";
import { createChatroom } from "util/createChatroom";
import { formatAge } from "util/formatAge";

import Tag from "@components/common/Tag";
import HomeProfile from "@components/home/HomeProfile";
import IconHeart24 from "@components/Icon24/IconHeart24";
import IconAddFriend24 from "@components/Icon24/IconAddFriend24";
import IconChat24 from "@components/Icon24/IconChat24";
import HomeLine from "@components/home/HomeLine";
import HomeCardLine from "./HomeCardLine";

const { fontBody16, fontBody14 } = CustomTheme;

const HomeCardFront = ({ profile, onPress, isLikedOnPress, isLikedActive }) => {
	const navigation = useNavigation();
	const { chatrooms } = useWebSocket();

	const [tagHeight, setTagHeight] = useState(0);
	const [introductionLines, setIntroductionLines] = useState(1);

	useEffect(() => {
		if (tagHeight > 40) {
			setIntroductionLines(2);
		} else {
			setIntroductionLines(4);
		}
	}, [tagHeight]);

	const handleTagLayout = (event) => {
		const { height } = event.nativeEvent.layout;
		setTagHeight(height);
	};

	const handleCreateSingleChatroom = async () => {
		if (!profile.memberId) {
			return;
		}

		try {
			const chatroomInfo = await createChatroom(
				profile.memberId,
				profile.name,
				chatrooms,
			);
			navigation.navigate("ChatRoomPage", {
				chatroomInfo,
			});
		} catch (error) {
			Sentry.captureException(error);
		}
	};

	return (
		<View style={styles.rectangle}>
			<View pointerEvents="none" style={styles.homeCardLine}>
				<HomeCardLine style={styles.homeCardLineSvg} />
			</View>
			<View style={styles.homeProfile}>
				<HomeProfile fileId={profile.fileId} />
				<Text
					style={styles.userInfo}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					<Text style={styles.textName}>{profile.username}</Text> |{" "}
					{profile.country} | {formatAge(profile.birth)}
				</Text>
				<View style={styles.tagContainer} onLayout={handleTagLayout}>
					<Tag
						tag={profile.tags}
						style={{ height: 22 }}
						textStyle={{ color: CustomTheme.primaryPressed }}
						maxPerRow={3}
					/>
				</View>
				<Text
					style={styles.introduction}
					numberOfLines={introductionLines}
					ellipsizeMode="tail"
				>
					{profile.bio}
				</Text>
			</View>
			<View style={styles.connectIconContainer}>
				<View style={styles.iconSlot}>
					<TouchableOpacity
						style={styles.iconTouchable}
						onPress={isLikedOnPress}
					>
						<IconHeart24
							style={styles.connectIcon}
							active={isLikedActive}
						/>
					</TouchableOpacity>
				</View>
				<HomeLine style={styles.connectIcon} />
				<View style={styles.iconSlot}>
					<TouchableOpacity
						style={styles.iconTouchable}
						onPress={onPress}
					>
						<IconAddFriend24
							style={styles.connectIcon}
							active="true"
						/>
					</TouchableOpacity>
				</View>
				<HomeLine style={styles.connectIcon} />
				<View style={styles.iconSlot}>
					<TouchableOpacity
						style={styles.iconTouchable}
						onPress={handleCreateSingleChatroom}
					>
						<IconChat24 style={styles.connectIcon} active="true" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	homeCardLine: {
		position: "absolute",
		top: 34,
		left: 0,
		width: "100%",
		height: 77,
		overflow: "hidden",
	},
	homeCardLineSvg: {
		marginLeft: "-24%",
	},
	homeProfile: {
		position: "absolute",
		left: 20,
		right: 20,
		top: 16,
	},
	tagContainer: {
		width: "100%",
		marginTop: 10,
	},
	introduction: {
		...fontBody14,
		width: "100%",
		marginTop: 10,
	},
	textName: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: "#141D45",
	},
	userInfo: {
		...fontBody16,
		color: "#141D45",
		marginTop: 7,
	},
	connectIconContainer: {
		position: "absolute",
		bottom: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	iconSlot: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	iconTouchable: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	connectIcon: {
		marginHorizontal: 0,
	},
});

export default HomeCardFront;
