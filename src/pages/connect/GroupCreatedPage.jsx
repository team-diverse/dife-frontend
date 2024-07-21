import React, { useState } from "react";
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

import GroupCreatedStyles from "@pages/connect/GroupCreatedStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import BottomTwoButtons from "@components/common/BottomTwoButtons";

const GroupCreatedPage = () => {
	const navigation = useNavigation();

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const [image, setImage] = useState(null);
	const [nameInput, setNameInput] = useState("");
	const [bioInput, setBioInput] = useState("");

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
			setImage(result.assets[0].uri);
		}
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={GroupCreatedStyles.container}>
				<TopBar
					topBar="그룹 채팅방 만들기"
					color="#000"
					backgroundColor={CustomTheme.primaryBg}
				/>

				<Text style={GroupCreatedStyles.textTitle}>프로필 사진</Text>
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
					<TouchableOpacity
						style={GroupCreatedStyles.containerImage}
						onPress={pickImage}
					>
						<IconProfileUpload />
					</TouchableOpacity>
				)}

				<Text style={GroupCreatedStyles.textTitle}>이름</Text>
				<View style={GroupCreatedStyles.containerTextInput}>
					<TextInput
						style={GroupCreatedStyles.textInputName}
						placeholder="그룹 이름을 입력해주세요"
						value={nameInput}
						onChangeText={setNameInput}
						maxLength={20}
					/>
					<Text style={GroupCreatedStyles.textCount}>
						{nameInput.length} / 20
					</Text>
				</View>

				<Text style={GroupCreatedStyles.textTitle}>한줄소개</Text>
				<View style={GroupCreatedStyles.containerTextInput}>
					<TextInput
						style={GroupCreatedStyles.textInputBio}
						placeholder="간단한 자기소개를 입력해주세요"
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
							text="뒤로가기"
							onPress={() => navigation.goBack()}
						/>
						<View
							text="다음"
							onPress={() =>
								navigation.navigate("GroupCreatedDetailPage")
							}
						/>
					</BottomTwoButtons>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default GroupCreatedPage;
