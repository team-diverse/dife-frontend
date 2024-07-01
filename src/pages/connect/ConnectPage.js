import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  FlatList,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import ConnectStyles from "@pages/connect/ConnectStyles";
import { getRandomMembersByCount } from "config/api";

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

const ConnectPage = () => {
  const navigation = useNavigation();

  const [profileDataList, setProfileDataList] = useState([]);
  const RANDOM_MEMBER_COUNT = 10;

  useEffect(async () => {
    try {
      const response = await getRandomMembersByCount(RANDOM_MEMBER_COUNT);

      function cleanHobbies(hobbies) {
        return hobbies.map((hobby) => hobby.replace(/[\[\]"]/g, ""));
      }
      const updatedData = response.data.map((data) => {
        if (data.mbti !== null) {
          const cleanedHobbies = cleanHobbies(data.hobbies);
          const tags = [data.mbti, ...cleanedHobbies];
          return { ...data, tags };
        }
        return data;
      });
      setProfileDataList(updatedData);
    } catch (error) {
      console.error(
        "커넥트 카드 조회 오류:",
        error.response ? error.response.data : error.message
      );
    }
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [isIndividualTab, setIsIndividualTab] = useState(false);

  const pressButton = () => {
    setModalVisible(true);
  };

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
    setIsIndividualTab(false);
  };

  const handleMoveGroup = () => {
    setIsIndividualTab(true);
  };

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
            onPress={() => navigation.navigate("ConnectLikeUserPage")}
          />
        </View>
        <View style={ConnectStyles.searchContainer}>
          <TouchableOpacity onPress={pressButton}>
            <FilterIcon style={ConnectStyles.searchFilter} />
          </TouchableOpacity>
          <FilterBottomSlide
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
          <View style={ConnectStyles.searchIconContainer}>
            <TextInput
              style={ConnectStyles.search}
              placeholder="검색"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
                isIndividualTab
                  ? ConnectStyles.textTab
                  : ConnectStyles.textActiveTab
              }
              onPress={handleMoveOnetoone}
            >
              1 : 1
            </Text>
            <Text
              style={
                isIndividualTab
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

        {isIndividualTab ? (
          <></>
        ) : (
          <View style={ConnectStyles.cardContainer}>
            <View style={ConnectStyles.flatlist}>
              <FlatList
                contentContainerStyle={ConnectStyles.flatlistContent}
                data={profileDataList}
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
