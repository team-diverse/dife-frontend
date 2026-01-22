import React, { useState } from "react";
import {
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import * as Sentry from "@sentry/react-native";
import TextInput from "@components/common/TextInput";

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";
import { createPost } from "config/api";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";

import IconDelete from "@components/onboarding/IconDelete";
import IconCircleNumber from "@components/community/IconCircleNumber";
import IconChevronDown from "@components/community/IconChevronDown";
import TopicBottomSlide from "@components/community/TopicBottomSlide";

const WritePage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [isChecked, setIsChecked] = useState(true);
	const [valueTitle, onChangeTitle] = useState("");
	const [valueContext, onChangeContext] = useState("");
	const [boardType, setBoardType] = useState("");
	const [images, setImages] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const topics = [
		{ label: t("free"), value: "FREE" },
		{ label: t("gathering"), value: "GATHERING" },
		{ label: t("tip"), value: "TIP" },
	];

	useStatusBar({
		color: CustomTheme.bgBasic,
		barStyle: "dark-content",
	});

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	const handleWrite = async () => {
		try {
			if (
				boardType.length !== 0 &&
				valueTitle.trim().length !== 0 &&
				valueContext.trim().length !== 0
			) {
				await createPost(
					valueTitle,
					valueContext,
					isChecked,
					boardType,
					images,
				);
				navigation.goBack();
			} else {
				Alert.alert(
					"",
					t("titleAndContentRequired"),
					[
						{
							text: t("confirmButtonText"),
						},
					],
					{ cancelable: false },
				);
			}
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 작성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	const pickImage = async () => {
		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				t("imagePermissionAlertTitle"),
				t("imagePermissionAlertMessage"),
			);
			return;
		}

		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			quality: 1,
			allowsMultipleSelection: true,
		});

		if (!result.canceled) {
			const selectedImages = result.assets.map((asset) => asset.uri);
			if (selectedImages.length > 9) {
				Alert.alert(
					t("imagePermissionAlertTitle"),
					t("imagePermissionAlertMessage"),
				);
				return;
			}
			setImages(selectedImages);
		}
	};

	const handleImageDelete = (uri) => {
		setImages(images.filter((image) => image !== uri));
	};

	const pressTopic = () => {
		setModalVisible(true);
	};

	const handleTopicResponse = (response) => {
		setBoardType(Array.isArray(response) ? response[0] : response);
	};

	return (
		<SafeAreaView style={WriteStyles.container}>
			<TopBar topBar={t("writePageTitle")} color="#000" />
			<ScrollView>
				<View style={WriteStyles.containerWhite}>
					<View style={WriteStyles.containerNoticeboard}>
						<TouchableOpacity
							style={WriteStyles.containerCategory}
							onPress={pressTopic}
						>
							<Text
								style={[
									WriteStyles.textNoticeboard,
									{
										color: CustomTheme.textSecondary,
										marginRight: 4,
									},
								]}
							>
								{boardType
									? `${
											topics.find(
												(item) =>
													item.value === boardType,
											)?.label
										}${t("post")}`
									: t("selectCategory")}
							</Text>
							<IconChevronDown />
						</TouchableOpacity>
						<TopicBottomSlide
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							onFilterResponse={handleTopicResponse}
							onSearchResponse={null}
							onTotalSelection={null}
							isReset={null}
							initialSelected={boardType}
						/>
						<TouchableOpacity onPress={handleWrite}>
							<Text style={WriteStyles.textNoticeboard}>
								{t("completeWriteButton")}
							</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={WriteStyles.textInputTitle}
						placeholder={t("titlePlaceholder")}
						onChangeText={(text) => onChangeTitle(text)}
						value={valueTitle}
					/>
					<View style={WriteStyles.line} />
					<TextInput
						style={WriteStyles.textInputContext}
						placeholder={t("contentPlaceholder")}
						multiline={true}
						onChangeText={(text) => onChangeContext(text)}
						value={valueContext}
					/>
					{images && (
						<View style={WriteStyles.containerImage}>
							<FlatList
								data={images}
								renderItem={({ item }) => (
									<>
										<TouchableOpacity
											style={WriteStyles.iconDelete}
											onPress={() =>
												handleImageDelete(item)
											}
										>
											<IconDelete />
										</TouchableOpacity>
										<Image
											source={{ uri: item }}
											style={WriteStyles.image}
										/>
									</>
								)}
								keyExtractor={(item, index) => index.toString()}
								horizontal={true}
							/>
						</View>
					)}
					<View style={WriteStyles.containerIconCheckbox}>
						<TouchableOpacity onPress={pickImage}>
							{images && (
								<View style={WriteStyles.containerImageNumber}>
									<IconCircleNumber
										style={WriteStyles.iconCircleNumber}
									/>
									<Text style={WriteStyles.textImageNumber}>
										{images.length}
									</Text>
								</View>
							)}
							<IconImage />
						</TouchableOpacity>
						<Checkbox
							checked={isChecked}
							onPress={() => {
								handlePress();
							}}
							text={t("anonymousCheckboxLabel")}
							basic="true"
						/>
					</View>
				</View>
				<View style={WriteStyles.containerRule}>
					<Text style={WriteStyles.textRule}>
						{t("ruleTitle")}
						{"\n"}
						{t("ruleContent")}
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default WritePage;
