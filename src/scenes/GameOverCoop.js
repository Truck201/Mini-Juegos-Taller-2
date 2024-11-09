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
      if (playerName) {
        // Guardar el nuevo récord en localStorage
        recordData.name = playerName;
        recordData.score = this.point;
        localStorage.setItem("highScore", JSON.stringify(recordData));
      }
    }

    this.add
      .image(width * 0.5, height * 0.5, "l-opacidad2")
      .setAlpha(0.47)
      .setScale(1.6)
      .setDepth(27);

    this.backgroundPoints = this.add
      .sprite(width * 0.5, - height, "fondoPuntajeAmarillo")
      .setDepth(30);
      
    // Animación
    this.tweens.add({
      targets: this.backgroundPoints,
      y: height * 0.35, // Nueva posición Y
      duration: 1000,
      ease: "Bounce.easeOut",
      onComplete: () => {
        this.text1.setVisible(true)
        this.text2.setVisible(true)
        this.text3.setVisible(true)
        this.text4.setVisible(true)
      },
    });

    this.text1 = this.createText(
      width * 0.5,
      height * 0.35,
      `${getPhrase("Jugador")}: ${recordData.name}`
    )
      .setOrigin(0.5)
      .setScale(1.2)
      .setVisible(false)
      .setDepth(45);

    this.text2 = this.createText(
      width * 0.5,
      height * 0.4,
      `${getPhrase("HighScore")}: ${recordData.score}`
    )
      .setOrigin(0.5)
      .setScale(1.2)
      .setVisible(false)
      .setDepth(45);

    this.text3 = this.createText(
      width * 0.5,
      height * 0.52,
      `${getPhrase("Record")}:`
    )
      .setOrigin(0.5)
      .setScale(1.23)
      .setVisible(false)
      .setDepth(45);

    this.text4 = this.createText(width * 0.5, height * 0.6, `$$ ${this.point}`)
      .setOrigin(0.5)
      .setScale(1.1)
      .setVisible(false)
      .setDepth(45);

    this.input.once("pointerdown", () => {
      this.scene.stop("GameCoop");
      this.scene.start("Boot");
      location.reload();
    });
  }
}
