export class Character {
  constructor(scene, sprite, isPlayerOne) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayerOne = isPlayerOne;
    this.y = this.scene.scale.height / 7.5;


    if (this.isPlayerOne) {
      this.x = this.scene.game.config.width / 15;
    } else {
      this.x = this.scene.game.config.width / 1.07;
    }

    let character = this.scene.physics.add.sprite(this.x, this.y, this.sprite);

    character.setImmovable;
    character.body.allowGravity = false;
    character.setDepth(2)

    // Name
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

  // Añadir Estados, linkear a la función de Collectar pochoclos
  change_emotion() {
    // Agregar las emociones como animaciones. Luego en colección de Battle, hacer una play otra stop
  }

}
