import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Modal, Text, Animated, TouchableWithoutFeedback, Dimensions, PanResponder, TouchableOpacity, FlatList } from 'react-native';
import { CustomTheme } from '@styles/CustomTheme.js';
import Collapsible from 'react-native-collapsible';
import FilterInfoCircle from '@components/ConnectCompo/FilterInfoCircle.js';
import FilterArrowBottom from '@components/ConnectCompo/FilterArrowBottom.js';
import FilterCategory from '@components/ConnectCompo/FilterCategory.js';
import FilterCheckboxList from '@components/ConnectCompo/FilterCheckboxList.js';
import FilterApplyButton from '@components/ConnectCompo/FilterApplyButton.js';

const { fontCaption } = CustomTheme;

const FilterBottomSlide = (props) => {
  const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY = useRef(new Animated.Value(screenHeight)).current;

    const translateY = panY.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet = Animated.timing(panY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet = Animated.timing(panY, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 1.5) {
                closeModal();
            }
            else {
                resetBottomSheet.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        closeBottomSheet.start(()=>{
            setModalVisible(false);
        })
    }


    const [collapsedStates, setCollapsedStates] = useState([
      true,
      true,
      true,
    ]);

    const toggleCollapsed = (index) => {
      const newCollapsedStates = [...collapsedStates];
      newCollapsedStates[index] = !newCollapsedStates[index];
      setCollapsedStates(newCollapsedStates);
    };



    const [isCheckedList, setIsCheckedList] = useState([
      false,
      false,
      false,
      false,
      false, 
    ]);

    const handlePress = (index) => {
      setIsCheckedList(prevState => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
      });
    };
    
    return (
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <View style={styles.overlay}>
                <TouchableWithoutFeedback
                    onPress={closeModal}
                >
                    <View style={styles.background}/>
                </TouchableWithoutFeedback>
                <Animated.View
                    style={{...styles.bottomSheetContainer, transform: [{ translateY: translateY }]}}
                    {...panResponders.panHandlers}
                >



                  <View style={styles.listContainer}>
                    <TouchableOpacity style={styles.list} onPress={() => toggleCollapsed(0)}>
                      <Text style={styles.listText}>MBTI</Text>
                      <FilterArrowBottom style={styles.listIcon}/>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedStates[0]}>
                      <View style={styles.infoTextContainer}>
                        <FilterInfoCircle />
                        <Text style={styles.infoText}>최대 3개까지 선택 가능</Text>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='ISTP'/>
                        <FilterCategory text='ISFP'/>
                        <FilterCategory text='ENTP'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='ISFJ'/>
                        <FilterCategory text='INFJ'/>
                        <FilterCategory text='ENTJ'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='INFP'/>
                        <FilterCategory text='INTP'/>
                        <FilterCategory text='ESFP'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='ESTP'/>
                        <FilterCategory text='ESFJ'/>
                        <FilterCategory text='INTJ'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='ESTJ'/>
                        <FilterCategory text='ENFP'/>
                        <FilterCategory text='ISTJ'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='ENFJ'/>
                      </View>
                    </Collapsible>

                    <TouchableOpacity style={styles.list} onPress={() => toggleCollapsed(1)}>
                      <Text style={styles.listText}>취미/관심사</Text>
                      <FilterArrowBottom style={styles.listIcon}/>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedStates[1]}>
                      <View style={styles.infoTextContainer}>
                        <FilterInfoCircle />
                        <Text style={styles.infoText}>최대 3개까지 선택 가능</Text>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='SNS'/>
                        <FilterCategory text='OTT'/>
                        <FilterCategory text='캠핑'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='쇼핑'/>
                        <FilterCategory text='드라이브'/>
                        <FilterCategory text='산책'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='반려동물'/>
                        <FilterCategory text='스포츠'/>
                        <FilterCategory text='K-POP'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='사진'/>
                        <FilterCategory text='음악'/>
                        <FilterCategory text='드라마'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='독서'/>
                        <FilterCategory text='그림'/>
                        <FilterCategory text='요리'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='만화'/>
                        <FilterCategory text='언어공부'/>
                        <FilterCategory text='여행'/>
                      </View>
                      <View style={styles.categoryContainer}>
                        <FilterCategory text='악기연주'/>
                        <FilterCategory text='영화'/>
                        <FilterCategory text='맛집'/>
                      </View>
                    </Collapsible>

                    <TouchableOpacity style={styles.list} onPress={() => toggleCollapsed(2)}>
                      <Text style={styles.listText}>언어</Text>
                      <FilterArrowBottom style={styles.listIcon}/>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsedStates[2]}>
                      <View style={styles.infoTextContainer}>
                        <FilterInfoCircle />
                        <Text style={styles.infoText}>중복 선택 가능</Text>
                      </View>
                      <FilterCheckboxList checked={isCheckedList[0]} onPress={() => handlePress(0)} text='English / English' />
                      <FilterCheckboxList checked={isCheckedList[1]} onPress={() => handlePress(1)} text='中文 / Chinese' />
                      <FilterCheckboxList checked={isCheckedList[2]} onPress={() => handlePress(2)} text='日本語 / Japanese' />
                      <FilterCheckboxList checked={isCheckedList[3]} onPress={() => handlePress(3)} text='Español / Spanish' />
                      <FilterCheckboxList checked={isCheckedList[4]} onPress={() => handlePress(4)} text='한국어 / Korean' />
                    </Collapsible>
                  </View>

                  <FilterApplyButton />

              </Animated.View>
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.4)"
  },
  background: {
      flex: 1,
  },
  bottomSheetContainer: {
      height: 576,
      alignItems: "center",
      backgroundColor: "white",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
  },
  listContainer: {
    width: '100%',
    marginTop: 46,
  },
  list: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: CustomTheme.bgBasic,
    borderBottomWidth: 2,
    borderBottomColor: CustomTheme.bgList,
  },
  listText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: 'NotoSansCJKkr-Bold',
    marginLeft: 24,
    marginVertical: 16,
  },
  listIcon: {
    marginRight: 24,
  },
  infoTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 6,
    marginLeft: 26,
  },
  infoText: {
    ...fontCaption,
    color: '#8C8D91',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  categoryLanguageContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    height: 24,
    width: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: CustomTheme.bgList,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checked: {
    backgroundColor: CustomTheme.primaryBg,
    borderColor: CustomTheme.primaryMedium,
  },
  label: {
    marginLeft: 8,
  },
});

export default FilterBottomSlide;