import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";

import IconChatProfile from "@components/chat/IconChatProfile";
import IconBookmark from "@components/chat/IconBookmark";
import ModalNoBookmark from "@components/chat/ModalNoBookmark";
import DashedLine from "@components/chat/DashedLine";

const { fontCaption, fontNavi } = CustomTheme;

const Bookmark = ({ name, context, date, time, translation }) => {
	const { t } = useTranslation();
	const [expanded, setExpanded] = useState(false);
	const [isTranslation, setIsTranslation] = useState(false);

	const handleExpanded = () => {
		setExpanded(!expanded);
	};

	const [modalVisible, setModalVisible] = useState(false);

	const pressButton = () => {
		setModalVisible(!modalVisible);
	};

	const rectangleStyle = () =>
		expanded ? styles.rectangleExpanded : styles.rectangle;

	const handleTranslation = () => {
		setIsTranslation(!isTranslation);
	};

	return (
		<>
			<TouchableOpacity style={rectangleStyle()} onPress={handleExpanded}>
				<View style={styles.containerContext}>
					<View style={styles.iconTextContainer}>
						<View style={styles.icon}>
							<IconChatProfile size="32" />
						</View>
						<View style={styles.textContainer}>
							<Text style={styles.textName}>{name}</Text>
							<Text style={styles.textContext}>{context}</Text>
						</View>
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
							name={name}
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
							<TouchableOpacity onPress={handleTranslation}>
								<Text style={styles.textTranslation}>
									{isTranslation
										? t("viewOriginalOnlyButton")
										: t("translateButton")}
								</Text>
							</TouchableOpacity>
						</View>
						{isTranslation && (
							<View style={styles.containerTextExpanded}>
								<Text style={styles.textExpandedTitle}>
									{t("translationText")}
								</Text>
								<Text style={styles.textExpandedContext}>
									{translation}
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
	textContainer: {
		justifyContent: "center",
		marginLeft: 9,
	},
	textName: {
		fontSize: 14,
		lineHeight: 17,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	textContext: {
		...fontCaption,
		width: 136,
		height: 17,
		marginTop: 4,
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
