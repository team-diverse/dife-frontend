import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Animated, Dimensions, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ChatRoomStyles from '@pages/chat/ChatRoomStyles';

import ArrowRight32 from '@components/Icon32/ArrowRight32';
import ChatInputSend from '@components/chat/ChatInputSend';
import IconHamburgerMenu from '@components/chat/IconHamburgerMenu';
import IconChatProfile from '@components/chat/IconChatProfile'
import IconChatOut from '@components/chat/IconChatOut'
import IconChatNotification from '@components/chat/IconChatNotification'
import IconChatSetting from '@components/chat/IconChatSetting'
import ChatBubble from './ChatBubble/ChatBubble';
import { useWebSocket } from 'context/WebSocketContext';

const ChatRoomPage = ({route}) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuWidth = 259;
    const screenWidth = Dimensions.get('window').width;
    const menuAnim = useRef(new Animated.Value(screenWidth)).current;
    const { messages } = useWebSocket();
    const { chatroomId } = route.params;

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const toggleMenu = () => {
        if (menuOpen) {
            Animated.timing(menuAnim, {
                toValue: screenWidth,
                duration: 100,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(menuAnim, {
                toValue: screenWidth - menuWidth,
                duration: 100,
                useNativeDriver: true,
            }).start();
        }
        setMenuOpen(!menuOpen);
    };

    return (
        <TouchableWithoutFeedback onPress={handleKeyboard}>
            <SafeAreaView style={ChatRoomStyles.container}>

                <View style={ChatRoomStyles.containerTopBar}>
                    <View style={ChatRoomStyles.containerBackName}>
                        <TouchableOpacity style={ChatRoomStyles.iconArrow} onPress={handleGoBack}>
                            <ArrowRight32 color='#000' />
                        </TouchableOpacity>
                        <Text style={ChatRoomStyles.textTopBar}>Name</Text>
                    </View>
                    <TouchableOpacity style={ChatRoomStyles.iconHamburgerMenu} onPress={toggleMenu}>
                        <IconHamburgerMenu />
                    </TouchableOpacity>
                </View>
                
                <View style={ChatRoomStyles.containerChat}>
                    <FlatList 
                        data={messages[chatroomId] || []}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => ChatBubble(item)}
                    />
                </View>
                <ChatInputSend />

                {menuOpen && 
                    <TouchableOpacity
                        onPress={toggleMenu}
                        style={[ChatRoomStyles.menuBackground, {top: insets.top}]}
                    />
                }
                <Animated.View
                    style={[ChatRoomStyles.menu, {top: insets.top, width: menuWidth, transform: [{ translateX: menuAnim }]}]}
                >
                    <View style={ChatRoomStyles.containerGray}> 
                        <IconChatOut />
                        <View style={ChatRoomStyles.containerIcon}>
                            <View style={{marginRight: 7}}>
                                <IconChatNotification />
                            </View>
                            <IconChatSetting />
                        </View>
                    </View>
                    <View style={{marginBottom: 4}}>
                        <Text style={[ChatRoomStyles.textDrawer, {marginTop: 12, marginBottom: 8}]}>참가자</Text>
                        <View style={ChatRoomStyles.containerChatPeople}>
                            <IconChatProfile size='36'/>
                            <Text style={ChatRoomStyles.textChatPeople}>나</Text>
                        </View>
                        <View style={ChatRoomStyles.containerChatPeople}>
                            <IconChatProfile size='36'/>
                            <Text style={ChatRoomStyles.textChatPeople}>Name</Text>
                        </View>
                    </View>
                    <View style={ChatRoomStyles.line} />
                    <TouchableOpacity style={ChatRoomStyles.containerDrawer}>
                        <View style={ChatRoomStyles.containerDrawerTextCount}>
                            <Text style={ChatRoomStyles.textDrawer}>스크랩 보관함</Text>
                            <View style={ChatRoomStyles.containerDrawerCount}>
                                <Text style={ChatRoomStyles.textDrawerCount}>3</Text>
                            </View>
                        </View>
                        <View style={ChatRoomStyles.iconReverseArrow}>
                            <ArrowRight32 color='#000' />
                        </View>
                    </TouchableOpacity>
                    <View style={ChatRoomStyles.line} />
                    <TouchableOpacity style={ChatRoomStyles.containerDrawer}>
                        <View style={ChatRoomStyles.containerDrawerTextCount}>
                            <Text style={ChatRoomStyles.textDrawer}>앨범</Text>
                            <View style={ChatRoomStyles.containerDrawerCount}>
                                <Text style={ChatRoomStyles.textDrawerCount}>3</Text>
                            </View>
                        </View>
                        <View style={ChatRoomStyles.iconReverseArrow}>
                            <ArrowRight32 color='#000' />
                        </View>
                    </TouchableOpacity>
                    <View style={ChatRoomStyles.line} />
                </Animated.View>
            
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

export default ChatRoomPage;
