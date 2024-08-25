import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	Alert,
	TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import DeleteMemberStyles from "@pages/member/DeleteMemberStyles";
import { deleteMember } from "config/api";
import { useAuth } from "src/states/AuthContext";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";
import IconDeleteMember from "@components/member/IconDeleteMember";
import InfoCircle from "@components/common/InfoCircle";
import ApplyButton from "@components/common/ApplyButton";
import ArrowRight from "@components/common/ArrowRight";

const DeleteMemberPage = () => {
	const { setIsLoggedIn } = useAuth();

	const [isDeleteMemberClick, setIsDeleteMemberClick] = useState(false);
	const [reason, setReason] = useState("선택해주세요");

	const handleReasonTitle = () => {
		setIsDeleteMemberClick(!isDeleteMemberClick);
	};

	const handleReason = (selectedReason) => {
		setReason(selectedReason);
		setIsDeleteMemberClick(false);
	};

	const handleDeleteMember = async () => {
		try {
			await deleteMember();
			await SecureStore.deleteItemAsync("memberId");
			await SecureStore.deleteItemAsync("accessToken");
			await SecureStore.deleteItemAsync("refreshToken");
			setIsLoggedIn(false);
		} catch (error) {
			console.error("회원 탈퇴 오류: ", error.message);
		}
	};

	const handleAlertDeleteMember = () => {
		Alert.alert(
			"회원 탈퇴",
			"정말 회원 탈퇴를 하시겠습니까?\n소중한 회원님을 잃게 되어 아쉽습니다.",
			[
				{ text: "취소", style: "cancel" },
				{
					text: "확인",
					onPress: () => {
						handleDeleteMember();
					},
				},
			],
			{ cancelable: false },
		);
	};

	return (
		<SafeAreaView style={DeleteMemberStyles.container}>
			<TopBar topBar="회원탈퇴" color="#000" />

			<IconDeleteMember style={DeleteMemberStyles.iconDeleteMember} />
			<Text style={DeleteMemberStyles.textTitle}>
				Dife님{"\n"}정말 탈퇴하시겠어요?
			</Text>
			<View style={DeleteMemberStyles.containerNotice}>
				<InfoCircle color="#B0D0FF" />
				<Text style={DeleteMemberStyles.textNotice}>
					탈퇴 시 작성한 게시글은 익명처리가 되며 , 댓글, 북마크,
					좋아요 등의 모든 활동 정보가 삭제됩니다.
				</Text>
			</View>
			<View style={DeleteMemberStyles.containerNotice}>
				<InfoCircle color="#B0D0FF" />
				<Text style={DeleteMemberStyles.textNotice}>
					회원의 상세 정보를 포함한 계정 삭제는 일주일 이내에
					완료되며, 삭제가 완료되기 전까지는 동일한 이메일로 재가입이
					불가능합니다.
				</Text>
			</View>
			<Text style={DeleteMemberStyles.textReasonTitle}>
				dife를 떠나시는 이유에 대해 알려주세요
			</Text>

			<View style={{ alignItems: "center" }}>
				{isDeleteMemberClick ? (
					<View
						style={[
							DeleteMemberStyles.containerReason,
							{ height: 292 },
						]}
					>
						<TouchableOpacity
							style={[
								DeleteMemberStyles.containerReasonItem,
								{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									backgroundColor: CustomTheme.bgList,
									borderTopStartRadius: 12,
									borderTopEndRadius: 12,
								},
							]}
							onPress={handleReasonTitle}
							activeOpacity={1}
						>
							<Text
								style={[
									reason === "선택해주세요"
										? DeleteMemberStyles.textReason
										: DeleteMemberStyles.textReasonBold,
								]}
							>
								{reason}
							</Text>
							<ArrowRight
								style={[
									DeleteMemberStyles.iconArrowRight,
									{ transform: [{ rotate: "90deg" }] },
								]}
								color={CustomTheme.textSecondary}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() => handleReason("불쾌한 사용자 대면")}
						>
							<Text style={DeleteMemberStyles.textReason}>
								불쾌한 사용자 대면
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() => handleReason("서비스 필요성 감소")}
						>
							<Text style={DeleteMemberStyles.textReason}>
								서비스 필요성 감소
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() =>
								handleReason("안전 및 프라이버시 우려")
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								안전 및 프라이버시 우려
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() =>
								handleReason("기대에 미치지 못한 서비스 품질")
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								기대에 미치지 못한 서비스 품질
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								DeleteMemberStyles.containerReasonItem,
								{ borderBottomColor: "transparent" },
							]}
							onPress={() => handleReason("기타")}
						>
							<Text style={DeleteMemberStyles.textReason}>
								기타
							</Text>
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						style={[
							DeleteMemberStyles.containerReason,
							{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
							},
						]}
						onPress={handleReasonTitle}
						activeOpacity={1}
					>
						<Text
							style={[
								reason === "선택해주세요"
									? DeleteMemberStyles.textReason
									: DeleteMemberStyles.textReasonBold,
							]}
						>
							{reason}
						</Text>
						<ArrowRight
							style={DeleteMemberStyles.iconArrowRight}
							color={CustomTheme.textSecondary}
						/>
					</TouchableOpacity>
				)}
			</View>

			<View style={DeleteMemberStyles.applyButton}>
				<ApplyButton
					text="회원탈퇴"
					onPress={handleAlertDeleteMember}
					disabled={reason === "선택해주세요"}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DeleteMemberPage;
