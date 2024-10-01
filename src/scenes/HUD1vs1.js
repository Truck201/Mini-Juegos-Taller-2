import { BaseScene } from "../lib/FontsBase";

// The HUD scene is the scene that shows the points and the remaining time.
export class Hud extends BaseScene {
  remaining_time = 0;
  points1 = 0;
  points2 = 0;

  remaining_time_text;
  points_text1;
  points_text2;

  constructor() {
    super("Hud");
  }

  init(data) {
    this.cameras.main.fadeIn(1200, 0, 0, 0); // Cuando se apreta la Q
    this.remaining_time = data.remaining_time || 12;
    this.points1 = data.points1 || 0; // Puntaje inicial del jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial del jugador 2
  }

  create() {
    this.points_text1 = this.createText(
      this.scale.width * 0.1,
      180,
      `P1 SCORE: ${this.points1}`
    ).setOrigin(0.5, 0.5);;

    this.points_text2 = this.createText(
      this.scale.width * 0.8,
      180,
      `P2 SCORE: ${this.points2}`
    ).setOrigin(0.5, 0.5);;

    this.remaining_time_text = this.createText(
      this.scale.width / 2,
      this.scale.height / 2 - 35,
      `${this.remaining_time.toString().padStart(2, "0")}`
    ).setOrigin(0.5, 0.5);
  }

  update_points(player, points) {
    if (player === 1) {
      this.points_text1.setText(`P1 SCORE: ${points}`);
    } else if (player === 2) {
      this.points_text2.setText(`P2 SCORE: ${points}`);
    }
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout === 3) {
        this.remaining_time_text.destroy();
      }
      if (timeout >= 4) {
        this.remaining_time_text.setText(
          `${timeout.toString().padStart(2, "0")}`
        )
      }
    } else {
      console.warn("remaining_time_text is not defined yet.");
    }
  }
}
