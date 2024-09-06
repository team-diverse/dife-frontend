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
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";
import { createPost } from "config/api";
import IconDelete from "@components/onboarding/IconDelete";
import IconCircleNumber from "@components/community/IconCircleNumber";
import * as Sentry from "@sentry/react-native";

const WritePage = ({ route }) => {
	const { noticeboard } = route.params;
	const { t } = useTranslation();
	const navigation = useNavigation();

	const [isChecked, setIsChecked] = useState(true);
	const [valueTitle, onChangeTitle] = useState("");
	const [valueContext, onChangeContext] = useState("");
	const [isBoardType, setIsBoardType] = useState("");
	const [images, setImages] = useState("");

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (noticeboard === t("freeBoard")) {
			setIsBoardType("FREE");
		} else {
			setIsBoardType("TIP");
		}
	}, [noticeboard]);

	const handleWrite = async () => {
		try {
			if (valueTitle.trim().length !== 0) {
				await createPost(
					valueTitle,
					valueContext,
					isChecked,
					isBoardType,
					images,
				);
				navigation.goBack();
			} else {
				Alert.alert(
					"",
					t("titlePlaceholder"),
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

	return (
		<SafeAreaView style={WriteStyles.container}>
			<TopBar topBar={t("writePageTitle")} color="#000" />
			<ScrollView>
				<View style={WriteStyles.containerWhite}>
					<View style={WriteStyles.containerNoticeboard}>
						<Text
							style={[
								WriteStyles.textNoticeboard,
								{ color: CustomTheme.textSecondary },
							]}
						>
							{noticeboard}
						</Text>
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
