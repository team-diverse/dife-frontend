import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	Keyboard,
	TouchableOpacity,
	ScrollView,
	Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import TipCommunityStyles from "@pages/community/TipCommunityStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getPostsByType, getTipCommunitySearch } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ConnectTop from "@components/connect/ConnectTop";
import IconPostPlus from "@components/community/IconPostPlus";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import ItemCommunity from "@components/community/ItemCommunity";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";
import * as Sentry from "@sentry/react-native";

const TipCommunityPage = () => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const [postList, setPostList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = async () => {
		try {
			const response = await getTipCommunitySearch(searchTerm);
			setSearchData(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			setSearchFail(true);
		}
	};

	const handleSearchBack = () => {
		setSearchFail(false);
		setSearchData(null);
		setSearchTerm(null);
	};

	const handleFocus = () => {
		setIsSearching(true);
	};

	const handleBlur = () => {
		setIsSearching(false);
	};

	const handleCancel = () => {
		setSearchTerm("");
		setIsSearching(false);
		Keyboard.dismiss();
	};

	useFocusEffect(
		useCallback(() => {
			const tipCommunity = async () => {
				try {
					const response = await getPostsByType("TIP");
					const presignUrl = await communityPresignUrl(response.data);
					setPostList(presignUrl);
				} catch (error) {
					Sentry.captureException(error);
					console.error(
						"게시글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			tipCommunity();
		}, []),
	);

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={TipCommunityStyles.container}>
			<View style={TipCommunityStyles.backgroundBlue} />
			<TouchableOpacity
				style={TipCommunityStyles.iconPostPlus}
				onPress={() =>
					navigation.navigate("WritePage", {
						noticeboard: "꿀팁게시판",
					})
				}
			>
				<IconPostPlus />
			</TouchableOpacity>
			<View style={TipCommunityStyles.connectTop}>
				<ConnectTop />
			</View>
			<View
				style={[
					TipCommunityStyles.containerTextIcon,
					isSmallScreen && { top: -25 },
				]}
			>
				<TouchableOpacity
					style={TipCommunityStyles.iconArrowRight}
					onPress={handleGoBack}
				>
					<ArrowRight color={CustomTheme.bgBasic} />
				</TouchableOpacity>
				<Text style={TipCommunityStyles.textChattingTitle}>
					{t("tipsBoard")}
				</Text>
				<IconBookmark style={TipCommunityStyles.iconBookmark} />
			</View>
			<View style={TipCommunityStyles.containerSearch}>
				<View
					style={[
						TipCommunityStyles.containerSearchIcon,
						isSmallScreen && { top: -25 },
					]}
				>
					<TextInput
						style={[
							TipCommunityStyles.search,
							(searchFail ||
								(searchData && searchData.length > 0)) && {
								paddingLeft: 40,
							},
						]}
						placeholder={t("searchPlaceholder")}
						value={searchTerm}
						onChangeText={setSearchTerm}
						onFocus={handleFocus}
						onBlur={handleBlur}
						onSubmitEditing={handleSearch}
					/>
					{(searchFail || (searchData && searchData.length > 0)) && (
						<TouchableOpacity
							style={TipCommunityStyles.iconArrowRightSearch}
							onPress={handleSearchBack}
						>
							<ArrowRight color="#B0D0FF" />
						</TouchableOpacity>
					)}
					{isSearching ? (
						<ConnectSearchCancel
							style={TipCommunityStyles.searchIcon}
							onPress={handleCancel}
						/>
					) : (
						<ConnectSearchIcon
							style={TipCommunityStyles.searchIcon}
							onPress={handleSearch}
						/>
					)}
				</View>
			</View>

			<ScrollView>
				{searchFail ? (
					<View style={TipCommunityStyles.containerFail}>
						<IconSearchFail />
						<Text style={TipCommunityStyles.textFail}>
							{t("searchNoResults")}
						</Text>
					</View>
				) : (
					<View style={TipCommunityStyles.itemCommunity}>
						<ItemCommunity
							postList={
								searchData === null ? postList : searchData
							}
						/>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default TipCommunityPage;
