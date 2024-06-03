import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

import PostStyles from '@pages/community/PostStyles';
import { CustomTheme } from '@styles/CustomTheme';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import TopBar from '@components/common/TopBar';
import IconProfileK from '@components/community/IconProfileK';
import IconKebabMenu from '@components/community/IconKebabMenu';
import IconHeart from '@components/community/IconHeart';
import IconBookmark from '@components/community/IconBookmark';
import DifeLine from '@components/community/DifeLine';
import Checkbox from '@components/common/Checkbox';
import IconChatSend from '@components/chat/IconChatSend';
import ItemComment from '@components/community/ItemComment';

const PostPage = ({ route }) => {
    const [comments, setComments] = useState([
        { title: '익명', context: '북악관 머시기저시기 와라라라라라랄...용두리를 지나서...어디지', heart: '24', bookmark: '2', date: '1일전' },
        { title: '익명', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', heart: '14', bookmark: '4', date: '7일전' },
        { title: '익명', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', heart: '20', bookmark: '1', date: '5/11' },
    ]);

    const difeLinesCount = Math.floor(comments.length / 2);
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    const { id } = route.params;
    const { onboardingData } = useOnboarding();
    const [isTitle, setIsTitle] = useState('');
    const [isContext, setIsContext] = useState('');
    const [isPublic, setIsPublic] = useState('');
    const [isDate, setIsDate] = useState('');

    const date = (date) => {
        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        return `${month}/${day}`;
      };

    useEffect(() => {
        axios.get(`http://192.168.45.176:8080/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${onboardingData.accessToken}`,
            'Accept': 'application/json'
          },
          })
          .then(response => {
            setIsTitle(response.data.title);
            setIsContext(response.data.content);
            setIsDate(date(response.data.created));
            if (response.data.isPublic === false) {
                setIsPublic(response.data.member.username);
            } else if (response.data.isPublic === true) {
                setIsPublic('익명');
            };
          })
          .catch(error => {
            console.error('게시글 조회 오류:', error.response ? error.response.data : error.message);
          });
      }, []);

    return (
        <SafeAreaView style={PostStyles.container}>
            <TopBar topBar="게시판" color='#000' />
            <ScrollView>
                <View style={PostStyles.containerWhite}>
                    <View style={PostStyles.containerWriterRow}>
                        <View style={{flexDirection: 'row'}}>
                            <IconProfileK />
                            <View style={PostStyles.containerWriterText}>
                                <Text style={PostStyles.textWriter}>{isPublic}</Text>
                                <Text style={PostStyles.textDate}>{isDate}</Text>
                            </View>
                        </View>
                        <IconKebabMenu />
                    </View>
                    <Text style={PostStyles.textTitle}>{isTitle}</Text>
                    <Text style={PostStyles.textContext}>{isContext}</Text>
                    <View style={PostStyles.containerIconRow}>
                        <View style={PostStyles.iconRow}>
                            <IconHeart />
                            <Text style={PostStyles.textIcon}>21</Text>
                        </View>
                        <View style={PostStyles.iconRow}>
                            <IconBookmark />
                            <Text style={PostStyles.textIcon}>2</Text>
                        </View>
                        <TouchableOpacity style={PostStyles.textTranslation}>
                            <Text style={PostStyles.textTranslation}>번역하기</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={PostStyles.containerBackground}>
                <View style={PostStyles.difeLine}>
                    {Array.from({ length: difeLinesCount }).map((_, index) => (
                        <DifeLine key={index} />
                    ))}
                </View>
                <View style={{marginTop: 48}}>
                    <ItemComment props={comments} />
                    </View>
                </View>
            </ScrollView>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <View style={PostStyles.containerInputComment}>
                    <View style={PostStyles.checkbox}>
                        <Checkbox
                            checked={isChecked}
                            onPress={() => {handlePress()}}
                            text='익명'
                            basic='true' />
                    </View>
                    <TextInput
                        style={PostStyles.textInputComment}
                        placeholder="댓글을 입력해주세요" />
                    <TouchableOpacity style={PostStyles.iconChatSend}>
                        <IconChatSend color={CustomTheme.primaryMedium} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default PostPage;