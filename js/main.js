/**
 * 머니디깅클럽 시뮬레이터 - 메인 진입점
 *
 * 게임의 핵심 렌더러, UI, 게임 로직을 초기화하고 실행한다.
 */

import { Renderer } from './renderer.js';
import { UI } from './ui.js';
import { Game } from './game.js';
import { Audio as GameAudio } from './audio.js';

class App {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.uiLayer = document.getElementById('ui-layer');

    // 게임 시스템 초기화
    this.renderer = new Renderer(this.canvas);
    this.ui = new UI(this.uiLayer);
    this.audio = new GameAudio();
    this.ui.setAudio(this.audio); // UI에 오디오 연결
    this.game = new Game(this.renderer, this.ui, this.audio);

    this.audioInitialized = false;
  }

  init() {
    // 사용자 상호작용 시 오디오 초기화 (클릭/터치 어디서든)
    const initAudioOnce = () => {
      if (!this.audioInitialized) {
        this.audio.init();
        this.audioInitialized = true;
      }
    };
    document.addEventListener('click', initAudioOnce);
    document.addEventListener('touchstart', initAudioOnce);

    // 렌더러 시작
    this.renderer.init();
    this.renderer.start();

    // 타이틀 화면 표시
    this.game.showTitle();
  }
}

/**
 * DOM이 로드되면 앱 시작
 */
window.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();

  // 전역 앱 인스턴스 (디버깅용)
  window.__app = app;
});
