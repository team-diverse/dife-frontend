import React from "react";
import { SafeAreaView, View, Text } from "react-native";

import InquiryStyles from "@pages/member/InquiryStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconEmail from "@components/login/IconEmail";

const InquiryPage = () => {
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

				<View style={InquiryStyles.containerEmail}>
					<Text style={InquiryStyles.textEmail}>dife@ddd.com</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default InquiryPage;
