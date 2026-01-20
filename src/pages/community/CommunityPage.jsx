import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	Keyboard,
	TouchableOpacity,
	ScrollView,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import TextInput from "@components/common/TextInput";

import CommunityStyles from "@pages/community/CommunityStyles";
import ConnectStyles from "@pages/connect/ConnectStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getPosts, getCommunitySearch } from "config/api";
import { useStatusBar } from "util/useStatusBar";
import { communityPresignUrl } from "util/communityPresignUrl";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";
import ItemCommunity from "@components/community/ItemCommunity";
import FilterIcon from "@components/connect/FilterIcon";
import TopicBottomSlide from "@components/community/TopicBottomSlide";
import IconCircleNumber from "@components/community/IconCircleNumber";
import IconPostPlus from "@components/community/IconPostPlus";

const CommunityPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [postList, setPostList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);

	useStatusBar({
		color: CustomTheme.primaryMedium,
		barStyle: "light-content",
	});

	const pressButton = () => {
		setModalVisible(true);
	};

	const handleSearch = async () => {
		try {
			const response = await getCommunitySearch(searchTerm);
			setSearchData(response.data);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커뮤니티 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			setSearchFail(true);
		}
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

	const handleFilterResponse = (response) => {
		setSearchData(response);
	};

	const handleFilterSearchFail = (response) => {
		setSearchFail(response);
	};

	const [totalSelection, setTotalSelection] = useState(null);

	const handleTotalSelection = (response) => {
		setTotalSelection(response);
	};

	const [isReset, setIsReset] = useState(false);

	const handleReset = () => {
		setTotalSelection(null);
		setIsReset(!isReset);
	};

	const handleSearchBack = () => {
		setSearchFail(false);
		setSearchData(null);
		setSearchTerm(null);
		handleReset();
	};

	useFocusEffect(
		useCallback(() => {
			const freeCommunity = async () => {
				try {
					const response = await getPosts("");
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

			freeCommunity();
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
				<View style={CommunityStyles.itemCommunity}>
					<ItemCommunity
						postList={searchData === null ? postList : searchData}
					/>
				</View>
			</>
		);
	};

	return (
		<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
			<SafeAreaView style={CommunityStyles.container}>
				<View style={CommunityStyles.backgroundBlue} />
				<TouchableOpacity
					style={CommunityStyles.iconPostPlus}
					onPress={() => navigation.navigate("WritePage")}
				>
					<IconPostPlus />
				</TouchableOpacity>
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
					<TouchableOpacity onPress={pressButton}>
						<FilterIcon style={CommunityStyles.iconSearchFilter} />
						{totalSelection > 0 && (
							<View style={ConnectStyles.containerImageNumber}>
								<IconCircleNumber
									style={ConnectStyles.iconCircleNumber}
									color={CustomTheme.bgBasic}
								/>
								<Text style={ConnectStyles.textImageNumber}>
									{totalSelection}
								</Text>
							</View>
						)}
					</TouchableOpacity>
					<TopicBottomSlide
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						onFilterResponse={handleFilterResponse}
						onSearchResponse={handleFilterSearchFail}
						onTotalSelection={handleTotalSelection}
						isReset={isReset}
					/>
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
					<ScrollView>{renderCommunity()}</ScrollView>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default CommunityPage;
