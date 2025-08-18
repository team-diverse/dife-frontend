import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import LoadingVerificationStyles from "./LoadingVerificationStyles";
<<<<<<< HEAD
import Checkbox from "@components/common/Checkbox";
import IconLoading from "@components/onboarding/IconLoading";
import { checkIsVerified } from "config/api";

const loadingMessages = [
	"📋 학생증 인식 중...",
	"🔍 서버 확인 중...",
	"⚙️ 데이터 처리 중...",
	"🖼️ 이미지 분석 중...",
	"🎓 재학생 판별 중...",
];
=======
import IconLoading from "@components/onboarding/IconLoading";
import { checkIsVerified } from "config/api";
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))

const LoadingVerificationPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

<<<<<<< HEAD
	const [isChecked, setIsChecked] = useState(false);
=======
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
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

<<<<<<< HEAD
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

=======
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
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
<<<<<<< HEAD
							🎉 국민대 학생인증되었습니다!
=======
							{t("completeVerification")}
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
						</Text>
						<View style={LoadingVerificationStyles.iconLoading}>
							<Text style={{ fontSize: 50 }}>✅</Text>
						</View>
<<<<<<< HEAD
						<View
							style={LoadingVerificationStyles.checkboxRememberMe}
						>
							<Checkbox
								checked={isChecked}
								onPress={handlePress}
								text={t("receiveNotification")}
								basic="true"
							/>
						</View>
=======
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
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
<<<<<<< HEAD
							⚠️ 자동 학생 인증이 되지 않았습니다
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							관리자 확인 후에 인증을 추가로 진행해드릴게요
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							⏰ 최대 24시간 소요됩니다
						</Text>
						<View
							style={LoadingVerificationStyles.checkboxRememberMe}
						>
							<Checkbox
								checked={isChecked}
								onPress={handlePress}
								text={t("receiveNotification")}
								basic="true"
							/>
						</View>
=======
							{t("waitingVerificationDescription1")}
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription2")}
						</Text>
						<Text style={LoadingVerificationStyles.textModal}>
							{t("waitingVerificationDescription3")}
						</Text>
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
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
<<<<<<< HEAD
						<View
							style={LoadingVerificationStyles.checkboxRememberMe}
						>
							<Checkbox
								checked={isChecked}
								onPress={handlePress}
								text={t("receiveNotification")}
								basic="true"
							/>
						</View>
=======
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
					</>
				);
		}
	};

	return (
		<SafeAreaView style={LoadingVerificationStyles.container}>
			<Image
				style={LoadingVerificationStyles.imageBackgroud}
<<<<<<< HEAD
=======
				// eslint-disable-next-line @typescript-eslint/no-require-imports
>>>>>>> 5abafc6 (Fix/multiple improvements 5: 좋아요 UI 불일치 문제, 자동 인증 UI/UX, 비밀번호 찾기 인증번호 재전송 및 타이머 (#292))
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
