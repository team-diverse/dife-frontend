import React, { useState, useEffect, useRef } from "react";
import {
	View,
	StyleSheet,
	Modal,
	Text,
	Animated,
	TouchableWithoutFeedback,
	Dimensions,
	PanResponder,
	TouchableOpacity,
	ScrollView,
	Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import * as Sentry from "@sentry/react-native";

import { CustomTheme } from "@styles/CustomTheme";
import { getCommunitySearchByType } from "config/api";

import FilterBottomTwoButtons from "@components/connect/FilterBottomTwoButtons";

const { fontSub16 } = CustomTheme;

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

const TopicBottomSlide = ({
	modalVisible,
	setModalVisible,
	onFilterResponse,
	onSearchResponse,
	onTotalSelection,
	isReset,
	initialSelected,
}) => {
	const { t } = useTranslation();

	const panY = useRef(new Animated.Value(screenHeight)).current;

	const translateY = panY.interpolate({
		inputRange: [-1, 0, 1],
		outputRange: [0, 0, 1],
	});

	const resetBottomSheet = Animated.timing(panY, {
		toValue: 0,
		duration: 300,
		useNativeDriver: true,
	});

	const closeBottomSheet = Animated.timing(panY, {
		toValue: screenHeight,
		duration: 300,
		useNativeDriver: true,
	});

	const panResponders = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => false,
			onPanResponderMove: (event, gestureState) => {
				panY.setValue(gestureState.dy);
			},
			onPanResponderRelease: (event, gestureState) => {
				if (gestureState.dy > 0 && gestureState.vy > 1.5) {
					closeModal();
				} else {
					resetBottomSheet.start();
				}
			},
		}),
	).current;

	useEffect(() => {
		if (modalVisible) {
			resetBottomSheet.start();
		}
		setSelectedTopic(initialSelected ? [initialSelected] : []);
	}, [modalVisible, initialSelected]);

	const closeModal = () => {
		closeBottomSheet.start(() => {
			setModalVisible(false);
		});
	};

	const [selectedTopic, setSelectedTopic] = useState([]);

	const topics = [
		{ label: t("free"), value: "FREE" },
		{ label: t("gathering"), value: "GATHERING" },
		{ label: t("tip"), value: "TIP" },
	];

	const handleSelect = (topic) => {
		const singleSelectMode = isReset == null;

		if (singleSelectMode) {
			if (selectedTopic[0] === topic) {
				setSelectedTopic([]);
			} else {
				setSelectedTopic([topic]);
			}
			return;
		}

		if (selectedTopic.includes(topic)) {
			setSelectedTopic(selectedTopic.filter((item) => item !== topic));
		} else {
			setSelectedTopic([...selectedTopic, topic]);
		}
	};

	const reset = (isSearch = false) => {
		if (isSearch) {
			setModalVisible(false);
		} else {
			setSelectedTopic([]);
		}
	};

	useEffect(() => {
		reset();
	}, [isReset]);

	const handleFilter = async () => {
		try {
			const response = await getCommunitySearchByType(selectedTopic);
			reset(true);
			onFilterResponse(response.data);
			onTotalSelection(selectedTopic.length);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"커뮤니티 필터 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			reset(true);
			onSearchResponse(true);
			onTotalSelection(selectedTopic.length);
		}
	};

	const handleTopic = () => {
		onFilterResponse(selectedTopic);
		setModalVisible(false);
	};

	const renderButton = ({ label, value }) => {
		const isSelected = selectedTopic.includes(value);
		return (
			<TouchableOpacity
				key={value}
				style={[
					styles.containerButton,
					isSelected && styles.selectedButton,
				]}
				onPress={() => handleSelect(value)}
			>
				<Text
					style={[
						styles.textButton,
						isSelected && styles.selectedText,
					]}
				>
					{label}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<Modal
			visible={modalVisible}
			animationType={"fade"}
			transparent
			statusBarTranslucent
		>
			<View style={styles.overlay}>
				<TouchableWithoutFeedback onPress={closeModal}>
					<View style={styles.background} />
				</TouchableWithoutFeedback>
				<Animated.View
					style={{
						...styles.bottomSheetContainer,
						transform: [{ translateY: translateY }],
					}}
					{...panResponders.panHandlers}
				>
					<View style={styles.line} />
					<ScrollView style={styles.containerTopic}>
						<Text style={styles.textTopic}>{t("postTopic")}</Text>
						<View style={styles.buttonRow}>
							{topics.map((topic) => renderButton(topic))}
						</View>
					</ScrollView>

					{isReset == null ? (
						<TouchableOpacity
							style={styles.containerButtonComplete}
							onPress={handleTopic}
						>
							<Text style={styles.textButtonComplete}>
								{t("selectionComplete")}
							</Text>
						</TouchableOpacity>
					) : (
						<FilterBottomTwoButtons>
							<View
								totalSelection={selectedTopic.length}
								text={t("clearAll")}
								onPress={() => reset()}
								disabled={selectedTopic.length === 0}
							/>
							<View text={t("apply")} onPress={handleFilter} />
						</FilterBottomTwoButtons>
					)}
				</Animated.View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
	},
	background: {
		flex: 1,
	},
	bottomSheetContainer: {
		height: screenHeight * 0.326,
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingBottom: Platform.OS === "android" ? 1 : 75,
	},
	buttonRow: {
		flexDirection: "row",
		gap: 11,
		paddingHorizontal: 24,
	},
	containerButton: {
		flex: 1,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 1,
		borderColor: "#D9EAFF",
		borderRadius: 43,
	},
	textButton: {
		...fontSub16,
		color: CustomTheme.textSecondary,
	},
	selectedButton: {
		flex: 1,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 43,
	},
	selectedText: {
		fontSize: 16,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		color: CustomTheme.primaryMedium,
	},
	line: {
		width: 47,
		height: 3,
		backgroundColor: "#CFCFCF",
		marginTop: 8,
	},
	containerTopic: {
		width: "100%",
	},
	textTopic: {
		fontSize: 18,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 24,
		marginTop: 24,
		marginBottom: 12,
	},
	containerButtonComplete: {
		width: screenWidth * 0.4053,
		height: 44,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.primaryMedium,
		borderWidth: 2,
		borderColor: CustomTheme.primaryMedium,
		borderRadius: 27,
		marginVertical: 14,
	},
	textButtonComplete: {
		...fontSub16,
		color: CustomTheme.bgBasic,
	},
});

export default TopicBottomSlide;
