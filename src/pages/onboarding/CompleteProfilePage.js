import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import CompleteProfileStyles from "@pages/onboarding/CompleteProfileStyles";

import IconLoading from "@components/onboarding/IconLoading";
import ApplyButton from "@components/common/ApplyButton";

const CompleteProfilePage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

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
			<View style={CompleteProfileStyles.buttonCheck}>
				<ApplyButton
					text={t("confirmButtonText")}
					onPress={() => navigation.navigate("LoadingVerification")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default CompleteProfilePage;
