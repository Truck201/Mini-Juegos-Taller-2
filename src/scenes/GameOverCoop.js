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

    this.add
      .image(width * 0.5, height * 0.5, "l-opacidad")
      .setAlpha(0.2)
      .setDepth(41);

    this.createText(
      width * 0.5,
      height * 0.5,
      `${getPhrase("Record")}`
    )
      .setOrigin(0.5)
      .setDepth(45);

    this.createText(width * 0.5, height * 0.55, `$$ ${this.point}`)
      .setOrigin(0.5)
      .setDepth(45);

    this.input.once("pointerdown", () => {
      this.scene.stop("GameCoop");
      this.scene.start("Boot");
      location.reload();
    });
  }
}
