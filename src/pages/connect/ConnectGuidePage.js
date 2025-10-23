import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	FlatList,
	Dimensions,
	Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ConnectStyles from "@pages/connect/ConnectStyles";
import { CustomTheme } from "@styles/CustomTheme";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectLikeUser from "@components/connect/ConnectLikeUser";
import FilterIcon from "@components/connect/FilterIcon";
import ConnectDife from "@components/connect/ConnectDife";
import ConnectReset from "@components/connect/ConnectReset";
import ConnectCard from "@components/connect/ConnectCard";
import ChatRoomStyles from "@pages/chat/ChatRoomStyles";
import IconGuideChatBubble from "@components/common/IconGuideChatBubble";
import ChatDf24 from "@components/Icon24/ChatDf24";
import ConnectAc32 from "@components/Icon32/ConnectAc32";
import HomeDf24 from "@components/Icon24/HomeDf24";
import CommuDf24 from "@components/Icon24/CommuDf24";
import MyDf24 from "@components/Icon24/MyDf24";
import IconHeart24 from "@components/Icon24/IconHeart24";
import ConnectPlusIcon from "@components/connect/ConnectPlusIcon";

const TabBarUI = () => {
	const { bottom } = useSafeAreaInsets();
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
				backgroundColor: "#fff",
				borderTopWidth: 1,
				borderTopColor: CustomTheme.bgList,
				height: Platform.OS === "android" ? 64 : 84 - bottom,
			}}
		>
			<ChatDf24 />
			<ConnectAc32 />
			<HomeDf24 />
			<CommuDf24 />
			<MyDf24 />
		</View>
	);
};

const ConnectGuidePage = ({ closeModal }) => {
	const { t } = useTranslation();
	const { top } = useSafeAreaInsets();

	const [likeUserPosition, setLikeUserPosition] = useState({ x: 0, y: 0 });
	const [likePosition, setLikePosition] = useState({ x: 0, y: 0 });

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	const connectData = [
		{
			bio: "안녕하세요, 저는 프랑스에서 온 에이미입니다, 산업디자인을 전공하고 있습니다. 언제든지 채팅 주세요!! 😀",
			country: "프랑스",
			id: "ex1",
			isLiked: true,
			major: "산업디자인",
			profileImg: null,
			tags: ["ENFP", "스포츠", "드로잉"],
			username: "Amy",
		},
		{
			bio: "안녕하세요, 저는 프랑스에서 온 에이미입니다, 산업디자인을 전공하고 있습니다. 언제든지 채팅 주세요!! 😀",
			country: "프랑스",
			id: "ex2",
			isLiked: false,
			major: "산업디자인",
			profileImg: null,
			tags: ["ENFP", "스포츠", "드로잉"],
			username: "Amy",
		},
		{
			bio: "안녕하세요, 저는 프랑스에서 온 에이미입니다, 산업디자인을 전공하고 있습니다. 언제든지 채팅 주세요!! 😀",
			country: "프랑스",
			id: "ex3",
			isLiked: false,
			major: "산업디자인",
			profileImg: null,
			tags: ["ENFP", "스포츠", "드로잉"],
			username: "Amy",
		},
	];

	const handleLayoutLikeUser = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;
		setLikeUserPosition({ x, y, width, height });
	};

	const handleLayoutLike = (event) => {
		const { x, y, width, height } = event.nativeEvent.layout;
		setLikePosition({ x, y, width, height });
	};

	return (
		<SafeAreaView style={ConnectStyles.container}>
			<View style={ConnectStyles.backgroundBlue} />

			<View style={ConnectStyles.connectTop}>
				<ConnectTop />
			</View>

			<View
				style={[
					ConnectStyles.textIconContainer,
					isSmallScreen && { top: -25 },
					{ zIndex: 15 },
				]}
			>
				<Text
					style={[
						ConnectStyles.connectTitle,
						{ color: "#9da4c4", zIndex: -1 },
					]}
				>
					{t("connectTitle")}
				</Text>
				<ConnectLikeUser
					style={ConnectStyles.addUserIcon}
					onLayout={handleLayoutLikeUser}
				/>
			</View>
			<View
				style={[
					ConnectStyles.searchContainer,
					isSmallScreen && { top: -25 },
				]}
			>
				<View>
					<FilterIcon style={ConnectStyles.searchFilter} />
				</View>

				<View style={ConnectStyles.searchIconContainer}>
					<TextInput
						style={ConnectStyles.search}
						placeholder={t("searchPlaceholder")}
					/>
				</View>
			</View>

			<View style={ConnectStyles.containerDife}>
				<View style={ConnectStyles.connectDife}>
					<ConnectDife />
				</View>
			</View>
			<View style={ConnectStyles.midContainer}>
				<View style={ConnectStyles.resetAndTimerContainer}>
					<View style={ConnectStyles.resetContainer}>
						<Text style={ConnectStyles.textReset}>Refresh</Text>
						<ConnectReset />
					</View>
				</View>
			</View>

			<View style={ConnectStyles.cardContainer}>
				<View style={ConnectStyles.flatlist}>
					<FlatList
						contentContainerStyle={[
							ConnectStyles.flatlistContent,
							{ minHeight: "100%" },
						]}
						data={connectData}
						renderItem={({ item }) => (
							<View onLayout={handleLayoutLike}>
								<ConnectCard
									{...item}
									tags={item.tags}
									fileId={item.profileImg?.id}
								/>
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
			</View>

			<TabBarUI />

			<View
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					backgroundColor: "#0D237250",
					zIndex: 10,
				}}
			/>
			<View
				style={{
					position: "absolute",
					top:
						Platform.OS == "android"
							? likeUserPosition.y + 7
							: likeUserPosition.y + top,
					left: likeUserPosition.x - 151,
					zIndex: 10,
				}}
			>
				<IconGuideChatBubble version={3} />
				<Text
					style={[
						ChatRoomStyles.iconGuideChatBubble,
						{ top: 11, left: Platform.OS == "android" ? 5 : 10 },
					]}
				>
					{t("savedProfileStorage")}
				</Text>
			</View>

			<View
				style={{
					position: "absolute",
					top:
						likePosition?.height &&
						(Platform.OS == "android"
							? likePosition.height - 60
							: likePosition.height - 5),
					left: likePosition?.width && likePosition.width - 155,
					zIndex: 10,
				}}
			>
				<IconGuideChatBubble version={4} />
				<Text
					style={[
						ChatRoomStyles.iconGuideChatBubble,
						{ top: 11, left: Platform.OS == "android" ? 4 : 9 },
					]}
				>
					{t("saveProfileInstruction")}
				</Text>
			</View>
			<IconHeart24
				active={true}
				style={{
					position: "absolute",
					top:
						likePosition?.height &&
						(Platform.OS == "android"
							? likePosition.height + 12
							: likePosition.height + 65),
					left: likePosition?.width && likePosition.width - 38,
					zIndex: 10,
				}}
			/>

			<View
				style={{
					position: "absolute",
					top:
						likePosition?.height &&
						(Platform.OS == "android"
							? likePosition.height + 140
							: likePosition.height * 2 - 5),
					left: likePosition?.width && likePosition.width - 155,
					zIndex: 10,
				}}
			>
				<IconGuideChatBubble version={5} />
				<Text
					style={[
						ChatRoomStyles.iconGuideChatBubble,
						{ top: 11, left: Platform.OS == "android" ? 4 : 9 },
					]}
				>
					{t("viewDetailsInstruction")}
				</Text>
				<ConnectPlusIcon
					active={true}
					style={{
						position: "absolute",
						top:
							likePosition?.height &&
							(Platform.OS == "android" ? 72 : 73),
						left: likePosition?.width && 150,
						zIndex: 10,
					}}
				/>
			</View>

			<TouchableOpacity
				style={[ChatRoomStyles.containerCheck, { zIndex: 10 }]}
				onPress={() => closeModal()}
			>
				<Text style={ChatRoomStyles.textCheck}>{t("guideCheck")}</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default ConnectGuidePage;
