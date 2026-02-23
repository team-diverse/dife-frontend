import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Modal,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import TextInput from "@components/common/TextInput";

import OnboardingStep2Styles from "@pages/onboarding/OnboardingStep2Styles";
import { CustomTheme } from "@styles/CustomTheme";

import ApplyButton from "@components/common/ApplyButton";
import IconProfileUpload from "@components/onboarding/IconProfileUpload";
import IconProfileChange from "@components/onboarding/IconProfileChange";
import IconProfileBorder from "@components/onboarding/IconProfileBorder";

const BIRTH_MAX_DIGITS = 8;
const BIRTH_PLACEHOLDER_FORMAT = "YYYY-MM-DD";

const formatBirthDateInput = (value) => {
	const digits = String(value).replace(/\D/g, "").slice(0, BIRTH_MAX_DIGITS);

	if (digits.length <= 4) return digits;
	if (digits.length <= 6) {
		return `${digits.slice(0, 4)}-${digits.slice(4)}`;
	}

	return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
};

const OnboardingStep2Page = ({ goToNext, saveData, stepData }) => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const [image, setImage] = useState(stepData[2].image || null);
	const [birth, setBirth] = useState(
		formatBirthDateInput(stepData[2].birth || ""),
	);
	const [isBirthFocused, setIsBirthFocused] = useState(false);
	const [bio, setBio] = useState(stepData[2].bio || "");
	const [nation, setNation] = useState(
		stepData[2].nation || stepData[2].selectedCountry || "",
	);
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

	const handleBirthChange = (value) => {
		setBirth(formatBirthDateInput(value));
	};

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
		if (stepData[2].selectedCountry) {
			setNation(stepData[2].selectedCountry);
		}
	}, [stepData[2].selectedCountry]);

	const handleConfirmProfileSubmit = () => {
		setIsConfirmModalVisible(false);
		saveData(2, { image, birth, bio, nation: nation });
		goToNext(3);
	};

	const handleOpenConfirmModal = () => {
		handleKeyboard();
		setIsConfirmModalVisible(true);
	};

	const handleCloseConfirmModal = () => {
		setIsConfirmModalVisible(false);
	};

	const birthDigitsLength = birth.replace(/\D/g, "").length;

	return (
		<>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<TouchableWithoutFeedback onPress={handleKeyboard}>
					<View style={OnboardingStep2Styles.container}>
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
						<View style={OnboardingStep2Styles.containerBirthDate}>
							<Text
								style={[
									OnboardingStep2Styles.textNationIntroduction,
									{ marginLeft: 0 },
								]}
							>
								{t("birthDate")}
							</Text>
							<TextInput
								style={OnboardingStep2Styles.textInputBirthDate}
								placeholder={
									isBirthFocused
										? BIRTH_PLACEHOLDER_FORMAT
										: t("birthDatePlaceholder")
								}
								placeholderTextColor={CustomTheme.borderColor}
								onChangeText={handleBirthChange}
								onFocus={() => setIsBirthFocused(true)}
								onBlur={() => setIsBirthFocused(false)}
								value={birth}
								keyboardType="number-pad"
								maxLength={10}
							/>
						</View>
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
								onPress={handleOpenConfirmModal}
								disabled={!nation || birthDigitsLength !== 8}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>

			<Modal
				animationType="fade"
				transparent={true}
				visible={isConfirmModalVisible}
				onRequestClose={handleCloseConfirmModal}
			>
				<TouchableWithoutFeedback onPress={handleCloseConfirmModal}>
					<View style={OnboardingStep2Styles.modalBackdrop}>
						<TouchableWithoutFeedback onPress={() => {}}>
							<View style={OnboardingStep2Styles.modalContainer}>
								<Text style={OnboardingStep2Styles.modalTitle}>
									{t("profileSubmitConfirmTitle")}
								</Text>
								<Text style={OnboardingStep2Styles.modalDescription}>
									{t("profileSubmitConfirmDescription")}
								</Text>
								<View style={OnboardingStep2Styles.modalButtonRow}>
									<TouchableOpacity
										style={[
											OnboardingStep2Styles.modalButton,
											{
												borderWidth: 1,
												borderColor: CustomTheme.primaryMedium,
											},
										]}
										onPress={handleCloseConfirmModal}
									>
										<Text
											style={
												OnboardingStep2Styles.modalPrevButtonText
											}
										>
											{t("previousButtonText")}
										</Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={[
											OnboardingStep2Styles.modalButton,
											OnboardingStep2Styles.modalButtonSpacing,
											{
												backgroundColor:
													CustomTheme.primaryMedium,
											},
										]}
										onPress={handleConfirmProfileSubmit}
									>
										<Text
											style={
												OnboardingStep2Styles.modalConfirmButtonText
											}
										>
											{t("confirmButtonText")}
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</>
	);
};

export default OnboardingStep2Page;
