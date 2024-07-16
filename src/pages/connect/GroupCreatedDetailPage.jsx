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
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import GroupCreatedDetailStyles from "@pages/connect/GroupCreatedDetailStyles";

import TopBar from "@components/common/TopBar";
import InfoCircle from "@components/common/InfoCircle";
import FilterCategory from "@components/connect/FilterCategory";
import Checkbox from "@components/common/Checkbox";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";
import BottomTwoButtons from "@components/common/BottomTwoButtons";

const GroupCreatedDetailPage = () => {
	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const [isCheckedList, setIsCheckedList] = useState([
		false,
		false,
		false,
		false,
		false,
	]);

	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);

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

	const categories = ["소통/친구 사귀기", "언어교환", "자유"];

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

	const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);
	const multiSliderValuesChange = (values) => setMultiSliderValue(values);

	const reportTypes = ["공개", "비공개"];
	const [selected, setSelected] = useState("");
	const handleRadioButtonSelect = (value) => {
		setSelected(value);
	};
	const [passwordInput, setPasswordInput] = useState("");

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={GroupCreatedDetailStyles.container}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "padding" : "height"}
					style={GroupCreatedDetailStyles.container}
				>
					<TopBar topBar="그룹 채팅방 만들기" color="#000" />
					<ScrollView>
						<View style={{ marginTop: 26 }}>
							<Text
								style={
									GroupCreatedDetailStyles.textGroupChatSetting
								}
							>
								채팅방 설정
							</Text>
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								주제
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									최대 4개까지 선택 가능
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
												hobbyCnt={selectedHobby.length}
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
								언어
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									최대 2개까지 선택 가능
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
								유형
							</Text>
							<View
								style={
									GroupCreatedDetailStyles.infoTextContainer
								}
							>
								<InfoCircle />
								<Text style={GroupCreatedDetailStyles.infoText}>
									최대 2개까지 선택 가능
								</Text>
							</View>
							{categories.map((category, index) => (
								<Checkbox
									key={index}
									checked={isCheckedList[index]}
									onPress={() => handleSelectCategory(index)}
									text={category}
								/>
							))}
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								그룹 멤버 수 제한
							</Text>
							<View
								style={GroupCreatedDetailStyles.containerSlider}
							>
								<MultiSlider
									values={[
										multiSliderValue[0],
										multiSliderValue[1],
									]}
									sliderLength={216}
									onValuesChange={multiSliderValuesChange}
									min={3}
									max={30}
									step={1}
									allowOverlap
									snapped
								/>
								<Text
									style={
										GroupCreatedDetailStyles.textHeadcount
									}
								>
									{multiSliderValue[0]} ~{" "}
									{multiSliderValue[1]}명
								</Text>
							</View>
						</View>

						<View style={GroupCreatedDetailStyles.containerItem}>
							<Text style={GroupCreatedDetailStyles.textTitle}>
								공개 유무
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
								{selected === "비공개" && (
									<TextInput
										style={
											GroupCreatedDetailStyles.textInputPassword
										}
										placeholder="숫자 5자리 비밀번호를 입력해주세요"
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
							text="뒤로가기"
							onPress={() => navigation.goBack()}
						/>
						<View
							text="다음"
							onPress={() =>
								navigation.navigate("GroupProfilePreviewPage")
							}
						/>
					</BottomTwoButtons>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default GroupCreatedDetailPage;
