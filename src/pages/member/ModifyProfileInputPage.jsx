import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import ModifyProfileInputStyles from "@pages/member/ModifyProfileInputStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { checkUsername, updateMyProfile } from "config/api";
import { debounce } from "util/debounce";

import ModifyProfileTopBar from "@components/common/ModifyProfileTopBar";
import FilterCategory from "@components/connect/FilterCategory";
import InfoCircle from "@components/common/InfoCircle";
import Checkbox from "@components/common/Checkbox";
import * as Sentry from "@sentry/react-native";

const ModifyProfileInputPage = ({ route }) => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const {
		profileData,
		title,
		nicknameContent,
		bioContent,
		tagContent = [],
		languageContent = [],
	} = route.params;

	useEffect(() => {
		const separateTag = (arr) => {
			const mbtiPattern = /^[A-Z]{4}$/;
			const tagHobbies = [];
			let tagMbti = null;

			arr.forEach((item) => {
				if (mbtiPattern.test(item)) {
					tagMbti = item;
				} else {
					tagHobbies.push(item);
				}
			});

			setSelectedMBTI(tagMbti ? [tagMbti] : [""]);
			setSelectedHobby(tagHobbies);
		};

		separateTag(tagContent);
	}, []);

	const [originalProfile] = useState(profileData);
	const [nicknameValid, setNicknameValid] = useState(null);
	const [nicknameInput, setNicknameInput] = useState(nicknameContent || "");
	const [bioInput, setBioInput] = useState(bioContent || "");
	const [selectedMBTI, setSelectedMBTI] = useState([]);
	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState(languageContent);

	const mbti = t("mbtiOptions", { returnObjects: true });
	const hobby = t("hobbyOptions", { returnObjects: true });
	const languages = t("languages", { returnObjects: true });

	const defaultLanguages =
		languageContent.length === 0 ? ["", "", "", "", ""] : languageContent;

	const [isCheckedList, setIsCheckedList] = useState(
		languages.map((lang) => defaultLanguages.includes(lang)),
	);

	const size = 3;

	const mbtiRows = [];
	for (let i = 0; i < mbti.length; i += size) {
		mbtiRows.push(mbti.slice(i, i + size));
	}

	const handleSelectMBTI = (mbti) => {
		if (mbti === t("selectNone")) {
			setSelectedMBTI([""]);
		} else {
			setSelectedMBTI([mbti]);
		}
	};

	const hobbyRows = [];
	for (let i = 0; i < hobby.length; i += size) {
		hobbyRows.push(hobby.slice(i, i + size));
	}

	const handleSelectHobby = (hobby) => {
		if (selectedHobby.includes(hobby)) {
			setSelectedHobby(selectedHobby.filter((item) => item !== hobby));
		} else {
			setSelectedHobby([...selectedHobby, hobby]);
		}
	};

	const handleSelectLanguage = (index) => {
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});

		const language = languages[index];
		if (isCheckedList[index]) {
			setSelectedLanguage(
				selectedLanguage.filter((item) => item !== language),
			);
		} else {
			setSelectedLanguage([...selectedLanguage, language]);
		}
	};

	const handleNicknameChange = (text) => {
		setNicknameInput(text);
		if (text.length > 0) {
			handleNickname(text);
		} else {
			setNicknameValid(null);
		}
	};

	const handleNickname = useCallback(
		debounce(async (text) => {
			try {
				const response = await checkUsername(text);
				if (response.status === 200) {
					setNicknameValid(true);
				} else {
					setNicknameValid(false);
				}
			} catch (error) {
				Sentry.captureException(error);
				console.error("닉네임 사용 불가: ", error.message);
				setNicknameValid(false);
			}
		}, 100),
		[],
	);

	const updateProfile = async () => {
		try {
			const formData = new FormData();
			if (
				nicknameInput.trim() !== "" &&
				nicknameInput !== originalProfile.username
			) {
				formData.append("username", nicknameInput);
			}
			if (bioInput !== originalProfile.bio) {
				formData.append("bio", bioInput);
			}
			if (
				selectedMBTI.length > 0 &&
				selectedMBTI !== originalProfile.mbti
			) {
				formData.append("mbti", selectedMBTI);
			}
			if (
				selectedHobby.length > 0 &&
				selectedHobby !== originalProfile.hobbies
			) {
				formData.append("hobbies", selectedHobby);
			}
			if (
				selectedLanguage.length > 0 &&
				selectedLanguage !== originalProfile.languages
			) {
				formData.append("languages", selectedLanguage);
			}
			await updateMyProfile(formData);
			navigation.navigate("ModifyProfilePage");
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"프로필 변경 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView style={ModifyProfileInputStyles.container}>
			<ModifyProfileTopBar topBar={title} onPress={updateProfile} />

			{(nicknameContent ||
				nicknameContent === "" ||
				bioContent ||
				bioContent === "") && (
				<View style={ModifyProfileInputStyles.containerBackgroundWhite}>
					<View style={ModifyProfileInputStyles.backgroundWhite}>
						<Text style={ModifyProfileInputStyles.textTitle}>
							{title}
						</Text>

						{nicknameContent && (
							<>
								<TextInput
									style={[
										ModifyProfileInputStyles.textInput,
										{ color: CustomTheme.primaryMedium },
									]}
									onChangeText={handleNicknameChange}
									value={nicknameInput}
									maxLength={12}
								/>
								<Text
									style={ModifyProfileInputStyles.textCount}
								>
									{nicknameInput.length} / 12
								</Text>
							</>
						)}

						{bioContent !== undefined && (
							<>
								<TextInput
									style={ModifyProfileInputStyles.textInput}
									onChangeText={setBioInput}
									value={bioInput}
									multiline={true}
									maxLength={60}
								/>
								<Text
									style={ModifyProfileInputStyles.textCount}
								>
									{bioInput.length} / 60
								</Text>
							</>
						)}
					</View>
				</View>
			)}
			{nicknameInput.length > 0 &&
				typeof nicknameValid === "boolean" &&
				(nicknameValid ? (
					<Text
						style={ModifyProfileInputStyles.textAvailableNickname}
					>
						{t("nicknameAvailable")}
					</Text>
				) : (
					<Text
						style={ModifyProfileInputStyles.textUnavailableNickname}
					>
						{t("nicknameUnavailable")}
					</Text>
				))}

			{nicknameContent == null && bioContent == null && (
				<>
					{languageContent.length == 0 && tagContent && (
						<ScrollView>
							<Text style={ModifyProfileInputStyles.textTagTitle}>
								{t("mbti")}
							</Text>
							<View style={ModifyProfileInputStyles.line} />
							<View
								style={ModifyProfileInputStyles.containerMbti}
							>
								<View
									style={
										ModifyProfileInputStyles.flexStartMbti
									}
								>
									{mbtiRows.map((row, rowIndex) => (
										<View
											key={rowIndex}
											style={
												ModifyProfileInputStyles.rowMbti
											}
										>
											{row.map((type, typeIndex) => (
												<FilterCategory
													key={typeIndex}
													text={type}
													mbtiCount={1}
													onPress={() =>
														handleSelectMBTI(type)
													}
													selected={
														type === t("selectNone")
															? selectedMBTI.includes(
																	"",
																)
															: selectedMBTI.includes(
																	type,
																)
													}
												/>
											))}
										</View>
									))}
								</View>
							</View>

							<Text style={ModifyProfileInputStyles.textTagTitle}>
								{t("hobby")}
							</Text>
							<View style={ModifyProfileInputStyles.line} />
							<View
								style={
									ModifyProfileInputStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={ModifyProfileInputStyles.infoText}>
									{t("max3Selection")}
								</Text>
							</View>
							<View>
								{hobbyRows.map((row, rowIndex) => (
									<View
										key={rowIndex}
										style={
											ModifyProfileInputStyles.containerRow
										}
									>
										{row.map((type, typeIndex) => (
											<FilterCategory
												key={typeIndex}
												text={type}
												hobbyCount={
													selectedHobby.length
												}
												onPress={() =>
													handleSelectHobby(type)
												}
												selected={selectedHobby.includes(
													type,
												)}
											/>
										))}
									</View>
								))}
							</View>
						</ScrollView>
					)}

					{tagContent.length == 0 && languageContent && (
						<View style={ModifyProfileInputStyles.checkbox}>
							{languages.map((language, index) => (
								<Checkbox
									key={index}
									checked={isCheckedList[index]}
									onPress={() => handleSelectLanguage(index)}
									text={language}
								/>
							))}
						</View>
					)}
				</>
			)}
		</SafeAreaView>
	);
};

export default ModifyProfileInputPage;
