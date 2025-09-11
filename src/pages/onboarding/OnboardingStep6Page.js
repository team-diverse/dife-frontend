import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Modal,
	Alert,
	Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

import OnboardingStep6Styles from "@pages/onboarding/OnboardingStep6Styles";
import { updateMyProfile } from "config/api";

import BackgroundOnkookminUpload from "@components/onboarding/BackgroundOnkookminUpload";
import IconOnkookminUpload from "@components/onboarding/IconOnkookminUpload";
import ApplyButton from "@components/common/ApplyButton";

const OnboardingStep6Page = ({ stepData, saveData }) => {
	const { t } = useTranslation();

	const [isModalVisible, setModalVisible] = useState(true);
	const navigation = useNavigation();
	const [image, setImage] = useState(null);

	const toggleModal = () => {
		setModalVisible(!isModalVisible);
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

	const handleOnboarding = async () => {
		saveData(6, { image });
		const formData = new FormData();
		formData.append("username", stepData[1].nickname);
		formData.append("country", stepData[2].nation);
		formData.append("bio", stepData[2].bio);
		if (stepData[3].selectedMBTI !== t("mbtiNoneOption")) {
			formData.append("mbti", stepData[3].selectedMBTI);
		}
		formData.append("hobbies", stepData[4].selectedHobby);
		formData.append("languages", stepData[5].selectedLanguages);
		const memberId = await SecureStore.getItemAsync("memberId");

		if (stepData[2].image) {
			const file = {
				uri: stepData[2].image,
				type: "image/jpeg",
				name: `${memberId}_profile.jpg`,
			};
			formData.append("profileImg", file);
		}
		if (image) {
			const file = {
				uri: image,
				type: "image/jpeg",
				name: `${memberId}_verification.jpg`,
			};
			formData.append("verificationFile", file);
		}

		try {
			navigation.replace("CompleteProfilePage");
			await updateMyProfile(formData);
			console.log(formData);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"온보딩 저장 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={OnboardingStep6Styles.container}>
			<Modal
				transparent={true}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<View style={OnboardingStep6Styles.modalBackground}>
					<View style={OnboardingStep6Styles.modal}>
						<View
							style={OnboardingStep6Styles.containerModalContent}
						>
							<Image
								style={OnboardingStep6Styles.imageModal}
								// eslint-disable-next-line @typescript-eslint/no-require-imports
								source={require("@assets/images/onboardingExample.png")}
							/>
							<Text style={OnboardingStep6Styles.textModal}>
								{t("uploadInstructions")}
							</Text>
						</View>
						<View style={OnboardingStep6Styles.buttonModalCheck}>
							<View style={OnboardingStep6Styles.applyButton}>
								<ApplyButton
									text={t("completeButtonText")}
									onPress={toggleModal}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>

			<Text style={OnboardingStep6Styles.textTitle}>
				{t("studentVerificationTitle")}
			</Text>
			{image ? (
				<TouchableOpacity
					style={OnboardingStep6Styles.containerUploadOnkookmin}
					onPress={pickImage}
				>
					<Image
						source={{ uri: image }}
						style={OnboardingStep6Styles.imageOnkookmin}
					/>
					<IconOnkookminUpload
						style={OnboardingStep6Styles.iconUploadOnkookmin}
					/>
					<Text style={OnboardingStep6Styles.textUploadOnkookmin}>
						{t("reuploadButtonText")}
					</Text>
					<BackgroundOnkookminUpload />
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={OnboardingStep6Styles.containerUploadOnkookmin}
					onPress={pickImage}
				>
					<IconOnkookminUpload
						style={OnboardingStep6Styles.iconUploadOnkookmin}
					/>
					<Text style={OnboardingStep6Styles.textUploadOnkookmin}>
						{t("uploadButtonText")}
					</Text>
					<BackgroundOnkookminUpload />
				</TouchableOpacity>
			)}
			<View
				style={[
					OnboardingStep6Styles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("completeButtonText")}
					onPress={handleOnboarding}
					disabled={!image}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OnboardingStep6Page;
