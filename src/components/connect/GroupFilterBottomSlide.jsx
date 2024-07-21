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
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import { CustomTheme } from "@styles/CustomTheme";

import InfoCircle from "@components/common/InfoCircle";
import FilterArrowBottom from "@components/connect/FilterArrowBottom";
import FilterArrowTop from "@components/connect/FilterArrowTop";
import FilterCategory from "@components/connect/FilterCategory";
import Checkbox from "@components/common/Checkbox";
import ApplyButton from "@components/common/ApplyButton";

const { fontCaption, fontSub16 } = CustomTheme;

const GroupFilterBottomSlide = (props) => {
	const { modalVisible, setModalVisible } = props;
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

	const [isCheckedList, setIsCheckedList] = useState([
		false,
		false,
		false,
		false,
		false,
	]);

	const [selectedHobby, setSelectedHobby] = useState([]);
	const [selectedLanguage, setSelectedLanguage] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState([]);

	const hobby = [
		"SNS",
		"OTT",
		"캠핑",
		"쇼핑",
		"드라이브",
		"산책",
		"반려동물",
		"스포츠",
		"K-POP",
		"사진",
		"음악",
		"드라마",
		"독서",
		"그림",
		"요리",
		"만화",
		"언어공부",
		"여행",
		"악기연주",
		"영화",
		"맛집",
	];
	const languages = [
		"English / English",
		"中文 / Chinese",
		"日本語 / Japanese",
		"Español / Spanish",
		"한국어 / Korean",
	];
	const categories = ["소통/친구 사귀기", "언어교환", "자유"];

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
		setIsCheckedList((prevState) => {
			const newState = [...prevState];
			newState[index] = !newState[index];
			return newState;
		});

		const category = categories[index];
		if (isCheckedList[index]) {
			setSelectedCategory(
				selectedCategory.filter((item) => item !== category),
			);
		} else {
			setSelectedCategory([...selectedCategory, category]);
		}
	};

	const [multiSliderValue, setMultiSliderValue] = React.useState([3, 7]);
	const multiSliderValuesChange = (values) => setMultiSliderValue(values);

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
							<Text style={styles.listText}>주제</Text>
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
									최대 3개까지 선택 가능
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
												hobbyCount={selectedHobby.length}
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
							<Text style={styles.listText}>언어</Text>
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
									중복 선택 가능
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
							<Text style={styles.listText}>그룹 인원/유형</Text>
							{collapsedStates[0] ? (
								<FilterArrowBottom style={styles.listIcon} />
							) : (
								<FilterArrowTop style={styles.listIcon} />
							)}
						</TouchableOpacity>
						<Collapsible collapsed={collapsedStates[0]}>
							<View>
								<Text style={styles.textHeadcountCategory}>
									인원수
								</Text>
								<View style={styles.containerSlider}>
									<MultiSlider
										values={[
											multiSliderValue[0],
											multiSliderValue[1],
										]}
										sliderLength={216}
										onValuesChange={multiSliderValuesChange}
										min={3}
										max={30}
										step={1}
										allowOverlap
										snapped
									/>
									<Text style={styles.textHeadcount}>
										{multiSliderValue[0]} ~{" "}
										{multiSliderValue[1]}명
									</Text>
								</View>
							</View>
							<View>
								<Text style={styles.textHeadcountCategory}>
									유형
								</Text>
								{categories.map((category, index) => (
									<Checkbox
										key={index}
										checked={isCheckedList[index]}
										onPress={() =>
											handleSelectCategory(index)
										}
										text={category}
									/>
								))}
							</View>
						</Collapsible>
					</ScrollView>

					<ApplyButton text="적용하기" background="true" />
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
