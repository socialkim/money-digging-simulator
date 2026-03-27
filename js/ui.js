/**
 * 머니디깅클럽 시뮬레이터 - UI 레이어
 * DOM 기반 UI 오버레이 (캔버스 위에 표시)
 */

export class UI {
  constructor(container) {
    this.container = container;
    this.dialogueBox = null;
    this.choicesContainer = null;
    this.currentDialogue = null;
    this.isTyping = false;
  }

  /**
   * 타이틀 화면 표시
   */
  showTitle(onStart) {
    this.clearAll();

    const titleScreen = document.createElement('div');
    titleScreen.className = 'ui-screen title-screen';
    titleScreen.innerHTML = `
      <div class="title-content">
        <h1 class="game-title">머니디깅클럽 시뮬레이터</h1>
        <p class="game-subtitle">AI와 돈의 시대, 당신은 어떤 출연자?</p>

        <div class="title-graphic">
          <div class="pixel-mic">🎤</div>
        </div>

        <button class="button-start" data-action="start">
          시작하기
        </button>

        <p class="game-info">🔊 음성 OFF | 채널: 머니인사이드</p>
      </div>
    `;

    this.container.appendChild(titleScreen);

    titleScreen.querySelector('.button-start').addEventListener('click', () => {
      titleScreen.remove();
      onStart();
    });
  }

  /**
   * 캐릭터 선택 화면 표시
   */
  showCharacterSelect(characters, onSelect) {
    this.clearAll();

    const selectScreen = document.createElement('div');
    selectScreen.className = 'ui-screen select-screen';

    let html = `
      <div class="select-content">
        <h2>출연자를 선택하세요</h2>
        <p class="select-subtitle">당신은 누가 되어 토크쇼에 참여하시겠어요?</p>

        <div class="character-grid">
    `;

    Object.values(characters).forEach((char) => {
      html += `
        <div class="character-card" data-id="${char.id}">
          <div class="char-emoji">${char.emoji}</div>
          <h3 class="char-name">${char.name}</h3>
          <p class="char-role">${char.role}</p>
          <p class="char-desc">${char.description}</p>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    selectScreen.innerHTML = html;
    this.container.appendChild(selectScreen);

    selectScreen.querySelectorAll('.character-card').forEach((card) => {
      card.addEventListener('click', () => {
        const charId = card.dataset.id;
        selectScreen.remove();
        onSelect(charId);
      });
    });
  }

  /**
   * 대사 창 표시 (타이핑 효과 포함)
   */
  async showDialogueBox(name, text, color, onComplete) {
    if (this.isTyping) {
      await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (!this.isTyping) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 50);
      });
    }

    // 기존 대사창 제거
    if (this.dialogueBox) {
      this.dialogueBox.remove();
    }

    this.dialogueBox = document.createElement('div');
    this.dialogueBox.className = 'dialogue-box';

    const speakerLabel = document.createElement('div');
    speakerLabel.className = 'speaker-label';
    speakerLabel.style.backgroundColor = color;
    speakerLabel.textContent = name;

    const textContent = document.createElement('div');
    textContent.className = 'dialogue-text';
    textContent.setAttribute('data-text', text);

    const indicator = document.createElement('div');
    indicator.className = 'dialogue-indicator';
    indicator.innerHTML = '▼';

    this.dialogueBox.appendChild(speakerLabel);
    this.dialogueBox.appendChild(textContent);
    this.dialogueBox.appendChild(indicator);

    this.container.appendChild(this.dialogueBox);

    // 타이핑 효과
    await this.typewriterEffect(textContent, text, 40);

    // 클릭 대기
    return new Promise((resolve) => {
      const clickHandler = () => {
        this.dialogueBox.removeEventListener('click', clickHandler);
        onComplete();
        resolve();
      };
      this.dialogueBox.addEventListener('click', clickHandler);
    });
  }

  /**
   * 선택지 표시
   */
  showChoices(options, onChoose) {
    if (this.choicesContainer) {
      this.choicesContainer.remove();
    }

    this.choicesContainer = document.createElement('div');
    this.choicesContainer.className = 'choices-container';

    const choicesContent = document.createElement('div');
    choicesContent.className = 'choices-content';

    options.forEach((option, index) => {
      const button = document.createElement('button');
      button.className = `choice-button choice-${option.mood}`;

      const moodEmoji = {
        safe: '🟢',
        bold: '🟠',
        funny: '🔴'
      }[option.mood];

      button.innerHTML = `
        <span class="mood-indicator">${moodEmoji}</span>
        <span class="choice-text">${option.text}</span>
      `;

      button.addEventListener('click', () => {
        this.choicesContainer.remove();
        this.choicesContainer = null;
        onChoose(index);
      });

      choicesContent.appendChild(button);
    });

    this.choicesContainer.appendChild(choicesContent);
    this.container.appendChild(this.choicesContainer);

    // 슬라이드 인 애니메이션
    choicesContent.classList.add('slide-in');
  }

  /**
   * 대사창 숨기기
   */
  hideDialogue() {
    if (this.dialogueBox) {
      this.dialogueBox.style.opacity = '0';
      this.dialogueBox.style.pointerEvents = 'none';
    }
    if (this.choicesContainer) {
      this.choicesContainer.style.opacity = '0';
      this.choicesContainer.style.pointerEvents = 'none';
    }
  }

  /**
   * 시스템 메시지 표시
   */
  async showSystemMessage(text, isEvent = false) {
    const message = document.createElement('div');
    message.className = isEvent ? 'system-message event' : 'system-message';
    message.textContent = text;

    this.container.appendChild(message);

    return new Promise((resolve) => {
      setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
          message.remove();
          resolve();
        }, 300);
      }, 1500);
    });
  }

  /**
   * 씬 전환 애니메이션
   */
  async showSceneTransition(part, title, section) {
    const transition = document.createElement('div');
    transition.className = 'scene-transition';

    const content = document.createElement('div');
    content.className = 'transition-content';

    content.innerHTML = `
      <div class="transition-frame">
        <div class="transition-part">${part}</div>
        <div class="transition-title">${title}</div>
        <div class="transition-section">${section}</div>
      </div>
    `;

    transition.appendChild(content);
    this.container.appendChild(transition);

    return new Promise((resolve) => {
      setTimeout(() => {
        transition.style.opacity = '0';
        setTimeout(() => {
          transition.remove();
          resolve();
        }, 600);
      }, 2000);
    });
  }

  /**
   * 진행률 바 업데이트
   */
  updateProgress(percent) {
    let progressBar = document.getElementById('progress-bar');
    if (!progressBar) {
      const container = document.createElement('div');
      container.className = 'progress-container';
      container.innerHTML = '<div id="progress-bar" class="progress-bar"></div>';
      this.container.appendChild(container);
      progressBar = document.getElementById('progress-bar');
    }
    progressBar.style.width = percent + '%';
  }

  /**
   * 시청자 수 업데이트
   */
  updateViewerCount(count) {
    let viewerDisplay = document.getElementById('viewer-count');
    if (!viewerDisplay) {
      const container = document.createElement('div');
      container.className = 'viewer-count-container';
      container.innerHTML = '<div id="viewer-count" class="viewer-count">👥 0</div>';
      this.container.appendChild(container);
      viewerDisplay = document.getElementById('viewer-count');
    }
    viewerDisplay.textContent = `👥 ${count.toLocaleString('ko-KR')}`;
  }

  /**
   * 이벤트 오버레이 표시
   */
  async showEventOverlay(text, effect) {
    const overlay = document.createElement('div');
    overlay.className = `event-overlay event-${effect}`;

    const content = document.createElement('div');
    content.className = 'event-content';
    content.textContent = text;

    overlay.appendChild(content);
    this.container.appendChild(overlay);

    // 효과 기반 애니메이션
    if (effect === 'shake') {
      overlay.classList.add('shake-animation');
    } else if (effect === 'flash') {
      overlay.classList.add('flash-animation');
    } else if (effect === 'confetti') {
      this.createConfetti(overlay);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.remove();
          resolve();
        }, 300);
      }, 1500);
    });
  }

  /**
   * 결과 화면 표시
   */
  showResult(resultData, onRestart) {
    this.clearAll();

    const resultScreen = document.createElement('div');
    resultScreen.className = 'ui-screen result-screen';

    const gradeEmoji = {
      S: '⭐',
      A: '🌟',
      B: '✨',
      C: '🌠'
    }[resultData.grade];

    let html = `
      <div class="result-content">
        <h2 class="result-title">방송 종료!</h2>

        <div class="result-card">
          <div class="result-grade">${gradeEmoji} ${resultData.grade}등급</div>
          <div class="result-character">
            <div class="result-emoji">${resultData.character.emoji}</div>
            <div class="result-name">${resultData.character.name}</div>
          </div>

          <div class="result-data">
            <div class="result-title-large">${resultData.title}</div>
            <div class="result-rating">시청률: ${resultData.rating}</div>
            <div class="result-viewers">최종 시청자: ${resultData.finalViewerCount.toLocaleString('ko-KR')}명</div>

            <div class="result-personality">
              <strong>당신의 성격:</strong> ${resultData.personality}
            </div>

            <div class="result-stats">
              <div class="stat-item">
                <span class="stat-label">안전함 🟢</span>
                <span class="stat-value">${resultData.choices.safe}회</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">대담함 🟠</span>
                <span class="stat-value">${resultData.choices.bold}회</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">재미있음 🔴</span>
                <span class="stat-value">${resultData.choices.funny}회</span>
              </div>
            </div>

            <div class="result-comments">
    `;

    resultData.comments.forEach((comment) => {
      html += `<p class="comment">💬 ${comment}</p>`;
    });

    html += `
            </div>
          </div>
        </div>

        <button class="button-restart">다시 시작</button>
      </div>
    `;

    resultScreen.innerHTML = html;
    this.container.appendChild(resultScreen);

    resultScreen.querySelector('.button-restart').addEventListener('click', () => {
      resultScreen.remove();
      onRestart();
    });
  }

  /**
   * 타이핑 효과 (텍스트 출력)
   */
  async typewriterEffect(element, text, speed = 40) {
    this.isTyping = true;
    element.textContent = '';

    for (let i = 0; i < text.length; i++) {
      element.textContent += text[i];
      await this.delay(speed);
    }

    this.isTyping = false;
  }

  /**
   * 모든 UI 요소 제거
   */
  clearAll() {
    this.container.innerHTML = '';
    this.dialogueBox = null;
    this.choicesContainer = null;
    this.currentDialogue = null;
    this.isTyping = false;
  }

  /**
   * 콘페티 효과 (축하)
   */
  createConfetti(container) {
    const colors = ['#FFD700', '#FF6B6B', '#4FC3F7', '#F48FB1', '#FF8A65'];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animation = `fall ${2 + Math.random() * 1}s linear`;
      container.appendChild(confetti);
    }
  }

  /**
   * 유틸리티: 지연
   */
  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
