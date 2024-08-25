import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";

import GroupProfileStyles from "@pages/connect/GroupProfileStyles";
import { getGroupByGroupId, getProfileImageByFileName } from "config/api";
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
	const [modalGroupJoinVisible, setModalGroupJoinVisible] = useState(false);

	const [heart, setHeart] = useState(false);

	const handleHeartPress = () => {
		setHeart(!heart);
	};

	const handleGroupJoin = () => {
		setModalGroupJoinVisible(true);
	};

	const { groupId } = route.params;

	const [groupProfileData, setGroupProfileData] = useState([]);
	const [profilePresignUrl, setProfilePresignUrl] = useState("");

	const getDetailProfile = async () => {
		try {
			const response = await getGroupByGroupId(groupId);
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

	return (
		<SafeAreaView
			style={[GroupProfileStyles.container, { alignItems: "center" }]}
		>
			<ConnectProfileTopBar
				topBar="프로필"
				active={heart}
				onPressHeart={handleHeartPress}
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
					<Text style={GroupProfileStyles.fontSub16}>한줄소개</Text>
					<View>
						<ConnectProfileIntroduction
							introduction={groupProfileData.description}
						/>
					</View>
					<Text style={GroupProfileStyles.fontSub16}>태그</Text>
					<View style={{ marginBottom: 8 }}>
						<ConnectProfileTag tag={groupProfileData.tags} />
					</View>
					<Text style={GroupProfileStyles.fontSub16}>언어</Text>
					<ConnectProfileLanguage
						languages={groupProfileData.languages}
					/>
					<View style={GroupProfileStyles.languageLine} />
				</View>
				<View style={GroupProfileStyles.margin} />
			</ScrollView>
			<View style={GroupProfileStyles.applyButton}>
				<ApplyButton
					text="그룹 가입하기"
					background="true"
					onPress={handleGroupJoin}
				/>
			</View>
			<ModalGroupJoin
				modalVisible={modalGroupJoinVisible}
				setModalVisible={setModalGroupJoinVisible}
				reportTitle="개인 프로필 신고"
				report1="혐오적인 컨텐츠"
				report2="욕설/도배"
				report3="다른 사람을 사칭함"
				report4="기타"
			/>
		</SafeAreaView>
	);
};

export default GroupProfilePage;
