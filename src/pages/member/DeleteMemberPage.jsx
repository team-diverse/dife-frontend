import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	Text,
	Alert,
	TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const { setIsLoggedIn } = useAuth();

	const [isDeleteMemberClick, setIsDeleteMemberClick] = useState(false);
	const [reason, setReason] = useState(t("reasonOptions.pleaseSelect"));

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
			t("deleteMember"),
			t("confirmDeleteMember"),
			[
				{ text: t("cancelButton"), style: "cancel" },
				{
					text: t("confirmButtonText"),
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
			<TopBar topBar={t("deleteMember")} color="#000" />

			<IconDeleteMember style={DeleteMemberStyles.iconDeleteMember} />
			<Text style={DeleteMemberStyles.textTitle}>
				Dife님{"\n"}
				{t("deleteMemberConfirmation")}
			</Text>
			<View style={DeleteMemberStyles.containerNotice}>
				<InfoCircle color="#B0D0FF" />
				<Text style={DeleteMemberStyles.textNotice}>
					{t("postDeletionNotice")}
				</Text>
			</View>
			<View style={DeleteMemberStyles.containerNotice}>
				<InfoCircle color="#B0D0FF" />
				<Text style={DeleteMemberStyles.textNotice}>
					{t("accountDeletionNotice")}
				</Text>
			</View>
			<Text style={DeleteMemberStyles.textReasonTitle}>
				{t("reasonTitle")}
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
									reason === t("reasonOptions.pleaseSelect")
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
							onPress={() =>
								handleReason(t("reasonOptions.unpleasantUser"))
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								{t("reasonOptions.unpleasantUser")}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() =>
								handleReason(
									t("reasonOptions.serviceNeedDecrease"),
								)
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								{t("reasonOptions.serviceNeedDecrease")}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() =>
								handleReason(t("reasonOptions.privacyConcerns"))
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								{t("reasonOptions.privacyConcerns")}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={DeleteMemberStyles.containerReasonItem}
							onPress={() =>
								handleReason(t("reasonOptions.serviceQuality"))
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								{t("reasonOptions.serviceQuality")}
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								DeleteMemberStyles.containerReasonItem,
								{ borderBottomColor: "transparent" },
							]}
							onPress={() =>
								handleReason(t("reasonOptions.other"))
							}
						>
							<Text style={DeleteMemberStyles.textReason}>
								{t("reasonOptions.other")}
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
								reason === t("reasonOptions.pleaseSelect")
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
					text={t("deleteMember")}
					onPress={handleAlertDeleteMember}
					disabled={reason === t("reasonOptions.pleaseSelect")}
				/>
			</View>
		</SafeAreaView>
	);
};

export default DeleteMemberPage;
