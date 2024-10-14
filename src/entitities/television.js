export class Television {
  constructor(scene, isInMenu) {
    this.scene = scene;

    this.y = this.scene.scale.height * 0.4;
    this.x = this.scene.scale.width / 2;

    if (isInMenu) {
      this.scale = 1.5;
      this.y = this.scene.scale.height;

      // Sprite Television
      this.television = this.scene.physics.add
        .sprite(this.x, this.y * 0.8, "l-opacidad")
        .setScale(this.scale)
        .setAlpha(0.4);
      this.television.setImmovable;
      this.television.body.allowGravity = false;
      this.television.setDepth(0);

      this.filtrado = this.scene.physics.add
        .sprite(this.x, this.y, "l-opacidad")
        .setScale(this.scale)
        .setAlpha(0.5)
        .setDepth(1);
      this.filtrado.setImmovable;
      this.filtrado.body.allowGravity = false;

      // Shader
      this.television.setPostPipeline("CRTPostFx");
    } else if (!isInMenu) {
      this.y = this.scene.scale.height * 1.2;
      this.scale = 0.001;

      // Sprite Television
      this.television = this.scene.physics.add
        .sprite(this.x, this.y, "l-opacidad")
        .setScale(this.scale)
        .setAlpha(0.4);
      this.television.setImmovable;
      this.television.body.allowGravity = false;
      this.television.setDepth(1);

      // Shader
    }
    this.text = this.scene.add
      .text(this.x - 15, this.y - 50, "", {
        fontSize: "70px",
        color: "#fff1e8",
      })
      .setDepth(1);

    this.television.setPostPipeline("CRTPostFx");
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
