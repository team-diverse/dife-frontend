import React from "react";
import { SafeAreaView, ScrollView, Text } from "react-native";

import TremsStyles from "@pages/member/TremsStyles";
import { CustomTheme } from "@styles/CustomTheme";

import TopBar from "@components/common/TopBar";

const TremsPage = () => {
	return (
		<SafeAreaView style={TremsStyles.container}>
			<TopBar
				topBar="개인정보 처리방침 및 이용약관"
				color="#000"
				backgroundColor={CustomTheme.primaryBg}
			/>

			<ScrollView contentContainerStyle={TremsStyles.scrollView}>
				<Text style={TremsStyles.textTremsTitle}>
					앱 이용에 대한 정책 및 개인정보 수집 안내{"\n"}
					저희 앱은 사용자가 안전하고 쾌적하게 서비스를 이용할 수
					있도록, 다음과 같은 콘텐츠 정책과 개인정보 사용 방침을
					준수합니다.{"\n"}
				</Text>
				<Text style={TremsStyles.textTrems}>
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}1. 콘텐츠 정책 저희 앱은 모욕적이거나, 불쾌하거나,
						혐오감을 주는 콘텐츠를 엄격히 금지합니다.{" "}
					</Text>
					이에 따라 다음과 같은 콘텐츠는 절대 허용되지 않습니다:
					차별적이거나 악의적인 콘텐츠 종교, 인종, 성적 지향성, 성별,
					민족/인종 또는 기타 특정 단체에 대해 명예 훼손의 소지가
					있거나 차별적이거나 악의적인 언급 또는 설명. 특정 개인 또는
					그룹이 모욕을 당하거나 협박을 받거나 피해를 입을 수 있는
					콘텐츠. 폭력적이고 잔혹한 콘텐츠 살해, 불구, 고문 또는
					학대를 현실적으로 묘사하거나 폭력을 조장하는 콘텐츠. 특정
					인종, 문화, 정부, 기업 등을 대상으로 한 폭력적 표현. 무기 및
					위험물에 대한 불법적 조장 무기와 위험물의 불법적 또는
					무분별한 사용을 조장하거나 총기 또는 탄약 구입을 유도하는
					콘텐츠. 성적 콘텐츠 에로틱한 감정을 자극하기 위한 성기 또는
					성행위의 노골적인 묘사나 표현을 포함한 공공연히 성적이거나
					포르노적인 자료. 종교적 선동 및 오해의 소지가 있는 콘텐츠
					선동적인 종교적 해설이나 부정확하거나 오해의 소지가 있는
					경전의 인용문. 거짓 정보 및 속임수 ASR & NR 부정확한 기기
					데이터, 가짜 위치 추적기 등 속임수/장난용 기능을 포함한 거짓
					정보 및 기능. 최근 사건 또는 시사 문제의 유해한 이용 폭력적
					충돌, 테러 공격, 전염병 등의 최근 사건이나 시사 문제를
					이용해 이익을 얻으려는 콘텐츠.{"\n"}
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}2. 개인정보 수집 및 사용 저희 앱은 사용자의
						개인정보를 다음과 같은 목적으로 수집하고 사용합니다:{" "}
					</Text>
					수집 및 사용 목적 사용자에게 맞춤형 매칭 서비스를 제공하고,
					앱의 기능을 최적화하기 위해 개인정보를 수집 및 사용합니다.
					수집 항목: 프로필 정보, 활동 데이터, 위치 정보 등. 비공개
					설정 회원이 프로필을 비공개로 설정한 경우, 해당 프로필은
					상대방에게 노출되지 않습니다. 이는 사용자의 개인정보 보호를
					위한 기능입니다. 푸시 알림 중요 알림 및 업데이트, 맞춤형
					추천 정보를 제공하기 위해 푸시 알림을 사용할 수 있습니다.
					사용자 활동 추적 서비스 품질 개선과 맞춤형 추천 제공을 위해
					사용자 활동 데이터를 추적할 수 있습니다.{"\n"}
					<Text style={TremsStyles.textTremsBold}>
						{"\n"}3. 회원 탈퇴 및 정보 삭제 회원 탈퇴를 요청하시면,
						요청일로부터 일주일 이내에 모든 회원 정보가 완전히
						삭제됩니다.{" "}
					</Text>
					삭제된 정보는 복구할 수 없으므로, 탈퇴 전에 필요한 데이터를
					미리 백업하시기 바랍니다. 주의: 본인이 채팅방에 남긴 채팅,
					게시글에 남긴 댓글, 작성한 글은 타인이 북마크한 경우, 해당
					사용자의 북마크를 통해 계속 보여질 수 있습니다. 이 점
					유의하시기 바랍니다.
				</Text>
			</ScrollView>
		</SafeAreaView>
	);
};

export default TremsPage;
