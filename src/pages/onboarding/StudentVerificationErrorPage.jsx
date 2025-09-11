import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import StudentVerificationErrorStyles from "@pages/onboarding/StudentVerificationErrorStyles";

import IconCancel from "@components/common/IconCancel";
import IconStudentVerificationError from "@components/onboarding/IconStudentVerificationError";

const StudentVerificationErrorPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const handleCancel = () => {
		navigation.navigate("LoginPage");
	};

	return (
		<SafeAreaView style={StudentVerificationErrorStyles.container}>
			<Image
<<<<<<< HEAD
				style={[StudentVerificationErrorStyles.imageBackgroud]}
=======
				style={StudentVerificationErrorStyles.imageBackgroud}
				// eslint-disable-next-line @typescript-eslint/no-require-imports
>>>>>>> af6c753 (fix: 탭 글씨와 아이콘이 안 뜨는 문제 해결을 위해 커스텀 탭바 구현 (#293))
				source={require("@assets/images/BlurHomePage.png")}
			/>
			<View style={StudentVerificationErrorStyles.modalBackground}>
				<View style={StudentVerificationErrorStyles.modal}>
					<TouchableOpacity
						style={StudentVerificationErrorStyles.iconCancel}
						onPress={handleCancel}
					>
						<IconCancel />
					</TouchableOpacity>
					<View
						style={
							StudentVerificationErrorStyles.containerModalContent
						}
					>
						<Text style={StudentVerificationErrorStyles.textModal}>
							{t("studentVerificationErrorTitle")}
						</Text>
						<View
							style={StudentVerificationErrorStyles.iconLoading}
						>
							<IconStudentVerificationError />
						</View>
						<Text style={StudentVerificationErrorStyles.textModal}>
							{t("retryInstructions")}
						</Text>
						<Text
							style={StudentVerificationErrorStyles.textMove}
							onPress={() => navigation.navigate("Login")}
						>
							{t("retryButtonText")}
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default StudentVerificationErrorPage;
