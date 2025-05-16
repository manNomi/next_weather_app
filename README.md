📌 프로젝트 소개

fe-weather-app은 Next.js 12 기반으로 제작된 날씨 예보 웹 애플리케이션입니다.
사용자가 도시를 선택하면, 해당 도시의 현재 날씨 정보와 5일간의 예보를 확인할 수 있습니다.
• Next.js 12 기반 SSG/ISR
• GraphQL 백엔드 통신
• 코드 스플리팅 및 모듈 CSS 활용
• 반응형 웹 지원
• On-Demand ISR 기반 페이지 재생성

⸻

🚀 작동 방법 1. 로컬 실행:

npm install
npm run dev

    2.	접속:

http://localhost:3000/도시명
예: http://localhost:3000/Seoul

    3.	페이지 구성:
    •	도시별 경로 접근 시 getStaticProps + revalidate 설정에 따라 정적 페이지 자동 생성

아래와 같은 파일 생성후 openWeatherapi key를 등록해주세요
.env
OPENWEATHER_API_KEY = YOUR_API_KEY

구현 과정 정리
https://second-system-cf4.notion.site/1f57cf19a36480108112f7c9e95fc86f?pvs=74
