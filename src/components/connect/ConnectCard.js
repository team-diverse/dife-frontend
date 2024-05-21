import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { CustomTheme } from "@styles/CustomTheme";
import { useNavigation } from "@react-navigation/native";

import HeartInac24 from "@components/Icon24/HeartInac24";
import HeartAc24 from "@components/Icon24/HeartAc24";
import ConnectPlusIcon from "@components/connect/ConnectPlusIcon";
import Tag from "@components/Tag.js";

const { fontSub14, fontCaption } = CustomTheme;

const ConnectCard = ({
    profile = null,
    name = "name",
    country = "country",
    age = "age",
    major = "major",
    introduction = "introduction",
    tag = ["tag"],
}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.rectangle}>
            <View style={styles.profile}>
                <Image source={profile} style={styles.imgProfile} />
            </View>
            <View style={styles.cardContainer}>
                <View style={styles.textIconContainer}>
                    <Text style={styles.textName}>{name}</Text>
                    <View style={styles.iconContainer}>
                        <HeartInac24 />
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ConnectProfilePage")
                            }
                        >
                            <ConnectPlusIcon style={{ marginLeft: 9 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.TextBasicInfo}>
                    {country} | {age} | {major}
                </Text>
                <Text style={styles.textIntroduction}>{introduction}</Text>
                <View style={styles.tagContainer}>
                    <Tag tag={tag} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        flexDirection: "row",
        width: "100%",
        height: 173,
        backgroundColor: CustomTheme.bgBasic,
        borderRadius: 20,
        overflow: "hidden",
    },
    profile: {
        width: 92,
        height: 173,
        backgroundColor: CustomTheme.textDisable,
        overflow: "hidden",
    },
    imgProfile: {
        width: "100%",
        height: "100%",
    },
    cardContainer: {
        marginTop: 8,
        marginLeft: 12,
    },
    textIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6,
    },
    iconContainer: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        marginRight: 11,
    },
    textName: {
        fontSize: 14,
        lineHeight: 17,
        fontFamily: "NotoSansCJKkr-Bold",
    },
    textBasicInfo: {
        ...fontCaption,
        marginBottom: 6,
    },
    textIntroduction: {
        ...fontSub14,
        width: 187,
        marginBottom: 6,
    },
    tagContainer: {
        flexDirection: "row",
    },
});

export default ConnectCard;
