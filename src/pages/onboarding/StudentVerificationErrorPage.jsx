import React from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import StudentVerificationErrorStyles from "@pages/onboarding/StudentVerificationErrorStyles";

import IconCancel from "@components/common/IconCancel";
import IconStudentVerificationError from "@components/onboarding/IconStudentVerificationError";

const StudentVerificationErrorPage = () => {
	const navigation = useNavigation();

	const handleCancel = () => {
		navigation.navigate("LoginPage");
	};

	return (
		<SafeAreaView style={StudentVerificationErrorStyles.container}>
			<Image
				style={[StudentVerificationErrorStyles.imageBackgroud]}
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
							재학생 인증 오류
						</Text>
						<View
							style={StudentVerificationErrorStyles.iconLoading}
						>
							<IconStudentVerificationError />
						</View>
						<Text style={StudentVerificationErrorStyles.textModal}>
							재학생 인증을{"\n"}다시 한번 시도해주세요
						</Text>
						<Text
							style={StudentVerificationErrorStyles.textMove}
							onPress={() => navigation.navigate("Login")}
						>
							재학생 인증 재시도하기
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default StudentVerificationErrorPage;
