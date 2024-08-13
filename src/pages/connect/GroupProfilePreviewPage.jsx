import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GroupProfilePreviewStyles from "@pages/connect/GroupProfilePreviewStyles";

import TopBar from "@components/common/TopBar";
import InfoCircle from "@components/common/InfoCircle";
import IconGroupHeadcount from "@components/connect/IconGroupHeadcount";
import ConnectProfile from "@components/connect/ConnectProfile";
import ConnectProfileIntroduction from "@components/connect/ConnectProfileIntroduction";
import ConnectProfileTag from "@components/connect/ConnectProfileTag";
import BottomTwoButtons from "@components/common/BottomTwoButtons";
import ConnectProfileLanguage from "@components/connect/ConnectProfileLanguage";

const GroupProfilePreviewPage = () => {
	const navigation = useNavigation();

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

	return (
		<SafeAreaView style={GroupProfilePreviewStyles.container}>
			<TopBar topBar="그룹 채팅방 만들기" color="#000" />

			<ScrollView>
				<View style={GroupProfilePreviewStyles.containerText}>
					<Text style={GroupProfilePreviewStyles.textPreview}>
						최종 프로필 미리보기
					</Text>
					<View style={GroupProfilePreviewStyles.infoTextContainer}>
						<InfoCircle />
						<Text style={GroupProfilePreviewStyles.infoText}>
							입력한 정보가 맞는지 확인해주세요
						</Text>
					</View>
				</View>
				<View style={GroupProfilePreviewStyles.simpleProfileContainer}>
					<ConnectProfile profile={profileData.profile} />
					<Text style={GroupProfilePreviewStyles.name}>
						{profileData.name}
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
								{profileData.headcount}명 제한
							</Text>
						</View>
					</View>
				</View>
				<View style={GroupProfilePreviewStyles.detailProfileContainer}>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						한줄소개
					</Text>
					<View>
						<ConnectProfileIntroduction
							introduction={profileData.introduction}
						/>
					</View>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						태그
					</Text>
					<View style={{ marginBottom: 8 }}>
						<ConnectProfileTag tag={profileData.tags} />
					</View>
					<Text style={GroupProfilePreviewStyles.fontSub16}>
						언어
					</Text>
					<ConnectProfileLanguage languages={profileData.language} />
					<View style={GroupProfilePreviewStyles.languageLine} />
				</View>
			</ScrollView>

			<View style={GroupProfilePreviewStyles.bottomTwoButtons}>
				<BottomTwoButtons shadow="true">
					<View text="뒤로가기" onPress={() => navigation.goBack()} />
					<View
						text="그룹 생성하기"
						onPress={() =>
							navigation.navigate("ConnectPage", {
								modalGroupVisible: true,
							})
						}
					/>
				</BottomTwoButtons>
			</View>
		</SafeAreaView>
	);
};

export default GroupProfilePreviewPage;
