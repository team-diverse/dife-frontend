import React, { useState, useEffect } from "react";
import {
	SafeAreaView,
	View,
	Text,
	TouchableOpacity,
	Alert,
	Platform,
	Linking,
	AppState,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

import SettingStyles from "@pages/member/SettingStyles";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import IconSettingProfile from "@components/member/IconSettingProfile";
import IconSettingSecurity from "@components/member/IconSettingSecurity";
import IconSettingBlocks from "@components/member/IconSettingBlocks";
import IconSettingNotify from "@components/member/IconSettingNotify";
import IconSettingInquiry from "@components/member/IconSettingInquiry";
import IconSettingSeviceNews from "@components/member/IconSettingSeviceNews";
import IconSettingTrems from "@components/member/IconSettingTrems";
import IconSwitchOn from "@components/member/IconSwitchOn";
import IconSwitchOff from "@components/member/IconSwitchOff";
import IconSettingLanguage from "@components/member/IconSettingLanguage";

const SettingPage = () => {
	const navigation = useNavigation();

	const [switchOn, setSwitchOn] = useState(false);

	const checkNotificationPermissions = async () => {
		const { status } = await Notifications.getPermissionsAsync();
		setSwitchOn(status === "granted");
	};

	useEffect(() => {
		checkNotificationPermissions();
	}, []);

	useEffect(() => {
		const handleAppStateChange = (nextAppState) => {
			if (nextAppState === "active") {
				checkNotificationPermissions();
			}
		};

		handleAppStateChange();

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => {
			subscription.remove();
		};
	}, []);

	const handleSwitch = async () => {
		if (switchOn) {
			if (Platform.OS === "ios") {
				Alert.alert("알림", "설정에서 알림 권한을 꺼주세요.", [
					{
						text: "확인",
						onPress: () => {
							Linking.openURL("app-settings:");
						},
					},
				]);
			} else {
				Alert.alert("알림", "설정에서 알림 권한을 꺼주세요.");
			}
		} else {
			if (Platform.OS === "ios") {
				Alert.alert("알림", "설정에서 알림 권한을 켜주세요.", [
					{
						text: "확인",
						onPress: () => {
							Linking.openURL("app-settings:");
						},
					},
				]);
			} else {
				const { status } =
					await Notifications.requestPermissionsAsync();
				if (status === "granted") {
					Alert.alert("알림", "알림 기능이 활성화되었습니다.");
					setSwitchOn(true);
				} else {
					Alert.alert("알림", "알림 권한이 거부되었습니다.");
					setSwitchOn(false);
				}
			}
		}
	};

	return (
		<SafeAreaView style={SettingStyles.container}>
			<TopBar topBar="설정" color="#000" />

			<View style={{ marginTop: 10 }}>
				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>계정 관리</Text>
				</View>
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("ModifyProfilePage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingProfile />
						<Text style={SettingStyles.textContent}>
							프로필 설정
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("SecurityPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<View style={{ marginHorizontal: 2 }}>
							<IconSettingSecurity />
						</View>
						<Text style={SettingStyles.textContent}>보안</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("BlockListPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingBlocks />
						<Text style={SettingStyles.textContent}>차단 관리</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("DefaultLanguagePage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingLanguage />
						<Text style={SettingStyles.textContent}>
							기본 언어 설정
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingNotify />
						<Text style={SettingStyles.textContent}>푸쉬 알림</Text>
					</View>
					<TouchableOpacity onPress={handleSwitch}>
						{switchOn ? <IconSwitchOn /> : <IconSwitchOff />}
					</TouchableOpacity>
				</View>

				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>고객 지원</Text>
				</View>
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("InquiryPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingInquiry />
						<Text style={SettingStyles.textContent}>1:1 문의</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingSeviceNews />
						<Text style={SettingStyles.textContent}>
							서비스 소식
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</View>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("TremsPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingTrems />
						<Text style={SettingStyles.textContent}>
							개인정보 처리방침 및 이용약관
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
			</View>
		</SafeAreaView>
	);
};

export default SettingPage;
