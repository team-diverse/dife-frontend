import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { CustomTheme } from '@styles/CustomTheme';

import Modal from 'react-native-modal';
import InfoCircle from '@components/common/InfoCircle';

const { fontBody14 } = CustomTheme;

const ModalKebabMenu = ({ modalVisible, setModalVisible, isPublic, isMe }) => {
    const rectangleStyle = () => isMe ? styles.rectangle : (isPublic ? styles.rectangle : styles.rectangleIsPublic);

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
                    <TouchableOpacity>
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
