export class Bullets extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bulletSprite");
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
    this.body.setSize(40, 40);
    this.body.allowGravity = false;
    this.setDepth(10)
  }

  // Método para destruir la bala
  destroyBullet() {
    this.body.enable = false; // Desactiva el cuerpo físico
    this.setActive(false); // Desactiva la bala
    this.setVisible(false); // La hace invisible
    this.destroy(); // Llama al método destroy de Phaser
  }
}
