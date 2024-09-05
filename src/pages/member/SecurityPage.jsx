import React, { useEffect, useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import SecurityStyles from "@pages/member/SecurityStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useAuth } from "src/states/AuthContext";
import { getMyProfile, updateMyProfile, deleteMember } from "config/api";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import IconSwitchOn from "@components/member/IconSwitchOn";
import IconSwitchOff from "@components/member/IconSwitchOff";

const SecurityPage = () => {
	const navigation = useNavigation();

	const { setIsLoggedIn } = useAuth();
	const [switchOn, setSwitchOn] = useState(false);

	const getIsPublic = async () => {
		try {
			const response = await getMyProfile();
			setSwitchOn(!response.data.isPublic);
		} catch (error) {
			console.error(
				"프로필 공개 여부 조회 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		getIsPublic();
	}, []);

	const handleSwitch = async () => {
		try {
			setSwitchOn(!switchOn);
			const formData = new FormData();
			formData.append("isPublic", switchOn);
			await updateMyProfile(formData);
		} catch (error) {
			console.error(
				"프로필 비공개 전환 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const handleLogout = async () => {
		try {
			await SecureStore.deleteItemAsync("memberId");
			await SecureStore.deleteItemAsync("accessToken");
			await SecureStore.deleteItemAsync("refreshToken");

			setIsLoggedIn(false);
		} catch (error) {
			console.error("로그아웃 오류: ", error.message);
		}
	};

	const handleAlertLogout = () => {
		Alert.alert(
			"",
			"로그아웃하시겠습니까?",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						handleLogout();
					},
				},
			],
			{ cancelable: false },
		);
	};

	const handleDeleteMember = async () => {
		try {
			await deleteMember();
			setIsLoggedIn(false);
		} catch (error) {
			console.error("회원 탈퇴 오류: ", error.message);
		}
	};

	const handleAlertDeleteMember = () => {
		Alert.alert(
			"회원 탈퇴",
			"정말 회원 탈퇴를 하시겠습니까?\n소중한 회원님을 잃게 되어 아쉽습니다.",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						handleDeleteMember();
					},
				},
			],
			{ cancelable: false },
		);
	};

	return (
		<SafeAreaView style={SecurityStyles.container}>
			<TopBar
				topBar="보안"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={[SecurityStyles.containerContent, { marginTop: 28 }]}>
				<View style={SecurityStyles.backgroundWhite}>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							프로필 비공개
						</Text>
						<TouchableOpacity onPress={handleSwitch}>
							{switchOn ? <IconSwitchOn /> : <IconSwitchOff />}
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={SecurityStyles.backgroundWhite}
					onPress={() => navigation.navigate("FindPasswordPage")}
				>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							비밀번호 재발급
						</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
			</View>

			<View style={SecurityStyles.line} />

			<View style={SecurityStyles.containerContent}>
				<TouchableOpacity
					style={SecurityStyles.backgroundWhite}
					onPress={handleAlertLogout}
				>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>로그아웃</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={SecurityStyles.backgroundWhite}
					onPress={handleAlertDeleteMember}
				>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							회원 탈퇴
						</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SecurityPage;
