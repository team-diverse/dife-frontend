import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import WhiteStyles from '@pages/community/WhiteStyles';
import { CustomTheme } from '@styles/CustomTheme';

import TopBar from '@components/common/TopBar';
import IconImage from '@components/community/IconImage';
import Checkbox from '@components/common/Checkbox';
import { useOnboarding } from 'src/states/OnboardingContext.js';
import { usePostModify } from 'states/PostModifyContext';

const PostModifyPage = () => {
    const navigation = useNavigation();
    const { onboardingData } = useOnboarding();
    const { postModifyData } = usePostModify();
    const [isChecked, setIsChecked] = useState(false);
    const [valueTitle, onChangeTitle] = useState(postModifyData.title);
    const [valueContext, onChangeContext] = useState(postModifyData.context);
    const [boardType, setBoardType] = useState('');

    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        if (postModifyData.boardType === 'TIP') {
            setBoardType('꿀팁게시판');
        } else {
            setBoardType('자유게시판');
        };
    }, [postModifyData.boardType])

    const handleModify = () => {
        axios.put(`http://192.168.45.165:8080/api/posts/${postModifyData.id}`, {
            title: valueTitle,
            content: valueContext,
            isPublic: isChecked,
            boardType: postModifyData.boardType,
            memberId: postModifyData.memberId
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${onboardingData.accessToken}`,
            }
        })
        .then(response => {
            console.log('게시글 수정 성공:', response.data.message);
            navigation.goBack();
        })
        .catch(error => {
            console.error('게시글 수정 실패:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <SafeAreaView style={WhiteStyles.container}>
            <TopBar topBar="글쓰기" color='#000' />
            <ScrollView>
                <View style={WhiteStyles.containerWhite}>
                    <View style={WhiteStyles.containerNoticeboard}>
                        <Text style={[WhiteStyles.textNoticeboard, {color: CustomTheme.textSecondary}]}>{boardType}</Text>
                        <TouchableOpacity onPress={handleModify}>
                            <Text style={WhiteStyles.textNoticeboard}>작성 완료</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={WhiteStyles.textInputTitle}
                        placeholder="제목"
                        onChangeText={text => onChangeTitle(text)}
                        value={valueTitle} />
                    <View style={WhiteStyles.line} />
                    <TextInput
                        style={WhiteStyles.textInputContext}
                        placeholder="내용"
                        multiline={true}
                        onChangeText={text => onChangeContext(text)}
                        value={valueContext} />
                    <View style={WhiteStyles.containerIconCheckbox}>
                        <IconImage />
                        <Checkbox
                            checked={isChecked}
                            onPress={() => {handlePress()}}
                            text='익명'
                            basic='true' />
                    </View>
                </View>
                <View style={WhiteStyles.containerRule}>
                    <Text style={WhiteStyles.textRule}>Dife 커뮤니티 이용 규칙{'\n'}
                    Dife는 국민대 학생들이 함께 만들어 가는 글로벌 커뮤니티예요. 모든 회원이 즐겁게 참여할 수 있는 환경을 조성하기 위해 아래의 규칙을 지켜 주세요.
                    {'\n'}- 존중과 포용: 다양한 배경을 가진 우리 모두는, 인종, 종교, 성별, 지역 등 특정 집단에 대한 비난이나 비하하는 발언을 하지 않아요.
                    {'\n'}- 개인정보 보호: 다른 사용자의 개인 정보를 유출하거나 공유하지 않아요.
                    {'\n'}- 적절한 콘텐츠: 음란물이나 성적 수치심을 유발하는 내용을 게시하지 않아요.
                    {'\n'}- 정확한 정보: 홍보성 글, 금전 요구, 허위사실을 포함한 게시물을 올리지 않아요.

                    {'\n'}{'\n'}규칙 위반 시 처리 절차
                    {'\n'}- 게시판: 신고된 게시글은 관리자의 위반 확인 후 삭제돼요. 3회 이상 위반하신 경우, 30일 동안 회원 자격이 중지되고, 이 기간 내에 difeemail@kookmin.ac.kr로 소명해 주셔야 해요. 소명이 없을 경우 회원 자격이 박탈돼요.
                    {'\n'}- 불법 촬영물: 불법 촬영물을 게시할 경우, 전기통신사업법에 따라 즉각적인 삭제 및 서비스 이용 제한, 법적 처벌이 진행돼요.
                    {'\n'}- 매칭/채팅: 3회 이상 신고를 받으신 분은 30일 동안 회원 자격이 중지돼요. 이 기간 동안  difeemail@kookmin.ac.kr로 소명하시거나 적절한 조치를 취해 주세요. 이행하지 않을 경우 회원 자격이 박탈돼요.

                    {'\n'}{'\n'}모든 구성원이 안전하고 쾌적한 커뮤니티 환경을 유지할 수 있도록 함께 노력해 주세요.</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PostModifyPage;