export class Attack {
  constructor(scene) {
    this.scene = scene;

    this.y = (this.scene.scale.height * 4.3) / 5;
    this.x = this.scene.scale.width / 2;

    // Crear el rectángulo inicial
    this.createAttackBar();
  }

  // Crear la attackBar en una posición aleatoria
  createAttackBar() {
    const mainBarBounds = this.scene.mainBar.getBounds();

    // Posición aleatoria dentro de la barra principal (mainBar)
    const randomX = Phaser.Math.Between(
      mainBarBounds.left + 25,
      mainBarBounds.right - 25
    );
    this.sprite = this.scene.add.rectangle(randomX, this.y, 30, 85, 0xff0000);
  }

  // Método para actualizar o recrear el rectángulo en una nueva posición
  respawn() {
    if (this.sprite) {
      this.sprite.destroy(); // Destruye el rectángulo anterior
    }
    this.createAttackBar(); // Crea un nuevo rectángulo en una posición aleatoria
    this.sprite.setFillStyle(0xff0000); // Cambia el color a rojo
  }

  // Este método es útil si deseas acceder a las propiedades del sprite
  getBounds() {
    return this.sprite.getBounds();
  }

  destroy() {
    this.sprite.destroy();
  }
}
