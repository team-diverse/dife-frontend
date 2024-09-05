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
} from "react-native";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { getConnectFilter } from "config/api";

import Collapsible from "react-native-collapsible";
import InfoCircle from "@components/common/InfoCircle";
import FilterArrowBottom from "@components/connect/FilterArrowBottom";
import FilterArrowTop from "@components/connect/FilterArrowTop";
import FilterCategory from "@components/connect/FilterCategory";
import Checkbox from "@components/common/Checkbox";
import FilterBottomTwoButtons from "@components/connect/FilterBottomTwoButtons";
import * as Sentry from "@sentry/react-native";

const { fontCaption, fontNaviBold } = CustomTheme;

const FilterBottomSlide = ({
	modalVisible,
	setModalVisible,
	onFilterResponse,
	onSearchResponse,
	onTotalSelection,
	isReset,
}) => {
	const { t } = useTranslation();

	const screenHeight = Dimensions.get("screen").height;
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
	}, [modalVisible]);

	const closeModal = () => {
		closeBottomSheet.start(() => {
			setModalVisible(false);
		});
	};

	const [collapsedStates, setCollapsedStates] = useState([true, true, true]);

	const toggleCollapsed = (index) => {
		const newCollapsedStates = [...collapsedStates];
		newCollapsedStates[index] = !newCollapsedStates[index];
		setCollapsedStates(newCollapsedStates);
	};

	const [selectedMBTI, setSelectedMBTI] = useState([]);
	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);

	const mbti = t("mbtiOptions", { returnObjects: true });
	const hobby = t("hobbyOptions", { returnObjects: true });
	const languages = t("languages", { returnObjects: true });

	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	const size = 3;
	const mbtiRows = [];
	for (let i = 0; i < mbti.length; i += size) {
		mbtiRows.push(mbti.slice(i, i + size));
	}
	const hobbyRows = [];
	for (let i = 0; i < hobby.length; i += size) {
		hobbyRows.push(hobby.slice(i, i + size));
	}

	const handleSelectMBTI = (mbti) => {
		if (selectedMBTI.includes(mbti)) {
			setSelectedMBTI(selectedMBTI.filter((item) => item !== mbti));
		} else {
			setSelectedMBTI([...selectedMBTI, mbti]);
		}
	};

	const handleSelectHobby = (hobby) => {
		if (selectedHobby.includes(hobby)) {
			setSelectedHobby(selectedHobby.filter((item) => item !== hobby));
		} else {
			setSelectedHobby([...selectedHobby, hobby]);
		}
	};

	const handleSelectLanguage = (index) => {
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});

		const language = languages[index];
		if (isCheckedList[index]) {
			setSelectedLanguage(
				selectedLanguage.filter((item) => item !== language),
			);
		} else {
			setSelectedLanguage([...selectedLanguage, language]);
		}
	};

	const encoded = (selected) => {
		const encoded = selected.map((item) => item);
		return `${encoded.join(",")}`;
	};

	const reset = (isSearch = false) => {
		setCollapsedStates([true, true, true]);
		if (isSearch) {
			setModalVisible(false);
		} else {
			setSelectedMBTI([]);
			setSelectedHobby([]);
			setSelectedLanguage([]);
			setIsCheckedList(new Array(languages.length).fill(false));
		}
	};

	useEffect(() => {
		reset();
	}, [isReset]);

	const handleFilter = async () => {
		try {
			const response = await getConnectFilter(
				encoded(selectedMBTI),
				encoded(selectedHobby),
				encoded(selectedLanguage),
			);
			reset(true);
			onFilterResponse(response.data);
			onTotalSelection(totalSelection);
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"필터 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			reset(true);
			onSearchResponse(true);
			onTotalSelection(totalSelection);
		}
	};

	const [totalSelection, setTotalSelection] = useState();

	useEffect(() => {
		setTotalSelection(
			selectedMBTI.length +
				selectedHobby.length +
				selectedLanguage.length,
		);
	}, [selectedMBTI, selectedHobby, selectedLanguage]);

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
					<ScrollView style={styles.listContainer}>
						<TouchableOpacity
							style={styles.list}
							onPress={() => toggleCollapsed(0)}
						>
							<Text
								style={[
									styles.listText,
									selectedMBTI.length >= 1 && {
										color: CustomTheme.primaryMedium,
									},
								]}
							>
								{t("mbti")}
								{"  "}
								{selectedMBTI.length >= 1 && (
									<Text style={styles.textSelectedNumber}>
										{selectedMBTI.length}
									</Text>
								)}
							</Text>
							{collapsedStates[0] ? (
								<FilterArrowBottom style={styles.listIcon} />
							) : (
								<FilterArrowTop style={styles.listIcon} />
							)}
						</TouchableOpacity>
						<Collapsible collapsed={collapsedStates[0]}>
							<View style={styles.infoTextContainer}>
								<InfoCircle />
								<Text style={styles.infoText}>
									{t("max3Selection")}
								</Text>
							</View>
							<View style={styles.containerMbti}>
								<View style={styles.flexStartMbti}>
									{mbtiRows.map((row, rowIndex) => (
										<View
											key={rowIndex}
											style={styles.rowMbti}
										>
											{row.map((type, typeIndex) => (
												<FilterCategory
													key={typeIndex}
													text={type}
													mbtiCount={1}
													onPress={() =>
														handleSelectMBTI(type)
													}
													selected={selectedMBTI.includes(
														type,
													)}
												/>
											))}
										</View>
									))}
								</View>
							</View>
						</Collapsible>

						<TouchableOpacity
							style={styles.list}
							onPress={() => toggleCollapsed(1)}
						>
							<Text
								style={[
									styles.listText,
									selectedHobby.length >= 1 && {
										color: CustomTheme.primaryMedium,
									},
								]}
							>
								{t("hobby")}
								{"  "}
								{selectedHobby.length >= 1 && (
									<Text style={styles.textSelectedNumber}>
										{selectedHobby.length}
									</Text>
								)}
							</Text>
							{collapsedStates[1] ? (
								<FilterArrowBottom style={styles.listIcon} />
							) : (
								<FilterArrowTop style={styles.listIcon} />
							)}
						</TouchableOpacity>
						<Collapsible collapsed={collapsedStates[1]}>
							<View style={styles.infoTextContainer}>
								<InfoCircle />
								<Text style={styles.infoText}>
									{t("max3Selection")}
								</Text>
							</View>
							<View>
								{hobbyRows.map((row, rowIndex) => (
									<View
										key={rowIndex}
										style={styles.containerRow}
									>
										{row.map((type, typeIndex) => (
											<FilterCategory
												key={typeIndex}
												text={type}
												hobbyCount={
													selectedHobby.length
												}
												onPress={() =>
													handleSelectHobby(type)
												}
												selected={selectedHobby.includes(
													type,
												)}
											/>
										))}
									</View>
								))}
							</View>
						</Collapsible>

						<TouchableOpacity
							style={styles.list}
							onPress={() => toggleCollapsed(2)}
						>
							<Text
								style={[
									styles.listText,
									selectedLanguage.length >= 1 && {
										color: CustomTheme.primaryMedium,
									},
								]}
							>
								{t("language")}
								{"  "}
								{selectedLanguage.length >= 1 && (
									<Text style={styles.textSelectedNumber}>
										{selectedLanguage.length}
									</Text>
								)}
							</Text>
							{collapsedStates[2] ? (
								<FilterArrowBottom style={styles.listIcon} />
							) : (
								<FilterArrowTop style={styles.listIcon} />
							)}
						</TouchableOpacity>
						<Collapsible collapsed={collapsedStates[2]}>
							<View style={styles.infoTextContainer}>
								<InfoCircle />
								<Text style={styles.infoText}>
									{t("duplicateSelection")}
								</Text>
							</View>
							{languages.map((language, index) => (
								<Checkbox
									key={index}
									checked={isCheckedList[index]}
									onPress={() => handleSelectLanguage(index)}
									text={language}
								/>
							))}
						</Collapsible>
					</ScrollView>

					<FilterBottomTwoButtons>
						<View
							totalSelection={totalSelection}
							text={t("clearAll")}
							onPress={() => reset()}
							disabled={totalSelection === 0}
						/>
						<View text={t("apply")} onPress={handleFilter} />
					</FilterBottomTwoButtons>
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
		height: 576,
		alignItems: "center",
		backgroundColor: "white",
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	line: {
		width: 47,
		height: 3,
		backgroundColor: "#CFCFCF",
		marginTop: 8,
	},
	listContainer: {
		width: "100%",
		marginTop: 35,
	},
	list: {
		width: "100%",
		height: 56,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: CustomTheme.bgBasic,
		borderBottomWidth: 2,
		borderBottomColor: CustomTheme.bgList,
	},
	listText: {
		fontSize: 18,
		lineHeight: 24,
		fontFamily: "NotoSansCJKkr-Bold",
		marginLeft: 24,
		marginVertical: 16,
	},
	textSelectedNumber: {
		fontSize: 16,
		lineHeight: 18,
		fontFamily: "NotoSansCJKkr-Bold",
	},
	listIcon: {
		marginRight: 24,
	},
	infoTextContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 6,
		marginLeft: 26,
	},
	infoText: {
		...fontCaption,
		color: "#8C8D91",
		marginLeft: 3,
	},
	containerMbti: {
		alignItems: "center",
		marginVertical: 10,
	},
	flexStartMbti: {
		alignItems: "flex-start",
	},
	rowMbti: {
		flexDirection: "row",
	},
	containerRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	categoryLanguageContainer: {
		flexDirection: "row",
	},
	checkbox: {
		height: 24,
		width: 24,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: CustomTheme.bgList,
		alignItems: "center",
		justifyContent: "center",
	},
	checked: {
		backgroundColor: CustomTheme.primaryBg,
		borderColor: CustomTheme.primaryMedium,
	},
	label: {
		marginLeft: 8,
	},
	containerImageNumber: {
		position: "absolute",
		top: -2,
		right: -3,
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
	iconCircleNumber: {
		position: "absolute",
	},
	textImageNumber: {
		...fontNaviBold,
		color: CustomTheme.primaryMedium,
		zIndex: 11,
	},
});

export default FilterBottomSlide;
