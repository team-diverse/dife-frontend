import React, { useState, useEffect } from "react";
import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useTranslation } from "react-i18next";

import BlockListStyles from "@pages/member/BlockListStyles";
import { getBlockMember } from "config/api";

import TopBar from "@components/common/TopBar";
import IconBlockUser from "@components/member/IconBlockUser";
import ItemBlockList from "@components/member/ItemBlockList";

const BlockListPage = () => {
	const { t } = useTranslation();
	const [blackList, setBlackList] = useState([]);

	const getblockMemberList = async () => {
		try {
			const response = await getBlockMember();
			setBlackList(response.data);
		} catch (error) {
			console.error(
				"차단 목록 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getblockMemberList();
	}, [blackList]);

	const renderItem = ({ item }) => {
		return (
			<ItemBlockList
				blacklistedMemberId={item.blacklistedMemberId}
				date={item.modified}
			/>
		);
	};

	return (
		<SafeAreaView style={BlockListStyles.container}>
			<TopBar topBar={t("blockManagement")} color="#000" />
			<View style={BlockListStyles.containerFriendNumber}>
				<Text style={BlockListStyles.textFriend}>{t("blockList")}</Text>
				<IconBlockUser />
				<Text style={BlockListStyles.textNumber}>
					{blackList.length}
				</Text>
			</View>
			<FlatList
				style={BlockListStyles.flatlist}
				data={blackList}
				renderItem={renderItem}
				keyExtractor={(item, index) => index.toString()}
			/>
		</SafeAreaView>
	);
};

export default BlockListPage;
