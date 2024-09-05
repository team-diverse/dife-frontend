import React, { useCallback, useState, useEffect } from "react";
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
import { useTranslation } from "react-i18next";

import ModifyProfileStyles from "@pages/member/ModifyProfileStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { formatProfileData } from "util/formatProfileData";
import { getMyMemberId, getMyProfile, updateMyProfile } from "config/api";

import TopBar from "@components/common/TopBar";
import ModifyKBackground from "@components/member/ModifyKBackground";
import IconLock from "@components/member/IconLock";
import IconCamera from "@components/member/IconCamera";
import Loading from "@components/common/loading/Loading";
import * as Sentry from "@sentry/react-native";

const ModifyProfilePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [profile, setProfile] = useState();
	const [, setProfileImage] = useState(null);
	const [profilePresignUrl, setProfilePresignUrl] = useState(null);
	const [myMemberId, setMyMemberId] = useState(null);

	useEffect(() => {
		const getMyId = async () => {
			const memberId = await getMyMemberId();
			setMyMemberId(memberId);
		};
		getMyId();
	}, []);

	const getMyProfileInfo = async () => {
		try {
			const response = await getMyProfile();
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
			getMyProfileInfo();
		}, []),
	);

	const pickImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				t("imagePermissionAlertTitle"),
				t("imagePermissionAlertMessage"),
			);
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
				name: `${myMemberId}_profile.jpg`,
			};
			formData.append("profileImg", file);

			await updateMyProfile(formData);
			await getMyProfileInfo();
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
		<SafeAreaView style={ModifyProfileStyles.container}>
			<TopBar
				topBar={t("profileSettings")}
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={{ marginTop: 14 }}>
				<Text style={ModifyProfileStyles.textTitle}>
					{t("profilePictureSubtitle")}
				</Text>
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

				<Text style={ModifyProfileStyles.textTitle}>
					{t("profileInfo")}
				</Text>
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
								{t("id")}
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
								title: t("nickname"),
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
								{t("nickname")}
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
						<Text style={ModifyProfileStyles.textModify}>
							{t("edit")}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={ModifyProfileStyles.backgroundWhite}
						onPress={() =>
							navigation.navigate("ModifyProfileInputPage", {
								title: t("bio"),
								bioContent: profile.bio,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								{t("bio")}
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								{t("edit")}
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
								title: t("tag"),
								tagContent: profile.tags,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								{t("tag")}
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								{t("edit")}
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
								title: t("language"),
								languageContent: profile.languages,
								profileData: profile,
							})
						}
					>
						<View style={ModifyProfileStyles.containerRowText}>
							<Text style={ModifyProfileStyles.textSubTitle}>
								{t("language")}
							</Text>
							<Text style={ModifyProfileStyles.textModify}>
								{t("edit")}
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
									{t("basicInfo")}
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
											{t("nationality")}
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
											{t("realName")}
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
											{t("major")}
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
