import React, { useState, useEffect, useCallback } from "react";
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
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import SettingStyles from "@pages/member/SettingStyles";
import { getMyProfile } from "config/api";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import IconSettingProfile from "@components/member/IconSettingProfile";
import IconSettingSecurity from "@components/member/IconSettingSecurity";
import IconSettingBlocks from "@components/member/IconSettingBlocks";
import IconSettingNotify from "@components/member/IconSettingNotify";
import IconSettingInquiry from "@components/member/IconSettingInquiry";
import IconSettingTrems from "@components/member/IconSettingTrems";
import IconSwitchOn from "@components/member/IconSwitchOn";
import IconSwitchOff from "@components/member/IconSwitchOff";
import IconSettingLanguage from "@components/member/IconSettingLanguage";

const SettingPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [switchOn, setSwitchOn] = useState(false);
	const [defaultLanguage, setDefaultLanguage] = useState();

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
				Alert.alert(
					t("notifications"),
					t("notificationPermissionAlert", {
						action: t("notificationPermissionDisable"),
					}),
					[
						{
							text: t("confirmButtonText"),
							onPress: () => {
								Linking.openURL("app-settings:");
							},
						},
					],
				);
			} else {
				Alert.alert(
					t("notifications"),
					t("notificationPermissionAlert", {
						action: t("notificationPermissionDisable"),
					}),
				);
			}
		} else {
			if (Platform.OS === "ios") {
				Alert.alert(
					t("notifications"),
					t("notificationPermissionAlert", {
						action: t("notificationPermissionEnable"),
					}),
					[
						{
							text: t("confirmButtonText"),
							onPress: () => {
								Linking.openURL("app-settings:");
							},
						},
					],
				);
			} else {
				const { status } =
					await Notifications.requestPermissionsAsync();
				if (status === "granted") {
					Alert.alert(t("notifications"), t("notificationEnable"));
					setSwitchOn(true);
				} else {
					Alert.alert(t("notifications"), t("notificationDisable"));
					setSwitchOn(false);
				}
			}
		}
	};

	useFocusEffect(
		useCallback(() => {
			const handleProfile = async () => {
				try {
					const response = await getMyProfile();
					setDefaultLanguage(response.data.settingLanguage);
				} catch (error) {
					Sentry.captureException(error);
					console.error(
						"마이페이지 조회 오류:",
						error.response ? error.response.data : error.message,
					);
				}
			};

			handleProfile();
		}, [defaultLanguage]),
	);

	return (
		<SafeAreaView style={SettingStyles.container}>
			<TopBar topBar={t("settings")} color="#000" />

			<View style={{ marginTop: 10 }}>
				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>
						{t("accountManagement")}
					</Text>
				</View>
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("ModifyProfilePage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingProfile />
						<Text style={SettingStyles.textContent}>
							{t("profileSettings")}
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
						<Text style={SettingStyles.textContent}>
							{t("security")}
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
					onPress={() => navigation.navigate("BlockListPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingBlocks />
						<Text style={SettingStyles.textContent}>
							{t("blockManagement")}
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
					onPress={() =>
						navigation.navigate("DefaultLanguagePage", {
							defaultLanguage: defaultLanguage,
						})
					}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingLanguage />
						<Text style={SettingStyles.textContent}>
							{t("defaultLanguageSettings")}
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
						<Text style={SettingStyles.textContent}>
							{t("pushNotifications")}
						</Text>
					</View>
					<TouchableOpacity onPress={handleSwitch}>
						{switchOn ? <IconSwitchOn /> : <IconSwitchOff />}
					</TouchableOpacity>
				</View>

				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>
						{t("customerSupport")}
					</Text>
				</View>
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("InquiryPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingInquiry />
						<Text style={SettingStyles.textContent}>
							{t("inquiry")}
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
					onPress={() => navigation.navigate("TremsPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingTrems />
						<Text style={SettingStyles.textContent}>
							{t("termsPrivacy")}
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
