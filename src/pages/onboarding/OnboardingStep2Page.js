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

import OnboardingStep2Styles from "@pages/onboarding/OnboardingStep2Styles";
import { CustomTheme } from "@styles/CustomTheme";

import ApplyButton from "@components/common/ApplyButton";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";

const OnboardingStep2Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const [image, setImage] = useState(stepData[2].image || null);
	const [bio, setBio] = useState(stepData[2].bio || "");
	const [nation, setNotion] = useState(stepData[2].selectedCountry || "");

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
		setNotion(stepData[2].selectedCountry);
	}, [stepData[2].selectedCountry]);

	const handleProfileSubmit = () => {
		saveData(2, { image, bio });
		goToNext(3);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<TouchableWithoutFeedback onPress={handleKeyboard}>
					<SafeAreaView style={OnboardingStep2Styles.container}>
						<Text style={OnboardingStep2Styles.textTitle}>
							{t("profileCreationTitle")}
						</Text>
						<Text style={OnboardingStep2Styles.textSubTitle}>
							{t("profilePictureSubtitle")}
						</Text>
						{image ? (
							<View style={OnboardingStep2Styles.containerImage}>
								<Image
									source={{ uri: image }}
									style={OnboardingStep2Styles.imageProfile}
								/>
								<IconProfileBorder
									style={OnboardingStep2Styles.imageBorder}
								/>
								<TouchableOpacity onPress={pickImage}>
									<IconProfileChange />
								</TouchableOpacity>
							</View>
						) : (
							<TouchableOpacity
								style={OnboardingStep2Styles.containerImage}
								onPress={pickImage}
							>
								<IconProfileUpload />
							</TouchableOpacity>
						)}
						<View style={OnboardingStep2Styles.containerNation}>
							<Text
								style={[
									OnboardingStep2Styles.textNationIntroduction,
									{ marginLeft: 0 },
								]}
							>
								{t("nationality")}
							</Text>
							<TouchableOpacity
								style={
									OnboardingStep2Styles.containerNationInput
								}
								onPress={() =>
									navigation.navigate("CountrySelectionPage")
								}
							>
								{nation ? (
									<Text
										style={OnboardingStep2Styles.textNation}
									>
										{nation}
									</Text>
								) : (
									<Text
										style={[
											OnboardingStep2Styles.textNation,
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
						<Text
							style={OnboardingStep2Styles.textNationIntroduction}
						>
							{t("bio")}
						</Text>
						<View style={OnboardingStep2Styles.containerTextInput}>
							<TextInput
								style={
									OnboardingStep2Styles.textInputIntroduction
								}
								placeholder={t("bioPlaceholder")}
								onChangeText={setBio}
								value={bio}
								multiline={true}
								maxLength={60}
							/>
							<Text
								style={
									OnboardingStep2Styles.textIntroductionCount
								}
							>
								{bio.length}/60
							</Text>
						</View>
						<View style={OnboardingStep2Styles.buttonCheck}>
							<ApplyButton
								text={t("nextButton")}
								onPress={handleProfileSubmit}
								disabled={!nation}
							/>
						</View>
					</SafeAreaView>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default OnboardingStep2Page;
