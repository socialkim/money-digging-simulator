/**
 * 머니디깅클럽 시뮬레이터 - 게임 데이터
 * 캐릭터, 씬, 대사, 선택지 등 모든 게임 콘텐츠
 */

export const CHARACTERS = {
  park: {
    id: 'park',
    name: '박정호',
    role: 'MC · 교수',
    color: '#4FC3F7',
    emoji: '🎓',
    description: '지혜로운 경제 교수'
  },
  shin: {
    id: 'shin',
    name: '신혜원',
    role: 'MC · 기자',
    color: '#F48FB1',
    emoji: '🎤',
    description: '날카로운 시사 기자'
  },
  kim: {
    id: 'kim',
    name: '김덕진',
    role: 'IT연구소 소장',
    color: '#FF8A65',
    emoji: '🤖',
    description: 'AI 전문가'
  },
  bit: {
    id: 'bit',
    name: '비트PD',
    role: '테크 유튜버',
    color: '#AB47BC',
    emoji: '🎬',
    description: '트렌드 감지 능력자'
  }
};

export const SCENES = [
  // ============ 1부 오프닝 ============
  {
    type: 'scene_change',
    part: '1부',
    title: 'AI는 어디까지 발전했을까?',
    section: '오프닝',
    time: '00:00~10:00'
  },
  {
    type: 'system',
    text: '🎬 머니디깅클럽 스튜디오'
  },
  {
    type: 'event',
    text: '인트로 테마곡이 울려 퍼진다!',
    effect: 'flash'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '안녕하세요, 박정호입니다. 여러분을 환영합니다!'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '신혜원입니다! 오늘은 정말 핫한 주제인데요...'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '맞아요. 우리가 매일 마주치는 AI. 과연 어디까지 왔을까요?'
  },
  {
    type: 'system',
    text: '📺 스튜디오 관객 수: 12,847명'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '안녕하세요. 김덕진입니다. IT 트렌드 얘기 하려고 왔어요.'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '비트입니다! 요즘 AI 화제 엄청 많더라고요.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '다들 잘 오셨어요. 그럼 이제 돈 이야기에 파고드는 시간을 시작하겠습니다!'
  },
  {
    type: 'system',
    text: '지금부터 당신은 패널 중 한 명이 됩니다.'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '그런데 요즘 정말 AI 얘기가 많잖아요. 최근에 직접 AI를 써보면서 충격받은 경험 있으신가요?'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '최근 AI 경험',
    options: [
      {
        text: 'ChatGPT로 업무 처리했는데 정말 빨랐어요. 효율성 증가 확실하더라고요.',
        mood: 'safe',
        score: 1
      },
      {
        text: '사실 AI가 우리 직업을 대체할 수 있겠다는 생각이 들었어요. 위험하지 않나요?',
        mood: 'bold',
        score: 2
      },
      {
        text: 'AI가 만든 이미지를 보니 이게 진짜 예술인가 싶더라고요. (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'reaction',
    trigger: 'after_first_choice',
    reactions: {
      park: [
        '좋은 지적이네요!',
        '정확한 답변입니다.',
        '(웃음) 재미있는 관점이네요!'
      ],
      shin: [
        '정말 핵심을 짚었어요.',
        '공감합니다.',
        '(웃음) 그 부분 정확해요!'
      ]
    }
  },

  // ============ 1부 챕터 1 ============
  {
    type: 'scene_change',
    part: '1부',
    title: 'AI 판도, 실제로 어떻게 쓰고 있나',
    section: '챕터 1',
    time: '10:00~35:00'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '그래서 이제 좀 더 구체적으로 얘기해볼게요. ChatGPT, Claude, Gemini... 어떤 게 제일 좋아요?'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '각각 특성이 다르거든요. ChatGPT는 일반적인 작업에 강하고, Claude는 분석과 글쓰기에 좋아요.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: 'AI 모델 평가',
    options: [
      {
        text: 'Claude가 분석력이 좋다니, 저도 써봐야겠네요.',
        mood: 'safe',
        score: 1
      },
      {
        text: '결국 이게 다 기업의 마케팅 아닌가요? 실제 성능은 거기서 거기 아닌가?',
        mood: 'bold',
        score: 3
      },
      {
        text: '그럼 Gemini는 왜 자꾸 구글 뉴스를 띄우는 거예요? (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '저는 실제 유튜브 영상 제작할 때 AI를 어떻게 쓰는지 얘기하고 싶은데요.'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '영상 편집, 자막 생성, 썸네일 디자인... 이게 다 AI로 가능해졌거든요.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '콘텐츠 제작에서의 AI',
    options: [
      {
        text: '정말 효율적이네요. 이런 도구들을 활용하지 않으면 경쟁에 뒤질 것 같아요.',
        mood: 'safe',
        score: 1
      },
      {
        text: '그런데 AI로 만든 콘텐츠가 과포화되면 시장 가치가 떨어지지 않을까요?',
        mood: 'bold',
        score: 2
      },
      {
        text: 'AI가 만든 썸네일이 대부분 똑같은 것 같은데, 그래서 더 광고 많이 누르는 거 아닐까요? (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'reaction',
    trigger: 'after_content_choice',
    reactions: {
      kim: [
        '정확한 분석이에요.',
        '맞습니다.',
        '그게 바로 현재 상황이죠!'
      ]
    }
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '결국 중요한 건... AI를 잘 쓰는 사람과 못 쓰는 사람의 격차가 벌어진다는 거네요.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '네, 그래서 "AI 슬롭"이라는 표현도 나온 것 같아요. AI를 잘 모르는 세대 말이죠.'
  },

  // ============ 1부 챕터 2 ============
  {
    type: 'scene_change',
    part: '1부',
    title: '다음 판도를 바꿀 기술',
    section: '챕터 2',
    time: '35:00~55:00'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '이제 정말 흥미로운 부분인데요. AI 비디오, 이미지 생성은 이제 현실이 되었어요.'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '그리고 코딩도 마찬가지. "Vibe coding"이라는 게 나왔거든요. 개념만 말해도 AI가 코드를 짜주는 거예요.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '업계 대체 위험도',
    options: [
      {
        text: 'AI가 이 정도면 개발자, 디자이너들이 정말 위험한 거 아닌가요?',
        mood: 'bold',
        score: 3
      },
      {
        text: '오히려 이런 도구를 쓰는 개발자/디자이너가 더 빨리 성장하지 않을까요?',
        mood: 'safe',
        score: 1
      },
      {
        text: '그럼 앞으로는 모두가 풀스택 개발자, 풀스택 디자이너 되는 건가요? (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'event',
    text: '돌연 스피커에서 AI 음성이 울려 퍼진다!',
    effect: 'shake'
  },
  {
    type: 'system',
    text: '🤖 AI 음성: "안녕하세요. 저는 당신들의 대화를 듣고 있습니다."'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '어?! 뭐가 된 거야?!'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '(웃음) 이건 오늘 준비한 서프라이즈입니다.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '(놀라면서 웃음) 정말... 진짜 AI가 우리를 감시하는 건 아니죠?'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: 'AI 감시 현실화',
    options: [
      {
        text: '이게 농담이지만 실제로 스마트글래스, AI 이어폰 시대가 오면 진짜 이렇게 되지 않을까요?',
        mood: 'bold',
        score: 3
      },
      {
        text: '아, 신기한데요. 근데 이런 건 개인정보 문제가 있지 않을까요?',
        mood: 'safe',
        score: 1
      },
      {
        text: '(웃음) 제 흠집까지 다 아는 AI... 무섭긴 하네요.',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '실제로 스마트 글래스, AI 이어폰은 이미 개발 중이에요. 다음 큰 판도 변화가 될 거 같아요.'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '이게 상용화되면 정말 모든 게 바뀔 것 같은데요. 콘텐츠 소비 방식부터요.'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '좋아요. 그럼 이제 2부로 넘어가기 전에, 각자 한 마디씩 해주실래요?'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: 'AI와 돈... 정말 뜨거운 이슈네요. 2부에서 더 파고들어 보겠습니다!'
  },

  // ============ 2부 오프닝 ============
  {
    type: 'scene_change',
    part: '2부',
    title: 'AI 시대에 돈 버는 사람들의 공통점',
    section: '오프닝',
    time: '00:00~20:00'
  },
  {
    type: 'system',
    text: '🎬 2부 시작! (휴식 후 재개)'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '다시 돌아왔습니다, 2부입니다. 이제 본격적으로 돈 이야기를 해볼 거예요.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '"AI로 월 500만 원을 벌었다" 이런 광고들 많죠? 실제일까요?'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: 'AI로 돈 버는 것의 현실',
    options: [
      {
        text: '분명히 가능하긴 한데, 초기 설정과 학습곡선이 높아서 누구나 가능한 건 아니에요.',
        mood: 'safe',
        score: 2
      },
      {
        text: '대부분 마케팅이거나 극단적 사례 같아요. 평균적으로는 훨씬 적을 겁니다.',
        mood: 'bold',
        score: 3
      },
      {
        text: '근데 진짜 있는 사람들도 있잖아요. 우리 채널에도 AI 도구로 버는 분들 있고요. (웃음)',
        mood: 'funny',
        score: 1
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '현실은 이거예요. AI 도구는 누구나 쓸 수 있지만, "어떻게" 쓰느냐가 결정적으로 다릅니다.'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '그리고 이미 시장이 포화되기 시작했어요. AI로 쉽게 만든 콘텐츠는 이미 차별성이 없어요.'
  },

  // ============ 2부 챕터 1 ============
  {
    type: 'scene_change',
    part: '2부',
    title: 'AI는 정말 인간을 대체할 수 있을까?',
    section: '챕터 1',
    time: '20:00~40:00'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '그래서 핵심 질문인데요. AI가 정말 우리 일자리를 뺏을까요?'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '흥미로운 게... "주니어의 종말"이라는 말이 있어요. 신입사원 일자리가 줄어들 수 있다는 거죠.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '직업 대체 가능성',
    options: [
      {
        text: '정말 위험한데요. 특히 반복적인 업무나 사무직이 먼저 없어질 것 같아요.',
        mood: 'bold',
        score: 3
      },
      {
        text: '오히려 새로운 직업이 생기지 않을까요? 과거 산업혁명때도 그랬고요.',
        mood: 'safe',
        score: 1
      },
      {
        text: '근데 생각해보니 AI는 퇴근을 안 하잖아요. (웃음) 이게 큰 차이 아닐까요?',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'event',
    text: '📊 시청자 투표 이벤트 시작!',
    effect: 'flash'
  },
  {
    type: 'system',
    text: '현재 투표: AI가 일자리를 빼앗을까? YES: 67% / NO: 33%'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '와, 시청자들도 대부분 걱정하시네요.'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '맞아요. 그런데 더 정확히 말하면, 고급 일자리보다 초급 일자리가 더 위험한 거 같아요.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '직급별 위험도',
    options: [
      {
        text: '맞아요. 디렉터, 임원급은 AI가 못 대체하지만, 사원급은 AI로 충분할 수 있죠.',
        mood: 'safe',
        score: 1
      },
      {
        text: '그럼 더더욱 불공평한데요? 이미 약한 사람들이 더 약해지는 거 아닌가요?',
        mood: 'bold',
        score: 3
      },
      {
        text: '그럼 모두가 임원이 되면 되지 않나요? (웃음) 농담이지만...',
        mood: 'funny',
        score: 1
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '좋은 질문이에요. 결국 이건 교육과 재교육의 문제가 될 수 있겠네요.'
  },

  // ============ 2부 챕터 2 ============
  {
    type: 'scene_change',
    part: '2부',
    title: '특이점이 온다?',
    section: '챕터 2',
    time: '40:00~55:00'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '이제 정말 큰 질문인데요. "특이점(Singularity)"이 올까요?'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '특이점은 AI가 인간의 지능을 완전히 넘어서는 지점이에요. 그 이후는 예측 불가능하죠.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: '특이점 예상 시기',
    options: [
      {
        text: '2030년대에 올 거 같아요. 기술 발전 속도가 정말 빨라지고 있거든요.',
        mood: 'bold',
        score: 3
      },
      {
        text: '아직 수십 년은 남아있을 거 같아요. 아직 너무 낙관적인 예측이 많아요.',
        mood: 'safe',
        score: 1
      },
      {
        text: '특이점이 오면 AI가 우리한테 "넌 뭐 해?" 물을 것 같은데요? (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '근데 정말 흥미로운 건... 사람마다 낙관론과 비관론이 극단적으로 갈려 있다는 거예요.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '누군가는 "AI가 모든 문제를 해결해줄 것"이라고 하고, 누군가는 "인류 멸망"이라고 하죠.'
  },
  {
    type: 'choice',
    forCharacters: ['park', 'shin', 'kim', 'bit'],
    label: 'AI 미래관',
    options: [
      {
        text: '균형잡힌 태도가 필요한 것 같아요. AI의 가능성도, 위험도 모두 인정하면서요.',
        mood: 'safe',
        score: 2
      },
      {
        text: '결국 우리가 어떻게 준비하느냐가 달려있다고 봐요. 주도권은 아직 인간에게 있어요.',
        mood: 'bold',
        score: 2
      },
      {
        text: '사실 우린 이미 충분히 AI에 의존하고 있잖아요. 그럼 뭐하러 지금 와서 걱정해요? (웃음)',
        mood: 'funny',
        score: 2
      }
    ]
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '좋은 말씀들이 많네요. 그럼 마지막으로 각자 한 마디씩 해주겠어요.'
  },

  // ============ 2부 클로징 ============
  {
    type: 'scene_change',
    part: '2부',
    title: '최종 마무리',
    section: '클로징',
    time: '55:00~60:00'
  },
  {
    type: 'dialogue',
    speaker: 'kim',
    text: '결론: AI는 도구다. 중요한 건 어떤 마음가짐으로 이 도구를 쓰느냐입니다.'
  },
  {
    type: 'dialogue',
    speaker: 'bit',
    text: '저도 동의합니다. AI를 두려워하기보다, 먼저 배우고 실험하는 게 중요해요.'
  },
  {
    type: 'dialogue',
    speaker: 'shin',
    text: '결론: AI는 지금 충분히 능력 있지만, 그래도 인간의 판단이 필요합니다.'
  },
  {
    type: 'dialogue',
    speaker: 'park',
    text: '마지막으로, 돈 버는 관점에서는... 남들이 못 하는 것을 할 때 수익이 나온다는 거네요.'
  },
  {
    type: 'system',
    text: '📺 최종 시청자 수: 47,293명! 오늘 방송 감사합니다!'
  },
  {
    type: 'dialogue',
    speaker: 'all',
    text: '모두 감사합니다! 다음 주에 또 만나요!'
  },
  {
    type: 'event',
    text: '엔딩 크레딧 롤!',
    effect: 'confetti'
  }
];

/**
 * 선택지 후 발생하는 반응들
 * 각 캐릭터의 성격에 맞는 응답
 */
export const REACTIONS = {
  safe_choice: {
    kim: '좋은 정보 감사합니다.',
    bit: '그 부분 정확해요.',
    park: '맞는 말씀이네요.',
    shin: '공감합니다.'
  },
  bold_choice: {
    kim: '핵심을 짚었어요!',
    bit: '예리한 지적입니다.',
    park: '좋은 질문이에요.',
    shin: '정확한 분석이네요.'
  },
  funny_choice: {
    kim: '(웃음) 맞아요!',
    bit: '(웃음) 그 부분 재미있네요!',
    park: '(웃음) 좋은 관점이에요!',
    shin: '(웃음) 재미있는데요!'
  }
};

/**
 * 최종 결과 데이터
 * 플레이 스타일에 따른 성격 판정
 */
export const RESULT_GRADES = {
  S: {
    title: '전설의 출연자',
    rating: '12.7%',
    personality: '균형잡힌 지성인',
    comments: [
      '질문도 예리하고 답변도 사려깊으셨어요!',
      '시청자들이 당신 팬이 될 것 같습니다.',
      '다음에도 꼭 와주세요!'
    ]
  },
  A: {
    title: '우수 출연자',
    rating: '9.3%',
    personality: '통찰력 있는 토론자',
    comments: [
      '좋은 질문들이 많았어요.',
      '시청자들과 호흡도 잘 맞으셨고요.',
      '다음 시즌도 기대합니다!'
    ]
  },
  B: {
    title: '착실한 출연자',
    rating: '6.8%',
    personality: '신뢰감 있는 발언자',
    comments: [
      '성실한 답변들이 좋았어요.',
      '좀 더 과감한 주장도 들어보고 싶었어요.',
      '또 뵐 기회가 있으면 좋겠습니다.'
    ]
  },
  C: {
    title: '첫 출연자',
    rating: '4.2%',
    personality: '신중한 참관자',
    comments: [
      '첫 출연이라 어떠셨나요?',
      '다음엔 좀 더 과감하게 의견을 나눠주세요!',
      '더 편하게 오셔도 괜찮아요!'
    ]
  }
};

/**
 * 점수 계산 로직
 * safe: 1점, bold: 2점, funny: 2점
 * 최대 점수에 따른 등급 판정
 */
export const GRADE_THRESHOLD = {
  S: 70,    // 선택지 대부분 bold 이상
  A: 50,    // 균형잡힌 선택
  B: 30,    // safe 중심
  C: 0      // 점수 상관없이 기본값
};
