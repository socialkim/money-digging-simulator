/**
 * 오디오 시스템 - Web Audio API를 이용한 8비트 스타일 사운드 이펙트
 *
 * 모든 사운드는 합성되며, 외부 파일이 필요 없다.
 * 레트로 게임 스타일의 간단한 신스 사운드를 생성한다.
 */

export class Audio {
  constructor() {
    this.ctx = null; // AudioContext (lazy init)
    this.enabled = true;
    this.masterGain = null;
  }

  /**
   * Web Audio API 초기화 (사용자 상호작용 이후 필요)
   */
  init() {
    if (this.ctx) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // 마스터 볼륨 제어
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.3; // 게임용 적절한 볼륨
    this.masterGain.connect(this.ctx.destination);
  }

  /**
   * 간단한 톤 생성 헬퍼 함수
   * @param {number} frequency - 주파수 (Hz)
   * @param {number} duration - 지속 시간 (초)
   * @param {string} waveform - 파형 타입 ('sine', 'square', 'sawtooth', 'triangle')
   * @returns {object} { osc, gain, stop }
   */
  createTone(frequency, duration, waveform = 'square') {
    if (!this.ctx) return null;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = waveform;
    osc.frequency.value = frequency;
    osc.connect(gain);
    gain.connect(this.masterGain);

    // 빠른 envelope (8비트 스타일)
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);

    return { osc, gain };
  }

  /**
   * 타이핑 소리 (짧은 percussive click)
   * 대사 텍스트가 타이핑될 때마다 재생
   */
  playType() {
    if (!this.enabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.05;

    // 짧은 고음 click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * 선택지 선택 소리 (짧은 상승 톤)
   * 선택지 버튼에 마우스를 올렸을 때
   */
  playSelect() {
    if (!this.enabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.1;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    // 저음에서 고음으로 상승
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(600, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * 확정 소리 (두 음의 상승 톤)
   * 선택이 확정되었을 때
   */
  playConfirm() {
    if (!this.enabled || !this.ctx) return;

    const now = this.ctx.currentTime;

    // 첫 번째 톤
    this.playTone(500, 0.08, now);

    // 두 번째 톤 (약간 높음)
    this.playTone(700, 0.08, now + 0.1);
  }

  /**
   * 내부 헬퍼: 단일 톤 재생
   */
  playTone(freq, duration, time) {
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.value = freq;

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.25, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * 이벤트 소리 (극적인 하강 톤 + reverb 효과)
   * 특수 이벤트나 dramatic moment
   */
  playEvent() {
    if (!this.enabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.4;

    // 주요 톤 (고음에서 저음으로)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);

    // 두 번째 울림음 (약간 지연)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(900, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(200, now + duration + 0.1);

    osc2.connect(gain2);
    gain2.connect(this.masterGain);

    gain2.gain.setValueAtTime(0.15, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + duration + 0.1);

    osc2.start(now + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  /**
   * 캐릭터 반응 소리 (짧은 chirp)
   * 캐릭터가 반응을 보일 때
   */
  playReact() {
    if (!this.enabled || !this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 0.15;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    // 빠른 상승 후 하강
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.linearRampToValueAtTime(800, now + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(400, now + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * 배경음악 (선택사항)
   * 매우 미묘한 8비트 스타일 루프
   * 현재는 구현하지 않음 (대신 각 장면마다 필요시 추가 가능)
   */
  playBGM() {
    // BGM 재생 (나중에 구현)
    // 간단한 싱글 오실레이터 루프
  }

  /**
   * 사운드 토글
   */
  toggle() {
    this.enabled = !this.enabled;
  }

  /**
   * 마스터 볼륨 설정
   */
  setVolume(value) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, value));
    }
  }
}
