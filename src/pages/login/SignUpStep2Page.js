import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableWithoutFeedback,
	Keyboard,
	TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import SignUpStyles from "@pages/login/SignUpStyles";
import { CustomTheme } from "@styles/CustomTheme";

import ApplyButton from "@components/common/ApplyButton";
import InfoCircle from "@components/common/InfoCircle";

const SignUpStep2Page = ({ saveData, goToNext, stepData }) => {
	const { t } = useTranslation();

	const [valueVerificationCode, onChangeVerificationCode] = useState(
		stepData[2] || "",
	);
	const [timeLeft, setTimeLeft] = useState(3 * 60);

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prevTime) => {
				if (prevTime <= 1) {
					clearInterval(timer);
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={SignUpStyles.container}>
				<Text style={[SignUpStyles.textSubTitle, { marginBottom: 60 }]}>
					{t("enterVerificationCode")}
				</Text>
				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						ID (Email Address)
					</Text>
					<View style={SignUpStyles.textIdPw}>
						<TextInput
							style={[
								SignUpStyles.textInputIdPw,
								{ color: "#8C8D91" },
							]}
							value={stepData[1]}
							editable={false}
							selectTextOnFocus={false}
						/>
						<TouchableOpacity
							style={SignUpStyles.containerRetransmit}
						>
							<Text style={SignUpStyles.textResend}>
								{t("resend")}
							</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={SignUpStyles.containerIdPw}>
					<Text style={SignUpStyles.textIdPw}>
						{t("verificationCode")}
					</Text>
					<View style={SignUpStyles.textIdPw}>
						<TextInput
							style={[
								SignUpStyles.textInputIdPw,
								{ marginBottom: 0 },
							]}
							onChangeText={(text) =>
								onChangeVerificationCode(text)
							}
							value={valueVerificationCode}
						/>
						<View
							style={[
								SignUpStyles.containerError,
								{ justifyContent: "space-between" },
							]}
						>
							<View style={{ flexDirection: "row" }}>
								<InfoCircle color={CustomTheme.warningRed} />
								{timeLeft === 0 ? (
									<Text style={SignUpStyles.textError}>
										{t("invalidVerificationCode")}
									</Text>
								) : (
									<Text style={SignUpStyles.textError}>
										{t("verificationCodeSent")}
									</Text>
								)}
							</View>
							<Text style={SignUpStyles.textError}>
								{formatTime(timeLeft)}
							</Text>
						</View>
					</View>
				</View>

				<View style={SignUpStyles.buttonMove}>
					<ApplyButton
						text={t("confirmButtonText")}
						// disabled={}
						onPress={() => {
							saveData(2, valueVerificationCode);
							goToNext(3);
						}}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default SignUpStep2Page;
