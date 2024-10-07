export class Attack {
  constructor(scene) {
    this.scene = scene;

    this.y = (this.scene.scale.height * 4.3) / 5;
    this.x = this.scene.scale.width / 2;

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
      repeat: -1,
    });

    // Anims Broken
    this.scene.anims.create({
      key: "broken",
      frames: this.scene.anims.generateFrameNumbers("b-sword", {
        start: 0,
        end: 3,
      }),
      frameRate: 7.2,
      repeat: -1,
    });

    // Anims Rotate
    this.scene.anims.create({
      key: "rotate",
      frames: this.scene.anims.generateFrameNumbers("r-sword", {
        start: 0,
        end: 4,
      }),
      frameRate: 9,
      repeat: 4,
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

    this.sprite = this.scene.add.sprite(randomX, this.y - 900, "static-sword");
    this.sprite.setDepth(14).setScale(1.33);
    this.sprite.anims.play("idle", true);

    let endY = this.y * 0.4;

    this.scene.tweens.add({
      targets: this.sprite,
      y: endY,
      x: {
        value: randomX + 10, // Pequeño desplazamiento en X
        duration: 150,
        ease: "Power1",
        yoyo: true,
        repeat: 2,
      },
      duration: 300,
      ease: "Power2",
      onComplete: () => {
        this.sprite.anims.play("rotate", true);
        this.scene.time.delayedCall(Phaser.Math.Between(300, 400), () => {
          let endY = this.y;
          this.scene.tweens.add({
            targets: this.sprite,
            y: endY,
            duration: 300,
            ease: "Power2",
            onComplete: () => {
              this.scene.cameras.main.shake(200, 0.005);
              this.sprite.anims.play("broken", true);
            },
          });
        });
      },
    });
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
