import React, { useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NicknameStyles from "@pages/onboarding/NicknameStyles";
import { CustomTheme } from "@styles/CustomTheme.js";
import { useOnboarding } from "src/states/OnboardingContext.js";

import ArrowRight from "@components/common/ArrowRight";
import Progress1 from "@components/onboarding/Progress1";
import LoginBackground from "@components/login/LoginBackground";
import IconDelete from "@components/onboarding/IconDelete";
import ApplyButton from "@components/common/ApplyButton";
import { checkUsername } from "config/api";

const NicknamePage = () => {
	const navigation = useNavigation();

	const handleGoBack = () => {
		navigation.goBack();
	};

	const loginData = [
		"환영합니다:)",
		"디프에서 사용할 닉네임을 입력해주세요!",
	];
	const [nickname, setNickname] = useState("");
	const [nicknameValid, setNicknameValid] = useState(null);

	const handleNicknameChange = (text) => {
		setNickname(text);
	};

	const handleKeyboard = () => {
		Keyboard.dismiss();
	};

	const handleClearText = () => {
		setNickname("");
	};

	const { updateOnboardingData } = useOnboarding();

	const handleNickname = () => {
		checkUsername(nickname)
			.then((response) => {
				// TODO: Status Code 200 / 204 두가지로 처리 필요 백엔드 수정도 필요
				if (response.status === 200) {
					setNicknameValid(true);
					updateOnboardingData({ username: nickname });
					navigation.navigate("Profile");
				} else {
					setNicknameValid(false);
				}
			})
			.catch((error) => {
				console.error("닉네임 사용 불가: ", error.response.status);
				setNicknameValid(false);
			});
	};

	return (
		<TouchableWithoutFeedback onPress={handleKeyboard}>
			<SafeAreaView style={[NicknameStyles.container]}>
				<TouchableOpacity onPress={handleGoBack}>
					<ArrowRight
						style={NicknameStyles.iconArrow}
						color={CustomTheme.textPrimary}
					/>
				</TouchableOpacity>
				<View style={[NicknameStyles.iconProgress]}>
					<Progress1 />
				</View>
				<LoginBackground style={NicknameStyles.backgroundLogin} />
				<Text style={NicknameStyles.textTitle}>{loginData[0]}</Text>
				<Text style={NicknameStyles.textSubTitle}>{loginData[1]}</Text>
				<View style={NicknameStyles.containerInput}>
					<TextInput
						style={NicknameStyles.textInputNickname}
						placeholder="최대 12자"
						onChangeText={handleNicknameChange}
						value={nickname}
						maxLength={12}
					/>
					{nickname.length > 0 && (
						<TouchableOpacity
							style={NicknameStyles.iconDelete}
							onPress={handleClearText}
						>
							<IconDelete />
						</TouchableOpacity>
					)}
				</View>
				{nickname.length > 0 &&
					typeof nicknameValid === "boolean" &&
					(nicknameValid ? (
						<Text style={NicknameStyles.textAvailableNickname}>
							사용 가능한 닉네임이에요.
						</Text>
					) : (
						<Text style={NicknameStyles.textUnavailableNickname}>
							이미 사용 중인 닉네임이에요.
						</Text>
					))}
				<View style={NicknameStyles.buttonCheck}>
					<ApplyButton
						text="확인"
						onPress={handleNickname}
						disabled={nickname.length === 0}
					/>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
};

export default NicknamePage;
