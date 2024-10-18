export class Shielder {
  constructor(scene) {
    this.scene = scene;

    this.y = (this.scene.scale.height * 4.3) / 5;
    this.x = this.scene.scale.width / 2;

    //Animaciones
    this.createAnims();

    // Crear el rectángulo inicial
    this.createShield();
  }

  createAnims() {
    // Anims Idle Sword
    this.scene.anims.create({
      key: "idle-Shield",
      frames: this.scene.anims.generateFrameNumbers("idle-shield", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    // Anims Rotate
    this.scene.anims.create({
      key: "r-Shield",
      frames: this.scene.anims.generateFrameNumbers("r-shield", {
        start: 0,
        end: 4,
      }),
      frameRate: 9,
      repeat: 4,
    });
  }

  // Crear la attackBar en una posición aleatoria
  createShield() {
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

    this.sprite = this.scene.add.sprite(randomX, this.y - 900, "static-shield");
    this.sprite.setDepth(14).setScale(1.33);
    this.sprite.anims.play("idle-Shield", true);
    console.log("Sprite creado:", this.sprite);

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
        if (this.sprite && this.sprite.anims) {
          this.sprite.anims.play("r-Shield", true);
          this.scene.time.delayedCall(Phaser.Math.Between(300, 400), () => {
            if (this.sprite) {
              // Verifica si el sprite aún existe
              let endY = this.y;
              this.scene.tweens.add({
                targets: this.sprite,
                y: endY,
                duration: 300,
                ease: "Power2",
                onComplete: () => {
                  if (this.sprite) {
                    this.scene.cameras.main.shake(200, 0.005);
                    this.sprite.anims.play("idle-Shield", true);
                  }
                },
              });
            }
          });
        }
      },
    });
  }

  getBounds() {
    if (this.sprite) {
      return this.sprite.getBounds();
    } else {
      console.warn("No hay sprite disponible para obtener bounds.");
      return { width: 0, height: 0, x: 0, y: 0 }; // Devuelve un objeto vacío en lugar de null
    }
  }

  respawn(player) {
    if (this.sprite) {
      this.sprite.destroy(player); // Destruye el sprite anterior
      this.applyShield(player);

      this.createShield(); // Crea un nuevo sprite en una posición aleatoria
    }
  }

  destroy() {
    if (this.sprite) {
      console.log("Destruyendo sprite:", this.sprite);
      this.sprite.destroy();
      this.sprite = null; // Asegúrate de limpiar la referencia
    }
  }

  applyShield(player) {
    if (this.scene.attackBar && typeof this.scene.attackBar.isShelded === "function") {
      this.scene.attackBar.isShelded(player);
      console.log("isShelded go to function")
    }
  }
}
