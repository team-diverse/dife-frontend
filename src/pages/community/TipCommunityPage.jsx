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
			console.error(
				"커넥트 검색 오류:",
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

	useFocusEffect(
		useCallback(() => {
			const tipCommunity = async () => {
				try {
					const response = await getPostsByType("TIP");
					const presignUrl = await communityPresignUrl(response.data);
					setPostList(presignUrl);
				} catch (error) {
					console.error(
						"게시글 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			tipCommunity();
		}, []),
	);

	return (
		<View style={TipCommunityStyles.container}>
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
			<SafeAreaView style={TipCommunityStyles.safeAreaView}>
				<View style={TipCommunityStyles.connectTop}>
					<ConnectTop />
				</View>
				<View style={TipCommunityStyles.containerTextIcon}>
					<TouchableOpacity
						style={TipCommunityStyles.iconArrowRight}
						onPress={handleGoBack}
					>
						<ArrowRight color={CustomTheme.bgBasic} />
					</TouchableOpacity>
					<Text style={TipCommunityStyles.textChattingTitle}>
						꿀팁게시판
					</Text>
					<IconBookmark style={TipCommunityStyles.iconBookmark} />
				</View>
				<View style={TipCommunityStyles.containerSearch}>
					<View style={TipCommunityStyles.containerSearchIcon}>
						<TextInput
							style={TipCommunityStyles.search}
							placeholder="검색"
							value={searchTerm}
							onChangeText={setSearchTerm}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onSubmitEditing={handleSearch}
						/>
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
								일치하는 검색 결과가 없습니다
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
		</View>
	);
};

export default TipCommunityPage;
