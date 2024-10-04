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
      this.scale.width * 0.075,
      this.scale.height * 0.255,
      `SCORE: ${this.points1.toString().padStart(2, "0")}`
    ).setOrigin(0.5);

    this.points_text2 = this.createText(
      this.scale.width * 0.935,
      this.scale.height * 0.255,
      `SCORE: ${this.points2.toString().padStart(2, "0")}`
    ).setOrigin(0.5);

    this.remaining_time_text = this.createText(
      this.scale.width / 2,
      this.scale.height / 2 - 35,
      `${this.remaining_time.toString().padStart(2, "0")}`
    ).setOrigin(0.5);
  }

  update_points(player, points) {
    if (player === 1) {
      this.points_text1.setText(`SCORE: ${points.toString().padStart(2, "0")}`);
    } else if (player === 2) {
      this.points_text2.setText(`SCORE: ${points.toString().padStart(2, "0")}`);
    }
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      } else {
        this.remaining_time_text.setText(`${timeout.toString().padStart(2, "0")}`);
  
        if (timeout === 5 || timeout === 4  || (timeout <= 3 && timeout >= 0)) {
          this.remaining_time_text.setScale(0.05).setOrigin(0.5); // Escala grande
  
          // Temblor
          this.tweens.add({
            targets: this.remaining_time_text,
            x: this.remaining_time_text.x + 10,
            yoyo: true,
            repeat: 5,
            duration: 150,
            ease: 'Sine.easeInOut',
            onComplete: () => {
              this.remaining_time_text.setX(this.scale.width / 2); // Reset position
            }
          });
  
          // Animación para reducir el tamaño
          this.tweens.add({
            targets: this.remaining_time_text,
            scaleX: 4.2,
            scaleY: 4.2,
            duration: 900,
            ease: 'Power1'
          });
        } else if (timeout <= 10 && timeout > 5) {
          this.remaining_time_text.setScale(3).setOrigin(0.5); // Escala intermedia
  
          // Temblor
          this.tweens.add({
            targets: this.remaining_time_text,
            x: this.remaining_time_text.x + 10,
            yoyo: true,
            repeat: 5,
            duration: 150,
            ease: 'Sine.easeInOut',
            onComplete: () => {
              this.remaining_time_text.setX(this.scale.width / 2); // Reset position
            }
          });
        } else {
          this.remaining_time_text.setScale(1).setOrigin(0.5); // Escala normal
        }
      }
    } else {
      console.warn("remaining_time_text is not defined yet.");
    }
  }
}
