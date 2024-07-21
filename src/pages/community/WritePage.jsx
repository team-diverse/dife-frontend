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

import WriteStyles from "@pages/community/WriteStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconImage from "@components/community/IconImage";
import Checkbox from "@components/common/Checkbox";
import { createPost } from "config/api";

const WritePage = ({ route }) => {
	const { noticeboard } = route.params;
	const navigation = useNavigation();
	const [isChecked, setIsChecked] = useState(false);
	const [valueTitle, onChangeTitle] = useState("");
	const [valueContext, onChangeContext] = useState("");
	const [isBoardType, setIsBoardType] = useState("");

	const handlePress = () => {
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		if (noticeboard === "자유게시판") {
			setIsBoardType("FREE");
		} else {
			setIsBoardType("TIP");
		}
	}, [noticeboard]);

	const handleWrite = async () => {
		try {
			const response = await createPost(
				valueTitle,
				valueContext,
				isChecked,
				isBoardType,
			);
			console.log("게시글 작성 성공:", response.data.message);
			navigation.goBack();
		} catch (error) {
			console.error(
				"게시글 작성 실패:",
				error.response ? error.response.data : error.message,
			);
		}
	};

	return (
		<SafeAreaView style={WriteStyles.container}>
			<TopBar topBar="글쓰기" color="#000" />
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
								작성 완료
							</Text>
						</TouchableOpacity>
					</View>
					<TextInput
						style={WriteStyles.textInputTitle}
						placeholder="제목"
						onChangeText={(text) => onChangeTitle(text)}
						value={valueTitle}
					/>
					<View style={WriteStyles.line} />
					<TextInput
						style={WriteStyles.textInputContext}
						placeholder="내용"
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
							text="익명"
							basic="true"
						/>
					</View>
				</View>
				<View style={WriteStyles.containerRule}>
					<Text style={WriteStyles.textRule}>
						Dife 커뮤니티 이용 규칙{"\n"}
						Dife는 국민대 학생들이 함께 만들어 가는 글로벌
						커뮤니티예요. 모든 회원이 즐겁게 참여할 수 있는 환경을
						조성하기 위해 아래의 규칙을 지켜 주세요.
						{"\n"}- 존중과 포용: 다양한 배경을 가진 우리 모두는,
						인종, 종교, 성별, 지역 등 특정 집단에 대한 비난이나
						비하하는 발언을 하지 않아요.
						{"\n"}- 개인정보 보호: 다른 사용자의 개인 정보를
						유출하거나 공유하지 않아요.
						{"\n"}- 적절한 콘텐츠: 음란물이나 성적 수치심을 유발하는
						내용을 게시하지 않아요.
						{"\n"}- 정확한 정보: 홍보성 글, 금전 요구, 허위사실을
						포함한 게시물을 올리지 않아요.
						{"\n"}
						{"\n"}규칙 위반 시 처리 절차
						{"\n"}- 게시판: 신고된 게시글은 관리자의 위반 확인 후
						삭제돼요. 3회 이상 위반하신 경우, 30일 동안 회원 자격이
						중지되고, 이 기간 내에 difeemail@kookmin.ac.kr로 소명해
						주셔야 해요. 소명이 없을 경우 회원 자격이 박탈돼요.
						{"\n"}- 불법 촬영물: 불법 촬영물을 게시할 경우,
						전기통신사업법에 따라 즉각적인 삭제 및 서비스 이용 제한,
						법적 처벌이 진행돼요.
						{"\n"}- 매칭/채팅: 3회 이상 신고를 받으신 분은 30일 동안
						회원 자격이 중지돼요. 이 기간 동안
						difeemail@kookmin.ac.kr로 소명하시거나 적절한 조치를
						취해 주세요. 이행하지 않을 경우 회원 자격이 박탈돼요.
						{"\n"}
						{"\n"}모든 구성원이 안전하고 쾌적한 커뮤니티 환경을
						유지할 수 있도록 함께 노력해 주세요.
					</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default WritePage;
