import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import PreparingStyles from "@pages/etc/PreparingStyles";

import Preparing from "@components/common/Preparing";

const PreparingPage = () => {
	const { t } = useTranslation();

	return (
		<SafeAreaView style={PreparingStyles.container}>
			<View style={PreparingStyles.containerText}>
				<Text style={PreparingStyles.textTitle}>Coming soon!</Text>
				<Text style={PreparingStyles.textSubTitle}>
					{t("serviceUnderConstruction")}
				</Text>
			</View>
			<Preparing />
		</SafeAreaView>
	);
};

export default PreparingPage;
