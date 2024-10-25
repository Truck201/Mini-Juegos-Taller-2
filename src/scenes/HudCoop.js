import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

export class HudCoop extends BaseScene {
  remaining_time = 0;
  points1 = 0;
  points2 = 0;

  remaining_time_text;
  points_text;

  constructor() {
    super("hudCoop");
  }

  init(data) {
    this.cameras.main.fadeIn(1200, 0, 0, 0); // Cuando se apreta la Q
    this.remaining_time = data.remaining_time || 12;
    this.points1 = data.points1 || 0; // Puntaje inicial del jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial del jugador 2
  }

  create() {
    this.points_text = this.createText(
      this.scale.width * 0.5,
      this.scale.height * 0.155,
      `${getPhrase("Puntos")} ${this.points1.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(10);

    this.remaining_time_text = this.createText(
      this.scale.width / 2,
      this.scale.height * 0.415,
      `${this.remaining_time.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(10);
  }

  update_points(points) {
    this.points_text.setText(
      `${getPhrase("Puntos")} ${points.toString().padStart(2, "0")}`
    );
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      } else {
        this.remaining_time_text.setText(
          `${timeout.toString().padStart(2, "0")}`
        );

        if (timeout === 5 || timeout === 4 || (timeout <= 3 && timeout >= 0)) {
          this.remaining_time_text.setScale(0.05); // Escala grande

          // Temblor
          this.tweens.add({
            targets: this.remaining_time_text,
            x: Phaser.Math.Between(
              this.remaining_time_text.x - 15,
              this.remaining_time_text.x + 15
            ),
            yoyo: true,
            repeat: 25,
            duration: 100,
            ease: "Sine.easeInOut",
            onComplete: () => {
              this.remaining_time_text.setX(this.scale.width / 2); // Reset position
            },
          });

          // Animación para reducir el tamaño
          this.tweens.add({
            targets: this.remaining_time_text,
            scaleX: 4.2,
            scaleY: 4.2,
            duration: 900,
            ease: "Power1",
          });
        } else if (timeout <= 10 && timeout > 5) {
          this.remaining_time_text.setScale(3); // Escala intermedia

          // Temblor
          this.tweens.add({
            targets: this.remaining_time_text,
            x: Phaser.Math.Between(
              this.remaining_time_text.x - 30,
              this.remaining_time_text.x + 30
            ),
            yoyo: true,
            repeat: 25,
            duration: 100,
            ease: "Sine.easeInOut",
            onComplete: () => {
              this.remaining_time_text.setX(this.scale.width / 2); // Reset position
            },
          });
        } else {
          this.remaining_time_text.setScale(1); // Escala normal
        }
      }
    } else {
      console.warn("remaining_time_text is not defined yet.");
    }
  }
}
