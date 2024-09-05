import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TextInput,
	ScrollView,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { useTranslation } from "react-i18next";

import GroupCreatedDetailStyles from "@pages/connect/GroupCreatedDetailStyles";
import { useCreateGroup } from "src/states/CreateGroupDataContext.js";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import InfoCircle from "@components/common/InfoCircle";
import FilterCategory from "@components/connect/FilterCategory";
import Checkbox from "@components/common/Checkbox";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import BottomTwoButtons from "@components/common/BottomTwoButtons";

const GroupCreatedDetailPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [sliderValue, setSliderValue] = useState(3);

	const hobby = t("hobbyOptions", { returnObjects: true });
	const languages = t("languages", { returnObjects: true });
	const categories = t("categories", { returnObjects: true });

	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	const [isCategoryCheckedList, setIsCategoryCheckedList] = useState(
		new Array(categories.length).fill(false),
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
		if (selectedLanguage.length >= 2 && !isCheckedList[index]) {
			return;
		}
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
		if (selectedCategory.length >= 2 && !isCategoryCheckedList[index]) {
			return;
		}
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

	const reportTypes = [t("public"), t("private")];
	const [selected, setSelected] = useState("");
	const handleRadioButtonSelect = (value) => {
		setSelected(value);
	};
	const [passwordInput, setPasswordInput] = useState("");

	const { updateCreateGroupData } = useCreateGroup();

	const handleGroupInfo = () => {
		updateCreateGroupData({
			hobbies: selectedHobby,
			languages: selectedLanguage,
			purposes: selectedCategory,
			maxCount: sliderValue,
			isPublic: selected === t("public") ? true : false,
			groupPassword: passwordInput || null,
		});
		navigation.navigate("GroupProfilePreviewPage");
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={GroupCreatedDetailStyles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={GroupCreatedDetailStyles.container}
				>
					<TopBar topBar={t("createGroup")} color="#000" />
					<ScrollView>
						<View style={{ marginTop: 26 }}>
							<Text
								style={
									GroupCreatedDetailStyles.textGroupChatSetting
								}
							>
								{t("chatRoomSettings")}
							</Text>
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								{t("topics")}
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									{t("max4Selection")}
								</Text>
							</View>
							<View>
								{hobbyRows.map((row, rowIndex) => (
									<View
										key={rowIndex}
										style={
											GroupCreatedDetailStyles.containerRow
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
											/>
										))}
									</View>
								))}
							</View>
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								{t("language")}
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									{t("max2Selection")}
								</Text>
							</View>
							{languages.map((language, index) => (
								<Checkbox
									key={index}
									checked={isCheckedList[index]}
									onPress={() => handleSelectLanguage(index)}
									text={language}
								/>
							))}
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								{t("category")}
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									{t("max2Selection")}
								</Text>
							</View>
							{categories.map((category, index) => (
								<Checkbox
									key={index}
									checked={isCategoryCheckedList[index]}
									onPress={() => handleSelectCategory(index)}
									text={category}
								/>
							))}
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								{t("memberLimitTitle")}
							</Text>
							<View
								style={GroupCreatedDetailStyles.containerSlider}
							>
								<View>
									<Slider
										style={{ width: 200, height: 40 }}
										minimumValue={3}
										maximumValue={30}
										step={1}
										value={sliderValue}
										onValueChange={(value) =>
											setSliderValue(value)
										}
										minimumTrackTintColor={
											CustomTheme.primaryMedium
										}
										thumbTintColor={
											CustomTheme.primaryMedium
										}
										maximumTrackTintColor={
											CustomTheme.bgList
										}
									/>
									<View
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<Text
											style={
												GroupCreatedDetailStyles.textMinMaxCount
											}
										>
											3
										</Text>
										<Text
											style={
												GroupCreatedDetailStyles.textMinMaxCount
											}
										>
											30
										</Text>
									</View>
								</View>
								<Text
									style={
										GroupCreatedDetailStyles.textHeadcount
									}
								>
									{sliderValue}
									{t("membersLimit")}
								</Text>
							</View>
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								{t("visibility")}
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.containerRadioButtonGroup
								}
							>
								<RadioButtonGroup
									values={reportTypes}
									selected={selected}
									onValueChange={handleRadioButtonSelect}
								/>
								{selected === t("private") && (
									<TextInput
										style={
											GroupCreatedDetailStyles.textInputPassword
										}
										placeholder={t(
											"groupPasswordPlaceholder",
										)}
										value={passwordInput}
										onChangeText={setPasswordInput}
										maxLength={5}
										keyboardType="numeric"
									/>
								)}
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>

				<View style={GroupCreatedDetailStyles.bottomTwoButtons}>
					<BottomTwoButtons shadow="true">
						<View
							text={t("backButton")}
							onPress={() => navigation.goBack()}
						/>
						<View
							text={t("nextButton")}
							onPress={handleGroupInfo}
							disabled={
								selectedHobby.length === 0 ||
								selectedLanguage.length === 0 ||
								selectedCategory.length === 0 ||
								selected === "" ||
								(selected === t("private") &&
									passwordInput.length !== 5)
							}
						/>
					</BottomTwoButtons>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default GroupCreatedDetailPage;
