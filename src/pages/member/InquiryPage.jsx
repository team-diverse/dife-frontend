import React from "react";
import {
	SafeAreaView,
	View,
	Text,
	Linking,
	TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import InquiryStyles from "@pages/member/InquiryStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconEmail from "@components/login/IconEmail";

const InquiryPage = () => {
	const { t } = useTranslation();

	const handleEmailPress = async () => {
		const emailUrl = "mailto:dife.teamdiverse@gmail.com";

		try {
			await Linking.openURL(emailUrl);
		} catch (error) {
			console.error(
				"이메일 열기 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView style={InquiryStyles.container}>
			<TopBar
				topBar={t("inquiry")}
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={InquiryStyles.containerContent}>
				<IconEmail />
				<Text style={InquiryStyles.textTitle}>{t("emailInquiry")}</Text>
				<Text style={InquiryStyles.textContent}>
					{t("emailDescription")}
				</Text>

				<TouchableOpacity
					style={InquiryStyles.containerEmail}
					onPress={handleEmailPress}
				>
					<Text style={InquiryStyles.textEmail}>
						{t("contactEmail")}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default InquiryPage;
