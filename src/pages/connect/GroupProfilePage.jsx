import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import GroupProfileStyles from "@pages/connect/GroupProfileStyles";
import {
	getGroupByGroupId,
	getProfileImageByFileName,
	createLikeChatroom,
	deleteLikeChatroom,
} from "config/api";
import { formatProfileData } from "util/formatProfileData";

import ConnectProfileTopBar from "@components/connect/ConnectProfileTopBar";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import IconGroupHeadcount from "@components/connect/IconGroupHeadcount";
import ApplyButton from "@components/common/ApplyButton";
import ModalGroupJoin from "@components/connect/ModalGroupJoin";

const GroupProfilePage = ({ route }) => {
	const { groupId } = route.params;
	const { t } = useTranslation();
	const [groupProfileData, setGroupProfileData] = useState([]);
	const [profilePresignUrl, setProfilePresignUrl] = useState("");
	const [modalGroupJoinVisible, setModalGroupJoinVisible] = useState(false);
	const [groupHeart, setGroupHeart] = useState(false);
	const [groupIsEntered, setGroupIsEntered] = useState(false);

	const handleGroupJoin = () => {
		setGroupIsEntered(true);
		setModalGroupJoinVisible(true);
	};

	const handleGroupQuit = () => {
		setGroupIsEntered(false);
	};

	const getDetailProfile = async () => {
		try {
			const response = await getGroupByGroupId(groupId);
			setGroupHeart(response.data.isLiked);
			setGroupIsEntered(response.data.isEntered);

			const profile = formatProfileData([response.data]);
			setGroupProfileData(profile[0]);

			if (
				response.data.profileImg &&
				response.data.profileImg.originalName
			) {
				const image = await getProfileImageByFileName(
					response.data.profileImg.originalName,
				);
				setProfilePresignUrl(image.data);
			} else {
				setProfilePresignUrl(null);
			}
		} catch (error) {
			console.error(
				"그룹 상세 페이지 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getDetailProfile();
	}, []);

	const handleGroupCreateHeart = async () => {
		try {
			await createLikeChatroom(groupId);
			setGroupHeart(true);
		} catch (error) {
			console.error(
				"그룹 좋아요 생성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleGroupDeleteHeart = async () => {
		try {
			await deleteLikeChatroom(groupId);
			setGroupHeart(false);
		} catch (error) {
			console.error(
				"그룹 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView
			style={[GroupProfileStyles.container, { alignItems: "center" }]}
		>
			<ConnectProfileTopBar
				topBar={t("profile")}
				active={groupHeart}
				onPressHeart={
					groupHeart ? handleGroupDeleteHeart : handleGroupCreateHeart
				}
				groupId={groupId}
			/>
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				style={GroupProfileStyles.scrollView}
			>
				<View style={GroupProfileStyles.background}>
					<ConnectProfileBackground />
				</View>
				<View style={GroupProfileStyles.simpleProfileContainer}>
					<ConnectProfile profile={profilePresignUrl || null} />
					<Text style={GroupProfileStyles.name}>
						{groupProfileData.name}
					</Text>
					<View style={GroupProfileStyles.containerHeadcount}>
						<IconGroupHeadcount />
						<View style={GroupProfileStyles.containerTextHeadcount}>
							<Text style={GroupProfileStyles.textHeadcount}>
								{groupProfileData.count}
							</Text>
							<Text style={GroupProfileStyles.textMaxHeadcount}>
								{" "}
								/ {groupProfileData.maxCount}
							</Text>
						</View>
					</View>
				</View>
				<View style={GroupProfileStyles.detailProfileContainer}>
					<Text style={GroupProfileStyles.fontSub16}>{t("bio")}</Text>
					<View>
						<ConnectProfileIntroduction
							introduction={groupProfileData.description}
						/>
					</View>
					<Text style={GroupProfileStyles.fontSub16}>{t("tag")}</Text>
					<View style={{ marginBottom: 8 }}>
						<ConnectProfileTag tag={groupProfileData.tags} />
					</View>
					<Text style={GroupProfileStyles.fontSub16}>
						{t("language")}
					</Text>
					<ConnectProfileLanguage
						languages={groupProfileData.languages}
					/>
					<View style={GroupProfileStyles.languageLine} />
				</View>
				<View style={GroupProfileStyles.margin} />
			</ScrollView>
			<View style={GroupProfileStyles.applyButton}>
				<ApplyButton
					text={groupIsEntered ? t("groupQuit") : t("groupJoin")}
					background="true"
					onPress={groupIsEntered ? handleGroupQuit : handleGroupJoin}
				/>
			</View>
			<ModalGroupJoin
				modalVisible={modalGroupJoinVisible}
				setModalVisible={setModalGroupJoinVisible}
				isPublic={groupProfileData.isPublic}
			/>
		</SafeAreaView>
	);
};

export default GroupProfilePage;
