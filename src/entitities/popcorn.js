export class PopCorn {
  constructor(scene, x, y, namesprite) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.namesprite = namesprite;

    // Obtener los valores de la escena
    this.width = this.scene.game.config.width;
    this.height = this.scene.game.config.height;

    // Animations POPER Corns
    if (!this.scene.anims.exists("appear")) {
      this.scene.anims.create({
        key: "appear",
        frames: this.scene.anims.generateFrameNumbers("pochoclo-anims", {
          start: 0,
          end: 4,
        }),
        frameRate: 9.2,
      });
    }

    // Crear el sprite de popcorn como un objeto de Phaser
    this.sprite = this.scene.physics.add
      .sprite(x, y, namesprite)
      .setScale(1.05)
      .setDepth(12);

    // Configuración inicial del sprite
    this.sprite.anims.play("appear", true);
    this.sprite.setImmovable(true);
    this.sprite.body.allowGravity = false;

    // Cuando la animación termine, cambiar la textura a una imagen estática
    this.sprite.on("animationcomplete", () => {
      this.sprite.setTexture("pochoclo"); // Cambiar a la imagen estática
    });
  }

  // Este método es útil si deseas acceder a las propiedades del sprite
  getBounds() {
    return this.sprite.getBounds();
  }

  destroy() {
    this.sprite.destroy();
  }
}
