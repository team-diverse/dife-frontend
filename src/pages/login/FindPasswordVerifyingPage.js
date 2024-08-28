import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import FindPasswordVerifyingStyles from "@pages/login/FindPasswordVerifyingStyles";

import IconEmail from "@components/login/IconEmail";
import ApplyButton from "@components/common/ApplyButton";
import GoBack from "@components/common/GoBack";

const FindPasswordVerifyingPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
		<SafeAreaView style={[FindPasswordVerifyingStyles.container]}>
			<GoBack />
			<View style={FindPasswordVerifyingStyles.containerContent}>
				<IconEmail style={FindPasswordVerifyingStyles.iconEmail} />
				<Text style={FindPasswordVerifyingStyles.textTitle}>
					{t("emailVerificationTitle")}
				</Text>
				<Text style={FindPasswordVerifyingStyles.textSubTitle}>
					{t("emailVerificationSubtitle")}
				</Text>
				<View style={FindPasswordVerifyingStyles.buttonMove}>
					<ApplyButton
						text={t("loginPageButton")}
						onPress={() => navigation.navigate("Login")}
					/>
				</View>
				<TouchableOpacity>
					<Text
						style={FindPasswordVerifyingStyles.textReport}
						onPress={handleGoBack}
					>
						{t("resendEmailRequest")}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default FindPasswordVerifyingPage;
