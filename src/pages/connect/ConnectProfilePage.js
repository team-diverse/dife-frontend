import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from "react-native";

import {
	getProfileById,
	getConnectById,
	requestConnectById,
	deleteConnectById,
} from "config/api";

import ConnectProfileTopBar from "@components/connect/ConnectProfileTopBar";
import IconHeart24 from "@components/Icon24/IconHeart24";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import ConnectProfileStyles from "@pages/connect/ConnectProfileStyles";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import BottomTwoButtons from "@components/common/BottomTwoButtons";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import Report from "@components/Report";
import ConnectRequest from "@components/ConnectRequest";

const ConnectProfilePage = ({ route }) => {
	const { memberId } = route.params;
	const [profileData, setProfileData] = useState([]);
	const [connectStatus, setConnectStatus] = useState(undefined);
	const [connectId, setConnectId] = useState();

	const formatProfileData = (data) => {
		function cleanHobbies(hobbies) {
			return hobbies.map((hobby) => hobby.replace(/[[\]"]/g, ""));
		}
		return data.map((item) => {
			if (item.mbti !== null) {
				const cleanedHobbies = cleanHobbies(item.hobbies);
				const tags = [item.mbti, ...cleanedHobbies];
				return { ...item, tags };
			}
			return item;
		});
	};

	const getConnectProfile = async () => {
		try {
			const response = await getProfileById(memberId);
			const updatedData = formatProfileData([response.data]);
			setProfileData(updatedData[0]);
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

	const [modalReportVisible, setModalReportVisible] = useState(false);
	const [modalConnectVisible, setModalConnectVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
	};

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

	const [heart, setHeart] = useState(false);

	const handlehandleHeartPress = () => {
		setHeart(!heart);
	};

	return (
		<SafeAreaView
			style={[ConnectProfileStyles.container, { alignItems: "center" }]}
		>
			<View style={ConnectProfileStyles.topBar}>
				<ConnectProfileTopBar topBar="프로필" />
				<IconHeart24 active={heart} onPress={handlehandleHeartPress} />
			</View>
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
						<View style={ConnectProfileStyles.languageLine} />
					</View>
					<View
						style={ConnectProfileStyles.report}
						onPress={() => this.setState({ open: true })}
					>
						<TouchableOpacity onPress={handleReport}>
							<Text style={ConnectProfileStyles.textReport}>
								신고하기
							</Text>
						</TouchableOpacity>
						<Report
							modalVisible={modalReportVisible}
							setModalVisible={setModalReportVisible}
							reportTitle="개인 프로필 신고"
							report1="혐오적인 컨텐츠"
							report2="욕설/도배"
							report3="다른 사람을 사칭함"
							report4="기타"
						/>
					</View>
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
									? "요청 취소"
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
