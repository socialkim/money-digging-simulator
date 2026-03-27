/**
 * Canvas renderer for "머니디깅클럽 시뮬레이터"
 * Renders 240x160 pixel art on offscreen canvas, scales to display
 */

import { getSprite, getFurniture, CHARACTER_INFO } from './sprites.js';

// GBA resolution (native pixel art size)
const NATIVE_WIDTH = 240;
const NATIVE_HEIGHT = 160;

// Character positions on the studio layout
const CHARACTER_POSITIONS = {
  park: { x: 40, y: 50, anchorX: 8, anchorY: 11 },   // left
  shin: { x: 180, y: 50, anchorX: 8, anchorY: 11 },  // right
  kim: { x: 40, y: 100, anchorX: 8, anchorY: 11 },   // bottom left
  bit: { x: 180, y: 100, anchorX: 8, anchorY: 11 },  // bottom right
};

const TABLE_CENTER = { x: 120, y: 80 };
const TABLE_RADIUS = 24;

export class Renderer {
  constructor(displayCanvas) {
    this.displayCanvas = displayCanvas;
    this.displayCtx = displayCanvas.getContext('2d');

    // Create offscreen canvas at native resolution
    this.canvas = document.createElement('canvas');
    this.canvas.width = NATIVE_WIDTH;
    this.canvas.height = NATIVE_HEIGHT;
    this.ctx = this.canvas.getContext('2d');

    // Animation state
    this.frameCount = 0;
    this.animationFrameId = null;
    this.running = false;

    // Character state
    this.characterStates = {
      park: { state: 'idle', frame: 0 },
      shin: { state: 'idle', frame: 0 },
      kim: { state: 'idle', frame: 0 },
      bit: { state: 'idle', frame: 0 },
    };

    this.activeSpeaker = null;
    this.playerCharacter = null;
    this.floatingEmojis = [];

    // Visual effects
    this.onAirPulse = 0;
    this.particles = this.generateParticles();
  }

  /**
   * Initialize the renderer
   */
  init() {
    // Set up display canvas scaling
    this.displayCtx.imageSmoothingEnabled = false;
    this.displayCtx.webkitImageSmoothingEnabled = false;
    this.displayCtx.msImageSmoothingEnabled = false;

    // Scale to fit window
    this.scaleToWindow();
    window.addEventListener('resize', () => this.scaleToWindow());
  }

  /**
   * Scale display canvas to fit window while maintaining aspect ratio
   */
  scaleToWindow() {
    const aspectRatio = NATIVE_WIDTH / NATIVE_HEIGHT;
    let width = window.innerWidth * 0.9;
    let height = window.innerHeight * 0.9;

    if (width / height > aspectRatio) {
      width = height * aspectRatio;
    } else {
      height = width / aspectRatio;
    }

    this.displayCanvas.width = width;
    this.displayCanvas.height = height;
  }

  /**
   * Set which character is currently speaking
   * @param {string} charId - character ID or null
   */
  setActiveSpeaker(charId) {
    this.activeSpeaker = charId;
  }

  /**
   * Set character animation state
   * @param {string} charId - character ID
   * @param {string} state - 'idle', 'talk', or 'react'
   */
  setCharacterState(charId, state) {
    if (this.characterStates[charId]) {
      this.characterStates[charId].state = state;
      this.characterStates[charId].frame = 0;
    }
  }

  /**
   * Mark a character as the player
   * @param {string} charId - character ID or null
   */
  setPlayerCharacter(charId) {
    this.playerCharacter = charId;
  }

  /**
   * Show floating emoji above character
   * @param {string} charId - character ID
   * @param {string} emoji - emoji character(s)
   */
  showEmoji(charId, emoji) {
    const pos = CHARACTER_POSITIONS[charId];
    if (pos) {
      this.floatingEmojis.push({
        emoji: emoji,
        x: pos.x,
        y: pos.y - 20,
        life: 60, // frames
        maxLife: 60,
      });
    }
  }

  /**
   * Generate ambient particles (studio dust/light effects)
   */
  generateParticles() {
    const particles = [];
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * NATIVE_WIDTH,
        y: Math.random() * NATIVE_HEIGHT,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100 + 50,
        maxLife: 100,
      });
    }
    return particles;
  }

  /**
   * Update particles for next frame
   */
  updateParticles() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      if (p.life <= 0) {
        p.x = Math.random() * NATIVE_WIDTH;
        p.y = Math.random() * NATIVE_HEIGHT;
        p.life = 100;
      }

      // Bounce off edges
      if (p.x < 0 || p.x > NATIVE_WIDTH) p.vx *= -1;
      if (p.y < 0 || p.y > NATIVE_HEIGHT) p.vy *= -1;
    }
  }

  /**
   * Main render function (called from animation loop)
   */
  render() {
    this.frameCount++;

    // Clear canvas
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, NATIVE_WIDTH, NATIVE_HEIGHT);

    // Draw studio background
    this.drawStudioBackground();

    // Draw furniture
    this.drawTable();
    this.drawMicrophones();

    // Draw characters
    this.drawCharacters();

    // Draw ON AIR sign
    this.drawOnAirSign();

    // Draw particles
    this.updateParticles();
    this.drawParticles();

    // Update floating emojis
    this.updateEmojis();
    this.drawEmojis();

    // Scale to display canvas
    this.scaleToDisplay();
  }

  /**
   * Draw studio floor with gradient
   */
  drawStudioBackground() {
    // Dark gradient floor
    const gradient = this.ctx.createLinearGradient(0, 0, 0, NATIVE_HEIGHT);
    gradient.addColorStop(0, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, NATIVE_WIDTH, NATIVE_HEIGHT);

    // Subtle grid pattern on floor
    this.ctx.strokeStyle = '#1a3a4a';
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i <= NATIVE_HEIGHT; i += 16) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i);
      this.ctx.lineTo(NATIVE_WIDTH, i);
      this.ctx.stroke();
    }
    for (let i = 0; i <= NATIVE_WIDTH; i += 16) {
      this.ctx.beginPath();
      this.ctx.moveTo(i, 0);
      this.ctx.lineTo(i, NATIVE_HEIGHT);
      this.ctx.stroke();
    }

    // Ambient colored lighting spots
    this.drawLighting();
  }

  /**
   * Draw ambient colored lighting spots
   */
  drawLighting() {
    // Left warm light
    const gradL = this.ctx.createRadialGradient(20, 60, 0, 20, 60, 50);
    gradL.addColorStop(0, 'rgba(255, 100, 50, 0.1)');
    gradL.addColorStop(1, 'rgba(255, 100, 50, 0)');
    this.ctx.fillStyle = gradL;
    this.ctx.fillRect(0, 30, 80, 100);

    // Right blue light
    const gradR = this.ctx.createRadialGradient(
      NATIVE_WIDTH - 20,
      60,
      0,
      NATIVE_WIDTH - 20,
      60,
      50
    );
    gradR.addColorStop(0, 'rgba(100, 150, 255, 0.1)');
    gradR.addColorStop(1, 'rgba(100, 150, 255, 0)');
    this.ctx.fillStyle = gradR;
    this.ctx.fillRect(NATIVE_WIDTH - 80, 30, 80, 100);
  }

  /**
   * Draw the round table
   */
  drawTable() {
    const furniture = getFurniture('table');
    this.drawSpriteData(
      furniture.rows,
      furniture.palette,
      TABLE_CENTER.x - 8,
      TABLE_CENTER.y - 8
    );
  }

  /**
   * Draw microphones in front of each character
   */
  drawMicrophones() {
    const mic = getFurniture('microphone');
    const micHeight = mic.rows.length;
    const micWidth = mic.rows[0].length;

    // Position mics in front of each character
    const micPositions = [
      { x: 44, y: 82 },  // park
      { x: 184, y: 82 }, // shin
      { x: 44, y: 95 },  // kim
      { x: 184, y: 95 }, // bit
    ];

    for (let pos of micPositions) {
      this.drawSpriteData(
        mic.rows,
        mic.palette,
        pos.x - micWidth / 2,
        pos.y - micHeight
      );
    }
  }

  /**
   * Draw all characters
   */
  drawCharacters() {
    for (let charId of ['park', 'shin', 'kim', 'bit']) {
      this.drawCharacter(charId);
    }
  }

  /**
   * Draw a single character
   */
  drawCharacter(charId) {
    const charState = this.characterStates[charId];
    const pos = CHARACTER_POSITIONS[charId];

    if (!charState || !pos) return;

    // Breathing animation for idle state
    let yOffset = 0;
    if (charState.state === 'idle') {
      const breathePhase = (this.frameCount * 0.05) % (Math.PI * 2);
      yOffset = Math.sin(breathePhase) * 0.5;
    }

    // Bounce on react
    if (charState.state === 'react') {
      const reactPhase = (charState.frame / 10) * Math.PI;
      yOffset = -Math.sin(reactPhase) * 2;
    }

    const sprite = getSprite(charId, charState.state, charState.frame);

    // Draw character sprite
    this.drawSpriteData(
      sprite.rows,
      sprite.palette,
      pos.x - pos.anchorX,
      pos.y + yOffset - pos.anchorY
    );

    // Draw highlight if active speaker
    if (this.activeSpeaker === charId) {
      this.drawCharacterHighlight(pos.x, pos.y, pos.anchorX, pos.anchorY);
    }

    // Draw player crown/star
    if (this.playerCharacter === charId) {
      this.drawPlayerMarker(pos.x, pos.y - pos.anchorY - 8);
    }

    // Draw character name
    this.drawCharacterLabel(charId, pos.x, pos.y + 12);

    // Update animation frame
    if (charState.state === 'talk') {
      charState.frame = Math.floor(this.frameCount / 8) % 2;
    } else if (charState.state === 'react') {
      charState.frame = Math.min(charState.frame + 1, 30);
    } else {
      charState.frame = Math.floor(this.frameCount / 16) % 2;
    }
  }

  /**
   * Draw glow effect around active speaker
   */
  drawCharacterHighlight(x, y, anchorX, anchorY) {
    const glowIntensity = 0.3 + Math.sin(this.frameCount * 0.1) * 0.2;

    // Yellow spotlight
    const grad = this.ctx.createRadialGradient(x, y, 0, x, y, 25);
    grad.addColorStop(0, `rgba(255, 220, 100, ${glowIntensity})`);
    grad.addColorStop(1, 'rgba(255, 220, 100, 0)');

    this.ctx.fillStyle = grad;
    this.ctx.fillRect(x - 25, y - 25, 50, 50);

    // Glow outline
    this.ctx.strokeStyle = `rgba(255, 220, 100, ${glowIntensity * 0.7})`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 22, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  /**
   * Draw player marker (small star/crown)
   */
  drawPlayerMarker(x, y) {
    this.ctx.fillStyle = '#FFD700';
    // Draw small star (★)
    this.ctx.font = 'bold 10px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('★', x, y);
  }

  /**
   * Draw character name label below character
   */
  drawCharacterLabel(charId, x, y) {
    const info = CHARACTER_INFO[charId];
    if (!info) return;

    // Semi-transparent background
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    this.ctx.fillRect(x - 18, y - 4, 36, 10);

    // Name text
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = 'bold 6px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(info.name, x, y + 1);
  }

  /**
   * Draw ON AIR sign at top with pulsing glow
   */
  drawOnAirSign() {
    const signData = getFurniture('onAirSign');
    const signWidth = signData.rows[0].length;

    const glowIntensity = 0.4 + Math.sin(this.frameCount * 0.15) * 0.3;

    // Glow effect
    this.ctx.fillStyle = `rgba(255, 100, 100, ${glowIntensity})`;
    this.ctx.filter = `blur(2px)`;
    this.drawSpriteData(
      signData.rows,
      signData.palette,
      NATIVE_WIDTH / 2 - signWidth / 2,
      8
    );
    this.ctx.filter = 'none';

    // Sign itself
    this.drawSpriteData(
      signData.rows,
      signData.palette,
      NATIVE_WIDTH / 2 - signWidth / 2,
      8
    );
  }

  /**
   * Draw ambient particles
   */
  drawParticles() {
    this.ctx.fillStyle = 'rgba(200, 200, 220, 0.4)';
    for (let p of this.particles) {
      const alpha = (p.life / p.maxLife) * 0.3;
      this.ctx.fillStyle = `rgba(200, 200, 220, ${alpha})`;
      this.ctx.fillRect(p.x, p.y, 1, 1);
    }
  }

  /**
   * Update floating emojis
   */
  updateEmojis() {
    this.floatingEmojis = this.floatingEmojis.filter((e) => {
      e.y -= 0.5;
      e.life--;
      return e.life > 0;
    });
  }

  /**
   * Draw floating emojis
   */
  drawEmojis() {
    for (let emoji of this.floatingEmojis) {
      const alpha = emoji.life / emoji.maxLife;
      this.ctx.globalAlpha = alpha;
      this.ctx.font = '14px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(emoji.emoji, emoji.x, emoji.y);
      this.ctx.globalAlpha = 1;
    }
  }

  /**
   * Draw sprite data using palette mapping
   * @param {string[]} rows - array of sprite rows
   * @param {object} palette - color palette
   * @param {number} x - x position on canvas
   * @param {number} y - y position on canvas
   */
  drawSpriteData(rows, palette, x, y) {
    const spriteWidth = rows[0].length;
    const spriteHeight = rows.length;

    for (let row = 0; row < spriteHeight; row++) {
      for (let col = 0; col < spriteWidth; col++) {
        const char = rows[row][col];
        const color = palette[char];

        if (color !== null && color !== undefined) {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(x + col, y + row, 1, 1);
        }
      }
    }
  }

  /**
   * Scale offscreen canvas to display canvas
   */
  scaleToDisplay() {
    const scaleX = this.displayCanvas.width / NATIVE_WIDTH;
    const scaleY = this.displayCanvas.height / NATIVE_HEIGHT;

    // Fill display background
    this.displayCtx.fillStyle = '#000000';
    this.displayCtx.fillRect(0, 0, this.displayCanvas.width, this.displayCanvas.height);

    // Draw scaled image
    this.displayCtx.drawImage(
      this.canvas,
      0,
      0,
      NATIVE_WIDTH,
      NATIVE_HEIGHT,
      0,
      0,
      this.displayCanvas.width,
      this.displayCanvas.height
    );
  }

  /**
   * Start animation loop
   */
  start() {
    if (this.running) return;
    this.running = true;

    const animate = () => {
      this.render();
      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  /**
   * Stop animation loop
   */
  stop() {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
