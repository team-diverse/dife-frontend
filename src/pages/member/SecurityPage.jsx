import React, { useState } from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SecurityStyles from "@pages/member/SecurityStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import ArrowRight from "@components/common/ArrowRight";
import IconSwitchOn from "@components/member/IconSwitchOn";
import IconSwitchOff from "@components/member/IconSwitchOff";

const SecurityPage = () => {
	const navigation = useNavigation();

	const [switchOn, setSwitchOn] = useState(false);

	const handleSwitch = () => {
		setSwitchOn(!switchOn);
	};
	return (
		<SafeAreaView style={SecurityStyles.container}>
			<TopBar
				topBar="보안"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<View style={[SecurityStyles.containerContent, { marginTop: 28 }]}>
				<View style={SecurityStyles.backgroundWhite}>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							프로필 비공개
						</Text>
						<TouchableOpacity onPress={handleSwitch}>
							{switchOn ? <IconSwitchOn /> : <IconSwitchOff />}
						</TouchableOpacity>
					</View>
				</View>
				<TouchableOpacity
					style={SecurityStyles.backgroundWhite}
					onPress={() => navigation.navigate("FindPasswordPage")}
				>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							비밀번호 재발급
						</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
			</View>

			<View style={SecurityStyles.line} />

			<View style={SecurityStyles.containerContent}>
				<TouchableOpacity style={SecurityStyles.backgroundWhite}>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>로그아웃</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={SecurityStyles.backgroundWhite}>
					<View style={SecurityStyles.containerRow}>
						<Text style={SecurityStyles.textContent}>
							회원 탈퇴
						</Text>
						<ArrowRight
							color="#B0D0FF"
							size={24}
							style={{ transform: [{ scaleX: -1 }] }}
						/>
					</View>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default SecurityPage;
