export class Character {
  constructor(scene, sprite, isPlayeyOne, condicion) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayeyOne = isPlayeyOne;
    this.condicion = condicion;

    this.y = this.scene.scale.height / 7.5;

    if (this.isPlayeyOne) {
      this.x = this.scene.game.config.width / 17;
    } else {
      this.x = this.scene.game.config.width / 1.067;
    }

    if (!this.condicion) {
      // Animations Sprites
      this.scene.anims.create({
        key: "idle",
        frames: this.scene.anims.generateFrameNumbers("pochoclo-anims", {
          start: 0,
          end: 7,
        }),
        frameRate: 10,
      });

      let character = this.scene.physics.add.sprite(
        this.x,
        this.y,
        this.sprite
      );

      character.setImmovable;
      character.body.allowGravity = false;

      this.scene.add.text(this.x - 35, this.y + 70, this.sprite.toUpperCase(), {
        fontSize: "16px",
        fontFamily: "Arial Black, Gadget, sans-serif",
        fill: "#ff004d", // ROJO
        fontWeight: "bold",
        padding: { x: 6, y: 3 },
        backgroundColor: "#ffffff",
        border: "60px solid #000000",
      });
    }
  }

  // Añadir Estados, linkear a la función de Collectar pochoclos
  change_emotion() {
    // Agregar las emociones como animaciones. Luego en colección de Battle, hacer una play otra stop
  }

  handleCombo(player) {
    if (player === 1) {
      // Reinicia o crea el temporizador del combo para el jugador 1
      if (this.scene.comboTimer1) {
        this.scene.time.removeEvent(this.scene.comboTimer1);
      }

      this.scene.comboCount1++;

      // Verificar si ha llegado a 10 recolectados dentro del combo
      if (this.scene.comboCount1 >= 10) {
        this.scene.points1 += 10; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(1, this.scene.points1);
        this.scene.comboCount1 = 0; // Reiniciar el contador de combo
      }

      // Iniciar o reiniciar el temporizador para resetear el combo si pasan más de 3 segundos sin recolectar
      this.scene.comboTimer1 = this.scene.time.delayedCall(
        this.scene.comboDuration,
        () => {
          this.scene.comboCount1 = 0;
        }
      );
    } else if (player === 2) {
      // Mismo proceso para el jugador 2
      if (this.scene.comboTimer2) {
        this.scene.time.removeEvent(this.scene.comboTimer2);
      }

      this.scene.comboCount2++;

      if (this.scene.comboCount2 >= 6) {
        this.scene.points2 += 5; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(2, this.scene.points2);
        this.scene.comboCount2 = 0; // Reiniciar el contador de combo
      }

      this.scene.comboTimer2 = this.scene.time.delayedCall(
        this.scene.comboDuration,
        () => {
          this.scene.comboCount2 = 0;
        }
      );
    }
  }
}
