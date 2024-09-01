import React, { useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import LoadingVerificationStyles from "@pages/onboarding/LoadingVerificationStyles";
import IconLoading from "@components/onboarding/IconLoading";
import Checkbox from "@components/common/Checkbox";

const LoadingVerificationPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const [isChecked, setIsChecked] = useState(false);

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	return (
		<SafeAreaView style={LoadingVerificationStyles.container}>
			<Image
				style={[LoadingVerificationStyles.imageBackgroud]}
				source={require("@assets/images/BlurHomePage.png")}
			/>
			<View style={LoadingVerificationStyles.modalBackground}>
				<View style={LoadingVerificationStyles.modal}>
					<View
						style={LoadingVerificationStyles.containerModalContent}
					>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationTitle")}
						</Text>
						<View style={LoadingVerificationStyles.iconLoading}>
							<IconLoading />
						</View>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription")}
						</Text>
						<View
							style={LoadingVerificationStyles.checkboxRememberMe}
						>
							<Checkbox
								checked={isChecked}
								onPress={() => {
									handlePress();
								}}
								text={t("receiveNotification")}
								basic="true"
							/>
						</View>
						<Text
							style={LoadingVerificationStyles.textMove}
							onPress={() => navigation.navigate("Login")}
						>
							{t("returnToLogin")}
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoadingVerificationPage;
