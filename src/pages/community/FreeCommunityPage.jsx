import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	Keyboard,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import FreeCommunityStyles from "@pages/community/FreeCommunityStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getPostsByType, getFreeCommunitySearch } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ConnectTop from "@components/connect/ConnectTop";
import IconPostPlus from "@components/community/IconPostPlus";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import ItemCommunity from "@components/community/ItemCommunity";
import ArrowRight from "@components/common/ArrowRight";
import IconSearchFail from "@components/common/IconSearchFail";

const FreeCommunityPage = () => {
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
			const response = await getFreeCommunitySearch(searchTerm);
			setSearchData(response.data);
		} catch (error) {
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
			const freeCommunity = async () => {
				try {
					const response = await getPostsByType("FREE");
					const presignUrl = await communityPresignUrl(response.data);
					setPostList(presignUrl);
				} catch (error) {
					console.error(
						"게시글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			freeCommunity();
		}, []),
	);

	return (
		<View style={FreeCommunityStyles.container}>
			<View style={FreeCommunityStyles.backgroundBlue} />
			<TouchableOpacity
				style={FreeCommunityStyles.iconPostPlus}
				onPress={() =>
					navigation.navigate("WritePage", {
						noticeboard: "자유게시판",
					})
				}
			>
				<IconPostPlus />
			</TouchableOpacity>
			<SafeAreaView style={FreeCommunityStyles.safeAreaView}>
				<View style={FreeCommunityStyles.connectTop}>
					<ConnectTop />
				</View>
				<View style={FreeCommunityStyles.containerTextIcon}>
					<TouchableOpacity
						style={FreeCommunityStyles.iconArrowRight}
						onPress={handleGoBack}
					>
						<ArrowRight color={CustomTheme.bgBasic} />
					</TouchableOpacity>
					<Text style={FreeCommunityStyles.textChattingTitle}>
						자유게시판
					</Text>
					<IconBookmark style={FreeCommunityStyles.iconBookmark} />
				</View>
				<View style={FreeCommunityStyles.containerSearch}>
					<View style={FreeCommunityStyles.containerSearchIcon}>
						<TextInput
							style={[
								FreeCommunityStyles.search,
								(searchFail ||
									(searchData && searchData.length > 0)) && {
									paddingLeft: 40,
								},
							]}
							placeholder="검색"
							value={searchTerm}
							onChangeText={setSearchTerm}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onSubmitEditing={handleSearch}
						/>
						{(searchFail ||
							(searchData && searchData.length > 0)) && (
							<TouchableOpacity
								style={FreeCommunityStyles.iconArrowRightSearch}
								onPress={handleSearchBack}
							>
								<ArrowRight color="#B0D0FF" />
							</TouchableOpacity>
						)}
						{isSearching ? (
							<ConnectSearchCancel
								style={FreeCommunityStyles.searchIcon}
								onPress={handleCancel}
							/>
						) : (
							<ConnectSearchIcon
								style={FreeCommunityStyles.searchIcon}
								onPress={handleSearch}
							/>
						)}
					</View>
				</View>

				<ScrollView>
					{searchFail ? (
						<View style={FreeCommunityStyles.containerFail}>
							<IconSearchFail />
							<Text style={FreeCommunityStyles.textFail}>
								일치하는 검색 결과가 없습니다
							</Text>
						</View>
					) : (
						<View style={FreeCommunityStyles.itemCommunity}>
							<ItemCommunity
								postList={
									searchData === null ? postList : searchData
								}
							/>
						</View>
					)}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default FreeCommunityPage;
