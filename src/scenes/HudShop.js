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
    this.cameras.main.fadeIn(1200, 0, 0, 0); // Cuando Inica la escena
    this.remaining_time = data.remaining_time || 20;
    this.points1 = data.points1 || 0; // Puntaje inicial del jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial del jugador 2
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;
    
    this.points_text1 = this.createText(
      width * 0.165,
      height * 0.855,
      `P1: ${this.points1.toString().padStart(2, '0')}`,
    ).setOrigin(0.5);

    this.points_text2 = this.createText( // 0.855
      width * 0.835,
      height * 0.855,
      `P2: ${this.points2.toString().padStart(2, '0')}`,
    ).setOrigin(0.5);

    this.remaining_time_text = this.createText(
      width / 2,
      height * 0.55,
      `REMAINING: ${this.remaining_time.toString().padStart(2, '0')}s`,
    ).setOrigin(0.5);
  }

  update_points(player, points) {
    if (player === 1) {
      this.points_text1.setText(`P1: ${points.toString().padStart(2, '0')}`);
    } else if (player === 2) {
      this.points_text2.setText(`P2: ${points.toString().padStart(2, '0')}`);
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
      }
    }
  }

  update_cameras() {
    console.log('CAMERAS DESDE SHOP')
    this.cameras.main.fadeOut(1000, 0, 0, 0); // Se llama al terminar la escena
  }
}
