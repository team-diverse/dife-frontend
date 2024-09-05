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
import Collapsible from "react-native-collapsible";
import Slider from "@react-native-community/slider";
import { useTranslation } from "react-i18next";

import { CustomTheme } from "@styles/CustomTheme";
import { getGroupConnectFilter } from "config/api";

import InfoCircle from "@components/common/InfoCircle";
import FilterArrowBottom from "@components/connect/FilterArrowBottom";
import FilterArrowTop from "@components/connect/FilterArrowTop";
import FilterCategory from "@components/connect/FilterCategory";
import Checkbox from "@components/common/Checkbox";
import FilterBottomTwoButtons from "@components/connect/FilterBottomTwoButtons";

const { fontCaption, fontSub16 } = CustomTheme;

const GroupFilterBottomSlide = (props) => {
	const {
		modalVisible,
		setModalVisible,
		onFilterResponse,
		onSearchResponse,
		onTotalSelection,
		isReset,
	} = props;
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
		if (props.modalVisible) {
			resetBottomSheet.start();
		}
	}, [props.modalVisible]);

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

	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);
	const [sliderValue, setSliderValue] = useState(null);

	const hobby = t("hobbyOptions", { returnObjects: true });
	const languages = t("languages", { returnObjects: true });
	const categories = t("categories", { returnObjects: true });

	const [isCheckedList, setIsCheckedList] = useState(
		new Array(languages.length).fill(false),
	);

	const [isCategoryCheckedList, setIsCategoryCheckedList] = useState(
		new Array(categories.length).fill(false),
	);

	const size = 3;
	const hobbyRows = [];
	for (let i = 0; i < hobby.length; i += size) {
		hobbyRows.push(hobby.slice(i, i + size));
	}

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

	const handleSelectCategory = (index) => {
		setIsCategoryCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});

		const category = categories[index];
		if (isCategoryCheckedList[index]) {
			setSelectedCategory(
				selectedCategory.filter((item) => item !== category),
			);
		} else {
			setSelectedCategory([...selectedCategory, category]);
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
			setSelectedHobby([]);
			setSelectedLanguage([]);
			setSelectedCategory([]);
			setIsCheckedList(new Array(languages.length).fill(false));
			setIsCategoryCheckedList(new Array(categories.length).fill(false));
			setSliderValue(null);
		}
	};

	useEffect(() => {
		reset();
	}, [isReset]);

	const handleGroupFilter = async () => {
		try {
			const response = await getGroupConnectFilter(
				encoded(selectedHobby),
				encoded(selectedLanguage),
				encoded(selectedCategory),
				sliderValue,
			);
			onFilterResponse(response.data);
			onTotalSelection(totalSelection);
			reset(true);
		} catch (error) {
			console.error(
				"그룹 필터 검색 오류:",
				error.response ? error.response.data : error.message,
			);
			reset(true);
			onSearchResponse(true);
			onTotalSelection(totalSelection);
		}
	};

	const [totalSelection, setTotalSelection] = useState();

	useEffect(() => {
		let slider = sliderValue ? 1 : 0;
		setTotalSelection(
			selectedHobby.length +
				selectedLanguage.length +
				selectedCategory.length +
				slider,
		);
	}, [selectedHobby, selectedLanguage, selectedCategory, sliderValue]);

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
					<ScrollView style={styles.listContainer}>
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
								{t("topic")}
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

						<TouchableOpacity
							style={styles.list}
							onPress={() => toggleCollapsed(0)}
						>
							<Text
								style={[
									styles.listText,
									selectedCategory.length >= 1 && {
										color: CustomTheme.primaryMedium,
									},
								]}
							>
								{t("groupCategoryTitle")}
								{"  "}
								{selectedCategory.length >= 1 && (
									<Text style={styles.textSelectedNumber}>
										{selectedCategory.length}
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
							<View>
								<Text style={styles.textHeadcountCategory}>
									{t("headcount")}
								</Text>
								<View style={styles.containerSlider}>
									<Slider
										style={{ width: 200, height: 40 }}
										minimumValue={3}
										maximumValue={30}
										step={1}
										value={sliderValue}
										onValueChange={(value) =>
											setSliderValue(value)
										}
										minimumTrackTintColor={
											CustomTheme.primaryMedium
										}
										thumbTintColor={
											CustomTheme.primaryMedium
										}
										maximumTrackTintColor={
											CustomTheme.bgList
										}
									/>
									<Text style={styles.textHeadcount}>
										{sliderValue}
										{t("people")}
									</Text>
								</View>
							</View>
							<View>
								<Text style={styles.textHeadcountCategory}>
									{t("category")}
								</Text>
								{categories.map((category, index) => (
									<Checkbox
										key={index}
										checked={isCategoryCheckedList[index]}
										onPress={() =>
											handleSelectCategory(index)
										}
										text={category}
									/>
								))}
							</View>
						</Collapsible>
					</ScrollView>

					<FilterBottomTwoButtons>
						<View
							totalSelection={totalSelection}
							text={t("clearAll")}
							onPress={() => reset()}
							disabled={totalSelection === 0}
						/>
						<View text={t("apply")} onPress={handleGroupFilter} />
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
	listIcon: {
		marginRight: 24,
	},
	textHeadcountCategory: {
		...fontSub16,
		color: CustomTheme.textSecondary,
		marginLeft: 24,
		marginTop: 24,
		marginBottom: 12,
	},
	containerSlider: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginLeft: 24,
		marginBottom: 18,
	},
	textHeadcount: {
		...fontSub16,
		color: CustomTheme.primaryMedium,
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
	containerRow: {
		flexDirection: "row",
		justifyContent: "center",
	},
	categoryLanguageContainer: {
		flexDirection: "row",
	},
});

export default GroupFilterBottomSlide;
