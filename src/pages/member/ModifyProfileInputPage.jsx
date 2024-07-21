import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";

import ModifyProfileInputStyles from "@pages/member/ModifyProfileInputStyles";
import { CustomTheme } from "@styles/CustomTheme";

import ModifyProfileTopBar from "@components/common/ModifyProfileTopBar";
import FilterCategory from "@components/connect/FilterCategory";
import InfoCircle from "@components/common/InfoCircle";
import Checkbox from "@components/common/Checkbox";

const ModifyProfileInputPage = ({ route }) => {
	const {
		title,
		nicknameContent,
		bioContent,
		tagContent = [],
		languageContent = [],
	} = route.params;

	const [nicknameInput, setNicknameInput] = useState(nicknameContent);
	const [bioInput, setBioInput] = useState(bioContent);
	const [selectedHobby, setSelectedHobby] = useState(tagContent);
	const [selectedLanguage, setSelectedLanguage] = useState(languageContent);

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
	];

	const [isCheckedList, setIsCheckedList] = useState(
		languages.map((lang) => languageContent.includes(lang)),
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

	return (
		<SafeAreaView style={ModifyProfileInputStyles.container}>
			<ModifyProfileTopBar topBar={title} />

			{(nicknameContent || bioContent) && (
				<View style={ModifyProfileInputStyles.containerBackgroundWhite}>
					<View style={ModifyProfileInputStyles.backgroundWhite}>
						<Text style={ModifyProfileInputStyles.textTitle}>
							{title}
						</Text>
						{nicknameContent && (
							<TextInput
								style={[
									ModifyProfileInputStyles.textInput,
									{ color: CustomTheme.primaryMedium },
								]}
								onChangeText={setNicknameInput}
								value={nicknameInput}
								defaultValue={nicknameContent}
							/>
						)}
						{bioContent && (
							<>
								<TextInput
									style={ModifyProfileInputStyles.textInput}
									onChangeText={setBioInput}
									value={bioInput}
									defaultValue={bioContent}
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

			{tagContent.length > 0 && (
				<>
					<View style={ModifyProfileInputStyles.infoTextContainer}>
						<InfoCircle />
						<Text style={ModifyProfileInputStyles.infoText}>
							최대 3개까지 선택 가능
						</Text>
					</View>
					<View>
						{hobbyRows.map((row, rowIndex) => (
							<View
								key={rowIndex}
								style={ModifyProfileInputStyles.containerRow}
							>
								{row.map((type, typeIndex) => (
									<FilterCategory
										key={typeIndex}
										text={type}
										hobbyCnt={selectedHobby.length}
										onPress={() => handleSelectHobby(type)}
										selected={selectedHobby.includes(type)}
									/>
								))}
							</View>
						))}
					</View>
				</>
			)}

			{languageContent.length > 0 && (
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
		</SafeAreaView>
	);
};

export default ModifyProfileInputPage;
