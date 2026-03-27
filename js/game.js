/**
 * 머니디깅클럽 시뮬레이터 - 게임 로직
 * 상태 관리, 씬 처리, 선택지 처리, 결과 계산
 */

import { CHARACTERS, SCENES, REACTIONS, RESULT_GRADES, GRADE_THRESHOLD } from './data.js';

export class Game {
  constructor(renderer, ui, audio) {
    this.renderer = renderer;
    this.ui = ui;
    this.audio = audio;

    // 게임 상태
    this.state = {
      screen: 'title', // 'title' | 'select' | 'playing' | 'result'
      selectedChar: null,
      currentStep: 0,
      score: 0,
      choices: { safe: 0, bold: 0, funny: 0 },
      viewerCount: 12847,
      maxViewerCount: 47293,
      isAnimating: false,
      choiceCount: 0,
      totalChoices: 0
    };

    // 이전 선택의 결과 저장 (반응 표시용)
    this.lastChoiceMood = null;
  }

  /**
   * 타이틀 화면 표시
   */
  showTitle() {
    this.state.screen = 'title';
    this.ui.showTitle(() => this.start());
  }

  /**
   * 게임 시작 - 캐릭터 선택 화면으로
   */
  start() {
    this.state.screen = 'select';
    this.ui.showCharacterSelect(CHARACTERS, (charId) => this.selectCharacter(charId));
  }

  /**
   * 캐릭터 선택
   */
  selectCharacter(charId) {
    this.state.selectedChar = charId;
    this.state.screen = 'playing';
    this.state.currentStep = 0;

    // 렌더러에 플레이어 캐릭터 설정
    this.renderer.setPlayerCharacter(charId);

    // HUD 초기화
    this.ui.updateProgress(0);
    this.ui.updateViewerCount(this.state.viewerCount);

    // 게임 시작
    this.processStep();
  }

  /**
   * 현재 씬 스텝 처리
   * 각 스텝 타입에 따라 다른 처리를 수행
   */
  async processStep() {
    if (this.state.isAnimating) return;
    if (this.state.currentStep >= SCENES.length) {
      return this.showResult();
    }

    const step = SCENES[this.state.currentStep];

    switch (step.type) {
      case 'scene_change':
        await this.ui.showSceneTransition(step.part, step.title, step.section);
        this.updateProgress();
        break;

      case 'dialogue':
        await this.handleDialogue(step);
        break;

      case 'system':
        await this.ui.showSystemMessage(step.text, false);
        break;

      case 'event':
        await this.handleEvent(step);
        break;

      case 'choice':
        await this.handleChoice(step);
        return; // 선택 후까지 대기

      case 'reaction':
        await this.handleReaction(step);
        break;
    }

    // 다음 스텝으로
    this.state.currentStep++;
    await this.delay(400);
    this.processStep();
  }

  /**
   * 대사 처리
   */
  async handleDialogue(step) {
    const char = CHARACTERS[step.speaker] || CHARACTERS.park;

    // 렌더러에 현재 발화자 설정
    this.renderer.setActiveSpeaker(step.speaker);
    this.renderer.setCharacterState(step.speaker, 'talk');

    const isPlayer = step.speaker === this.state.selectedChar;
    const boxColor = isPlayer ? '#FFEB3B' : char.color;
    const name = step.speaker === 'all' ? '모두' : char.name;

    await this.ui.showDialogueBox(name, step.text, boxColor, () => {});

    // 대화 끝나면 idle로 복원
    this.renderer.setCharacterState(step.speaker, 'idle');
    this.renderer.setActiveSpeaker(null);
  }

  /**
   * 이벤트 처리 (특수 효과)
   */
  async handleEvent(step) {
    await this.ui.showEventOverlay(step.text, step.effect);

    // 이벤트에 따라 시청자수 조정
    if (step.text.includes('테마곡')) {
      this.state.viewerCount = 12847;
    } else if (step.text.includes('AI 음성')) {
      this.state.viewerCount += 5000;
    } else if (step.text.includes('투표')) {
      this.state.viewerCount += 8000;
    } else if (step.text.includes('크레딧')) {
      this.state.viewerCount = 47293;
    }

    this.ui.updateViewerCount(this.state.viewerCount);
  }

  /**
   * 선택지 처리
   */
  async handleChoice(step) {
    this.state.isAnimating = true;

    // 플레이어가 할 차례인가?
    const isPlayerTurn = step.forCharacters.includes(this.state.selectedChar);

    if (isPlayerTurn) {
      // 플레이어 선택 대기
      return new Promise((resolve) => {
        this.ui.showChoices(step.options, async (optionIndex) => {
          await this.makeChoice(optionIndex, step.options[optionIndex]);
          this.state.isAnimating = false;
          resolve();
          // 자동으로 다음 스텝 처리
          setTimeout(() => this.processStep(), 500);
        });
      });
    } else {
      // AI가 자동으로 선택
      await this.autoAnswer(step);
      this.state.currentStep++;
      this.state.isAnimating = false;
      await this.delay(500);
      this.processStep();
    }
  }

  /**
   * 플레이어 선택 처리
   */
  async makeChoice(optionIndex, option) {
    const selectedOption = option;
    const mood = selectedOption.mood;
    const score = selectedOption.score;

    // 점수 누적
    this.state.score += score;
    this.state.choices[mood]++;
    this.state.choiceCount++;
    this.lastChoiceMood = mood;

    // 시청자 수 증가 (선택의 임팩트에 따라)
    const viewerIncrease = score === 3 ? 2000 : score === 2 ? 1000 : 500;
    this.state.viewerCount += viewerIncrease;
    this.state.viewerCount = Math.min(
      this.state.viewerCount,
      this.state.maxViewerCount
    );

    // 선택지 숨기기
    this.ui.hideDialogue();

    // 비동기 처리로 잠깐 대기
    await this.delay(200);

    // 화면 업데이트
    this.ui.updateViewerCount(this.state.viewerCount);
    this.updateProgress();
  }

  /**
   * 반응 처리 (다른 캐릭터가 반응)
   */
  async handleReaction(step) {
    if (!step.reactions) return;
    const moodKey = this.lastChoiceMood || 'safe';

    // 현재 플레이어가 아닌 캐릭터 중 반응할 캐릭터 선택
    for (const [charId, texts] of Object.entries(step.reactions)) {
      if (charId === this.state.selectedChar) continue;
      if (!CHARACTERS[charId]) continue;

      // mood에 따라 반응 텍스트 선택 (safe=0, bold=1, funny=2)
      const idx = moodKey === 'bold' ? 1 : moodKey === 'funny' ? 2 : 0;
      const text = texts[Math.min(idx, texts.length - 1)];

      this.renderer.setActiveSpeaker(charId);
      this.renderer.setCharacterState(charId, 'react');
      await this.ui.showDialogueBox(CHARACTERS[charId].name, text, CHARACTERS[charId].color, () => {});
      this.renderer.setCharacterState(charId, 'idle');
      this.renderer.setActiveSpeaker(null);

      break; // 한 명만 반응
    }
    this.lastChoiceMood = null;
  }

  /**
   * AI 캐릭터 자동 응답
   */
  async autoAnswer(step) {
    // 현재 턴이 아닌 캐릭터 중 하나를 선택
    const otherChars = step.forCharacters.filter(
      (id) => id !== this.state.selectedChar
    );
    const selectedChar = otherChars[Math.floor(Math.random() * otherChars.length)];

    // 랜덤 선택지
    const randomOption = step.options[Math.floor(Math.random() * step.options.length)];

    // 응답 표시
    const char = CHARACTERS[selectedChar];
    await this.ui.showDialogueBox(
      char.name,
      randomOption.text,
      char.color,
      () => {}
    );

    // AI도 점수에 반영
    this.state.score += randomOption.score;
    this.state.choices[randomOption.mood]++;
  }

  /**
   * 진행 상황 업데이트 (진행률 바)
   */
  updateProgress() {
    const progress = (this.state.currentStep / SCENES.length) * 100;
    this.ui.updateProgress(progress);
  }

  /**
   * 최종 결과 표시
   */
  getResult() {
    let grade = 'C';

    // 점수에 따른 등급 판정
    if (this.state.score >= GRADE_THRESHOLD.S) {
      grade = 'S';
    } else if (this.state.score >= GRADE_THRESHOLD.A) {
      grade = 'A';
    } else if (this.state.score >= GRADE_THRESHOLD.B) {
      grade = 'B';
    }

    const gradeData = RESULT_GRADES[grade];
    const selectedChar = CHARACTERS[this.state.selectedChar];

    return {
      grade,
      character: selectedChar,
      title: gradeData.title,
      rating: gradeData.rating,
      personality: gradeData.personality,
      comments: gradeData.comments,
      score: this.state.score,
      choices: this.state.choices,
      finalViewerCount: this.state.viewerCount
    };
  }

  /**
   * 결과 화면 표시
   */
  async showResult() {
    this.state.screen = 'result';
    const resultData = this.getResult();
    this.ui.showResult(resultData, () => this.restart());
  }

  /**
   * 게임 재시작
   */
  restart() {
    this.state = {
      screen: 'title',
      selectedChar: null,
      currentStep: 0,
      score: 0,
      choices: { safe: 0, bold: 0, funny: 0 },
      viewerCount: 12847,
      maxViewerCount: 47293,
      isAnimating: false,
      choiceCount: 0,
      totalChoices: 0
    };
    this.lastChoiceMood = null;
    this.ui.hideDialogue();
    this.renderer.setPlayerCharacter(null);
    this.renderer.setActiveSpeaker(null);
    this.showTitle();
  }

  /**
   * 유틸리티: 지연
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
