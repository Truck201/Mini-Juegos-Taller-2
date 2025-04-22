import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

export class GameOver extends BaseScene {
  constructor() {
    super("GameOver");
    this.spriteName;
    this.spriteCharacter;
  }

  init(data) {
    this.loser = data.player;

    if (this.loser === 1) {
      this.loser = "Mimbo";
      this.spriteName = "fondoPuntajeAzul";
      this.spriteCharacter = "Luho-win";
      this.winner = 2;
    }
    if (this.loser === 2) {
      this.spriteName = "fondoPuntajeRojo";
      this.loser = "Luho";
      this.spriteCharacter = "Mimbo-win";
      this.winner = 1;
    }
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.add
      .image(width * 0.5, height * 0.5, "l-opacidad2")
      .setAlpha(0.47)
      .setScale(1.6)
      .setDepth(40);

    this.backgroundPoints = this.add
      .sprite(width * 0.51, -height, this.spriteName)
      .setDepth(42);

    this.backgroundCharacter = this.add
      .sprite(width * 0.51, -height, this.spriteCharacter)
      .setDepth(43)
      .setAlpha(0.78)
      .setScale(1.35);

    // Animación
    this.tweens.add({
      targets: this.backgroundPoints,
      y: height * 0.33, // Nueva posición Y
      duration: 900,
      ease: "Bounce.easeOut",
      onComplete: () => {
        this.text1.setVisible(true);
        this.text2.setVisible(true);
      },
    });

    this.tweens.add({
      targets: this.backgroundCharacter,
      y: height * 0.33, // Nueva posición Y
      duration: 900,
      ease: "Bounce.easeOut",
      onComplete: () => {
        console.log("SAPE APARECE PERSONAJE");
      },
    });

    this.text1 = this.createText(
      width * 0.51,
      height * 0.44,
      `${getPhrase("Ganador")} ${this.winner}`
    )
      .setOrigin(0.5)
      .setScale(1.37)
      .setVisible(false)
      .setDepth(45);

    this.text2 = this.createText(
      width * 0.51,
      height * 0.54,
      `${getPhrase("Volver al Menú")}` // key = VolverAlMenu
    )
      .setOrigin(0.5)
      .setScale(1.1)
      .setVisible(false)
      .setDepth(45);

    this.input.once("pointerdown", () => {
      this.scene.stop("Game1vs1");
      this.scene.stop("GameCo-Op");
      this.scene.stop("battleScene");
      this.scene.start("Boot");
      location.reload();
    });
  }
}
