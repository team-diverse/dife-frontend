import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {CustomTheme} from '@styles/CustomTheme.js';
import RadioButtonGroup from '@components/RadioButton/RadioButtonGroup';
import Modal from 'react-native-modal';
import CompleteIcon from '@components/common/CompleteIcon';

const {fontSub14} = CustomTheme;

const Report = ({modalVisible, setModalVisible, reportTitle}) => {
    const [selected, setSelected] = useState('');
    const [isReportButtonDisabled, setIsReportButtonDisabled] = useState(true);
    const [showComplete, setShowComplete] = useState(false);

    const reportTypes = [
        '혐오적인 컨텐츠',
        '욕설/도배',
        '다른 사람을 사칭함',
        '기타'
    ]

    const handleNoButtonPress = () => {
        setModalVisible(false);
        setSelected('');
    };

    const handleReportButtonPress = () => {
        setShowComplete(true);
        setTimeout(() => {
            setModalVisible(false);
            setSelected('');
            setIsReportButtonDisabled(true);
            setShowComplete(false);
        }, 2000);
    };

    const handleRadioButtonSelect = (value) => {
        setSelected(value);
        setIsReportButtonDisabled(false);
    };

    return (
        <Modal
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            style={styles.modal}
        >
            <View style={styles.rectangle}>
                {showComplete ? (
                    <View style={styles.reportCompleteContainer}>
                        <CompleteIcon/>
                        <Text style={styles.reportCompleteText}>신고 완료</Text>
                    </View>
                ) : (
                    <>
                        <View style={styles.radioButtonTitle}>
                            <Text style={styles.title}>{reportTitle}</Text>
                        </View>
                        <View style={styles.radioButtonGroup}>
                            <RadioButtonGroup
                                values={reportTypes}
                                selected={selected}
                                onValueChange={handleRadioButtonSelect}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonNo} onPress={handleNoButtonPress}>
                                <Text style={styles.textNo}>아니오</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonReport}
                                onPress={handleReportButtonPress}
                                disabled={isReportButtonDisabled}
                            >
                                <Text style={styles.textReport}>신고하기</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rectangle: {
        width: 260,
        height: 360,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 20,
        position: 'relative',
    },
    reportCompleteContainer: {
        alignItems: 'center',
        marginTop: 114,
    },
    reportCompleteText: {
        marginTop: 16,
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'NotoSansCJKkr-Bold',
    },
    radioButtonTitle: {
        alignItems: 'center',
    },
    title: {
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'NotoSansCJKkr-Bold',
        marginTop: 21,
        marginBottom: 12,
    },
    radioButtonGroup: {
        marginLeft: 24,
        justifyContent: 'space-between',
    },
    radioButtonText: {
        ...fontSub14,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    buttonNo: {
        flex: 1,
        width: 102,
        padding: 10,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: CustomTheme.textDisable,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    textNo: {
        ...fontSub14,
    },
    buttonReport: {
        flex: 1,
        width: 102,
        padding: 10,
        backgroundColor: '#FF3E3E',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FF3E3E',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    textReport: {
        ...fontSub14,
        color: CustomTheme.bgBasic,
    },
});

export default Report;