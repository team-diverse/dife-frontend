import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";
import { useTranslation } from "react-i18next";

import TremsStyles from "@pages/member/TremsStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";

const TremsPage = () => {
	const { t } = useTranslation();

	return (
		<SafeAreaView style={TremsStyles.container}>
			<TopBar
				topBar={t("termsPrivacy")}
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView contentContainerStyle={TremsStyles.scrollView}>
				<Text style={TremsStyles.textTremsTitle}>
					{t("terms.title")}
					{"\n"}
					{t("terms.subTitle")}
					{"\n"}
				</Text>
				<Text style={TremsStyles.textTrems}>
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}
						{t("terms.policy")}{" "}
					</Text>
					{t("terms.policyContent")}
					{"\n"}
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}
						{t("terms.privacy")}{" "}
					</Text>
					{t("terms.privacyContent")}
					{"\n"}
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}
						{t("terms.accountDeletion")}{" "}
					</Text>
					{t("terms.accountDeletionContent")}
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TremsPage;
