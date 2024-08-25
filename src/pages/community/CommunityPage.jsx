import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import CommunityStyles from "@pages/community/CommunityStyles";
import { getPostsByType, getCommunitySearch } from "config/api";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import IconBookmark from "@components/chat/IconBookmark";
import IconCommunityTitle from "@components/community/IconCommunityTitle";
import ArrowRight from "@components/common/ArrowRight";
import ItemCommunityPreview from "@components/community/ItemCommunityPreview";
import IconSearchFail from "@components/common/IconSearchFail";
import ItemCommunity from "@components/community/ItemCommunity";
import * as Sentry from "@sentry/react-native";

const CommunityPage = () => {
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
			const community = async () => {
				try {
					const responseTip = await getPostsByType("TIP");
					const responseFree = await getPostsByType("FREE");
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

			community();
		}, []),
	);

	return (
		<View style={CommunityStyles.container}>
			<ConnectTop style={CommunityStyles.connectTop} />
			<SafeAreaView style={CommunityStyles.safeAreaView}>
				<View style={CommunityStyles.containerTextIcon}>
					<Text style={CommunityStyles.textChattingTitle}>
						게시판
					</Text>
					<IconBookmark style={CommunityStyles.iconBookmark} />
				</View>
				<View style={CommunityStyles.containerSearch}>
					<View style={CommunityStyles.containerSearchIcon}>
						<TextInput
							style={[
								CommunityStyles.search,
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

				<View style={{ marginTop: 130 }}>
					{searchFail ? (
						<View style={CommunityStyles.containerFail}>
							<IconSearchFail />
							<Text style={CommunityStyles.textFail}>
								일치하는 검색 결과가 없습니다
							</Text>
						</View>
					) : searchData && searchData.length > 0 ? (
						<View style={CommunityStyles.itemCommunity}>
							<ItemCommunity postList={searchData} />
						</View>
					) : (
						<>
							<View style={CommunityStyles.containerCommunityTop}>
								<View style={CommunityStyles.containerTitle}>
									<IconCommunityTitle
										style={CommunityStyles.iconCommunity}
									/>
									<Text
										style={
											CommunityStyles.textCommunityTitle
										}
									>
										꿀팁게시판
									</Text>
								</View>
								<TouchableOpacity
									style={CommunityStyles.containerMore}
									onPress={() =>
										navigation.navigate("TipCommunityPage")
									}
								>
									<Text
										style={
											CommunityStyles.textCommunityMore
										}
									>
										더보기
									</Text>
									<ArrowRight
										style={CommunityStyles.iconArrow}
									/>
								</TouchableOpacity>
							</View>
							<View style={CommunityStyles.itemCommunityPreview}>
								<ItemCommunityPreview postList={tipPostList} />
							</View>

							<View style={CommunityStyles.containerCommunityTop}>
								<View style={CommunityStyles.containerTitle}>
									<IconCommunityTitle
										style={CommunityStyles.iconCommunity}
									/>
									<Text
										style={
											CommunityStyles.textCommunityTitle
										}
									>
										자유게시판
									</Text>
								</View>
								<TouchableOpacity
									style={CommunityStyles.containerMore}
									onPress={() =>
										navigation.navigate("FreeCommunityPage")
									}
								>
									<Text
										style={
											CommunityStyles.textCommunityMore
										}
									>
										더보기
									</Text>
									<ArrowRight
										style={CommunityStyles.iconArrow}
									/>
								</TouchableOpacity>
							</View>
							<View style={CommunityStyles.itemCommunityPreview}>
								<ItemCommunityPreview postList={freePostList} />
							</View>
						</>
					)}
				</View>
			</SafeAreaView>
		</View>
	);
};

export default CommunityPage;
