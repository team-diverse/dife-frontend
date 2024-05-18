import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ChatRoomStyles from '@pages/chat/ChatRoomStyles';
import { CustomTheme } from '@styles/CustomTheme'

import TopBar from '@components/TopBar';
import ArrowRight32 from '@components/Icon32/ArrowRight32.js';
import ChatInputSend from '@components/chat/ChatInputSend'
import IconHamburgerMenu from '@components/chat/IconHamburgerMenu';

const ChatRoomPage = () => {
    const navigation = useNavigation('');

    const handleKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleGoBack = () => {
        navigation.goBack();
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);


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
                    <View style={ChatRoomStyles.iconHamburgerMenu}>
                        <IconHamburgerMenu />
                    </View>
                </View>

                <ChatInputSend />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

export default ChatRoomPage;
