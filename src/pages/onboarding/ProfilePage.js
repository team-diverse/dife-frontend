import React, { useEffect, useState } from "react";
import {
	View,
	Image,
	Text,
	TextInput,
	SafeAreaView,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

import ProfileStyles from "@pages/onboarding/ProfileStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress2 from "@components/onboarding/Progress2";
import ApplyButton from "@components/common/ApplyButton";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";

const ProfilePage = ({ route }) => {
	const { selectedCountry, selectedCountryCode } = route.params || {};

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const ProfileData = ["프로필 생성하기", "프로필 사진"];
	const [image, setImage] = useState(null);
	const [text, setText] = useState("");
	const [nation, setNation] = useState("");

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

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

	const { updateOnboardingData } = useOnboarding();

	const handleDataSave = () => {
		updateOnboardingData({
			profileImg: image,
			country: nation,
			countryCode: selectedCountryCode,
			bio: text,
		});
		navigation.navigate("ProfileMbti");
	};

	useEffect(() => {
		setNation(selectedCountry);
	}, [selectedCountry]);

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<TouchableWithoutFeedback onPress={handleKeyboard}>
					<SafeAreaView style={ProfileStyles.container}>
						<TouchableOpacity onPress={handleGoBack}>
							<ArrowRight
								style={ProfileStyles.iconArrow}
								color={CustomTheme.textPrimary}
							/>
						</TouchableOpacity>
						<View style={[ProfileStyles.iconProgress]}>
							<Progress2 />
						</View>
						<Text style={ProfileStyles.textTitle}>
							{ProfileData[0]}
						</Text>
						<Text style={ProfileStyles.textSubTitle}>
							{ProfileData[1]}
						</Text>
						{image ? (
							<View style={ProfileStyles.containerImage}>
								<Image
									source={{ uri: image }}
									style={ProfileStyles.imageProfile}
								/>
								<IconProfileBorder
									style={ProfileStyles.imageBorder}
								/>
								<TouchableOpacity onPress={pickImage}>
									<IconProfileChange />
								</TouchableOpacity>
							</View>
						) : (
							<TouchableOpacity
								style={ProfileStyles.containerImage}
								onPress={pickImage}
							>
								<IconProfileUpload />
							</TouchableOpacity>
						)}
						<View style={ProfileStyles.containerNation}>
							<Text
								style={[
									ProfileStyles.textNationIntroduction,
									{ marginLeft: 0 },
								]}
							>
								국적
							</Text>
							<TouchableOpacity
								style={ProfileStyles.containerNationInput}
								onPress={() =>
									navigation.navigate("CountrySelectionPage")
								}
							>
								{nation ? (
									<Text style={ProfileStyles.textNation}>
										{nation}
									</Text>
								) : (
									<Text
										style={[
											ProfileStyles.textNation,
											{
												color: CustomTheme.borderColor,
											},
										]}
									>
										국적을 선택해주세요
									</Text>
								)}
							</TouchableOpacity>
						</View>
						<Text style={ProfileStyles.textNationIntroduction}>
							한줄소개
						</Text>
						<View style={ProfileStyles.containerTextInput}>
							<TextInput
								style={ProfileStyles.textInputIntroduction}
								placeholder="간단한 자기소개를 입력해주세요"
								onChangeText={setText}
								value={text}
								multiline={true}
								maxLength={60}
							/>
							<Text style={ProfileStyles.textIntroductionCount}>
								{text.length}/60
							</Text>
						</View>
						<View style={ProfileStyles.buttonCheck}>
							<ApplyButton
								text="다음"
								onPress={handleDataSave}
								disabled={!nation}
							/>
						</View>
					</SafeAreaView>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ProfilePage;
