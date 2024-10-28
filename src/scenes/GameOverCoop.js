import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

export class GameOverCooperative extends BaseScene {
  constructor() {
    super("GameOverCoop");
  }

  init(data) {
    this.point = data.point || 0;
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    // Obtén el puntaje más alto de localStorage o inicia con 0 si no existe
    // Obtener récord almacenado
    const recordData = JSON.parse(localStorage.getItem("highScore")) || {
      name: "Non Name",
      score: 0,
    };

    // Si el puntaje actual es mayor al puntaje más alto guardado, actualiza el récord
    // Si el puntaje actual es mayor que el récord, actualizarlo
    if (this.point > recordData.score) {
      let playerName = prompt(`${getPhrase("IngreseNombre")}`);
      this.scene.winnerSound.play();
      if (playerName) {
        // Guardar el nuevo récord en localStorage
        recordData.name = playerName;
        recordData.score = this.point;
        localStorage.setItem("highScore", JSON.stringify(recordData));
      }
    }

    this.add
      .image(width * 0.5, height * 0.5, "l-opacidad")
      .setAlpha(0.2)
      .setDepth(41);

    this.add.rectangle(width * 0.5, height * 0.5, width * 0.35, height * 0.4, 0x272736, 0.8).setDepth(17)

    this.createText(width * 0.5, height * 0.38, `${getPhrase("Jugador")}: ${recordData.name}`, {
      fontsize: 90
    })
      .setOrigin(0.5)
      .setDepth(45);

    this.createText(width * 0.5, height * 0.43, `${getPhrase("HighScore")}: ${recordData.score}`, {
      fontsize: 90
    })
      .setOrigin(0.5)
      .setDepth(45);

    this.createText(width * 0.5, height * 0.6, `${getPhrase("Record")}:`, {
      fontsize: 90
    })
      .setOrigin(0.5)
      .setDepth(45);

    this.createText(width * 0.5, height * 0.65, `$$ ${this.point}`, {
      fontsize: 90
    })
      .setOrigin(0.5)
      .setDepth(45);

    this.input.once("pointerdown", () => {
      this.scene.stop("GameCoop");
      this.scene.start("Boot");
      location.reload();
    });
  }
}
