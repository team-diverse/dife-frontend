import React, { useState } from "react";
import {
	View,
	Text,
	FlatList,
	Keyboard,
	TouchableOpacity,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import TextInput from "@components/common/TextInput";

import ConnectStyles from "@pages/connect/ConnectStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { getConnectSearch } from "config/api";
import { formatProfileData } from "util/formatProfileData";

import ConnectCaution from "@components/connect/ConnectCaution";
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
import ArrowRight from "@components/common/ArrowRight";
import { useMatchQueue } from "context/MatchQueueContext";

const ConnectPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const showRefreshTimer = process.env.EXPO_PUBLIC_SHOW_REFRESH_TIMER;

	const {
		allProfiles,
		formattedTimeRemaining,
		fetchAndDistributeProfiles,
		likesById,
		toggleLike,
	} = useMatchQueue();

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
		setTotalSelection(null);
		setIsReset(!isReset);
		fetchAndDistributeProfiles();
	};

	const handleSearchBack = () => {
		setSearchFail(false);
		setSearchData(null);
		setSearchTerm(null);
		handleReset();
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={ConnectStyles.container}>
			<View style={ConnectStyles.backgroundBlue} />

			<View style={ConnectStyles.connectTop}>
				<ConnectTop />
			</View>

			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View
					style={[
						ConnectStyles.textIconContainer,
						isSmallScreen && { top: -25 },
					]}
				>
					<Text style={ConnectStyles.connectTitle}>
						{t("connectTitle")}
					</Text>
					<ConnectLikeUser
						style={ConnectStyles.addUserIcon}
						onPress={() => navigation.navigate("LikeUserOneToOne")}
					/>
				</View>
			</TouchableWithoutFeedback>
			<View
				style={[
					ConnectStyles.searchContainer,
					isSmallScreen && { top: -25 },
				]}
			>
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
						style={[
							ConnectStyles.search,
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
							style={ConnectStyles.iconArrowRightSearch}
							onPress={handleSearchBack}
						>
							<ArrowRight color="#B0D0FF" />
						</TouchableOpacity>
					)}
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
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={ConnectStyles.midContainer}>
					<View style={ConnectStyles.resetAndTimerContainer}>
						{showRefreshTimer && (
							<View style={ConnectStyles.timerContainer}>
								<Text style={ConnectStyles.timerText}>
									{formattedTimeRemaining}
								</Text>
							</View>
						)}

						<TouchableOpacity
							style={ConnectStyles.resetContainer}
							onPress={handleReset}
						>
							<Text style={ConnectStyles.textReset}>Refresh</Text>
							<ConnectReset />
						</TouchableOpacity>
					</View>
					<ConnectCaution text={t("connectCaution")} />
				</View>
			</TouchableWithoutFeedback>

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
							scrollEnabled={true}
							keyboardShouldPersistTaps="handled"
							contentContainerStyle={[
								ConnectStyles.flatlistContent,
								{ minHeight: "100%" },
							]}
							data={
								searchData === null ? allProfiles : searchData
							}
							renderItem={({ item }) => (
								<ConnectCard
									{...item}
									tags={item.tags}
									fileId={item.profileImg?.id}
									isLiked={
										likesById[item.id] !== undefined
											? likesById[item.id]
											: item.isLiked
									}
									onToggleLike={toggleLike}
									isSmallScreen={isSmallScreen}
								/>
							)}
							keyExtractor={(item) => item.id}
						/>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
};

export default ConnectPage;
