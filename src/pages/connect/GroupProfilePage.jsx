import React, { useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	View,
	Text,
	TouchableOpacity,
} from "react-native";

import GroupProfileStyles from "@pages/connect/GroupProfileStyles";

import ConnectProfileTopBar from "@components/connect/ConnectProfileTopBar";
import IconHeart24 from "@components/Icon24/IconHeart24";
import ConnectProfileBackground from "@components/connect/ConnectProfileBackground";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";
import Report from "@components/Report";
import IconGroupHeadcount from "@components/connect/IconGroupHeadcount";
import ApplyButton from "@components/common/ApplyButton";
import ModalGroupJoin from "@components/connect/ModalGroupJoin";

const GroupProfilePage = () => {
	const profileData = {
		id: "1",
		profile: require("@assets/images/test_img/test_connectProfile.jpeg"),
		name: "From Italy💞💞",
		headcount: 23,
		introduction:
			"이탈리아와 한국인의 만남!! 😀 같이 언어공부 해요, 언제든지 환영입니다. 기본적으로 영어로 대화합니다.",
		tags: ["여행", "사진", "스포츠", "요리", "ENTP"],
		language: ["English / English", "한국어 / Korean"],
	};

	const [modalReportVisible, setModalReportVisible] = useState(false);
	const [modalGroupJoinVisible, setModalGroupJoinVisible] = useState(false);

	const handleReport = () => {
		setModalReportVisible(true);
	};

	const [heart, setHeart] = useState(false);

	const handleHeartPress = () => {
		setHeart(!heart);
	};

	const handleGroupJoin = () => {
		setModalGroupJoinVisible(true);
	};

	return (
		<SafeAreaView
			style={[GroupProfileStyles.container, { alignItems: "center" }]}
		>
			<View style={GroupProfileStyles.topBar}>
				<ConnectProfileTopBar topBar="프로필" />
				<IconHeart24 active={heart} onPress={handleHeartPress} />
			</View>
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				style={GroupProfileStyles.scrollView}
			>
				<View style={GroupProfileStyles.background}>
					<ConnectProfileBackground />
				</View>
				<View style={GroupProfileStyles.simpleProfileContainer}>
					<ConnectProfile profile={profileData.profile} />
					<Text style={GroupProfileStyles.name}>
						{profileData.name}
					</Text>
					<View style={GroupProfileStyles.containerHeadcount}>
						<IconGroupHeadcount />
						<View style={GroupProfileStyles.containerTextHeadcount}>
							<Text style={GroupProfileStyles.textHeadcount}>
								{profileData.headcount}
							</Text>
							<Text style={GroupProfileStyles.textMaxHeadcount}>
								{" "}
								/ 30
							</Text>
						</View>
					</View>
				</View>
				<View style={GroupProfileStyles.detailProfileContainer}>
					<Text style={GroupProfileStyles.fontSub16}>한줄소개</Text>
					<View>
						<ConnectProfileIntroduction
							introduction={profileData.introduction}
						/>
					</View>
					<Text style={GroupProfileStyles.fontSub16}>태그</Text>
					<View style={{ marginBottom: 8 }}>
						<ConnectProfileTag tag={profileData.tags} />
					</View>
					<Text style={GroupProfileStyles.fontSub16}>언어</Text>
					<ConnectProfileLanguage languages={profileData.language} />
					<View style={GroupProfileStyles.languageLine} />
				</View>
				<View
					style={GroupProfileStyles.report}
					onPress={() => this.setState({ open: true })}
				>
					<TouchableOpacity onPress={handleReport}>
						<Text style={GroupProfileStyles.textReport}>
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
