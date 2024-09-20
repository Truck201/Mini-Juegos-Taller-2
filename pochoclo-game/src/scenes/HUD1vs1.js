import { Scene } from "phaser";

// The HUD scene is the scene that shows the points and the remaining time.
export class Hud extends Scene {
  remaining_time = 0;

  remaining_time_text;
  points_text;

  constructor() {
    super("Hud");
  }

  init(data) {
    this.cameras.main.fadeIn(1400, 0, 0, 0);
    this.remaining_time = data.remaining_time;
    this.points1 = data.points1 || 0; // Puntaje inicial del jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial del jugador 2
  }

  create() {
    this.points_text1 = this.add.text(
      (this.scale.width * 0.3) / 8,
      200,
      `P1 SCORE: ${this.points1}`,
      {
        fontSize: "24px",
        color: "#ffffff",
      }
    );

    this.points_text2 = this.add.text(
      (this.scale.width * 7) / 8,
      200,
      `P2 SCORE: ${this.points2}`,
      {
        fontSize: "24px",
        color: "#ffffff",
      }
    );

    this.remaining_time_text = this.add.text(
      this.scale.width / 2 - 120,
      10,
      `REMAINING: ${this.remaining_time.toString().padStart(2, "0")}s`,
      {
        fontSize: "24px",
        color: "#ffffff",
      }
    );
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
      if (timeout < 0) {
        this.remaining_time_text.destroy();
      }
      if (timeout <= 3) {
        // Cambiar el texto para que solo muestre los segundos restantes
        this.remaining_time_text.setText(`${timeout.toString()}s`);

        // Centrar el texto en el centro de la pantalla y agrandar el tamaño de fuente
        this.remaining_time_text.setPosition(
          this.scale.width / 2 - 10, // Centrando horizontalmente
          this.scale.height / 25 // Un poco más abajo del borde superior
        );

        // Aumentar tamaño de fuente y poner sobre todo lo demás
        this.remaining_time_text.setStyle({
          fontSize: "40px",
          color: "#ff0000", // Cambiar el color a rojo para mayor visibilidad
        });
        this.remaining_time_text.setDepth(10); // Asegurarse que esté sobre todo lo demás
      } else {
        this.remaining_time_text.setText(
          `REMAINING: ${timeout.toString().padStart(2, "0")}s`
        );
        // Volver el texto a su posición y estilo original
        this.remaining_time_text.setPosition(this.scale.width / 2 - 120, 10);
        this.remaining_time_text.setStyle({
          fontSize: "24px",
          color: "#ffffff",
        });
      }
    } else {
      console.warn("remaining_time_text is not defined yet.");
    }

    if (timeout <= 3) {
      this.remaining_time_text.setText(`${timeout.toString()}s`);
    }
  }

  update_cameras() {
    this.cameras.main.fadeOut(980, 0, 0, 0);
  }
}
