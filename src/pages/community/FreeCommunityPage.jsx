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
import axios from "axios";

import FreeCommunityStyles from "@pages/community/FreeCommunityStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getPostsByType } from "config/api";
import { communityPresignUrl } from "util/communityPresignUrl";

import ConnectTop from "@components/connect/ConnectTop";
import IconPostPlus from "@components/community/IconPostPlus";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import ItemCommunity from "@components/community/ItemCommunity";
import ArrowRight from "@components/common/ArrowRight";

const FreeCommunityPage = () => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const [searchTerm, setSearchTerm] = useState("");
	const [, setSearchData] = useState([]);
	const [isSearching, setIsSearching] = useState(false);

	const handleSearch = () => {
		if (searchTerm.trim() !== "") {
			axios
				.get(`${searchTerm}`)
				.then((response) => {
					setSearchData(response.data);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
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

	const [postList, setPostList] = useState([]);

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
					<View style={FreeCommunityStyles.itemCommunity}>
						<ItemCommunity postList={postList} />
					</View>
				</ScrollView>
			</SafeAreaView>
		</View>
	);
};

export default FreeCommunityPage;
