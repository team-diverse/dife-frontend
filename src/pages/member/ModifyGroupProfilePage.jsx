import React, { useCallback, useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import ModifyGroupProfileStyles from "@pages/member/ModifyGroupProfileStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { formatProfileData } from "util/formatProfileData";
import { getGroupByGroupId, updateGroupProfile } from "config/api";

import TopBar from "@components/common/TopBar";
import ModifyKBackground from "@components/member/ModifyKBackground";
import IconCamera from "@components/member/IconCamera";
import Loading from "@components/common/loading/Loading";
import * as Sentry from "@sentry/react-native";

const ModifyGroupProfilePage = () => {
	const navigation = useNavigation();

	// const { groupId } = route.params;

	const [profile, setProfile] = useState();
	const [, setProfileImage] = useState(null);
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const getGroupProfileInfo = async () => {
		try {
			const response = await getGroupByGroupId(2);
			console.log(response.data);
			const updatedData = formatProfileData([response.data]);
			setProfile(updatedData[0]);
			setProfilePresignUrl(updatedData[0].profilePresignUrl);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"프로필 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getGroupProfileInfo();
		}, []),
	);

	const pickImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("알림", "설정에서 이미지 권한을 허용해주세요.");
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setProfileImage(result.assets[0].uri);
			await handleProfileImage(result.assets[0].uri);
		}
	};

	const handleProfileImage = async (imageUri) => {
		try {
			const formData = new FormData();
			const file = {
				uri: imageUri,
				type: "image/jpeg",
				name: `${2}_profile.jpg`,
			};
			formData.append("profileImg", file);

			await updateGroupProfile(formData);
			await getGroupProfileInfo();
		} catch (error) {
			Sentry.captureException(error);
			setProfileImage(null);
			console.error(
				"프로필 이미지 변경 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	if (!profile) {
		return <Loading />;
	}

	return (
		<SafeAreaView style={ModifyGroupProfileStyles.container}>
			<TopBar
				topBar="그룹 설정"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={{ marginTop: 14 }}>
				<Text style={ModifyGroupProfileStyles.textTitle}>
					그룹 프로필 사진
				</Text>
				<View style={ModifyGroupProfileStyles.containerProfileImage}>
					<View style={ModifyGroupProfileStyles.modifyKBackground}>
						{profilePresignUrl ? (
							<Image
								style={
									ModifyGroupProfileStyles.modifyKBackground
								}
								source={{ uri: profilePresignUrl }}
								resizeMode="cover"
							/>
						) : (
							<ModifyKBackground />
						)}
					</View>
					<TouchableOpacity
						style={ModifyGroupProfileStyles.iconProfileEdit}
						onPress={pickImage}
					>
						<IconCamera color={CustomTheme.primaryMedium} />
					</TouchableOpacity>
				</View>

				<Text style={ModifyGroupProfileStyles.textTitle}>
					그룹 정보
				</Text>
				<View style={ModifyGroupProfileStyles.containerBackgroundWhite}>
					<TouchableOpacity
						style={[
							ModifyGroupProfileStyles.backgroundWhite,
							{
								flexDirection: "row",
								justifyContent: "space-between",
							},
						]}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "그룹 이름",
								nicknameContent: profile.name,
								profileData: profile,
							})
						}
					>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={[
									ModifyGroupProfileStyles.textSubTitle,
									{ marginBottom: 0 },
								]}
							>
								그룹 이름
							</Text>
							<Text
								style={[
									ModifyGroupProfileStyles.textContent,
									{ color: CustomTheme.primaryMedium },
								]}
							>
								{profile.name}
							</Text>
						</View>
						<Text style={ModifyGroupProfileStyles.textModify}>
							수정
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyGroupProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "한줄소개",
								bioContent: profile.description,
								profileData: profile,
							})
						}
					>
						<View style={ModifyGroupProfileStyles.containerRowText}>
							<Text style={ModifyGroupProfileStyles.textSubTitle}>
								한줄소개
							</Text>
							<Text style={ModifyGroupProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<Text style={ModifyGroupProfileStyles.textContent}>
							{profile.description}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyGroupProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "주제/유형",
								hobbiesContent: profile.hobbies,
								purposesContent: profile.purposes,
								profileData: profile,
							})
						}
					>
						<View style={ModifyGroupProfileStyles.containerRowText}>
							<Text style={ModifyGroupProfileStyles.textSubTitle}>
								주제/유형
							</Text>
							<Text style={ModifyGroupProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<View
							style={
								ModifyGroupProfileStyles.containerTagLanguage
							}
						>
							{profile.tags.map((item, index) => (
								<Text
									key={index}
									style={ModifyGroupProfileStyles.textContent}
								>
									#{item}{" "}
								</Text>
							))}
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyGroupProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "언어",
								languageContent: profile.languages,
								profileData: profile,
							})
						}
					>
						<View style={ModifyGroupProfileStyles.containerRowText}>
							<Text style={ModifyGroupProfileStyles.textSubTitle}>
								언어
							</Text>
							<Text style={ModifyGroupProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<View
							style={
								ModifyGroupProfileStyles.containerTagLanguage
							}
						>
							{profile.languages.map((item, index) => (
								<Text
									key={index}
									style={ModifyGroupProfileStyles.textContent}
								>
									{item},{" "}
								</Text>
							))}
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyGroupProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "공개여부",
								isPublicContent: profile.isPublic,
								profileData: profile,
							})
						}
					>
						<View style={ModifyGroupProfileStyles.containerRowText}>
							<Text style={ModifyGroupProfileStyles.textSubTitle}>
								공개여부
							</Text>
							<Text style={ModifyGroupProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<View
							style={
								ModifyGroupProfileStyles.containerTagLanguage
							}
						>
							<Text style={ModifyGroupProfileStyles.textContent}>
								{"공개"}
							</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyGroupProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyGroupProfileInputPage", {
								title: "인원 제한",
								// countContent: profile.count,
								maxCountContent: profile.maxCount,
								profileData: profile,
							})
						}
					>
						<View style={ModifyGroupProfileStyles.containerRowText}>
							<View
								style={
									ModifyGroupProfileStyles.containerBasicInfo
								}
							>
								<Text
									style={
										ModifyGroupProfileStyles.textSubTitle
									}
								>
									기본정보
								</Text>
								<View>
									<View
										style={
											ModifyGroupProfileStyles.containerBasicInfoContent
										}
									>
										<Text
											style={
												ModifyGroupProfileStyles.textBasicInfo
											}
										>
											인원제한
										</Text>
										<Text
											style={
												ModifyGroupProfileStyles.textContent
											}
										>
											{profile.maxCount}
										</Text>
									</View>
									<View
										style={
											ModifyGroupProfileStyles.containerBasicInfoContent
										}
									>
										<Text
											style={
												ModifyGroupProfileStyles.textBasicInfo
											}
										>
											참여인원
										</Text>
										<Text
											style={
												ModifyGroupProfileStyles.textContent
											}
										>
											{profile.count}
										</Text>
									</View>
								</View>
							</View>
							<Text style={ModifyGroupProfileStyles.textModify}>
								수정
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ModifyGroupProfilePage;
