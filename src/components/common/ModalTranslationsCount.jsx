import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import IconTranslation from "@components/common/IconTranslation";
import ProfileK from "@components/member/ProfileK";

const { fontSub16, fontSub14 } = CustomTheme;

const ModalTranslationsCount = ({
	modalVisible,
	setModalVisible,
	translationCount,
}) => {
	const { t } = useTranslation();

	const handleClose = () => {
		setModalVisible(false);
	};

	return (
		<Modal
			isVisible={modalVisible}
			onBackdropPress={() => setModalVisible(false)}
			style={styles.modal}
		>
			<View style={styles.rectangle}>
				{translationCount === 0 ? (
					<>
						<IconTranslation style={styles.iconTranslation} />
						<View style={styles.container}>
							<Text style={styles.textTitle}>
								{t("translationFeatureTitle")}
							</Text>
							<View>
								<Text style={styles.textSubTitle}>
									{t("translationFeatureContent1")}
									<Text style={styles.textSubTitleBlue}>
										{t("translationFeatureContent2")}
									</Text>
									{t("translationFeatureContent3")}
								</Text>
								<Text style={styles.textContent}>
									{t("translationServicePages")}
								</Text>
								<Text style={styles.textContent}>
									{t("supportedLanguages")}
								</Text>
							</View>
							<TouchableOpacity
								style={styles.rectangleBlue}
								onPress={handleClose}
							>
								<Text style={styles.textRectangleBlue}>
									{t("confirmButtonText")}
								</Text>
							</TouchableOpacity>
						</View>
					</>
				) : (
					<View style={styles.container}>
						<Text style={styles.textTitle}>
							{t("translationExhaustedTitle")}
						</Text>
						<View>
							<Text style={styles.textSubTitle}>
								{t("translationExhaustedContent")}
							</Text>
							<Text
								style={[
									styles.textSubTitleBlue,
									{
										fontSize: 20,
										lineHeight: 24,
										marginTop: 7,
									},
								]}
							>
								15/15
							</Text>
							<View style={styles.containerIconText}>
								<ProfileK />
								<Text style={styles.textBetaTest}>
									{t("betaTestInfo")}
								</Text>
							</View>
						</View>
						<TouchableOpacity
							style={styles.rectangleBlue}
							onPress={handleClose}
						>
							<Text style={styles.textRectangleBlue}>
								{t("confirmButtonText")}
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modal: {
		justifyContent: "center",
		alignItems: "center",
	},
	rectangle: {
		width: 260,
		height: 360,
		backgroundColor: CustomTheme.bgBasic,
		borderRadius: 20,
		position: "relative",
		paddingHorizontal: 20,
	},
	container: {
		flex: 1,
		alignItems: "center",
	},
	iconTranslation: {
		position: "absolute",
		top: 112,
		right: 0,
		zIndex: -10,
	},
	textTitle: {
		fontSize: 14,
		lineHeight: 20,
		fontFamily: "NotoSansCJKkr-Bold",
		marginTop: 21,
	},
	textSubTitle: {
		...fontSub16,
		color: CustomTheme.textPrimary,
		marginTop: 24,
	},
	textSubTitleBlue: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
	textContent: {
		...fontSub14,
		color: CustomTheme.textSecondary,
		marginTop: 30,
	},
	containerIconText: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginTop: 47,
	},
	textBetaTest: {
		width: 157,
		fontSize: 10,
		lineHeight: 12,
		fontFamily: "NotoSansCJKkr-Medium",
		color: "#B0D0FF",
		marginLeft: 12,
		marginBottom: 20,
	},
	rectangleBlue: {
		position: "absolute",
		bottom: 34,
		width: 220,
		height: 37,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 12,
		backgroundColor: CustomTheme.primaryMedium,
	},
	textRectangleBlue: {
		...fontSub14,
		color: "#FBFBFB",
	},
});

export default ModalTranslationsCount;
