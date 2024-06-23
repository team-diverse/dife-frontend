import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

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
    const [ modalVisible, setModalVisible ] = useState(false);

    const { id } = route.params;
    const { onboardingData } = useOnboarding();
    const { updatePostModifyData } = usePostModify();
    
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const [heart, setHeart] = useState('');
    const [bookmark, setBookmark] = useState('');
    const [writerName, setWriterName] = useState('');
    const [isPublic, setIsPublic] = useState();
    const [created, setCreated] = useState('');
    const [isMe, setIsMe] = useState(false);
    const [comments, setComments] = useState([]);
    const [valueComment, onChangeComment] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handlePress = () => {
        setIsChecked(!isChecked);
    };

    const difeLinesCount = Math.floor(comments.length / 1.5);

    const date = (date) => {
        const datePart = date.split('T')[0];
        const [year, month, day] = datePart.split('-');
        return `${month}/${day}`;
      };

    const handlePost = () => {
        axios.get(`http://192.168.45.135:8080/api/posts/${id}`, {
          headers: {
            'Authorization': `Bearer ${onboardingData.accessToken}`,
            'Accept': 'application/json'
          },
          })
          .then(response => {
            setTitle(response.data.title);
            setContext(response.data.content);
            setHeart(response.data.likesCount);
            setBookmark(response.data.bookmarkCount);
            setCreated(date(response.data.created));
            setIsPublic(response.data.isPublic);

            if (response.data.isPublic === false) {
                setWriterName(response.data.writer.username);
            } else if (response.data.isPublic === true) {
                setWriterName('익명');
            };

            if (onboardingData.id === response.data.writer.id) {
                setIsMe(true)
                updatePostModifyData({
                    memberId: response.data.writer.id,
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
    };

    const handleComment = () => {
        axios.get(`http://192.168.45.135:8080/api/comments/${id}`, {
          headers: {
            'Authorization': `Bearer ${onboardingData.accessToken}`,
            'Accept': 'application/json'
          },
          })
          .then(response => {
            const addComments = (data) => {
                const commentsArray = data.map((item) => ({
                    title: item.isPublic ? '익명' : item.writer.username,
                    context: item.content,
                    heart: item.likesCount,
                    bookmark: item.viewCount,
                    date: item.created,
                    id: item.id,
                  }));
                setComments(commentsArray);
              };
            addComments(response.data);
          })
          .catch(error => {
            console.error('댓글 조회 오류:', error.response ? error.response.data : error.message);
          });
    };

    useEffect(() => {
        handlePost();
        handleComment();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            handlePost();
            handleComment();
        }, [])
    );
    
    const [scrollY, setScrollY] = useState(0);
    const [iconPosition, setIconPosition] = useState({ x: 0, y: 0 });
    const [topBarPosition, setTopBarPosition] = useState({ x: 0, y: 0 });

    const handleScroll = (event) => {
        const { y } = event.nativeEvent.contentOffset;
        setScrollY(y);
    };

    const handleKebabMenuLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setIconPosition({ x, y, width, height });
    };

    const handleTopBarLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        setTopBarPosition({ x, y, width, height });
    };

    const handleKebabMenu = () => {
        setModalVisible(true);
    };

    const modalPosition = {
        top: iconPosition.height + iconPosition.y + topBarPosition.height + topBarPosition.y - scrollY,
        width: iconPosition.width
    };

    const windowHeight = Dimensions.get('window').height;

    const handleCommentSend = () => {
        console.log(valueComment);
        axios.post(`http://192.168.45.135:8080/api/comments/${id}`, {
            content: valueComment,
            isPublic: isChecked,
            postId: id,
            parentCommentId: 0,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${onboardingData.accessToken}`,
            }
        })
        .then(response => {
            console.log('댓글 작성 성공:', response.data);
        })
        .catch(error => {
            console.error('댓글 작성 실패:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <SafeAreaView style={PostStyles.container}>
            <View onLayout={handleTopBarLayout}>
                <TopBar topBar="게시판" color='#000' />
            </View>
            <ScrollView onScroll={handleScroll}>
                <View style={PostStyles.containerWhite}>
                    <View style={PostStyles.containerWriterRow} >
                        <View style={{flexDirection: 'row'}}>
                            <IconProfileK />
                            <View style={PostStyles.containerWriterText}>
                                <Text style={PostStyles.textWriter}>{writerName}</Text>
                                <Text style={PostStyles.textDate}>{created}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={handleKebabMenu} onLayout={handleKebabMenuLayout}>
                            <IconKebabMenu />
                        </TouchableOpacity>
                        <ModalKebabMenu
                            modalVisible={modalVisible}
                            setModalVisible={setModalVisible}
                            id={id}
                            isPublic={isPublic}
                            isMe={isMe}
                            position={modalPosition}
                        />
                    </View>
                    <Text style={PostStyles.textTitle}>{title}</Text>
                    <Text style={PostStyles.textContext}>{context}</Text>
                    <View style={PostStyles.containerIconRow}>
                        <View style={PostStyles.iconRow}>
                            <IconHeart />
                            <Text style={PostStyles.textIcon}>{heart}</Text>
                        </View>
                        <View style={PostStyles.iconRow}>
                            <IconBookmark />
                            <Text style={PostStyles.textIcon}>{bookmark}</Text>
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
                        placeholder="댓글을 입력해주세요" 
                        onChangeText={text => onChangeComment(text)}
                        value={valueComment} />
                    <TouchableOpacity style={PostStyles.iconChatSend} onPress={handleCommentSend}>
                        <IconChatSend color={CustomTheme.primaryMedium} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default PostPage;