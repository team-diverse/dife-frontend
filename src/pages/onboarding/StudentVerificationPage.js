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
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import StudentVerificationStyles from "@pages/onboarding/StudentVerificationStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";
import { updateMyProfile } from "config/api";

import Progress6 from "@components/onboarding/Progress6";
import ArrowRight from "@components/common/ArrowRight";
import BackgroundOnkookminUpload from "@components/onboarding/BackgroundOnkookminUpload";
import IconOnkookminUpload from "@components/onboarding/IconOnkookminUpload";
import ApplyButton from "@components/common/ApplyButton";
import * as Sentry from "@sentry/react-native";

const StudentVerificationPage = () => {
	const { t } = useTranslation();

	const [isModalVisible, setModalVisible] = useState(true);
	const navigation = useNavigation();
	const [image, setImage] = useState(null);

	const handleGoBack = () => {
		navigation.goBack();
	};

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

	const { onboardingData } = useOnboarding();

	const handleOnboarding = async () => {
		const formData = new FormData();
		formData.append("username", onboardingData.username);
		formData.append("country", onboardingData.country);
		formData.append("bio", onboardingData.bio);
		formData.append("mbti", onboardingData.mbti);
		formData.append("hobbies", JSON.stringify(onboardingData.hobbies));
		formData.append("languages", onboardingData.languages);
		const memberId = onboardingData.id;

		if (onboardingData.profileImg) {
			const file = {
				uri: onboardingData.profileImg,
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
			await updateMyProfile(formData);
			navigation.navigate("CompleteProfile");
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
		<SafeAreaView style={StudentVerificationStyles.container}>
			<Modal
				transparent={true}
				visible={isModalVisible}
				onRequestClose={toggleModal}
			>
				<View style={StudentVerificationStyles.modalBackground}>
					<View style={StudentVerificationStyles.modal}>
						<View
							style={
								StudentVerificationStyles.containerModalContent
							}
						>
							<Image
								style={StudentVerificationStyles.imageModal}
								source={require("@assets/images/onboardingExample.png")}
							/>
							<Text style={StudentVerificationStyles.textModal}>
								{t("uploadInstructions")}
							</Text>
						</View>
						<View
							style={StudentVerificationStyles.buttonModalCheck}
						>
							<View style={StudentVerificationStyles.applyButton}>
								<ApplyButton
									text={t("completeButtonText")}
									onPress={toggleModal}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>

			<TouchableOpacity onPress={handleGoBack}>
				<ArrowRight
					style={StudentVerificationStyles.iconArrow}
					color={CustomTheme.textPrimary}
				/>
			</TouchableOpacity>
			<View style={[StudentVerificationStyles.iconProgress]}>
				<Progress6 />
			</View>
			<Text style={StudentVerificationStyles.textTitle}>
				{t("studentVerificationTitle")}
			</Text>
			{image ? (
				<TouchableOpacity
					style={StudentVerificationStyles.containerUploadOnkookmin}
					onPress={pickImage}
				>
					<Image
						source={{ uri: image }}
						style={StudentVerificationStyles.imageOnkookmin}
					/>
					<IconOnkookminUpload
						style={StudentVerificationStyles.iconUploadOnkookmin}
					/>
					<Text style={StudentVerificationStyles.textUploadOnkookmin}>
						{t("reuploadButtonText")}
					</Text>
					<BackgroundOnkookminUpload />
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					style={StudentVerificationStyles.containerUploadOnkookmin}
					onPress={pickImage}
				>
					<IconOnkookminUpload
						style={StudentVerificationStyles.iconUploadOnkookmin}
					/>
					<Text style={StudentVerificationStyles.textUploadOnkookmin}>
						{t("uploadButtonText")}
					</Text>
					<BackgroundOnkookminUpload />
				</TouchableOpacity>
			)}
			<View
				style={[
					StudentVerificationStyles.buttonCheck,
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

export default StudentVerificationPage;
