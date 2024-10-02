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
	TouchableWithoutFeedback,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import CommunityStyles from "@pages/community/CommunityStyles";
import { getPostsByType, getCommunitySearch } from "config/api";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";
import ItemCommunity from "@components/community/ItemCommunity";
import CommunitySection from "./CommunitySection";

const CommunityPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [tipPostList, setTipPostList] = useState([]);
	const [freePostList, setFreePostList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = async () => {
		try {
			const response = await getCommunitySearch(searchTerm);
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
			const fetchPosts = async () => {
				try {
					const [responseTip, responseFree] = await Promise.all([
						getPostsByType("TIP"),
						getPostsByType("FREE"),
					]);
					setTipPostList(responseTip.data.slice(0, 3));
					setFreePostList(responseFree.data.slice(0, 3));
				} catch (error) {
					Sentry.captureException(error);
					console.error(
						"게시글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			fetchPosts();
		}, []),
	);

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	const renderCommunity = () => {
		if (searchFail) {
			return (
				<View style={CommunityStyles.containerFail}>
					<IconSearchFail />
					<Text style={CommunityStyles.textFail}>
						{t("searchNoResults")}
					</Text>
				</View>
			);
		}

		if (searchData && searchData.length > 0) {
			return (
				<View style={CommunityStyles.itemCommunity}>
					<ItemCommunity postList={searchData} />
				</View>
			);
		}

		return (
			<>
				<CommunitySection
					title="tipBoard"
					postList={tipPostList}
					onMorePress={() => navigation.navigate("TipCommunityPage")}
				/>
				<CommunitySection
					title="freeBoard"
					postList={freePostList}
					onMorePress={() => navigation.navigate("FreeCommunityPage")}
				/>
			</>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={CommunityStyles.container}>
				<View style={CommunityStyles.backgroundBlue} />
				<View style={CommunityStyles.connectTop}>
					<ConnectTop />
				</View>
				<View
					style={[
						CommunityStyles.containerTextIcon,
						isSmallScreen && { top: -25 },
					]}
				>
					<Text style={CommunityStyles.textChattingTitle}>
						{t("boardTitle")}
					</Text>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("BookmarkedPostPage")
						}
					>
						<IconBookmark style={CommunityStyles.iconBookmark} />
					</TouchableOpacity>
				</View>
				<View
					style={[
						CommunityStyles.containerSearch,
						isSmallScreen && { top: -25 },
					]}
				>
					<View style={CommunityStyles.containerSearchIcon}>
						<TextInput
							style={[
								CommunityStyles.search,
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
						{(searchFail ||
							(searchData && searchData.length > 0)) && (
							<TouchableOpacity
								style={CommunityStyles.iconArrowRightSearch}
								onPress={handleSearchBack}
							>
								<ArrowRight color="#B0D0FF" />
							</TouchableOpacity>
						)}
						{isSearching ? (
							<ConnectSearchCancel
								style={CommunityStyles.searchIcon}
								onPress={handleCancel}
							/>
						) : (
							<ConnectSearchIcon
								style={CommunityStyles.searchIcon}
								onPress={handleSearch}
							/>
						)}
					</View>
				</View>
				{isSmallScreen ? (
					<ScrollView
						contentContainerStyle={{
							flexGrow: 1,
							paddingBottom: 25,
						}}
					>
						{renderCommunity()}
					</ScrollView>
				) : (
					<>{renderCommunity()}</>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default CommunityPage;
