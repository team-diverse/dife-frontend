import React, { useState, useCallback, useEffect } from "react";
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

import ConnectStyles from "@pages/connect/ConnectStyles";
import {
	getRandomMembersByCount,
	getConnectSearch,
	getGroups,
} from "config/api";
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
import GroupFilterBottomSlide from "@components/connect/GroupFilterBottomSlide";
import IconNewGroup from "@components/connect/IconNewGroup";
import ModalGroupCreationComplete from "@components/connect/ModalGroupCreationComplete";

const ConnectPage = ({ route }) => {
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
			console.error(
				"커넥트 카드 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			if (!isGroupTab) {
				cardProfiles();
			}
		}, [isGroupTab]),
	);
	const [searchTerm, setSearchTerm] = useState("");
	const [searchData, setSearchData] = useState(null);
	const [searchFail, setSearchFail] = useState(false);
	const [isSearching, setIsSearching] = useState(false);

	const [modalVisible, setModalVisible] = useState(false);
	const [groupModalVisible, setGroupModalVisible] = useState(false);

	const [isGroupTab, setIsGroupTab] = useState(false);

	const pressButton = () => {
		if (isGroupTab) {
			setGroupModalVisible(true);
		} else {
			setModalVisible(true);
		}
	};

	const handleSearch = async () => {
		try {
			const response = await getConnectSearch(searchTerm);
			const updatedData = formatProfileData(response.data);
			setSearchData(updatedData);
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

	const handleMoveOnetoone = () => {
		setIsGroupTab(false);
	};

	const handleMoveGroup = () => {
		setIsGroupTab(true);
	};

	const handleFilterResponse = (response) => {
		const updatedData = formatProfileData(response);
		setSearchData(updatedData);
	};

	const handleFilterSearchFail = (response) => {
		setSearchFail(response);
	};

	const { groupId, modalGroup } = route.params || {};
	const [modalGroupVisible, setModalGroupVisible] = useState();

	useEffect(() => {
		if (modalGroup) {
			setModalGroupVisible(true);
		} else {
			setModalGroupVisible(false);
		}
	}, [groupId]);

	const [grouplist, setGroupList] = useState();

	const getGroupList = async () => {
		try {
			const response = await getGroups();
			setGroupList(response.data);
		} catch (error) {
			console.error(
				"전체 그룹 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			if (isGroupTab) {
				getGroupList();
			}
		}, [isGroupTab]),
	);

	return (
		<View style={ConnectStyles.container}>
			<View style={ConnectStyles.backgroundBlue} />
			<SafeAreaView style={ConnectStyles.safeAreaView}>
				<View style={ConnectStyles.connectTop}>
					<ConnectTop />
				</View>
				<View style={ConnectStyles.textIconContainer}>
					<Text style={ConnectStyles.connectTitle}>Connect</Text>
					<ConnectLikeUser
						style={ConnectStyles.addUserIcon}
						onPress={() =>
							navigation.navigate("ConnectLikeUserPage")
						}
					/>
				</View>
				<View style={ConnectStyles.searchContainer}>
					<TouchableOpacity onPress={pressButton}>
						<FilterIcon style={ConnectStyles.searchFilter} />
					</TouchableOpacity>
					<FilterBottomSlide
						modalVisible={modalVisible}
						setModalVisible={setModalVisible}
						onFilterResponse={handleFilterResponse}
						onSearchResponse={handleFilterSearchFail}
					/>
					<GroupFilterBottomSlide
						modalVisible={groupModalVisible}
						setModalVisible={setGroupModalVisible}
					/>
					<View style={ConnectStyles.searchIconContainer}>
						<TextInput
							style={ConnectStyles.search}
							placeholder="검색"
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
					<View style={ConnectStyles.tabContainer}>
						<Text
							style={
								isGroupTab
									? ConnectStyles.textTab
									: ConnectStyles.textActiveTab
							}
							onPress={handleMoveOnetoone}
						>
							1 : 1
						</Text>
						<Text
							style={
								isGroupTab
									? ConnectStyles.textActiveTab
									: ConnectStyles.textTab
							}
							onPress={handleMoveGroup}
						>
							그룹
						</Text>
					</View>
					<TouchableOpacity
						style={ConnectStyles.resetContainer}
						onPress={cardProfiles}
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
				) : isGroupTab ? (
					<View style={ConnectStyles.cardContainer}>
						<TouchableOpacity
							style={ConnectStyles.iconNewGroup}
							onPress={() =>
								navigation.navigate("GroupCreatedPage")
							}
						>
							<IconNewGroup />
						</TouchableOpacity>
						<View style={ConnectStyles.flatlist}>
							<FlatList
								contentContainerStyle={
									ConnectStyles.flatlistContent
								}
								data={grouplist}
								renderItem={({ item }) => (
									<ConnectCard
										{...item}
										groupName={item.name}
										tags={item.tags}
									/>
								)}
								keyExtractor={(item) => item.id}
							/>
						</View>
						<ModalGroupCreationComplete
							groupId={groupId}
							modalVisible={modalGroupVisible}
							setModalVisible={setModalGroupVisible}
						/>
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
