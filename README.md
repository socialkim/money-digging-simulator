# 머니디깅클럽 시뮬레이터

당신이 출연자! AI 토크쇼 인터랙티브 게임

## 📋 프로젝트 소개

**머니디깅클럽 시뮬레이터**는 인기 팟캐스트 "머니디깅클럽"의 토크쇼 환경을 게임으로 재현한 인터랙티브 시뮬레이터입니다. 플레이어는 다양한 캐릭터 중 하나를 선택하여 라이브 토크쇼에 출연하며, 선택지를 통해 대사와 반응을 결정하는 방식으로 게임이 진행됩니다.

### 주요 특징

- **레트로 픽셀 아트 스타일**: 1980년대 게임 감성의 시각 디자인
- **인터랙티브 대사 시스템**: 플레이어의 선택이 게임 진행에 영향
- **다양한 캐릭터**: 각 캐릭터마다 다른 성격과 반응
- **대사 기반 게임플레이**: 선택지 시스템으로 스토리 진행
- **8비트 사운드 이펙트**: Web Audio API로 합성된 레트로 사운드
- **반응형 디자인**: 데스크톱/태블릿/모바일 모두 지원

---

## 🚀 로컬에서 실행하기

### 필수 요구사항

- Node.js 14 이상 (또는 Python 3)
- 최신 웹 브라우저 (Chrome, Firefox, Safari, Edge)

### 설치 및 실행

#### 방법 1: npx serve 사용 (권장)

```bash
cd 머니디깅클럽-게임
npx serve .
```

브라우저에서 `http://localhost:3000` 열기

#### 방법 2: Python 내장 서버

```bash
cd 머니디깅클럽-게임
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 열기

#### 방법 3: Node.js http-server

```bash
npm install -g http-server
cd 머니디깅클럽-게임
http-server
```

---

## 🌐 배포하기

### Vercel에 배포 (권장)

가장 빠르고 간단한 배포 방법입니다.

#### 1단계: GitHub에 업로드

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/money-digging-club-simulator.git
git push -u origin main
```

#### 2단계: Vercel에서 배포

1. [Vercel](https://vercel.com)에 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭
4. 위에서 생성한 저장소 선택
5. "Deploy" 클릭

배포 후 자동으로 URL이 할당됩니다: `https://money-digging-club-simulator-[random].vercel.app`

### GitHub Pages에 배포

```bash
# 1. 저장소 세팅 (GitHub에서 main 브랜치를 기본으로 설정)
# 저장소 Settings → Pages → Source: Deploy from a branch (main)

# 2. 커밋 및 푸시
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

배포 후 URL: `https://YOUR_USERNAME.github.io/money-digging-club-simulator`

---

## 📁 프로젝트 구조

```
머니디깅클럽-게임/
├── index.html              # HTML 진입점
├── css/
│   └── style.css          # 모든 스타일 (픽셀 아트, 반응형)
├── js/
│   ├── main.js            # 애플리케이션 진입점
│   ├── audio.js           # Web Audio API 사운드 시스템
│   ├── renderer.js        # Canvas 렌더링 엔진 (별도 파일)
│   ├── ui.js              # UI 요소 관리 (별도 파일)
│   └── game.js            # 게임 로직 (별도 파일)
├── package.json           # Node.js 프로젝트 설정
├── vercel.json            # Vercel 배포 설정
├── README.md              # 이 파일
└── .gitignore            # Git 무시 파일

```

### 주요 파일 설명

#### `index.html`
- 게임의 HTML 구조
- Canvas 요소와 UI 레이어 정의
- 메타 태그 (Open Graph for social sharing)
- 인라인 SVG 파비콘

#### `css/style.css`
- 완전한 스타일시트 (약 1000줄)
- 픽셀 아트 스타일 (sharp corners, box-shadow borders)
- Google Fonts: Press Start 2P (픽셀 폰트), Noto Sans KR (읽기 쉬운 폰트)
- 애니메이션: blink, float, slideUp, shake, pulse 등
- 반응형 미디어 쿼리 (모바일/태블릿 대응)

#### `js/main.js`
- App 클래스로 전체 초기화
- Renderer, UI, Audio, Game 시스템 생성
- 캔버스 크기 조정 (3:2 비율 유지)
- 윈도우 리사이즈 핸들링

#### `js/audio.js`
- Web Audio API 기반 사운드 시스템
- 함수:
  - `playType()`: 타이핑 소리 (텍스트 출력 시)
  - `playSelect()`: 선택지 선택 소리
  - `playConfirm()`: 확정 소리 (두 톤)
  - `playEvent()`: 극적 이벤트 소리
  - `playReact()`: 캐릭터 반응 소리
- 모든 사운드는 합성 (외부 파일 없음)
- 8비트 레트로 스타일

---

## 🎮 게임 플레이 방법

### 게임 흐름

1. **타이틀 화면**: "PRESS START" 버튼으로 게임 시작
2. **캐릭터 선택**: 4명의 캐릭터 중 선택
3. **토크쇼 진행**:
   - 진행자의 질문 또는 발언 읽기
   - 선택지 버튼으로 반응 선택
   - 각 선택은 다른 결과 생성
4. **결과 화면**: 게임 점수와 캐릭터 코멘트 표시

### 선택지 시스템

각 선택지는 **무드(mood)** 색상 태그가 있습니다:

- **🟢 Safe (안전)**: 보수적이고 신중한 반응
- **🟠 Bold (대담)**: 주장이 강한 반응
- **🟣 Funny (재미)**: 유머 있는 반응
- **🔵 Smart (똑똑)**: 논리적이고 지적인 반응

선택한 무드에 따라 게임 점수와 결과가 달라집니다.

---

## ✏️ 캐릭터 및 대사 커스터마이징

### 캐릭터 추가/수정

`js/game.js`에서 캐릭터 데이터를 수정합니다:

```javascript
const CHARACTERS = {
  'newchar': {
    name: '새로운 캐릭터',
    role: '역할 설명',
    desc: '짧은 설명',
    color: '#FFD700' // 태그 색상
  }
};
```

### 대사 추가/수정

`js/game.js`의 `SCENES` 또는 `DIALOGUES` 객체에서 수정:

```javascript
{
  character: 'character-id',
  text: '출연자께 말씀드릴 대사입니다.',
  mood: 'smart', // safe, bold, funny, smart
  choices: [
    { text: '선택지 1', mood: 'safe' },
    { text: '선택지 2', mood: 'bold' }
  ]
}
```

---

## 🎨 스타일 커스터마이징

### 색상 변경

`css/style.css` 상단의 CSS 변수에서 수정:

```css
:root {
  --color-bg: #0a0a1a;        /* 배경색 */
  --color-gold: #FFD700;      /* 액센트 색 */
  --color-text: #e0e0e0;      /* 텍스트색 */
  /* ... 다른 색상들 ... */
}
```

### 폰트 변경

Google Fonts에서 다른 폰트를 선택하여 CSS import 변경:

```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

:root {
  --font-pixel: 'YOUR_FONT', monospace;
}
```

### 애니메이션 속도 조정

각 애니메이션의 duration 값을 수정:

```css
@keyframes blink {
  /* 애니메이션 정의 */
}

.element {
  animation: blink 0.5s step-start infinite; /* duration 변경 */
}
```

---

## 🔊 사운드 커스터마이징

### 새로운 사운드 효과 추가

`js/audio.js`에 새 함수 추가:

```javascript
playCustomSound() {
  if (!this.enabled || !this.ctx) return;

  const now = this.ctx.currentTime;
  const duration = 0.2;

  const osc = this.ctx.createOscillator();
  const gain = this.ctx.createGain();

  osc.type = 'square';
  osc.frequency.value = 440; // 주파수 설정

  osc.connect(gain);
  gain.connect(this.masterGain);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

  osc.start(now);
  osc.stop(now + duration);
}
```

### 사운드 호출

`js/game.js`에서 필요한 시점에 호출:

```javascript
this.audio.playCustomSound();
```

---

## 🐛 개발 및 디버깅

### 개발자 도구

브라우저 콘솔에서 앱 인스턴스 접근:

```javascript
// 콘솔에서:
window.__app           // 앱 인스턴스
window.__app.game      // 게임 로직
window.__app.audio     // 오디오 시스템
window.__app.renderer  // 렌더러
window.__app.ui        // UI 관리자

// 사운드 토글
window.__app.audio.toggle();

// 볼륨 설정 (0-1)
window.__app.audio.setVolume(0.5);
```

### 흔한 문제

#### 사운드가 안 나요
- 첫 클릭 후 WebAudio가 초기화됩니다
- 브라우저 음소거 확인
- 개발자 도구에서 콘솔 오류 확인

#### 화면이 뭉개져 보여요
- 브라우저 줌 수준 100%로 설정
- CSS의 `image-rendering: pixelated` 확인
- 다른 브라우저 시도

#### 반응형 디자인이 안 됨
- CSS의 `@media` 쿼리 확인
- `max-width` 값 조정
- 캔버스 aspect ratio 유지

---

## 📦 배포 체크리스트

배포 전 확인사항:

- [ ] 모든 대사와 선택지 텍스트 한번 더 검토
- [ ] 사운드 설정 확인 (볼륨, 타이밍)
- [ ] 모바일 화면에서 테스트
- [ ] Open Graph 메타 태그 확인 (소셜 미디어 공유용)
- [ ] Favicon이 정상 표시되는지 확인
- [ ] 모든 외부 폰트 로드 완료
- [ ] 콘솔에 에러 없음 확인
- [ ] 페이지 로딩 시간 측정
- [ ] 크로스 브라우저 테스트 (Chrome, Firefox, Safari)

---

## 🚀 성능 최적화 팁

### Canvas 렌더링 최적화
- 불필요한 리드로우 제거
- requestAnimationFrame 사용
- 버퍼링된 그리기 연산 활용

### 메모리 최적화
- 사용 완료된 객체 참조 해제
- 큰 배열은 미리 할당
- 불필요한 이벤트 리스너 제거

### 로딩 최적화
- 폰트를 `display: swap`으로 로드
- CSS/JS 파일 최소화
- 이미지는 합성으로 생성 (외부 파일 불필요)

---

## 📞 피드백 & 기여

버그 리포트 및 개선 제안:

1. GitHub Issues에 등록
2. 자세한 설명과 스크린샷 포함
3. 재현 방법 명시

코드 기여:

1. Fork 후 브랜치 생성
2. 변경사항 커밋
3. Pull Request 제출

---

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

## 🙏 크레딧

- **개발**: Claude AI (Anthropic)
- **영감**: 머니디깅클럽 팟캐스트
- **디자인**: 레트로 게임 감성
- **기술**: Web Audio API, Canvas API, Modern CSS

---

## 🎯 향후 계획 (로드맵)

- [ ] 더 많은 에피소드 콘텐츠
- [ ] 캐릭터별 스토리 분기
- [ ] 모바일 앱 버전
- [ ] 멀티플레이어 모드
- [ ] 커스텀 캐릭터 생성 기능
- [ ] 음성 대사 (TTS)
- [ ] 성적표 공유 기능
- [ ] 스테이지 모드 확장

---

## 📞 문의

문제가 있거나 질문이 있으신가요? [GitHub Issues](https://github.com/YOUR_USERNAME/money-digging-club-simulator/issues)에서 문의해주세요.

---

**즐거운 게임되세요! 당신이 주인공입니다! 🎮✨**
