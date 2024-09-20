export class Television {
  constructor(scene) {
    this.scene = scene;

    this.y = this.scene.game.config.height / 2 - 50;
    this.x = this.scene.game.config.width / 2;

    // Sprite Television
    this.television = this.scene.physics.add
      .sprite(this.x, this.y, "l-opacidad")
      .setScale(0.18)
      .setAlpha(0.3)
      .setDepth(1);

    this.television.setImmovable;
    this.television.body.allowGravity = false;
  }
}
