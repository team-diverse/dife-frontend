import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";

import DefaultLanguageStyles from "@pages/member/DefaultLanguageStyles";
import { CustomTheme } from "@styles/CustomTheme.js";

import TopBar from "@components/common/TopBar";
import RadioButtonGroup from "@components/RadioButton/RadioButtonGroup";

const DefaultLanguagePage = () => {
	const [selected, setSelected] = useState("");

	const handleRadioButtonSelect = (value) => {
		setSelected(value);
	};

	return (
		<SafeAreaView style={DefaultLanguageStyles.container}>
			<TopBar topBar="기본 언어 설정" color="#000" />

			<View style={DefaultLanguageStyles.radioButtonGroup}>
				<RadioButtonGroup
					values={[
						"English / English",
						"中文 / Chinese",
						"日本語 / Japanese",
						"Español / Spanish",
						"한국어 / Korean",
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
