export class Attack {
  constructor(scene) {
    this.scene = scene;

    this.y = (this.scene.scale.height * 4.3) / 5;
    this.x = this.scene.scale.width / 2;
  }

  create() {
    //Animaciones
    this.createAnims();

    // Crear el rectángulo inicial
    this.createAttackBar();
  }
  
  createAnims() {
    // Anims Idle Sword
    this.scene.anims.create({
      key: "idle",
      frames: this.scene.anims.generateFrameNumbers("idle-sword", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      loop: true,
    });

    // Anims Broken
    this.scene.anims.create({
      key: "broken",
      frames: this.scene.anims.generateFrameNumbers("b-sword", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      loop: true,
    });

    // Anims Rotate
    this.scene.anims.create({
      key: "rotate",
      frames: this.scene.anims.generateFrameNumbers("r-sword", {
        start: 0,
        end: 4,
      }),
      frameRate: 8,
      loop: true,
    });
  }

  // Crear la attackBar en una posición aleatoria
  createAttackBar() {
    const imagenBar = this.scene.imagenBar;
    if (!imagenBar) {
      console.error("MainBar no existe en la escena");
      return;
    }

    const imagenBarBounds = this.scene.imagenBar.getBounds();

    // Posición aleatoria dentro de la barra principal (imagenBar)
    const randomX = Phaser.Math.Between(
      imagenBarBounds.left + 25,
      imagenBarBounds.right - 25
    );

    this.sprite = this.scene.add.sprite(randomX, this.y - 70, "static-sword");
    this.sprite.setDepth(14).setScale(1.33);
    this.sprite.anims.play("rotate", true);
  }

  // Método para actualizar o recrear el rectángulo en una nueva posición
  respawn() {
    if (this.sprite) {
      this.sprite.destroy(); // Destruye el rectángulo anterior
      this.sprite = null;
    }
    this.createAttackBar(); // Crea un nuevo rectángulo en una posición aleatoria
  }

  // Este método es útil si deseas acceder a las propiedades del sprite
  getBounds() {
    return this.sprite.getBounds();
  }

  destroy() {
    this.sprite.destroy();
  }
}
