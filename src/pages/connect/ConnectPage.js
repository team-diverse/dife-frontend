import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	TextInput,
	SafeAreaView,
	FlatList,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ConnectStyles from "@pages/connect/ConnectStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getRandomMembersByCount, getConnectSearch } from "config/api";
import { formatProfileData } from "util/formatProfileData";

import ConnectTop from "@components/connect/ConnectTop";
import ConnectSearchIcon from "@components/connect/ConnectSearchIcon";
import ConnectSearchCancel from "@components/connect/ConnectSearchCancel";
import ConnectLikeUser from "@components/connect/ConnectLikeUser";
import FilterIcon from "@components/connect/FilterIcon";
import FilterBottomSlide from "@components/connect/FilterBottomSlide";
import ConnectCard from "@components/connect/ConnectCard";
import ConnectDife from "@components/connect/ConnectDife";
import ConnectReset from "@components/connect/ConnectReset";
import IconCircleNumber from "@components/community/IconCircleNumber";
import * as Sentry from "@sentry/react-native";

const ConnectPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [profileDataList, setProfileDataList] = useState([]);
	const RANDOM_MEMBER_COUNT = 10;

	const cardProfiles = async () => {
		try {
			const response = await getRandomMembersByCount(RANDOM_MEMBER_COUNT);
			const updatedData = formatProfileData(response.data);
			setProfileDataList(updatedData);
			setSearchData(null);
			setSearchTerm("");
			setSearchFail(false);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커넥트 카드 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			cardProfiles();
		}, []),
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);

	const pressButton = () => {
		setModalVisible(true);
	};

	const handleSearch = async () => {
		try {
			const response = await getConnectSearch(searchTerm);
			const updatedData = formatProfileData(response.data);
			setSearchData(updatedData);
		} catch (error) {
			Sentry.captureException(error);
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

	const handleFilterResponse = (response) => {
		const updatedData = formatProfileData(response);
		setSearchData(updatedData);
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
		cardProfiles();
		setTotalSelection(null);
		setIsReset(!isReset);
	};

	return (
		<View style={ConnectStyles.container}>
			<View style={ConnectStyles.backgroundBlue} />
			<SafeAreaView style={ConnectStyles.safeAreaView}>
				<View style={ConnectStyles.connectTop}>
					<ConnectTop />
				</View>
				<View style={ConnectStyles.textIconContainer}>
					<Text style={ConnectStyles.connectTitle}>
						{t("connectTitle")}
					</Text>
					<ConnectLikeUser
						style={ConnectStyles.addUserIcon}
						onPress={() => navigation.navigate("LikeUserOneToOne")}
					/>
				</View>
				<View style={ConnectStyles.searchContainer}>
					<TouchableOpacity onPress={pressButton}>
						<FilterIcon style={ConnectStyles.searchFilter} />
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
					<FilterBottomSlide
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						onFilterResponse={handleFilterResponse}
						onSearchResponse={handleFilterSearchFail}
						onTotalSelection={handleTotalSelection}
						isReset={isReset}
					/>
					<View style={ConnectStyles.searchIconContainer}>
						<TextInput
							style={ConnectStyles.search}
							placeholder={t("searchPlaceholder")}
							value={searchTerm}
							onChangeText={setSearchTerm}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onSubmitEditing={handleSearch}
						/>
						{isSearching ? (
							<ConnectSearchCancel
								style={ConnectStyles.searchIcon}
								onPress={handleCancel}
							/>
						) : (
							<ConnectSearchIcon
								style={ConnectStyles.searchIcon}
								onPress={handleSearch}
							/>
						)}
					</View>
				</View>

				<View style={ConnectStyles.containerDife}>
					<View style={ConnectStyles.connectDife}>
						<ConnectDife />
					</View>
				</View>
				<View style={ConnectStyles.midContainer}>
					<TouchableOpacity
						style={ConnectStyles.resetContainer}
						onPress={handleReset}
					>
						<Text style={ConnectStyles.textReset}>Reset</Text>
						<ConnectReset />
					</TouchableOpacity>
				</View>

				{searchFail ? (
					<View
						style={[
							ConnectStyles.cardContainer,
							{ marginHorizontal: 25 },
						]}
					>
						<ConnectCard fail="true" />
					</View>
				) : (
					<View style={ConnectStyles.cardContainer}>
						<View style={ConnectStyles.flatlist}>
							<FlatList
								contentContainerStyle={
									ConnectStyles.flatlistContent
								}
								data={
									searchData === null
										? profileDataList
										: searchData
								}
								renderItem={({ item }) => (
									<ConnectCard {...item} tags={item.tags} />
								)}
								keyExtractor={(item) => item.id}
							/>
						</View>
					</View>
				)}
			</SafeAreaView>
		</View>
	);
};

export default ConnectPage;
