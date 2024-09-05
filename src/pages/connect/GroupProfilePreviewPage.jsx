import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import GroupProfilePreviewStyles from "@pages/connect/GroupProfilePreviewStyles";
import { useCreateGroup } from "src/states/CreateGroupDataContext.js";
import { createGroupChatroom } from "config/api";
import { formatProfileData } from "util/formatProfileData";
import i18n from "i18next";

import TopBar from "@components/common/TopBar";
import InfoCircle from "@components/common/InfoCircle";
import IconGroupHeadcount from "@components/connect/IconGroupHeadcount";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import BottomTwoButtons from "@components/common/BottomTwoButtons";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import Loading from "@components/common/loading/Loading";

const GroupProfilePreviewPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const { createGroupData } = useCreateGroup();

	const [groupProfile, setGroupProfile] = useState(null);

	useEffect(() => {
		const profile = formatProfileData([createGroupData]);
		setGroupProfile(profile[0]);
	}, []);

	const CategoryEnum = {
		COMMUNICATION: "COMMUNICATION",
		EXCHANGE: "EXCHANGE",
		FREE: "FREE",
	};

	const categoryStringToEnum = (stringValue) => {
		const enumMap = {
			[i18n.t("communication")]: CategoryEnum.COMMUNICATION,
			[i18n.t("exchange")]: CategoryEnum.EXCHANGE,
			[i18n.t("free")]: CategoryEnum.FREE,
		};
		return enumMap[stringValue] || null;
	};

	const handleCreateGroup = async () => {
		try {
			const purposesEnum =
				groupProfile.purposes.map(categoryStringToEnum);
			const response = await createGroupChatroom(
				groupProfile.profileImg,
				groupProfile.name,
				groupProfile.description,
				groupProfile.hobbies,
				groupProfile.maxCount,
				purposesEnum,
				groupProfile.languages,
				groupProfile.isPublic,
				groupProfile.groupPassword,
			);
			navigation.navigate("ConnectPage", {
				groupId: response.data.id,
				modalGroup: true,
			});
		} catch (error) {
			console.error(
				"그룹 채팅방 생성 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	if (!groupProfile) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={GroupProfilePreviewStyles.container}>
			<TopBar topBar={t("groupCreatedTitle")} color="#000" />

			<ScrollView>
				<View style={GroupProfilePreviewStyles.containerText}>
					<Text style={GroupProfilePreviewStyles.textPreview}>
						{t("finalPreview")}
					</Text>
					<View style={GroupProfilePreviewStyles.infoTextContainer}>
						<InfoCircle />
						<Text style={GroupProfilePreviewStyles.infoText}>
							{t("checkInfo")}
						</Text>
					</View>
				</View>
				<View style={GroupProfilePreviewStyles.simpleProfileContainer}>
					<ConnectProfile profile={groupProfile.profileImg} />
					<Text style={GroupProfilePreviewStyles.name}>
						{groupProfile.name}
					</Text>
					<View style={GroupProfilePreviewStyles.containerHeadcount}>
						<IconGroupHeadcount />
						<View
							style={
								GroupProfilePreviewStyles.containerTextHeadcount
							}
						>
							<Text
								style={GroupProfilePreviewStyles.textHeadcount}
							>
								{groupProfile.maxCount}
								{t("memberLimit")}
							</Text>
						</View>
					</View>
				</View>
				<View style={GroupProfilePreviewStyles.detailProfileContainer}>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						{t("bio")}
					</Text>
					<View>
						<ConnectProfileIntroduction
							introduction={groupProfile.description}
						/>
					</View>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						{t("tag")}
					</Text>
					<View style={{ marginBottom: 8 }}>
						<ConnectProfileTag tag={groupProfile.tags} />
					</View>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						{t("language")}
					</Text>
					<ConnectProfileLanguage
						languages={groupProfile.languages}
					/>
					<View style={GroupProfilePreviewStyles.languageLine} />
				</View>
			</ScrollView>

			<View style={GroupProfilePreviewStyles.bottomTwoButtons}>
				<BottomTwoButtons shadow="true">
					<View
						text={t("backButton")}
						onPress={() => navigation.goBack()}
					/>
					<View
						text={t("createGroupButton")}
						onPress={handleCreateGroup}
					/>
				</BottomTwoButtons>
			</View>
		</SafeAreaView>
	);
};

export default GroupProfilePreviewPage;
