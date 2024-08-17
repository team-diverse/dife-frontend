import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GroupProfilePreviewStyles from "@pages/connect/GroupProfilePreviewStyles";
import { useCreateGroup } from "src/states/CreateGroupDataContext.js";
import { createGroupChatroom } from "config/api";
import { formatProfileData } from "util/formatProfileData";

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

	const { createGroupData } = useCreateGroup();

	const [groupProfile, setGroupProfile] = useState(null);

	useEffect(() => {
		const profile = formatProfileData([createGroupData]);
		setGroupProfile(profile[0]);
	}, []);

	const handleCreateGroup = async () => {
		try {
			const response = await createGroupChatroom(
				groupProfile.profileImg,
				groupProfile.name,
				groupProfile.description,
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
