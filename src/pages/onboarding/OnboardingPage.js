import React, { useState, useEffect } from "react";
import {
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { CustomTheme } from "@styles/CustomTheme.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress1 from "@components/onboarding/Progress1";
import Progress2 from "@components/onboarding/Progress2";
import Progress3 from "@components/onboarding/Progress3";
import Progress4 from "@components/onboarding/Progress4";
import Progress5 from "@components/onboarding/Progress5";
import OnboardingStep1Page from "@pages/onboarding/OnboardingStep1Page";
import OnboardingStep1Styles from "@pages/onboarding/OnboardingStep1Styles";
import OnboardingStep2Page from "@pages/onboarding/OnboardingStep2Page";
import OnboardingStep3Page from "@pages/onboarding/OnboardingStep3Page";
import OnboardingStep4Page from "@pages/onboarding/OnboardingStep4Page";
import OnboardingStep5Page from "@pages/onboarding/OnboardingStep5Page";

const OnboardingPage = ({ route }) => {
	const navigation = useNavigation();

	const { selectedCountry } = route.params || {};

	const [currentStep, setCurrentStep] = useState(1);
	const [stepData, setStepData] = useState({
		1: "",
		2: "",
		3: "",
		4: "",
		5: "",
	});

	const saveData = (step, data) => {
		setStepData((prev) => ({
			...prev,
			[step]: {
				...(prev[step] || {}),
				...data,
			},
		}));
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

	const progressComponents = {
		1: Progress1,
		2: Progress2,
		3: Progress3,
		4: Progress4,
		5: Progress5,
	};

	const ProgressComponent = progressComponents[currentStep];

	useEffect(() => {
		if (selectedCountry) {
			saveData(2, { selectedCountry });
		}
	}, [selectedCountry]);

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={OnboardingStep1Styles.container}>
				<TouchableOpacity onPress={goToPrevious}>
					<ArrowRight
						style={[
							OnboardingStep1Styles.iconArrow,
							{ marginTop: 10 },
						]}
						color={CustomTheme.textPrimary}
					/>
				</TouchableOpacity>
				<View style={OnboardingStep1Styles.iconProgress}>
					{ProgressComponent ? <ProgressComponent /> : null}
				</View>

				{currentStep === 1 && (
					<OnboardingStep1Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 2 && (
					<OnboardingStep2Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 3 && (
					<OnboardingStep3Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 4 && (
					<OnboardingStep4Page
						goToNext={goToNext}
						saveData={saveData}
						stepData={stepData}
					/>
				)}
				{currentStep === 5 && (
					<OnboardingStep5Page
						saveData={saveData}
						stepData={stepData}
					/>
				)}
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default OnboardingPage;
