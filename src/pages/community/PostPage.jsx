import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { TouchableOpacity, Text, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
=======
import { TouchableOpacity, Text, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
>>>>>>> ec1d000 (style: 게시글 내용이 짧을 때 댓글창에 빈 부분이 생기지 않도록 수정)
import axios from 'axios';

import PostStyles from '@pages/community/PostStyles';
import { CustomTheme } from '@styles/CustomTheme';
import { useOnboarding } from 'src/states/OnboardingContext.js';
import { usePostModify } from 'src/states/PostModifyContext';

import TopBar from '@components/common/TopBar';
import IconProfileK from '@components/community/IconProfileK';
import IconKebabMenu from '@components/community/IconKebabMenu';
import IconHeart from '@components/community/IconHeart';
import IconBookmark from '@components/community/IconBookmark';
import DifeLine from '@components/community/DifeLine';
import Checkbox from '@components/common/Checkbox';
import IconChatSend from '@components/chat/IconChatSend';
import ItemComment from '@components/community/ItemComment';
import ModalKebabMenu from '@components/community/ModalKebabMenu';

const PostPage = ({ route }) => {
    const [comments, setComments] = useState([
        { title: '익명', context: '북악관 머시기저시기 와라라라라라랄...용두리를 지나서...어디지', heart: '24', bookmark: '2', date: '1일전' },
        { title: '익명', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', heart: '14', bookmark: '4', date: '7일전' },
        { title: '익명', context: '토플 공부 기깔나게 하기, 외국인 친구 사귀기...', heart: '20', bookmark: '1', date: '5/11' },
    ]);

    const difeLinesCount = Math.floor(comments.length / 1.5);
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    const [ modalVisible, setModalVisible ] = useState(false);

    const { id } = route.params;
    const { onboardingData } = useOnboarding();
    const { updatePostModifyData } = usePostModify();
    
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [writerName, setWriterName] = useState('');
    const [isPublic, setIsPublic] = useState();
    const [created, setCreated] = useState('');
    const [isMe, setIsMe] = useState(false);

    const date = (date) => {
        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        return `${month}/${day}`;
      };

    useEffect(() => {
        axios.get(`http://10.224.101.45:8080/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${onboardingData.accessToken}`,
            'Accept': 'application/json'
          },
          })
          .then(response => {
            setTitle(response.data.title);
            setContext(response.data.content);
            setCreated(date(response.data.created));
            setIsPublic(response.data.isPublic)

            if (response.data.isPublic === false) {
                setWriterName(response.data.member.username);
            } else if (response.data.isPublic === true) {
                setWriterName('익명');
            };

            if (onboardingData.id === response.data.member.id) {
                setIsMe(true)
                updatePostModifyData({
                    memberId: response.data.member.id,
                    id: id,
                    title: response.data.title,
                    context: response.data.content,
                    boardType: response.data.boardType,
                    isPublic: response.data.isPublic,
                });
            };
          })
          .catch(error => {
            console.error('게시글 조회 오류:', error.response ? error.response.data : error.message);
          });
      }, []);

    const handleKebabMenu = () => {
        setModalVisible(true);
    };

    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={PostStyles.container}>
            <TopBar topBar="게시판" color='#000' />
            <ScrollView>
                <View style={PostStyles.containerWhite}>
                    <View style={PostStyles.containerWriterRow}>
                        <View style={{flexDirection: 'row'}}>
                            <IconProfileK />
                            <View style={PostStyles.containerWriterText}>
                                <Text style={PostStyles.textWriter}>{writerName}</Text>
                                <Text style={PostStyles.textDate}>{created}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleKebabMenu}>
                            <IconKebabMenu />
                        </TouchableOpacity>
                        <ModalKebabMenu
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            id={id}
                            isPublic={isPublic}
                            isMe={isMe}
                        />
                    </View>
                    <Text style={PostStyles.textTitle}>{title}</Text>
                    <Text style={PostStyles.textContext}>{context}</Text>
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

                <View style={[PostStyles.containerBackground, {minHeight: windowHeight-300}]}>
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