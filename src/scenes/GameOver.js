import { BaseScene } from "../lib/FontsBase";
import { getPhrase } from "../services/translations";

export class GameOver extends BaseScene {
  constructor() {
    super("GameOver");
  }

  init(data) {
    this.loser = data.player;

    if (this.loser === 1) {
      this.loser = "Mimbo";
      this.winner = 2;
    }
    if (this.loser === 2) {
      this.loser = "Luho";
      this.winner = 1;
    }
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.add
      .image(width * 0.5, height * 0.5, "l-opacidad")
      .setAlpha(0.2)
      .setDepth(41);

    this.add
      .rectangle(
        width * 0.5,
        height * 0.41,
        width * 0.2,
        height * 0.12,
        0x272736,
        0.8
      )
      .setDepth(18);

    this.createText(
      width * 0.5,
      height * 0.4,
      `${getPhrase("Ganador")} ${this.winner}`
    )
      .setOrigin(0.5)
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
