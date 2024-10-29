import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

export class HudCoop extends BaseScene {
  remaining_time = 0;
  points = 0;

  remaining_time_text;
  points_text;

  constructor() {
    super("hudCoop");
  }

  init(data) {
    this.cameras.main.fadeIn(1200, 0, 0, 0); // Cuando se apreta la Q
    this.remaining_time = data.remaining_time || 30;
    this.points = data.points || 0; // Puntaje inicial de los jugadores

  }

  create() {
    this.points_text = this.createText(
      this.scale.width * 0.5,
      this.scale.height * 0.11,
      `$ ${this.points.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(10);

    this.remaining_time_text = this.createText(
      this.scale.width / 2,
      this.scale.height * 0.9,
      `${getPhrase("TiempoRestante")} ${this.remaining_time
        .toString()
        .padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(10);
  }

  update_points(points) {
    this.points_text.setText(`$ ${points.toString().padStart(2, "0")}`);
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      } else {
        this.remaining_time_text.setText(
          `${getPhrase("TiempoRestante")} ${timeout
            .toString()
            .padStart(2, "0")}`
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
            repeat: 5,
            duration: 200,
            ease: "Sine.easeInOut",
            onComplete: () => {
              this.remaining_time_text.setX(this.scale.width / 2); // Reset position
            },
          });

          // Animación para reducir el tamaño
          this.tweens.add({
            targets: this.remaining_time_text,
            scaleX: 2.2,
            scaleY: 2.2,
            duration: 200,
            ease: "Power1",
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
