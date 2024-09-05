import React, { useState, useCallback } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	Keyboard,
	TouchableWithoutFeedback,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import GroupCreatedStyles from "@pages/connect/GroupCreatedStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useCreateGroup } from "src/states/CreateGroupDataContext.js";
import { checkGroupName } from "config/api";
import { debounce } from "util/debounce";

import TopBar from "@components/common/TopBar";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import BottomTwoButtons from "@components/common/BottomTwoButtons";

const GroupCreatedPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const [image, setImage] = useState(null);
	const [nameInput, setNameInput] = useState("");
	const [groupNameValid, setgroupNameValid] = useState(null);
	const [bioInput, setBioInput] = useState("");

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
			setImage(result.assets[0].uri);
		}
	};

	const handleGroupnameChange = (text) => {
		setNameInput(text);
		if (text.length > 0) {
			handleGroupName(text);
		} else {
			setgroupNameValid(null);
		}
	};

	const handleGroupName = useCallback(
		debounce(async (text) => {
			try {
				if (text.trim().length === 0) {
					setgroupNameValid(null);
					return;
				}
				const response = await checkGroupName(text);
				if (response.status === 200) {
					setgroupNameValid(true);
				} else {
					setgroupNameValid(false);
				}
			} catch (error) {
				console.error("그룹 이름 사용 불가:", error.message);
				setgroupNameValid(false);
			}
		}, 100),
		[],
	);

	const { updateCreateGroupData } = useCreateGroup();

	const handleGroupInfo = () => {
		updateCreateGroupData({
			profileImg: image,
			name: nameInput.trim(),
			description: bioInput.trim(),
		});
		navigation.navigate("GroupCreatedDetailPage");
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={GroupCreatedStyles.container}>
				<TopBar
					topBar={t("groupCreatedTitle")}
					color="#000"
					backgroundColor={CustomTheme.primaryBg}
				/>

				<Text style={GroupCreatedStyles.textTitle}>
					{t("profilePictureSubtitle")}
				</Text>
				{image ? (
					<View style={GroupCreatedStyles.containerImage}>
						<Image
							source={{ uri: image }}
							style={GroupCreatedStyles.imageProfile}
						/>
						<IconProfileBorder
							style={GroupCreatedStyles.imageBorder}
						/>
						<TouchableOpacity onPress={pickImage}>
							<IconProfileChange />
						</TouchableOpacity>
					</View>
				) : (
					<View style={GroupCreatedStyles.containerImage}>
						<TouchableOpacity onPress={pickImage}>
							<IconProfileUpload />
						</TouchableOpacity>
					</View>
				)}

				<Text style={GroupCreatedStyles.textTitle}>{t("name")}</Text>
				<View style={GroupCreatedStyles.containerTextInput}>
					<TextInput
						style={GroupCreatedStyles.textInputName}
						placeholder={t("groupNamePlaceholder")}
						value={nameInput}
						onChangeText={handleGroupnameChange}
						maxLength={20}
					/>
					<Text style={GroupCreatedStyles.textCount}>
						{nameInput.length} / 20
					</Text>
				</View>
				{nameInput.length > 0 &&
					typeof groupNameValid === "boolean" &&
					(groupNameValid ? (
						<Text style={GroupCreatedStyles.textAvailableNickname}>
							{t("groupNameAvailable")}
						</Text>
					) : (
						<Text
							style={GroupCreatedStyles.textUnavailableNickname}
						>
							{t("groupNameUnavailable")}
						</Text>
					))}

				<Text style={GroupCreatedStyles.textTitle}>{t("bio")}</Text>
				<View style={GroupCreatedStyles.containerTextInput}>
					<TextInput
						style={GroupCreatedStyles.textInputBio}
						placeholder={t("bioPlaceholder")}
						onChangeText={setBioInput}
						value={bioInput}
						multiline={true}
						maxLength={60}
						underlineColorAndroid="transparent"
					/>
					<Text style={GroupCreatedStyles.textCount}>
						{bioInput.length} / 60
					</Text>
				</View>

				<View style={GroupCreatedStyles.bottomTwoButtons}>
					<BottomTwoButtons shadow="true">
						<View
							text={t("backButton")}
							onPress={() => navigation.goBack()}
						/>
						<View
							text={t("nextButton")}
							onPress={handleGroupInfo}
							disabled={
								!nameInput ||
								!groupNameValid ||
								!bioInput ||
								nameInput.trim().length === 0 ||
								bioInput.trim().length === 0
							}
						/>
					</BottomTwoButtons>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default GroupCreatedPage;
