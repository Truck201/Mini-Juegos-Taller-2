import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

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
      width * 0.165,
      height * 0.894,
      `${this.points1.toString().padStart(2, "0")}`,
      {
        backgroundColor: "#ffffff",
      }
    ).setOrigin(0.5).setDepth(10).setScale(1);

    this.points_text2 = this.createText(
      // 0.855
      width * 0.835,
      height * 0.894,
      `${this.points2.toString().padStart(2, "0")}`
    ).setOrigin(0.5).setDepth(10).setScale(1);

    this.remaining_time_text = this.createText(
      width / 2,
      height * 0.6493,
      `${getPhrase('TiempoRestante')} ${this.remaining_time.toString().padStart(2, "0")}s`
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

    this.sprite1 = this.add.sprite(width * 0.218, height * 0.882, this.get_sprite_key(this.points1)).setScale(2.2).setDepth(7);
    this.sprite2 = this.add.sprite(width * 0.782, height * 0.882, this.get_sprite_key(this.points2)).setScale(2.2).setDepth(7);
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
          `${getPhrase('TiempoRestante')} ${timeout.toString().padStart(2, "0")}s`
        );
      }
    }
  }

  update_cameras() {
    console.log("CAMERAS DESDE SHOP");
    this.cameras.main.fadeOut(1000, 0, 0, 0); // Se llama al terminar la escena
  }
}
