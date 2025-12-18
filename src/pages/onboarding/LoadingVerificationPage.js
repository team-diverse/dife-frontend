import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import LoadingVerificationStyles from "./LoadingVerificationStyles";
import IconLoading from "@components/onboarding/IconLoading";
import { checkIsVerified } from "config/api";

const LoadingVerificationPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [messageIndex, setMessageIndex] = useState(0);
	const [verificationStatus, setVerificationStatus] = useState("loading");
	const [isPolling, setIsPolling] = useState(true);

	const loadingMessages = [
		t("loadingVerification1"),
		t("loadingVerification2"),
		t("loadingVerification3"),
		t("loadingVerification4"),
		t("loadingVerification5"),
	];

	const checkVerificationStatus = async () => {
		try {
			const response = await checkIsVerified();
			if (response.status === 200) {
				setVerificationStatus("verified");
				setIsPolling(false);
				return true;
			}
		} catch (error) {
			console.log("Verification check failed:", error);
		}
		return false;
	};

	useEffect(() => {
		let messageInterval;
		let pollingInterval;
		let timeoutTimer;

		if (verificationStatus === "loading") {
			messageInterval = setInterval(() => {
				setMessageIndex(
					(prevIndex) => (prevIndex + 1) % loadingMessages.length,
				);
			}, 5000);
		}

		if (isPolling) {
			pollingInterval = setInterval(async () => {
				await checkVerificationStatus();
			}, 3000);

			checkVerificationStatus();
		}

		timeoutTimer = setTimeout(() => {
			if (verificationStatus === "loading") {
				setVerificationStatus("timeout");
				setIsPolling(false);
			}
		}, 90000);

		return () => {
			if (messageInterval) clearInterval(messageInterval);
			if (pollingInterval) clearInterval(pollingInterval);
			if (timeoutTimer) clearTimeout(timeoutTimer);
		};
	}, [verificationStatus, isPolling]);

	const renderContent = () => {
		switch (verificationStatus) {
			case "verified":
				return (
					<>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("completeVerification")}
						</Text>
						<View style={LoadingVerificationStyles.iconLoading}>
							<Text style={{ fontSize: 50 }}>✅</Text>
						</View>
						<Text
							style={LoadingVerificationStyles.textMove}
							onPress={() => navigation.navigate("Login")}
						>
							{t("returnToLogin")}
						</Text>
					</>
				);

			case "timeout":
				return (
					<>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription1")}
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription2")}
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription3")}
						</Text>
						<Text
							style={LoadingVerificationStyles.textMove}
							onPress={() => navigation.navigate("Login")}
						>
							{t("returnToLogin")}
						</Text>
					</>
				);

			default:
				return (
					<>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationTitle")}
						</Text>
						<View style={LoadingVerificationStyles.iconLoading}>
							<IconLoading />
						</View>
						<Text style={LoadingVerificationStyles.textModal}>
							{loadingMessages[messageIndex]}
						</Text>
					</>
				);
		}
	};

	return (
		<SafeAreaView style={LoadingVerificationStyles.container}>
			<Image
				style={LoadingVerificationStyles.imageBackgroud}
				// eslint-disable-next-line @typescript-eslint/no-require-imports
				source={require("@assets/images/BlurHomePage.png")}
			/>
			<View style={LoadingVerificationStyles.modalBackground}>
				<View style={LoadingVerificationStyles.modal}>
					<View
						style={LoadingVerificationStyles.containerModalContent}
					>
						{renderContent()}
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default LoadingVerificationPage;
