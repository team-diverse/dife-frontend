import React, { useEffect, useState, useRef } from "react";
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	Platform,
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
	const [keyboardHeight, setKeyboardHeight] = useState(0);
	const scrollViewRef = useRef(null);

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

	useEffect(() => {
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const showSubscription = Keyboard.addListener(showEvent, (event) => {
			setKeyboardHeight(event.endCoordinates?.height ?? 0);
		});
		const hideSubscription = Keyboard.addListener(hideEvent, () => {
			scrollViewRef.current?.scrollTo({ y: 0, animated: false });
			setKeyboardHeight(0);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

	useEffect(() => {
		const showEvent =
			Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
		const hideEvent =
			Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

		const showSubscription = Keyboard.addListener(showEvent, (event) => {
			setKeyboardHeight(event.endCoordinates?.height ?? 0);
		});
		const hideSubscription = Keyboard.addListener(hideEvent, () => {
			scrollViewRef.current?.scrollTo({ y: 0, animated: false });
			setKeyboardHeight(0);
		});

		return () => {
			showSubscription.remove();
			hideSubscription.remove();
		};
	}, []);

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
		<ScrollView
			ref={scrollViewRef}
			contentContainerStyle={[
				{ flexGrow: 1 },
				{
					paddingBottom:
						keyboardHeight > 0 ? keyboardHeight + 56 : 0,
				},
			]}
			keyboardShouldPersistTaps="handled"
			showsVerticalScrollIndicator={false}
			scrollEnabled={keyboardHeight > 0}
		>
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
							style={OnboardingStep2Styles.containerNationInput}
							onPress={() =>
								navigation.navigate("CountrySelectionPage")
							}
						>
							{nation ? (
								<Text style={OnboardingStep2Styles.textNation}>
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
					<Text style={OnboardingStep2Styles.textNationIntroduction}>
						{t("bio")}
					</Text>
					<View style={OnboardingStep2Styles.containerTextInput}>
						<TextInput
							style={OnboardingStep2Styles.textInputIntroduction}
							placeholder={t("bioPlaceholder")}
							onChangeText={setBio}
							value={bio}
							multiline={true}
							maxLength={60}
						/>
						<Text
							style={OnboardingStep2Styles.textIntroductionCount}
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
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
	);
};

export default OnboardingStep2Page;
