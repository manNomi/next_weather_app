다듬고 보기 좋게 정리한 README.md 마크다운 형식은 아래와 같습니다:

# 📌 프로젝트 소개

**fe-weather-app**은 **Next.js 12** 기반으로 제작된 날씨 예보 웹 애플리케이션입니다.  
사용자는 도시를 선택하여 해당 도시의 **현재 날씨 정보**와 **5일간의 예보**를 확인할 수 있습니다.

### 🔧 주요 기술 스택

- Next.js 12 기반 SSG / ISR
- GraphQL 백엔드 통신
- 코드 스플리팅 및 모듈 CSS
- 반응형 웹 지원
- ISR 기반 페이지 재생성

---

# 🚀 사용 방법

## 1. 로컬 실행

```bash
npm install
npm run dev

2. 접속 방법

웹 브라우저에서 아래와 같은 형식으로 접속:

http://localhost:3000/도시명
예: http://localhost:3000/Seoul

3. 페이지 구성

도시별 경로 접근 시 getStaticProps + revalidate 설정에 따라 정적 페이지가 자동 생성됩니다.

⸻

🔐 환경 변수 설정

루트 디렉토리에 .env 파일을 생성한 후, 아래와 같이 OpenWeather API 키를 등록하세요:

OPENWEATHER_API_KEY=YOUR_API_KEY



```

구현 과정 정리
