export class Television {
  constructor(scene) {
    this.scene = scene;

    this.y = this.scene.scale.height / 2 - 50;
    this.x = this.scene.scale.width / 2;

    // Sprite Television
    this.television = this.scene.physics.add
      .sprite(this.x, this.y, "l-opacidad")
      .setScale(0.18)
      .setAlpha(0.3)
      .setDepth(1);

    this.television.setImmovable;
    this.television.body.allowGravity = false;

    this.text = this.scene.add.text(this.x - 15, this.y -30, '', {
      fontSize: "70px",
      color: "#fff1e8",
    }).setDepth(3);
  }

  updateText(remainingTime) {
    if (remainingTime <= 3) {
      this.text.setText(`${remainingTime}`); // Actualizar el texto con el tiempo restante
    } else {
      this.text.setText(""); // Limpiar el texto si el tiempo es mayor a 3
    }
  }
}


