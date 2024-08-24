import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";

import {
	getProfileById,
	getConnectById,
	requestConnectById,
	deleteConnectById,
	createLikeMember,
	deleteLikeMember,
} from "config/api";
import { formatProfileData } from "util/formatProfileData";
import { getMyMemberId } from "util/secureStoreUtils";

import ConnectProfileTopBar from "@components/connect/ConnectProfileTopBar";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import ConnectProfileStyles from "@pages/connect/ConnectProfileStyles";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import BottomTwoButtons from "@components/common/BottomTwoButtons";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import ConnectRequest from "@components/ConnectRequest";

const ConnectProfilePage = ({ route }) => {
	const { memberId } = route.params;
	const [profileData, setProfileData] = useState([]);
	const [connectStatus, setConnectStatus] = useState(undefined);
	const [connectId, setConnectId] = useState();
	const [requestSent, setRequestSent] = useState(false);
	const [modalConnectVisible, setModalConnectVisible] = useState(false);
	const [heart, setHeart] = useState(false);

	const getConnectProfile = async () => {
		try {
			const response = await getProfileById(memberId);
			const updatedData = formatProfileData([response.data]);
			setProfileData(updatedData[0]);
			setHeart(response.data.isLiked);
		} catch (error) {
			console.error(
				"디테일 프로필 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const getConnectStatus = async () => {
		try {
			const response = await getConnectById(memberId);
			setConnectStatus(response.data.status);
			setConnectId(response.data.id);

			const myMebmberId = await getMyMemberId();
			setRequestSent(response.data.from_member.id == myMebmberId);
		} catch (error) {
			console.error(
				"커넥트 상태 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getConnectProfile();
	}, []);

	useEffect(() => {
		getConnectStatus();
	}, [connectStatus]);

	const requestConnect = async () => {
		try {
			const response = await requestConnectById(memberId);
			setConnectStatus(response.data.status);
		} catch (error) {
			console.error(
				"커넥트 요청 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const deleteConnect = async () => {
		try {
			await deleteConnectById(connectId);
			setConnectStatus(undefined);
		} catch (error) {
			console.error(
				"커넥트 삭제 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleConnect = () => {
		if (connectStatus === undefined) {
			setModalConnectVisible(true);
			requestConnect();
		} else {
			deleteConnect();
		}
	};

	const handleChat = () => {
		null;
	};

	const handleCreateHeart = async () => {
		try {
			await createLikeMember(memberId);
			setHeart(true);
		} catch (error) {
			console.error(
				"멤버 좋아요 생성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleDeleteHeart = async () => {
		try {
			await deleteLikeMember(memberId);
			setHeart(false);
		} catch (error) {
			console.error(
				"멤버 좋아요 취소 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView
			style={[ConnectProfileStyles.container, { alignItems: "center" }]}
		>
			<ConnectProfileTopBar
				topBar="프로필"
				active={heart}
				onPressHeart={heart ? handleDeleteHeart : handleCreateHeart}
				memberId={memberId}
			/>
			<View style={ConnectProfileStyles.scrollView}>
				<ScrollView contentContainerStyle={{ alignItems: "center" }}>
					<View style={ConnectProfileStyles.background}>
						<ConnectProfileBackground />
					</View>
					<View style={ConnectProfileStyles.simpleProfileContainer}>
						<ConnectProfile
							profile={profileData.profilePresignUrl}
						/>
						<Text style={ConnectProfileStyles.username}>
							{profileData.username}
						</Text>
						<Text style={ConnectProfileStyles.countryAgeMajor}>
							{profileData.country} | {profileData.major}
						</Text>
					</View>
					<View style={ConnectProfileStyles.detailProfileContainer}>
						<Text style={ConnectProfileStyles.fontSub16}>본명</Text>
						<Text style={ConnectProfileStyles.fontBody14}>
							{profileData.name}
						</Text>
						<Text style={ConnectProfileStyles.fontSub16}>
							한줄소개
						</Text>
						<View>
							<ConnectProfileIntroduction
								introduction={profileData.bio}
							/>
						</View>
						<Text style={ConnectProfileStyles.fontSub16}>태그</Text>
						<View style={{ marginBottom: 8 }}>
							<ConnectProfileTag tag={profileData.tags} />
						</View>
						<Text style={ConnectProfileStyles.fontSub16}>언어</Text>
						<ConnectProfileLanguage
							languages={profileData.languages}
						/>
					</View>
					<View style={ConnectProfileStyles.margin} />
				</ScrollView>
			</View>
			<View style={ConnectProfileStyles.bottomTwoButtons}>
				<BottomTwoButtons shadow="true">
					<View text="채팅하기" onPress={handleChat} />
					<View
						text={
							connectStatus === undefined
								? "커넥트 요청"
								: connectStatus === "PENDING"
									? requestSent
										? "요청 취소"
										: "요청 수락"
									: "커넥트 취소"
						}
						onPress={handleConnect}
					/>
				</BottomTwoButtons>
			</View>
			<ConnectRequest
				modalVisible={modalConnectVisible}
				setModalVisible={setModalConnectVisible}
			/>
		</SafeAreaView>
	);
};

export default ConnectProfilePage;
