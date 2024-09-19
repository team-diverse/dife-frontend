import React, { useState, useRef, useCallback } from "react";
import {
	View,
	Text,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

import EnlargeImageStyles from "@pages/community/EnlargeImageStyles";

import TopBar from "@components/common/TopBar";
import IconImageDownload from "@components/common/IconImageDownload";

const EnlargeImagePage = ({ route }) => {
	const { images, initialIndex } = route.params;
	const { t } = useTranslation();

	const [selectedImageIndex, setSelectedImageIndex] = useState(initialIndex);

	const bigImageFlatListRef = useRef(null);
	const smallImageFlatListRef = useRef(null);

	const handleSmallImagePress = (index) => {
		setSelectedImageIndex(index);
		bigImageFlatListRef.current.scrollToIndex({ index, animated: true });
	};

	const onViewableItemsChanged = useCallback(({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setSelectedImageIndex(viewableItems[0].index);
		}
	}, []);

	const viewabilityConfig = {
		itemVisiblePercentThreshold: 50,
	};

	const getItemLayout = (data, index) => ({
		length: windowWidth,
		offset: windowWidth * index,
		index,
	});

	const windowWidth = Dimensions.get("window").width;

	const saveImage = async () => {
		const currentImageUri = images[selectedImageIndex];

		const { status } =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				t("imagePermissionAlertTitle"),
				t("imagePermissionAlertMessage"),
			);
			return;
		}

		const fileName = `dife-${Date.now()}.jpg`;
		const fileUri = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.downloadAsync(currentImageUri, fileUri);

			const asset = await MediaLibrary.createAssetAsync(fileUri);
			await MediaLibrary.createAlbumAsync("Download", asset, false);

			Alert.alert("", t("saveImageSuccess"));
		} catch (error) {
			console.error(
				"이미지 저장 실패:",
				error.response ? error.response.data : error.message,
			);
			Alert.alert("", t("saveImageFailure"));
		}
	};

	return (
		<SafeAreaView style={EnlargeImageStyles.container}>
			<TopBar topBar="" color="#000" />

			<FlatList
				ref={bigImageFlatListRef}
				data={images}
				renderItem={({ item }) => (
					<Image
						source={{ uri: item }}
						style={[
							EnlargeImageStyles.imageBig,
							{ width: windowWidth },
						]}
					/>
				)}
				keyExtractor={(item, index) => index.toString()}
				horizontal
				pagingEnabled
				initialScrollIndex={selectedImageIndex}
				showsHorizontalScrollIndicator={false}
				onViewableItemsChanged={onViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
				getItemLayout={getItemLayout}
			/>

			<View style={EnlargeImageStyles.containerSmallImage}>
				<FlatList
					ref={smallImageFlatListRef}
					data={images}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							onPress={() => handleSmallImagePress(index)}
						>
							<Image
								source={{ uri: item }}
								style={[
									EnlargeImageStyles.imageSmall,
									index === selectedImageIndex &&
										EnlargeImageStyles.imageSelectedSmall,
								]}
								contentFit="cover"
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item, index) => index.toString()}
					horizontal={true}
				/>

				<Text style={EnlargeImageStyles.textImageNumber}>
					{selectedImageIndex + 1} / {images.length}
				</Text>

				<TouchableOpacity
					style={EnlargeImageStyles.containerDownload}
					onPress={saveImage}
				>
					<IconImageDownload />
					<Text style={EnlargeImageStyles.textDownload}>
						{t("saveImageButton")}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default EnlargeImagePage;
