import React from "react";
import { SafeAreaView, View, Text } from "react-native";

import PreparingStyles from "@pages/etc/PreparingStyles";

import Preparing from "@components/common/Preparing";

const PreparingPage = () => {
	return (
		<SafeAreaView style={PreparingStyles.container}>
			<View style={PreparingStyles.containerText}>
				<Text style={PreparingStyles.textTitle}>Coming soon!</Text>
				<Text style={PreparingStyles.textSubTitle}>
					아직 준비중인 서비스입니다
				</Text>
			</View>
			<Preparing />
		</SafeAreaView>
	);
};

export default PreparingPage;
