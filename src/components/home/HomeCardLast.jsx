import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import HomecardDifeF from "@components/home/HomecardDifeF";
import IconTwoUsers from "@components/home/IconTwoUsers";

const { fontCaption, fontButton } = CustomTheme;

const HomeCardLast = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	return (
		<View style={styles.rectangle}>
			<View style={styles.homecardDifeF}>
				<HomecardDifeF />
			</View>
			<View style={styles.homeProfile}>
				<View style={styles.containerImage}>
					<IconTwoUsers />
				</View>
				<Text style={styles.textMoreProfile}>
					{t("moreProfilesText")}
				</Text>
				<TouchableOpacity
					style={styles.buttonAddProfile}
					onPress={() => navigation.navigate("Connect")}
				>
					<Text style={styles.textAddProfile}>
						{t("exploreProfilesButton")}
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		width: "100%",
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E4A",
				shadowOffset: { width: 0, height: 3 },
				shadowOpacity: 0.71,
				shadowRadius: 3,
			},
			android: {
				elevation: 3,
			},
		}),
	},
	homecardDifeF: {
		position: "absolute",
		top: 69,
	},
	homeProfile: {
		position: "absolute",
		left: 20,
		right: 20,
		top: 20,
	},
	containerImage: {
		width: 116,
		height: 136,
		backgroundColor: CustomTheme.primaryBg,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	textMoreProfile: {
		...fontButton,
		color: CustomTheme.primaryMedium,
		marginTop: 16,
	},
	textLoadProfile: {
		...fontCaption,
		color: "#8C8D91",
		textDecorationLine: "underline",
		marginTop: 8,
	},
	buttonAddProfile: {
		width: "100%",
		height: 37,
		backgroundColor: CustomTheme.primaryMedium,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 85,
	},
	textAddProfile: {
		...fontButton,
		color: CustomTheme.bgBasic,
	},
});

export default HomeCardLast;
