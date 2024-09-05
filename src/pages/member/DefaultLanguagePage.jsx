import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { useTranslation } from "react-i18next";

import DefaultLanguageStyles from "@pages/member/DefaultLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme.js";

import TopBar from "@components/common/TopBar";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const DefaultLanguagePage = () => {
	const { t } = useTranslation();
	const [selected, setSelected] = useState("");

	const handleRadioButtonSelect = (value) => {
		setSelected(value);
	};

	return (
		<SafeAreaView style={DefaultLanguageStyles.container}>
			<TopBar topBar={t("defaultLanguageSettings")} color="#000" />

			<View style={DefaultLanguageStyles.radioButtonGroup}>
				<RadioButtonGroup
					values={[
						t("english"),
						t("chinese"),
						t("japanese"),
						t("spanish"),
						t("korean"),
					]}
					value={selected}
					onValueChange={handleRadioButtonSelect}
					mainColor="#B0D0FF"
					borderColor={CustomTheme.primaryMedium}
					fontSize16={true}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DefaultLanguagePage;
