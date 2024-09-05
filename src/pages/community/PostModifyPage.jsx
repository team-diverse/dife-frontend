import React, { useEffect, useState } from "react";
import {
	Text,
	TextInput,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";
import { usePostModify } from "states/PostModifyContext";
import { updatePost } from "config/api";
import * as Sentry from "@sentry/react-native";

const PostModifyPage = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { postModifyData } = usePostModify();
	const [isChecked, setIsChecked] = useState(false);
	const [valueTitle, onChangeTitle] = useState(postModifyData.title);
	const [valueContext, onChangeContext] = useState(postModifyData.context);
	const [boardType, setBoardType] = useState("");

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (postModifyData.boardType === t("tipsBoard")) {
			setBoardType(t("tipsBoard"));
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
				postModifyData.memberId,
			);
			navigation.goBack();
		} catch (error) {
			Sentry.captureException(error);
			console.error(
				"게시글 수정 실패:",
				error.response ? error.response.data : error.message,
			);
		}
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
							{boardType}
						</Text>
						<TouchableOpacity onPress={handleModify}>
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
					<View style={WriteStyles.containerIconCheckbox}>
						<IconImage />
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
