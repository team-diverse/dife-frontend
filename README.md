# Dife – Global Community App

<p>
<img width="48%" src="https://github.com/user-attachments/assets/575d4454-e5e4-4701-9371-2310f0069810" />
<img width="48%" src="https://github.com/user-attachments/assets/34c4c396-2173-46f3-a2f2-e14a4efbe162" />
</p>

## 🚀 Now Available
[📱 Download on the App Store](https://apps.apple.com/kr/app/dife/id6670191789)

[🤖 Download on the Google Play](https://play.google.com/store/apps/details?id=com.teamdiverse.dife&hl=ko)

- - -

## 📌 About Dife
**Dife** is a global community app that connects Koreans and foreigners who are interested in Korean culture.  
Users can communicate, share interests, and build meaningful connections beyond language and cultural barriers.

**Dife**는 한국 문화에 관심 있는 외국인과 한국인을 연결하는 글로벌 커뮤니티 앱입니다.  
언어와 문화의 장벽을 넘어, 공통의 관심사를 바탕으로 자연스러운 소통과 교류를 돕습니다.

---

## ✨ Key Features
🌐 **Global Community / 글로벌 커뮤니티**
  - Supports 5 languages: Korean, English, Japanese, Chinese, Spanish  
  - 한국어, 영어, 일본어, 중국어, 스페인어 총 5개 국어 지원  
  - Provides automatic translation based on each user’s selected language  
  - 각 사용자가 설정한 언어에 따라 자동 번역 기능 제공  

💬 **Real-time Communication / 실시간 커뮤니케이션**
  - WebSocket-based real-time messaging  
  - WebSocket 기반의 실시간 메시징
  - Small talk topic recommendations to support natural conversations  
  - 자연스러운 대화를 돕는 스몰톡 주제 추천 기능  

👤 **Profile-based Matching / 프로필 기반 매칭**
  - Discover users with similar interests and preferences based on tags  
  - 태그 기반 관심사와 취향이 비슷한 사용자 탐색

---

## 🛠 Tech Stack

| Category                | Technology |
| ----------------------- | ---------- |
| **Framework / Library** | ![ReactNative](https://img.shields.io/badge/ReactNative-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Network**             | ![REST API](https://img.shields.io/badge/REST_API-121212?style=for-the-badge&logo=postman&logoColor=white) ![WebSocket](https://img.shields.io/badge/WebSocket-4A90E2?style=for-the-badge&logo=socket.io&logoColor=white) |

<br><br>

- - -

<br><br>

# Dife Frontend

## Github Rules

We follow Conventional Commits

Reference

-   [A Simplified Convention for Naming Branches and Commits in Git](https://dev.to/varbsan/a-simplified-convention-for-naming-branches-and-commits-in-git-il4)

-   [Naming conventions for Git Branches — a Cheatsheet](https://medium.com/@abhay.pixolo/naming-conventions-for-git-branches-a-cheatsheet-8549feca2534)

### Commits

#### Template

> git commit -m 'category(field): do something'
> git commit -m 'feat(profile): add profile picture upload'

#### prefix

-   feat: 새로운 기능 구현
-   fix: 버그 수정
-   refactor: 코드 개선 및 리팩토링
-   docs: 문서화 작업
-   chore: 비즈니스 로직과 어플리케이션 로직과 연관 없는 각종 작업들
-   style: 코드의 포맷 및 오타 수정 등
-   test: 테스트 작성
-   perf: 성능 작업
-   ci: CI 작업
-   build: 빌드 및 패키지 관리 등
-   revert: 이전 변경 사항을 되돌리는 revert

### Branches

> 로컬 브랜치는 prod로 Merge하는 것을 원칙으로 한다.

### Branch 이름 예시

> feat/T-123-new-login-system
> build/v2.0.1

#### Branch 이름

> Commit prefix와 동일

### Others

-   PR이 Merge가 되면 사용했던 브랜치는 삭제한다.
-   코드 리뷰를 위해 모든 팀원을 Reviewer 지정을 한다.
-   코드의 가독성과 손쉬운 Documentation 관리를 위해 주석은 가능하면 작성하지 않는다.
