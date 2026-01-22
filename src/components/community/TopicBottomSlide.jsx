import React, { useState, useEffect, useRef } from "react";
import {
	View,
	StyleSheet,
	Modal,
	Text,
	Animated,
	TouchableWithoutFeedback,
	useWindowDimensions,
	PanResponder,
	TouchableOpacity,
	Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CustomTheme } from "@styles/CustomTheme";

import FilterBottomTwoButtons from "@components/connect/FilterBottomTwoButtons";

const { fontSub16 } = CustomTheme;

const TopicBottomSlide = ({
	modalVisible,
	setModalVisible,
	onFilterResponse,
	onTotalSelection,
	isReset,
	initialSelected,
	onSelectionChange,
}) => {
	const { t } = useTranslation();
	const { width: windowWidth, height: windowHeight } = useWindowDimensions();
	const insets = useSafeAreaInsets();

	const panY = useRef(new Animated.Value(windowHeight)).current;

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
		toValue: windowHeight,
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
		if (Array.isArray(initialSelected)) {
			setSelectedTopic(initialSelected);
		} else if (initialSelected) {
			setSelectedTopic([initialSelected]);
		} else {
			setSelectedTopic([]);
		}
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

	const handleFilter = () => {
		reset(true);
		onFilterResponse(selectedTopic);
		onTotalSelection?.(selectedTopic.length);
		onSelectionChange?.(selectedTopic);
	};

	const handleTopic = () => {
		onFilterResponse(selectedTopic);
		onSelectionChange?.(selectedTopic);
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
						height: windowHeight * 0.326,
						paddingBottom: insets.bottom + 12,
					}}
					{...panResponders.panHandlers}
				>
					<View style={styles.line} />
					<View style={styles.containerTopic}>
						<Text style={styles.textTopic}>{t("postTopic")}</Text>
						<View style={styles.buttonRow}>
							{topics.map((topic) => renderButton(topic))}
						</View>
					</View>

					{isReset == null ? (
						<View style={styles.containerRectangleShadow}>
							<TouchableOpacity
								style={[
									styles.containerButtonComplete,
									{ width: windowWidth * 0.4053 },
								]}
								onPress={handleTopic}
							>
								<Text style={styles.textButtonComplete}>
									{t("selectionComplete")}
								</Text>
							</TouchableOpacity>
						</View>
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
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
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
		marginBottom: 42,
	},
	textTopic: {
		fontSize: 18,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 24,
		marginTop: 24,
		marginBottom: 12,
	},
	containerRectangleShadow: {
		flexDirection: "row",
		width: "100%",
		height: 72,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: CustomTheme.bgBasic,
		paddingHorizontal: 24,
		...Platform.select({
			ios: {
				shadowColor: "#3C454E",
				shadowOffset: { width: 0, height: -1 },
				shadowOpacity: 0.1,
				shadowRadius: 8,
			},
			android: {
				borderTopWidth: 1,
				borderBottomWidth: 1,
				borderColor: "rgba(205, 207, 213, 0.3)",
			},
		}),
	},
	containerButtonComplete: {
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
