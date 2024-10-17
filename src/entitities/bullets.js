export class Bullets {
    constructor(scene, x, y, speedY) {
      this.scene = scene;
  
      // Crear la bala
      this.bullet = this.scene.physics.add.sprite(x, y, "bulletSprite");
      this.scene.physics.add.existing(this.bullet);
      this.bullet.setCollideWorldBounds(false);
      this.bullet.body.allowGravity = true;
      this.bullet.body.setSize(40, 40);
  
      // Establecer velocidad hacia arriba, usando el tiempo de carga
      this.bullet.setVelocityY(-speedY);
    }
  
    destroy() {
      this.bullet.destroy();
    }
  }
  