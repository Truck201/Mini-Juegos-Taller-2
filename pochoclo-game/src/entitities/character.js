export class Character {
  constructor(scene, sprite, isPlayeyOne) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayeyOne = isPlayeyOne;

    this.y = this.scene.scale.height / 7.5;

    if (this.isPlayeyOne) {
      this.x = this.scene.game.config.width / 17;
    } else {
      this.x = this.scene.game.config.width / 1.067;
    }

    // Animations Sprites
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("pochoclo-anims", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
    });

    let character = this.scene.physics.add.sprite(this.x, this.y, this.sprite);

    character.setImmovable;
    character.body.allowGravity = false;

    this.scene.add.text(this.x - 35, this.y + 70, this.sprite.toUpperCase(), {
      fontSize: "16px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#ff004d", // ROJO
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });
  }
}
