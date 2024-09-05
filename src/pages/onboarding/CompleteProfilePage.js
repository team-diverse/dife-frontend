import React from "react";
import { View, Text, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CompleteProfileStyles from "@pages/onboarding/CompleteProfileStyles";

import IconLoading from "@components/onboarding/IconLoading";
import ApplyButton from "@components/common/ApplyButton";

const CompleteProfilePage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const { height: screenHeight } = Dimensions.get("window");
	const isSmallScreen = screenHeight < 700;

	return (
		<SafeAreaView style={[CompleteProfileStyles.container]}>
			<Text style={CompleteProfileStyles.textTitle}>
				{t("profileCompletionTitle")}
			</Text>
			<Text style={CompleteProfileStyles.textSubTitle}>
				{t("profileCompletionDescription")}
			</Text>
			<View style={CompleteProfileStyles.iconLoading}>
				<IconLoading />
			</View>
			<View
				style={[
					CompleteProfileStyles.buttonCheck,
					isSmallScreen && { bottom: 30 },
				]}
			>
				<ApplyButton
					text={t("confirmButtonText")}
					onPress={() => navigation.navigate("LoadingVerification")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CompleteProfilePage;
