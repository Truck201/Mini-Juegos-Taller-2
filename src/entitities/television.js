export class Television {
  constructor(scene, isInMenu) {
    this.scene = scene;

    this.y = this.scene.scale.height * 0.4;
    this.x = this.scene.scale.width / 2;

    if (isInMenu) {
      this.scale = 0.5;
      this.y = this.scene.scale.height * 0.34
    } else if (!isInMenu) {
      this.scale = 0.18;
    }

    // Sprite Television
    this.television = this.scene.physics.add
      .sprite(this.x, this.y, "l-opacidad")
      .setScale(this.scale)
      .setAlpha(0.4)
      .setDepth(80);

    this.television.setImmovable;
    this.television.body.allowGravity = false;
    this.television.setDepth(1);

    this.text = this.scene.add
      .text(this.x - 15, this.y - 50, "", {
        fontSize: "70px",
        color: "#fff1e8",
      })
      .setDepth(1);

    // Shader
   this.television.setPostPipeline('CRTPostFx');
  }

  updateText(remainingTime) {
    if (remainingTime <= 3 && remainingTime != -1) {
      this.text.setText(`${remainingTime}`); // Actualizar el texto con el tiempo restante
    } else if (remainingTime === 0) {
      this.text.setText("0");
    } else {
      this.text.setText(""); // Limpiar el texto si el tiempo es mayor a 3 o menor que 0
    }
  }
}
