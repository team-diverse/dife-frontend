import React, { useState } from "react";
import {
	Text,
	SafeAreaView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Constants from "expo-constants";

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme";

import SignUpStep1Page from "@pages/login/SignUpStep1Page";
import SignUpStep2Page from "@pages/login/SignUpStep2Page";
import SignUpStep3Page from "@pages/login/SignUpStep3Page";
import ArrowRight from "@components/common/ArrowRight";

const SignUpPage = () => {
	const navigation = useNavigation();

	const { t } = useTranslation();

	const [currentStep, setCurrentStep] = useState(1);
	const [stepData, setStepData] = useState({
		1: "",
		2: "",
		3: "",
	});

	const saveData = (step, data) => {
		setStepData((prev) => ({ ...prev, [step]: data }));
	};

	const goToNext = (nextStep) => {
		setCurrentStep(nextStep ?? currentStep + 1);
	};

	const goToPrevious = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
		} else if (currentStep === 1) {
			navigation.goBack();
		}
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView
				style={[
					SignUpStyles.container,
					{ paddingTop: Constants.statusBarHeight },
				]}
			>
				<TouchableOpacity onPress={goToPrevious}>
					<ArrowRight
						style={{ marginTop: 5, marginLeft: 14 }}
						color={CustomTheme.textPrimary}
					/>
				</TouchableOpacity>
				<Text style={SignUpStyles.textTitle}>{t("signUpTitle")}</Text>
				{currentStep === 1 && (
					<SignUpStep1Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 2 && (
					<SignUpStep2Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 3 && (
					<SignUpStep3Page saveData={saveData} stepData={stepData} />
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SignUpPage;
