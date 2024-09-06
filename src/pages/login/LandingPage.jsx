import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	FlatList,
	TouchableOpacity,
	Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import LandingStyles from "@pages/login/LandingStyles";

import IconProgress1 from "@components/landing/IconProgress1";
import IconProgress2 from "@components/landing/IconProgress2";
import IconProgress3 from "@components/landing/IconProgress3";
import IconLandingChat from "@components/landing/IconLandingChat";
import IconLandingCommunity from "@components/landing/IconLandingCommunity";
import IconLandingConnect from "@components/landing/IconLandingConnect";

const LandingPage = () => {
	const navigation = useNavigation();

	const [currentIndex, setCurrentIndex] = useState(0);

	const screenWidth = Dimensions.get("window").width;

	const pages = [
		{
			id: "1",
			title: "커넥트",
			content:
				"세계 각국의 친구들과 연결\n다양한 문화를 나누고 함께 성장",
			image: require("src/assets/images/landing/landing_connect.png"),
		},
		{
			id: "2",
			title: "채팅",
			content: "번역기능으로 한계없는 소통\n언어공부를 동시에",
			image: require("src/assets/images/landing/landing_chat.png"),
		},
		{
			id: "3",
			title: "게시판",
			content: "타지 생활에 필요한 정보를 공유\n",
			image: require("src/assets/images/landing/landing_community.png"),
		},
	];

	const onViewableItemsChanged = useCallback(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setCurrentIndex(viewableItems[0].index);
		}
	}, []);

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	const progress = {
		0: <IconProgress1 />,
		1: <IconProgress2 />,
		2: <IconProgress3 />,
	};

	const icon = {
		0: <IconLandingConnect />,
		1: <IconLandingChat />,
		2: <IconLandingCommunity />,
	};

	const renderItem = ({ item }) => (
		<View
			style={[
				LandingStyles.container,
				{ width: screenWidth, height: "100%" },
			]}
		>
			<View style={LandingStyles.containerTextIcon}>
				<View>
					<Text style={LandingStyles.textTitle}>{item.title}</Text>
					<Text style={LandingStyles.textContent}>
						{item.content}
					</Text>
				</View>
				{icon[currentIndex]}
			</View>
			<View style={[LandingStyles.center, { bottom: -85 }]}>
				<Image source={item.image} resizeMode="cover" />
				<LinearGradient
					colors={[
						"rgba(255, 255, 255, 1)",
						"rgba(255, 255, 255, 0)",
					]}
					style={LandingStyles.gradient}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0.5 }}
				/>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={LandingStyles.container}>
			<View style={LandingStyles.center}>{progress[currentIndex]}</View>

			<FlatList
				data={pages}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
			/>

			<View style={LandingStyles.center}>
				<TouchableOpacity
					style={[
						LandingStyles.apply,
						currentIndex !== pages.length - 1 &&
							LandingStyles.disabled,
					]}
					onPress={() => navigation.navigate("Login")}
					disabled={currentIndex !== pages.length - 1}
				>
					<Text style={LandingStyles.textButton}>
						{"Dife 시작하기"}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default LandingPage;
