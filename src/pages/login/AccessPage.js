import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import AccessStyles from "@pages/login/AccessStyles";

import ApplyButton from "@components/common/ApplyButton";
import IconAccessCamera from "@components/login/IconAccessCamera";
import IconAccessNotification from "@components/login/IconAccessNotification";
import IconAccessImage from "@components/login/IconAccessImage";
import IconAccessPhone from "@components/login/IconAccessPhone";
import GoBack from "@components/common/GoBack";

const AccessPage = () => {
	const { t } = useTranslation();

	const navigation = useNavigation();

	const requestPermissions = async () => {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();

		if (existingStatus !== "granted") {
			await Notifications.requestPermissionsAsync();
		}

		navigation.navigate("Login");
	};

	const handlePress = () => {
		requestPermissions();
	};

	return (
		<SafeAreaView style={[AccessStyles.container]}>
			<GoBack />
			<Text style={AccessStyles.textTitle}>{t("accessPageTitle")}</Text>
			<View style={AccessStyles.containerContent}>
				<IconAccessPhone />
				<View style={AccessStyles.containerText}>
					<Text style={AccessStyles.textSubTitle}>
						{t("accessPhoneSubtitle")}
					</Text>
					<Text style={AccessStyles.textId}>
						{t("accessPhoneDescription")}
					</Text>
				</View>
			</View>
			<View style={AccessStyles.containerContent}>
				<IconAccessNotification />
				<View style={AccessStyles.containerText}>
					<Text style={AccessStyles.textSubTitle}>
						{t("accessNotificationSubtitle")}
					</Text>
					<Text style={AccessStyles.textId}>
						{t("accessNotificationDescription")}
					</Text>
				</View>
			</View>
			<View style={AccessStyles.containerContent}>
				<IconAccessImage />
				<View style={AccessStyles.containerText}>
					<Text style={AccessStyles.textSubTitle}>
						{t("accessImageSubtitle")}
					</Text>
					<Text style={AccessStyles.textId}>
						{t("accessImageDescription")}
					</Text>
				</View>
			</View>
			<View style={AccessStyles.containerContent}>
				<IconAccessCamera />
				<View style={AccessStyles.containerText}>
					<Text style={AccessStyles.textSubTitle}>
						{t("accessCameraSubtitle")}
					</Text>
					<Text style={AccessStyles.textId}>
						{t("accessCameraDescription")}
					</Text>
				</View>
			</View>
			<View style={AccessStyles.guide}>
				<Text style={AccessStyles.textGuide}>{t("guideText")}</Text>
			</View>
			<View style={AccessStyles.applyButton}>
				<ApplyButton text="확인" access="true" onPress={handlePress} />
			</View>
		</SafeAreaView>
	);
};

export default AccessPage;
