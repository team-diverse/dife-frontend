import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { CustomTheme } from '@styles/CustomTheme';
import { useOnboarding } from 'src/states/OnboardingContext.js';

import Modal from 'react-native-modal';
import InfoCircle from '@components/common/InfoCircle';

const { fontBody14 } = CustomTheme;

const ModalKebabMenu = ({ modalVisible, setModalVisible, id, isPublic, isMe }) => {
    const rectangleStyle = () => isMe ? styles.rectangle : (isPublic ? styles.rectangle : styles.rectangleIsPublic);

    const { onboardingData } = useOnboarding();
    const navigation = useNavigation();

    const handleDelete = () => {
        Alert.alert(
            "삭제",
            "이 게시글을 삭제하시겠습니까?",
            [
                { text: "취소", style: "cancel" },
                {
                    text: "확인",
                    onPress: () => {
                        axios.delete(`http://192.168.45.176:8080/api/posts/${id}`, {
                            headers: {
                                'Authorization': `Bearer ${onboardingData.accessToken}`,
                                'Accept': 'application/json'
                            },
                        })
                        .then(response => {
                            navigation.goBack();
                        })
                        .catch(error => {
                            console.error('게시글 삭제 오류:', error.response ? error.response.data : error.message);
                        });
                    }
                }
                ],
            { cancelable: false }
        );
    };

    return (
        <Modal
        isVisible={modalVisible}
        style={styles.modal}
        onBackdropPress={() => setModalVisible(false)}
        >
            <View style={rectangleStyle()}>
                {isMe ? (
                    <>
                    <TouchableOpacity>
                        <Text style={styles.textIsMe}>글 수정</Text>
                    </TouchableOpacity>
                    <View style={styles.line} />
                    <TouchableOpacity onPress={handleDelete}>
                        <Text style={styles.textIsMe}>글 삭제</Text>
                    </TouchableOpacity>
                    </>
                ) : (
                    isPublic ? (
                        <>
                        <TouchableOpacity>
                            <Text style={styles.textIsMe}>차단</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.containerReport}>
                            <Text style={[styles.textIsMe, {color: CustomTheme.warningRed}]}>신고</Text>
                            <InfoCircle color={CustomTheme.warningRed}/>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity>
                            <Text style={styles.textIsMe}>프로필 상세</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity>
                            <Text style={styles.textIsMe}>차단</Text>
                        </TouchableOpacity>
                        <View style={styles.line} />
                        <TouchableOpacity style={styles.containerReport}>
                            <Text style={[styles.textIsMe, {color: CustomTheme.warningRed}]}>신고</Text>
                            <InfoCircle color={CustomTheme.warningRed}/>
                        </TouchableOpacity>
                        </>
                    )
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  rectangle: {
    width: 95,
    height: 72,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 10,
    position: 'relative',
  },
  rectangleIsPublic: {
    width: 95,
    height: 110,
    backgroundColor: CustomTheme.bgBasic,
    borderRadius: 10,
    position: 'relative',
  },
  line: {
    width: 86,
    height: 1,
    backgroundColor: CustomTheme.bgList,
    marginHorizontal: 5,
  },
  containerIsMe: {},
  textIsMe: {
    ...fontBody14,
    color: CustomTheme.textSecondary,
    marginLeft: 11,
    marginVertical: 8,
  },
  containerReport: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 11,
  },
});

export default ModalKebabMenu;
