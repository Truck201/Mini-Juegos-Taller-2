import { Scene } from 'phaser';
import { BaseScene } from '../lib/FontsBase';

// The HUD scene is the scene that shows the points and the remaining time.
export class HudShop extends BaseScene {
  remaining_time = 0;

  remaining_time_text;
  points_text;

  constructor() {
    super('hudShop');
  }

  init(data) {
    this.cameras.main.fadeIn(1300, 0, 0, 0);
    this.remaining_time = data.remaining_time || 20;
    this.points1 = data.points1 || 0; // Puntaje inicial del jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial del jugador 2
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;
    
    this.points_text1 = this.createText(
      (width * 0.5) / 8,
      height * 0.85,
      `P1 Points: ${this.points1}`,
    );

    this.points_text2 = this.createText(
      (width * 6.6) / 8,
      height * 0.85,
      `P2 Points: ${this.points2}`,
    );

    this.remaining_time_text = this.createText(
      width / 2 - 120,
      10,
      `REMAINING: ${this.remaining_time.toString().padStart(2, '0')}s`,
    );
  }

  update_points(player, points) {
    if (player === 1) {
      this.points_text1.setText(`P1 Points: ${points}`);
    } else if (player === 2) {
      this.points_text2.setText(`P2 Points: ${points}`);
    }
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      }
      if (timeout >= 0) {
        this.remaining_time_text.setText(
          `REMAINING: ${timeout.toString().padStart(2, '0')}s`
        );
        // Volver el texto a su posición y estilo original
        this.remaining_time_text.setPosition(this.game.scale.width / 2 - 120, 10);
        this.remaining_time_text.setStyle({
          fontSize: '24px',
          color: '#ffffff',
        });
      }
    } else {
      console.warn('remaining_time_text is not defined yet.');
    }
  }

  update_cameras() {
    this.cameras.main.fadeOut(980, 0, 0, 0);
  }
}
