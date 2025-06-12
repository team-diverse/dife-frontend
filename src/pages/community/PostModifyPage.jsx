import React, { useEffect, useState } from "react";
import {
	Text,
	TextInput,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
	FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import * as ImagePicker from "expo-image-picker";

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";
import { useStatusBar } from "util/useStatusBar";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";
import { usePostModify } from "states/PostModifyContext";
import { updatePost } from "config/api";
import * as Sentry from "@sentry/react-native";
import IconCircleNumber from "@components/community/IconCircleNumber";
import IconDelete from "@components/onboarding/IconDelete";

const PostModifyPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { postModifyData } = usePostModify();
	const [isChecked, setIsChecked] = useState(postModifyData.isAnonymous);
	const [valueTitle, onChangeTitle] = useState(postModifyData.title);
	const [valueContext, onChangeContext] = useState(postModifyData.context);
	const [valueImage, onChangeImage] = useState(postModifyData.images || []);
	const [boardType, setBoardType] = useState("");

	useStatusBar({
		color: CustomTheme.bgBasic,
		barStyle: "dark-content",
	});

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (postModifyData.boardType === t("tipBoard")) {
			setBoardType(t("tipBoard"));
		} else {
			setBoardType(t("freeBoard"));
		}
	}, [postModifyData.boardType]);

	const handleModify = async () => {
		try {
			await updatePost(
				postModifyData.id,
				valueTitle,
				valueContext,
				isChecked,
				postModifyData.boardType,
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

	return (
		<SafeAreaView style={WriteStyles.container}>
			<TopBar topBar={t("modifyPageTitle")} color="#000" />
			<ScrollView>
				<View style={WriteStyles.containerWhite}>
					<View style={WriteStyles.containerNoticeboard}>
						<Text
							style={[
								WriteStyles.textNoticeboard,
								{ color: CustomTheme.textSecondary },
							]}
						>
							{boardType}
						</Text>
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

export default PostModifyPage;
