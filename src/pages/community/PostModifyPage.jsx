import React, { useEffect, useState } from "react";
import {
	Text,
	TextInput,
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
	FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";
import * as Sentry from "@sentry/react-native";

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { updatePost } from "config/api";
import { useStatusBar } from "util/useStatusBar";
import { usePostModify } from "states/PostModifyContext";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";
import IconCircleNumber from "@components/community/IconCircleNumber";
import IconDelete from "@components/onboarding/IconDelete";
import IconChevronDown from "@components/community/IconChevronDown";
import TopicBottomSlide from "@components/community/TopicBottomSlide";

const PostModifyPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { postModifyData } = usePostModify();
	const [isChecked, setIsChecked] = useState(postModifyData.isAnonymous);
	const [valueTitle, onChangeTitle] = useState(postModifyData.title);
	const [valueContext, onChangeContext] = useState(postModifyData.context);
	const [valueImage, onChangeImage] = useState(postModifyData.images || []);
	const [boardType, setBoardType] = useState("");
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

	useEffect(() => {
		if (postModifyData.boardType == "TIP") {
			setBoardType("TIP");
		} else if (postModifyData.boardType == "FREE") {
			setBoardType("FREE");
		} else {
			setBoardType("GATHERING");
		}
	}, [postModifyData.boardType]);

	const handleAnonymousCheckPress = () => {
		setIsChecked(!isChecked);
	};

	const handleModify = async () => {
		try {
			await updatePost(
				postModifyData.id,
				valueTitle,
				valueContext,
				isChecked,
				boardType,
				valueImage,
			);
			navigation.navigate("PostPage", { postId: postModifyData.id });
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 수정 실패:",
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
			onChangeImage((prevImages) => [...prevImages, ...selectedImages]);
		}
	};

	const handleImageDelete = (uri) => {
		onChangeImage(valueImage.filter((image) => image !== uri));
	};

	const pressTopic = () => {
		setModalVisible(true);
	};

	const handleTopicResponse = (response) => {
		setBoardType(Array.isArray(response) ? response[0] : response);
	};

	return (
		<SafeAreaView style={WriteStyles.container}>
			<TopBar topBar={t("modifyPageTitle")} color="#000" />
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
								{
									topics.find(
										(item) => item.value === boardType,
									)?.label
								}
								{t("post")}
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
						<TouchableOpacity onPress={handleModify}>
							<Text style={WriteStyles.textNoticeboard}>
								{t("completeModifyButton")}
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
					{valueImage && (
						<View style={WriteStyles.containerImage}>
							<FlatList
								data={valueImage}
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
							{valueImage && (
								<View style={WriteStyles.containerImageNumber}>
									<IconCircleNumber
										style={WriteStyles.iconCircleNumber}
									/>
									<Text style={WriteStyles.textImageNumber}>
										{valueImage.length}
									</Text>
								</View>
							)}
							<IconImage />
						</TouchableOpacity>
						<Checkbox
							checked={isChecked}
							onPress={() => {
								handleAnonymousCheckPress();
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

export default PostModifyPage;
