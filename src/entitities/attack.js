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
    // Verifica si las animaciones ya están creadas antes de crearlas

    // Anims Idle Sword
    if (!this.scene.anims.exists("idle")) {
      this.scene.anims.create({
        key: "idle",
        frames: this.scene.anims.generateFrameNumbers("idle-sword", {
          start: 0,
          end: 3,
        }),
        frameRate: 8,
        repeat: -1,
      });
    }

    // Anims Broken
    if (!this.scene.anims.exists("broken")) {
      this.scene.anims.create({
        key: "broken",
        frames: this.scene.anims.generateFrameNumbers("b-sword", {
          start: 0,
          end: 3,
        }),
        frameRate: 7.2,
        repeat: -1,
      });
    }

    // Anims Rotate
    if (!this.scene.anims.exists("rotate")) {
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
  }
  

  // Crear la attackBar en una posición aleatoria
  createAttackBar() {
    const imagenBar = this.scene.imagenBar;
    if (!imagenBar) {
      console.error("MainBar no existe en la escena");
      return;
    }

    const imagenBarBounds = imagenBar.getBounds();
    if (!imagenBarBounds) {
      console.error("No se pueden obtener los bounds de imagenBar");
      return;
    }

    const randomX = Phaser.Math.Between(
      imagenBarBounds.left + 25,
      imagenBarBounds.right - 25
    );

    this.sprite = this.scene.add.sprite(randomX, this.y - 900, "static-sword");
    this.sprite.setDepth(14).setScale(1.33);
    this.sprite.anims.play("idle", true);
    console.log("Sprite creado:", this.sprite);

    const fallSword = this.scene.fallingBonus;
    fallSword.play();

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
      duration: 160,
      ease: "Power2",
      onComplete: () => {
        if (this.sprite && this.sprite.anims) {
          this.sprite.anims.play("rotate", true);
          this.scene.time.delayedCall(Phaser.Math.Between(200, 260), () => {
            if (this.sprite) {
              // Verifica si el sprite aún existe
              let endY = this.y;
              this.scene.tweens.add({
                targets: this.sprite,
                y: endY,
                duration: 100,
                ease: "Power2",
                onComplete: () => {
                  if (this.sprite) {
                    this.scene.cameras.main.shake(200, 0.005);
                    this.sprite.anims.play("broken", true);
                    const collisionSword = this.scene.collisionSword;
                    collisionSword.play();
                  }
                },
              });
            }
          });
        }
      },
    });
  }

  // Método para actualizar o recrear el rectángulo en una nueva posición
  respawn() {
    if (this.sprite) {
      this.sprite.destroy(); // Destruye el sprite anterior
    }
    this.createAttackBar(); // Crea un nuevo sprite en una posición aleatoria
  }

  // Asegúrate de que el método getBounds en Attack devuelva un objeto válido
  getBounds() {
    if (this.sprite) {
      return this.sprite.getBounds();
    } else {
      console.warn("No hay sprite disponible para obtener bounds.");
      return { width: 0, height: 0, x: 0, y: 0 }; // Devuelve un objeto vacío en lugar de null
    }
  }

  destroy() {
    if (this.sprite) {
      console.log("Destruyendo sprite:", this.sprite);
      this.sprite.destroy();
      this.sprite = null; // Asegúrate de limpiar la referencia
    }
  }

  showMissMessage() {
    const missText = this.scene.add
      .text(this.sprite.x, this.sprite.y - 5, "MISS", {
        fontSize: "35px",
        color: "#fff",
        fontFamily: "'Press Start 2P'",
        fontWeight: "bold",
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      })
      .setOrigin(0.5)
      .setDepth(15);

    const missSound = this.scene.missSound;
    missSound.play();

    this.scene.tweens.add({
      targets: missText,
      scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
      alpha: { from: 1, to: 0 }, // Desaparecer el texto
      duration: 1500, // Duración de la animación (1 segundo)
      ease: "Power2",
      onComplete: () => {
        missText.destroy(); // Eliminar el texto después de la animación
      },
    });
  }
}
