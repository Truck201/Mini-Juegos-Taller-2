export class Character {
  constructor(scene, sprite, isPlayerOne) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayerOne = isPlayerOne;
    this.y = this.scene.scale.height * 0.15;


    if (this.isPlayerOne) {
      this.x = this.scene.game.config.width * 0.0667;
    } else {
      this.x = this.scene.game.config.width * 0.934;
    }

    let character = this.scene.physics.add.sprite(this.x, this.y, this.sprite);

    character.setImmovable;
    character.body.allowGravity = false;
    character.setDepth(2)
    character.setScale(1.5)

    // Name
    this.scene.add.text(this.x, this.y + 70, this.sprite.toUpperCase(), {
      fontSize: "95px",
      fontFamily: "Press Start 2P",
      color: "#fff",
      stroke: "black",
      strokeThickness: 7,
      maxLines: 6,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 5,
        offsetY: 5,
      },
    }).setDepth(3).setOrigin(0.5);

  }

  // Añadir Estados, linkear a la función de Collectar pochoclos
  change_emotion() {
    // Agregar las emociones como animaciones. Luego en colección de Battle, hacer una play otra stop
  }

}
