import React from "react";
import {
	SafeAreaView,
	View,
	Text,
	Linking,
	TouchableOpacity,
} from "react-native";

import InquiryStyles from "@pages/member/InquiryStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconEmail from "@components/login/IconEmail";

const InquiryPage = () => {
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
				topBar="1:1 문의"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={InquiryStyles.containerContent}>
				<IconEmail />
				<Text style={InquiryStyles.textTitle}>이메일 문의</Text>
				<Text style={InquiryStyles.textContent}>
					dife 이메일로 문제를 전송해주세요
				</Text>

				<TouchableOpacity
					style={InquiryStyles.containerEmail}
					onPress={handleEmailPress}
				>
					<Text style={InquiryStyles.textEmail}>
						dife.teamdiverse@gmail.com
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default InquiryPage;
