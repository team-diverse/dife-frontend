import React, { useEffect, useState } from "react";
import {
	View,
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
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import ProfileStyles from "@pages/onboarding/ProfileStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress2 from "@components/onboarding/Progress2";
import ApplyButton from "@components/common/ApplyButton";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";

const ProfilePage = ({ route }) => {
	const { t } = useTranslation();

	const { selectedCountry, selectedCountryCode } = route.params || {};
	const { onboardingData, updateOnboardingData } = useOnboarding();

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const [image, setImage] = useState(onboardingData.profileImg || null);
	const [text, setText] = useState(onboardingData.bio || "");
	const [nation, setNation] = useState(onboardingData.country || "");

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

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

	useEffect(() => {
		updateOnboardingData({
			profileImg: image,
			country: nation,
			countryCode: selectedCountryCode,
			bio: text,
		});
	}, [image, nation, selectedCountryCode, text]);

	useEffect(() => {
		setNation(selectedCountry || onboardingData.country || "");
	}, [selectedCountry, onboardingData.country]);

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
							{t("profileCreationTitle")}
						</Text>
						<Text style={ProfileStyles.textSubTitle}>
							{t("profilePictureSubtitle")}
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
								{t("nationality")}
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
										{t("selectNationality")}
									</Text>
								)}
							</TouchableOpacity>
						</View>
						<Text style={ProfileStyles.textNationIntroduction}>
							{t("bio")}
						</Text>
						<View style={ProfileStyles.containerTextInput}>
							<TextInput
								style={ProfileStyles.textInputIntroduction}
								placeholder={t("bioPlaceholder")}
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
								text={t("nextButton")}
								onPress={() =>
									navigation.navigate("ProfileMbti")
								}
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
