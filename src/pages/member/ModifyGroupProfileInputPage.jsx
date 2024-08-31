import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";

import ModifyGroupProfileInputStyles from "@pages/member/ModifyGroupProfileInputStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { checkUsername, updateGroupProfile } from "config/api";
import { debounce } from "util/debounce";

import ModifyProfileTopBar from "@components/common/ModifyProfileTopBar";
import FilterCategory from "@components/connect/FilterCategory";
import InfoCircle from "@components/common/InfoCircle";
import Checkbox from "@components/common/Checkbox";
import * as Sentry from "@sentry/react-native";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const ModifyGroupProfileInputPage = ({ route }) => {
	const navigation = useNavigation();
	const {
		profileData,
		title,
		nicknameContent,
		bioContent,
		hobbiesContent = [],
		purposesContent = [],
		languageContent = [],
		isPublicContent,
		countContent,
		maxCountContent,
	} = route.params;

	useEffect(() => {
		const filteredPurpose = purposesContent.filter((item) => item !== "");
		const filteredHobby = hobbiesContent.filter((item) => item !== "");

		const CategoryEnum = {
			COMMUNICATION: "COMMUNICATION",
			EXCHANGE: "EXCHANGE",
			FREE: "FREE",
		};

		const categoryEnumToKorean = (enumValue) => {
			const enumMap = {
				[CategoryEnum.COMMUNICATION]: "소통/친구 사귀기",
				[CategoryEnum.EXCHANGE]: "언어교환",
				[CategoryEnum.FREE]: "자유",
			};
			return enumMap[enumValue] || enumValue;
		};

		setSelectedCategory(categoryEnumToKorean(filteredPurpose));
		setSelectedHobby(filteredHobby);

		console.log(hobbiesContent);
		console.log(purposesContent);
		console.log(languageContent);
		console.log(isPublicContent);
		console.log(maxCountContent);
	}, []);

	const [originalProfile] = useState(profileData);
	const [nicknameValid, setNicknameValid] = useState(null);
	const [nicknameInput, setNicknameInput] = useState(nicknameContent || "");
	const [bioInput, setBioInput] = useState(bioContent || "");
	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState(languageContent);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [selected, setSelected] = useState(
		isPublicContent ? "공개" : "비공개",
	);
	const [passwordInput, setPasswordInput] = useState("");
	const [maxCount, setMaxCount] = useState(maxCountContent);

	const reportTypes = ["공개", "비공개"];

	const hobby = [
		"SNS",
		"OTT",
		"캠핑",
		"쇼핑",
		"드라이브",
		"산책",
		"반려동물",
		"스포츠",
		"K-POP",
		"사진",
		"음악",
		"드라마",
		"독서",
		"그림",
		"요리",
		"만화",
		"언어공부",
		"여행",
		"악기연주",
		"영화",
		"맛집",
	];
	const languages = [
		"English / English",
		"中文 / Chinese",
		"日本語 / Japanese",
		"Español / Spanish",
		"한국어 / Korean",
		"기타",
	];

	const categories = ["소통/친구 사귀기", "언어교환", "자유"];

	const defaultLanguages =
		languageContent.length === 0 ? ["", "", "", "", ""] : languageContent;

	const [isCheckedList, setIsCheckedList] = useState(
		languages.map((lang) => defaultLanguages.includes(lang)),
	);

	const defaultCategories =
		purposesContent.length === 0 ? ["", "", ""] : purposesContent;

	const [isCategoryCheckedList, setIsCategoryCheckedList] = useState(
		categories.map((lang) => defaultCategories.includes(lang)),
	);

	const size = 3;

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

	const handleSelectCategory = (index) => {
		setIsCategoryCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});

		const category = categories[index];
		if (isCategoryCheckedList[index]) {
			setSelectedCategory(
				selectedCategory.filter((item) => item !== category),
			);
		} else {
			setSelectedCategory([...selectedCategory, category]);
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

	const handleRadioButtonSelect = (value) => {
		setSelected(value);
	};

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
				selectedHobby.length > 0 &&
				selectedHobby !== originalProfile.hobbies
			) {
				formData.append("hobbies", selectedHobby);
			}
			if (
				selectedCategory.length > 0 &&
				selectedCategory !== originalProfile.purposes
			) {
				formData.append("purposes", selectedCategory);
			}
			if (
				selectedLanguage.length > 0 &&
				selectedLanguage !== originalProfile.languages
			) {
				formData.append("languages", selectedLanguage);
			}
			if (
				(selected === "공개" ? true : false) !==
				originalProfile.isPublic
			) {
				formData.append("isPublic", selected === "공개" ? true : false);
				if (selected === "비공개") {
					formData.append("password", passwordInput);
				}
			}
			if (maxCount >= countContent) {
				formData.append("maxCount", maxCount);
			}
			await updateGroupProfile(formData);
			navigation.navigate("ModifyGroupProfilePage");
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"프로필 변경 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView style={ModifyGroupProfileInputStyles.container}>
			<ModifyProfileTopBar topBar={title} onPress={updateProfile} />

			{nicknameContent || bioContent ? (
				<View
					style={
						ModifyGroupProfileInputStyles.containerBackgroundWhite
					}
				>
					<View style={ModifyGroupProfileInputStyles.backgroundWhite}>
						<Text style={ModifyGroupProfileInputStyles.textTitle}>
							{title}
						</Text>

						{nicknameContent && (
							<>
								<TextInput
									style={[
										ModifyGroupProfileInputStyles.textInput,
										{ color: CustomTheme.primaryMedium },
									]}
									onChangeText={handleNicknameChange}
									value={nicknameInput}
									maxLength={12}
								/>
								<Text
									style={
										ModifyGroupProfileInputStyles.textCount
									}
								>
									{nicknameInput.length} / 12
								</Text>
							</>
						)}

						{bioContent && (
							<>
								<TextInput
									style={
										ModifyGroupProfileInputStyles.textInput
									}
									onChangeText={setBioInput}
									value={bioInput}
									multiline={true}
									maxLength={60}
								/>
								<Text
									style={
										ModifyGroupProfileInputStyles.textCount
									}
								>
									{bioInput.length} / 60
								</Text>
							</>
						)}
					</View>
				</View>
			) : null}

			{nicknameInput.length > 0 &&
				typeof nicknameValid === "boolean" &&
				(nicknameValid ? (
					<Text
						style={
							ModifyGroupProfileInputStyles.textAvailableNickname
						}
					>
						사용 가능한 닉네임이에요.
					</Text>
				) : (
					<Text
						style={
							ModifyGroupProfileInputStyles.textUnavailableNickname
						}
					>
						이미 사용 중인 닉네임이에요.
					</Text>
				))}

			{hobbiesContent.length > 0 && purposesContent.length > 0 && (
				<ScrollView>
					<Text style={ModifyGroupProfileInputStyles.textTagTitle}>
						주제
					</Text>
					<View style={ModifyGroupProfileInputStyles.line} />
					<View
						style={ModifyGroupProfileInputStyles.infoTextContainer}
					>
						<InfoCircle />
						<Text style={ModifyGroupProfileInputStyles.infoText}>
							최대 3개까지 선택 가능
						</Text>
					</View>
					<View>
						{hobbyRows.map((row, rowIndex) => (
							<View
								key={rowIndex}
								style={
									ModifyGroupProfileInputStyles.containerRow
								}
							>
								{row.map((type, typeIndex) => (
									<FilterCategory
										key={typeIndex}
										text={type}
										hobbyCount={selectedHobby.length}
										onPress={() => handleSelectHobby(type)}
										selected={selectedHobby.includes(type)}
									/>
								))}
							</View>
						))}
					</View>

					<Text style={ModifyGroupProfileInputStyles.textTagTitle}>
						유형
					</Text>
					<View style={ModifyGroupProfileInputStyles.line} />
					{categories.map((category, index) => (
						<Checkbox
							key={index}
							checked={isCategoryCheckedList[index]}
							onPress={() => handleSelectCategory(index)}
							text={category}
						/>
					))}
				</ScrollView>
			)}

			{languageContent.length > 0 && (
				<View style={ModifyGroupProfileInputStyles.checkbox}>
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

			{isPublicContent != null && (
				<View
					style={
						ModifyGroupProfileInputStyles.containerRadioButtonGroup
					}
				>
					<RadioButtonGroup
						values={reportTypes}
						value={selected}
						onValueChange={handleRadioButtonSelect}
					/>
					{selected === "비공개" && (
						<TextInput
							style={
								ModifyGroupProfileInputStyles.textInputPassword
							}
							placeholder="숫자 5자리 비밀번호를 입력해주세요"
							value={passwordInput}
							onChangeText={setPasswordInput}
							maxLength={5}
							keyboardType="numeric"
						/>
					)}
				</View>
			)}

			{maxCountContent != null && (
				<View style={ModifyGroupProfileInputStyles.containerSlider}>
					<View>
						<Slider
							style={{
								width: 200,
								height: 40,
							}}
							minimumValue={3}
							maximumValue={30}
							step={1}
							value={maxCount}
							onValueChange={(value) => setMaxCount(value)}
							minimumTrackTintColor={CustomTheme.primaryMedium}
							thumbTintColor={CustomTheme.primaryMedium}
							maximumTrackTintColor={CustomTheme.bgList}
						/>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
							}}
						>
							<Text
								style={
									ModifyGroupProfileInputStyles.textMinMaxCount
								}
							>
								3
							</Text>
							<Text
								style={
									ModifyGroupProfileInputStyles.textMinMaxCount
								}
							>
								30
							</Text>
						</View>
					</View>
					<Text style={ModifyGroupProfileInputStyles.textHeadcount}>
						{maxCount}명 제한
					</Text>
				</View>
			)}
		</SafeAreaView>
	);
};

export default ModifyGroupProfileInputPage;
