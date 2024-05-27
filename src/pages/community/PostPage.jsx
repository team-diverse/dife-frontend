import React, { useState } from 'react';
import { TouchableOpacity, Text, TextInput, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';

import PostStyles from '@pages/community/PostStyles';
import { CustomTheme } from '@styles/CustomTheme';

import TopBar from '@components/common/TopBar';
import IconProfileK from '@components/community/IconProfileK';
import IconKebabMenu from '@components/community/IconKebabMenu';
import IconHeart from '@components/community/IconHeart';
import IconBookmark from '@components/community/IconBookmark';
import DifeLine from '@components/community/DifeLine';
import Checkbox from '@components/common/Checkbox';
import IconChatSend from '@components/chat/IconChatSend';
import ItemComment from '@components/community/ItemComment';

const PostPage = () => {
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

    return (
        <SafeAreaView style={PostStyles.container}>
            <TopBar topBar="게시판" color='#000' />
            <ScrollView>
                <View style={PostStyles.containerWhite}>
                    <View style={PostStyles.containerWriterRow}>
                        <View style={{flexDirection: 'row'}}>
                            <IconProfileK />
                            <View style={PostStyles.containerWriterText}>
                                <Text style={PostStyles.textWriter}>익명</Text>
                                <Text style={PostStyles.textDate}>5/11</Text>
                            </View>
                        </View>
                        <IconKebabMenu />
                    </View>
                    <Text style={PostStyles.textTitle}>성곡도서관 가는 길</Text>
                    <Text style={PostStyles.textContext}>북악관 머시기저시기 와라라라라라랄...용두리를 지나서 왼쪽으로 꺾어서 공학관 지나서 직진해서 들어가면 있다~~ 케이카드 찍고 들어가야 한다, 앱으로도 되고 학생카드 찍어도 된다~</Text>
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