import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SettingStyles from "@pages/member/SettingStyles";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import IconSettingProfile from "@components/member/IconSettingProfile";
import IconSettingSecurity from "@components/member/IconSettingSecurity";
import IconSettingBlocks from "@components/member/IconSettingBlocks";
import IconSettingNotify from "@components/member/IconSettingNotify";
import IconSettingInquiry from "@components/member/IconSettingInquiry";
import IconSettingSeviceNews from "@components/member/IconSettingSeviceNews";
import IconSettingTrems from "@components/member/IconSettingTrems";
import IconSwitchOn from "@components/member/IconSwitchOn";
import IconSwitchOff from "@components/member/IconSwitchOff";

const SettingPage = () => {
	const navigation = useNavigation();

	const [switchOn, setSwitchOn] = useState(false);

	const handleSwitch = () => {
		setSwitchOn(!switchOn);
	};

	return (
		<SafeAreaView style={SettingStyles.container}>
			<TopBar topBar="설정" color="#000" />

			<View style={{ marginTop: 10 }}>
				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>계정 관리</Text>
				</View>
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("FindPasswordPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingProfile />
						<Text style={SettingStyles.textContent}>
							프로필 설정
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("SecurityPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<View style={{ marginHorizontal: 2 }}>
							<IconSettingSecurity />
						</View>
						<Text style={SettingStyles.textContent}>보안</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<TouchableOpacity
					style={SettingStyles.containerContent}
					onPress={() => navigation.navigate("BlockListPage")}
				>
					<View style={SettingStyles.containerIconText}>
						<IconSettingBlocks />
						<Text style={SettingStyles.textContent}>차단 관리</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</TouchableOpacity>
				<View style={SettingStyles.line} />
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingNotify />
						<Text style={SettingStyles.textContent}>푸쉬 알림</Text>
					</View>
					<TouchableOpacity onPress={handleSwitch}>
						{switchOn ? <IconSwitchOn /> : <IconSwitchOff />}
					</TouchableOpacity>
				</View>

				<View style={SettingStyles.containerTitle}>
					<Text style={SettingStyles.textTitle}>고객 지원</Text>
				</View>
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingInquiry />
						<Text style={SettingStyles.textContent}>1:1 문의</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</View>
				<View style={SettingStyles.line} />
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingSeviceNews />
						<Text style={SettingStyles.textContent}>
							서비스 소식
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</View>
				<View style={SettingStyles.line} />
				<View style={SettingStyles.containerContent}>
					<View style={SettingStyles.containerIconText}>
						<IconSettingTrems />
						<Text style={SettingStyles.textContent}>
							개인정보 처리방침 및 이용약관
						</Text>
					</View>
					<ArrowRight
						color="#B0D0FF"
						size={24}
						style={{ transform: [{ scaleX: -1 }] }}
					/>
				</View>
				<View style={SettingStyles.line} />
			</View>
		</SafeAreaView>
	);
};

export default SettingPage;
