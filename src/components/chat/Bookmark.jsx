import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { getMyProfile, translationByBookmarkedId } from "config/api";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconBookmark from "@components/chat/IconBookmark";
import ModalNoBookmark from "@components/chat/ModalNoBookmark";
import DashedLine from "@components/chat/DashedLine";
import ModalTranslationsCount from "@components/common/ModalTranslationsCount";

const { fontCaption, fontNavi } = CustomTheme;

const Bookmark = ({ bookmarkedId, context, created, translations }) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);
	const [content, setContent] = useState();
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [isTranslation, setIsTranslation] = useState(false);
	const [translationCount, setTranslationCount] = useState();
	const [modalVisible, setModalVisible] = useState(false);
	const [modalTranslationVisible, setModalTranslationVisible] =
		useState(false);

	const rectangleStyle = () =>
		expanded ? styles.rectangleExpanded : styles.rectangle;

	const handleExpanded = () => {
		setExpanded(!expanded);
	};

	const pressButton = () => {
		setModalVisible(!modalVisible);
	};

	const handleTranslations = async () => {
		try {
			const responseCount = await getMyProfile();
			const count =
				responseCount.data.translationCount === 0
					? 0
					: responseCount.data.translationCount + 1;
			setTranslationCount(count);

			if (!isTranslation) {
				if (translations.length > 0) {
					setIsTranslation(true);
					setContent(translations[0].text);
				} else {
					if (translationCount === 0) {
						setModalTranslationVisible(true);
						setIsTranslation(true);
						const response =
							await translationByBookmarkedId(bookmarkedId);
						setContent(response.data.translations[0].text);
					} else if (translationCount <= 15) {
						setModalTranslationVisible(false);
						setIsTranslation(true);
						const response =
							await translationByBookmarkedId(bookmarkedId);
						setContent(response.data.translations[0].text);
					} else if (translationCount > 15) {
						setModalTranslationVisible(true);
					}
				}
			} else {
				setIsTranslation(false);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"채팅 북마크 번역 오류:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	useEffect(() => {
		setDate(created.split("T")[0].replace("-", "."));
		setTime(created.split("T")[1].substring(0, 5));
	}, [created]);

	return (
		<>
			<TouchableOpacity style={rectangleStyle()} onPress={handleExpanded}>
				<View style={styles.containerContext}>
					<View style={styles.iconTextContainer}>
						<View style={styles.icon}>
							<IconChatProfile size="32" />
						</View>
						<Text style={styles.textContext}>{context}</Text>
					</View>
					<View style={styles.containerTextIcon}>
						<View style={styles.containerDateTime}>
							<Text style={styles.textDate}>{date}</Text>
							<Text style={styles.textTime}>{time}</Text>
						</View>
						<TouchableOpacity
							style={styles.iconBookmark}
							onPress={pressButton}
						>
							<IconBookmark color={CustomTheme.primaryMedium} />
						</TouchableOpacity>

						<ModalNoBookmark
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							context={context}
							date={date}
							time={time}
						/>
					</View>
				</View>
			</TouchableOpacity>

			{expanded && (
				<>
					<View style={styles.containerExpanded}>
						<View style={styles.dashedLine}>
							<DashedLine />
						</View>

						<View style={styles.containerOriginalTranslation}>
							<View style={styles.containerTextExpanded}>
								<Text style={styles.textExpandedTitle}>
									{t("originalText")}
								</Text>
								<Text style={styles.textExpandedContext}>
									{context}
								</Text>
							</View>
							<TouchableOpacity onPress={handleTranslations}>
								<Text style={styles.textTranslation}>
									{isTranslation
										? t("viewOriginalOnlyButton")
										: t("translateButton")}
								</Text>
							</TouchableOpacity>
							<ModalTranslationsCount
								modalVisible={modalTranslationVisible}
								setModalVisible={setModalTranslationVisible}
								translationCount={translationCount}
							/>
						</View>
						{isTranslation && (
							<View style={styles.containerTextExpanded}>
								<Text style={styles.textExpandedTitle}>
									{t("translationText")}
								</Text>
								<Text style={styles.textExpandedContext}>
									{content}
								</Text>
							</View>
						)}
					</View>
				</>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	rectangle: {
		position: "relative",
		width: "100%",
		height: 57,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderColor: CustomTheme.bgList,
	},
	rectangleExpanded: {
		position: "relative",
		width: "100%",
		height: 57,
		backgroundColor: CustomTheme.bgBasic,
		flexDirection: "row",
		alignItems: "center",
	},
	containerContext: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	iconTextContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginLeft: 15,
	},
	textContext: {
		...fontCaption,
		width: 136,
		height: 17,
		marginTop: 4,
		marginLeft: 9,
	},
	containerTextIcon: {
		flexDirection: "row",
	},
	containerDateTime: {
		marginRight: 16,
		justifyContent: "center",
		alignItems: "flex-end",
	},
	textDate: {
		fontSize: 11,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.textDisable,
	},
	textTime: {
		fontSize: 11,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Regular",
		color: CustomTheme.textDisable,
		marginTop: 1,
	},
	iconBookmark: {
		justifyContent: "center",
		marginRight: 16,
	},
	dashedLine: {
		position: "absolute",
	},
	textTranslation: {
		...fontNavi,
		color: CustomTheme.primaryMedium,
		textDecorationLine: "underline",
	},
	containerExpanded: {
		width: "100%",
		backgroundColor: CustomTheme.primaryBg,
		paddingTop: 6,
		paddingBottom: 18,
		paddingHorizontal: 17,
	},
	containerOriginalTranslation: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 12,
		marginVertical: 5,
	},
	containerTextExpanded: {
		flexDirection: "row",
		flexShrink: 1,
	},
	textExpandedTitle: {
		...fontCaption,
	},
	textExpandedContext: {
		...fontCaption,
		color: CustomTheme.primaryMedium,
		flexShrink: 1,
		marginHorizontal: 15,
	},
});

export default Bookmark;
