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
      `$:    ${this.points.toString().padStart(4, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(10)
      .setScale(1.2);

    this.createText(
      this.scale.width * 0.1,
      this.scale.height * 0.7489,
      "A W S D Space",
      {
        color: "#000",
      }
    )
      .setOrigin(0.5)
      .setDepth(10);

    this.createText(
      this.scale.width * 0.9,
      this.scale.height * 0.7489,
      "\u2190 \u2191 \u2193 \u2192 Intro",
      {
        color: "#000",
      }
    )
      .setOrigin(0.5)
      .setDepth(10);

    this.remaining_time_text = this.createText(
      this.scale.width / 2,
      this.scale.height * 0.9,
      `${getPhrase("Tiempo restante")} ${this.remaining_time // key = TiempoRestante
        .toString()
        .padStart(2, "0")} seg`
    )
      .setOrigin(0.5)
      .setScale(2)
      .setDepth(10);
  }

  update_points(points) {
    this.points_text.setText(`$:    ${points.toString().padStart(4, "0")}`);
  }

  update_timeout(timeout) {
    if (this.remaining_time_text) {
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      } else {
        this.remaining_time_text
          .setText(
            `${getPhrase("Tiempo restante")} ${timeout
              .toString()
              .padStart(2, "0")} seg`
          )
          .setScale(2);

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
          this.remaining_time_text.setScale(2); // Escala normal
        }
      }
    } else {
      console.warn("remaining_time_text is not defined yet.");
    }
  }
}
