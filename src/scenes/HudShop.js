import { BaseScene } from "../lib/FontsBase";

// The HUD scene is the scene that shows the points and the remaining time.
export class HudShop extends BaseScene {
  remaining_time = 0;

  remaining_time_text;
  points_text;
  sprite1;
  sprite2;

  constructor() {
    super("hudShop");
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
      width * 0.18,
      height * 0.89,
      `${this.points1.toString().padStart(2, "0")}`,
      {
        backgroundColor: "#ffffff",
      }
    ).setOrigin(0.5).setDepth(10);

    this.points_text2 = this.createText(
      // 0.855
      width * 0.825,
      height * 0.89,
      `${this.points2.toString().padStart(2, "0")}`
    ).setOrigin(0.5).setDepth(10);

    this.remaining_time_text = this.createText(
      width / 2,
      height * 0.6493,
      `REMAINING: ${this.remaining_time.toString().padStart(2, "0")}s`
    ).setOrigin(0.5).setDepth(10);
  }

  update(){
    this.update_sprites();
  }

  update_points(player, points) {
    if (player === 1) {
      this.points1 = points;
      this.points_text1.setText(`${points.toString().padStart(2, "0")}`);
    } else if (player === 2) {
      this.points2 = points;
      this.points_text2.setText(`${points.toString().padStart(2, "0")}`);
    }
  }

  update_sprites() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;
    
    if (this.sprite1) this.sprite1.destroy();
    if (this.sprite2) this.sprite2.destroy();

    this.sprite1 = this.add.sprite(width * 0.24, height * 0.875, this.get_sprite_key(this.points1)).setScale(2.8).setDepth(7);
    this.sprite2 = this.add.sprite(width * 0.765, height * 0.875, this.get_sprite_key(this.points2)).setScale(2.9).setDepth(7);
  }

  get_sprite_key(points) {
    if (points >= 70) {
      return 'high-points';
    } else if (points >= 40) {
      return 'medium-points';
    } else if (points < 40) {
      return 'low-points';
    }
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      }
      if (timeout >= 0) {
        this.remaining_time_text.setText(
          `REMAINING: ${timeout.toString().padStart(2, "0")}s`
        );
      }
    }
  }

  update_cameras() {
    console.log("CAMERAS DESDE SHOP");
    this.cameras.main.fadeOut(1000, 0, 0, 0); // Se llama al terminar la escena
  }
}
