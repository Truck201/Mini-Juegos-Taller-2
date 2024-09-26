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
    this.points_text1 = this.createText(
      (this.scale.width * 0.3) / 8,
      200,
      `P1 Points: ${this.points1}`,
    );

    this.points_text2 = this.createText(
      (this.scale.width * 6.3) / 8,
      200,
      `P2 Points:: ${this.points2}`,
    );

    this.remaining_time_text = this.createText(
      this.scale.width / 2 - 120,
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
        this.remaining_time_text.setPosition(this.scale.width / 2 - 120, 10);
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
