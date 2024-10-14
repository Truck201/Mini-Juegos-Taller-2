import { Scene } from "phaser";

export class GameCoop extends Scene {
  constructor() {
    super("GameCoop");
  }
  init(data) {
    
  }

  create() {
    const height = this.game.scale.height
    const width = this.game.scale.width

    // this.add.image(width * 0.5, height * 0.5, "background").setAlpha(0.5).setDepth(0);

    

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }
}
