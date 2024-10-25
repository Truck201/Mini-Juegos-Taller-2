import { Scene } from "phaser";
export class StartCooperative extends Scene {
  constructor() {
    super("startCoop");
  }

  init(data) {
    this.points = data.points || 0;
    this.game_over_timeout = data.game_over_timeout || 40;
  }

  create() {
    let activeCoop = true;
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    this.add
      .image(width * 0.5, height * 0.5, "BackgroundCoop")
      .setAlpha(0.5)
      .setDepth(0);

    // this.add
    //   .image(width * 0.5, height * 0.82, "cinta")
    //   .setAlpha(1)
    //   .setDepth(1);

    this.input.keyboard.on("keydown-Q", () => {
      console.log("Start GameCoop");
      // Atacar
      if (activeCoop) {
        this.scene.launch("GameCoop", {});
        activeCoop = false;
      } else {
        this.scene.stop("GameCoop", {});
        activeCoop = true;
      }
    });

    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
  }
}
