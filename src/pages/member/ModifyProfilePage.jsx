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

import ModifyProfileStyles from "@pages/member/ModifyProfileStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { getMyProfile, updateMyProfile } from "config/api";

import TopBar from "@components/common/TopBar";
import ModifyKBackground from "@components/member/ModifyKBackground";
import IconLock from "@components/member/IconLock";
import IconCamera from "@components/member/IconCamera";
import Loading from "@components/common/loading/Loading";

const ModifyProfilePage = () => {
	const navigation = useNavigation();

	const [profile, setProfile] = useState();
	const [, setProfileImage] = useState(null);
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);

	const { onboardingData } = useOnboarding();

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

	const getMyProfileInfo = async () => {
		try {
			const response = await getMyProfile();
			const updatedData = formatProfileData([response.data]);
			setProfile(updatedData[0]);
			setProfilePresignUrl(updatedData[0].profilePresignUrl);
		} catch (error) {
			console.error(
				"프로필 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			getMyProfileInfo();
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
				name: `${onboardingData.id}_profile.jpg`,
			};
			formData.append("profileImg", file);

			await updateMyProfile(formData);
			await getMyProfileInfo();
		} catch (error) {
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
		<SafeAreaView style={ModifyProfileStyles.container}>
			<TopBar
				topBar="프로필 설정"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={{ marginTop: 14 }}>
				<Text style={ModifyProfileStyles.textTitle}>프로필 사진</Text>
				<View style={ModifyProfileStyles.containerProfileImage}>
					<View style={ModifyProfileStyles.modifyKBackground}>
						{profilePresignUrl ? (
							<Image
								style={ModifyProfileStyles.modifyKBackground}
								source={{ uri: profilePresignUrl }}
								resizeMode="cover"
							/>
						) : (
							<ModifyKBackground />
						)}
					</View>
					<TouchableOpacity
						style={ModifyProfileStyles.iconProfileEdit}
						onPress={pickImage}
					>
						<IconCamera color={CustomTheme.primaryMedium} />
					</TouchableOpacity>
				</View>

				<Text style={ModifyProfileStyles.textTitle}>프로필 정보</Text>
				<View style={ModifyProfileStyles.containerBackgroundWhite}>
					<View
						style={[
							ModifyProfileStyles.backgroundWhite,
							{
								flexDirection: "row",
								justifyContent: "space-between",
							},
						]}
					>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={[
									ModifyProfileStyles.textSubTitle,
									{ marginBottom: 0 },
								]}
							>
								아이디
							</Text>
							<Text
								style={[
									ModifyProfileStyles.textContent,
									{ color: CustomTheme.primaryMedium },
								]}
							>
								{profile.email}
							</Text>
						</View>
						<IconLock />
					</View>

					<TouchableOpacity
						style={[
							ModifyProfileStyles.backgroundWhite,
							{
								flexDirection: "row",
								justifyContent: "space-between",
							},
						]}
						onPress={() =>
							navigation.navigate("ModifyProfileInputPage", {
								title: "닉네임",
								nicknameContent: profile.username,
								profileData: profile,
							})
						}
					>
						<View style={{ flexDirection: "row" }}>
							<Text
								style={[
									ModifyProfileStyles.textSubTitle,
									{ marginBottom: 0 },
								]}
							>
								닉네임
							</Text>
							<Text
								style={[
									ModifyProfileStyles.textContent,
									{ color: CustomTheme.primaryMedium },
								]}
							>
								{profile.username}
							</Text>
						</View>
						<Text style={ModifyProfileStyles.textModify}>수정</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyProfileInputPage", {
								title: "한줄소개",
								bioContent: profile.bio,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								한줄소개
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<Text style={ModifyProfileStyles.textContent}>
							{profile.bio}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyProfileInputPage", {
								title: "태그",
								tagContent: profile.tags,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								태그
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<View style={ModifyProfileStyles.containerTagLanguage}>
							{profile.tags.map((item, index) => (
								<Text
									key={index}
									style={ModifyProfileStyles.textContent}
								>
									#{item}{" "}
								</Text>
							))}
						</View>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyProfileInputPage", {
								title: "언어",
								languageContent: profile.languages,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								언어
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								수정
							</Text>
						</View>
						<View style={ModifyProfileStyles.containerTagLanguage}>
							{profile.languages.map((item, index) => (
								<Text
									key={index}
									style={ModifyProfileStyles.textContent}
								>
									{item},{" "}
								</Text>
							))}
						</View>
					</TouchableOpacity>

					<View style={ModifyProfileStyles.backgroundWhite}>
						<View style={ModifyProfileStyles.containerRowText}>
							<View
								style={ModifyProfileStyles.containerBasicInfo}
							>
								<Text style={ModifyProfileStyles.textSubTitle}>
									기본정보
								</Text>
								<View>
									<View
										style={
											ModifyProfileStyles.containerBasicInfoContent
										}
									>
										<Text
											style={
												ModifyProfileStyles.textBasicInfo
											}
										>
											국적
										</Text>
										<Text
											style={
												ModifyProfileStyles.textContent
											}
										>
											{profile.country}
										</Text>
									</View>
									<View
										style={
											ModifyProfileStyles.containerBasicInfoContent
										}
									>
										<Text
											style={
												ModifyProfileStyles.textBasicInfo
											}
										>
											본명
										</Text>
										<Text
											style={
												ModifyProfileStyles.textContent
											}
										>
											{profile.name}
										</Text>
									</View>
									<View
										style={[
											ModifyProfileStyles.containerBasicInfoContent,
											{ marginBottom: 0 },
										]}
									>
										<Text
											style={
												ModifyProfileStyles.textBasicInfo
											}
										>
											전공
										</Text>
										<Text
											style={
												ModifyProfileStyles.textContent
											}
										>
											{profile.major}
										</Text>
									</View>
								</View>
							</View>
							<IconLock />
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default ModifyProfilePage;
