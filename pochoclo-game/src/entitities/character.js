export class Character {
  constructor(scene, sprite, isPlayerOne, condicion) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayerOne = isPlayerOne;
    this.condicion = condicion;

    this.y = this.scene.scale.height / 7.5;

    if (this.isPlayerOne) {
      this.x = this.scene.game.config.width / 15;
    } else {
      this.x = this.scene.game.config.width / 1.07;
    }

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

    if (this.condicion) {
      if (isPlayerOne) {
        this.statsBar = this.scene.add.rectangle(this.x + 180, this.y - 50, 200, 60, 0xbbbbbb); // left
      } else {
        this.statsBar = this.scene.add.rectangle(this.x - 180, this.y - 50, 200, 60, 0xbbbbbb); // right
      }
    } else if (!this.condicion){
      this.comboText1 = this.scene.add.text(this.scene.scale.width *0.13, this.y +160, '', {
        fontSize: "70px",
        color: "#fff1e8",
      }).setDepth(3).setVisible(false);

      this.comboText2 = this.scene.add.text(this.scene.scale.width *0.8, this.y +160, '', {
        fontSize: "70px",
        color: "#fff1e8",
      }).setDepth(3).setVisible(false);

      this.scene.comboDuration = 3000
      this.resetCombo();
    }
  }

  // Añadir Estados, linkear a la función de Collectar pochoclos
  change_emotion() {
    // Agregar las emociones como animaciones. Luego en colección de Battle, hacer una play otra stop
  }

  resetCombo() {
    this.scene.comboCount1 = 0;
    this.scene.comboCount2 = 0;

    if (this.scene.comboTimer1) {
      this.scene.time.removeEvent(this.scene.comboTimer1);
    }
    if (this.scene.comboTimer2) {
      this.scene.time.removeEvent(this.scene.comboTimer2);
    }

    this.comboText1.setVisible(false);
    this.comboText2.setVisible(false);
  }

  handleCombo(player) {
    if (player === 1) {
      // Reinicia o crea el temporizador del combo para el jugador 1
      if (this.scene.comboTimer1) {
        this.scene.time.removeEvent(this.scene.comboTimer1);
      }

      this.scene.comboCount1++;

      // Verificar si ha llegado a 10 recolectados dentro del combo
      if (this.scene.comboCount1 >= 5 ) {
        this.scene.points1 += 2; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(1, this.scene.points1);
        this.comboText1.setText(`${this.scene.comboCount1}x`).setVisible(true);
      }
      if (this.scene.comboCount1 === 10) {
        this.scene.points1 += 5; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(1, this.scene.points1);
        this.scene.comboCount1 = 0; // Reiniciar el contador de combo
        this.scene.time.delayedCall(
          1200,
          () => {
            this.comboText1.setVisible(false); // Ocultar el marcador
          }
        );
      }

      // Iniciar o reiniciar el temporizador para resetear el combo si pasan más de 3 segundos sin recolectar
      this.scene.comboTimer1 = this.scene.time.delayedCall(
        this.scene.comboDuration,
        () => {
          this.scene.comboCount1 = 0;
          this.comboText1.setVisible(false); // Ocultar el marcador
        }
      );

    } else if (player === 2) {
      // Mismo proceso para el jugador 2
      if (this.scene.comboTimer2) {
        this.scene.time.removeEvent(this.scene.comboTimer2);
      }

      this.scene.comboCount2++;

      if (this.scene.comboCount2 >= 5 ) {
        this.scene.points2 += 2; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(2, this.scene.points2);
        this.comboText2.setText(`${this.scene.comboCount2}x`).setVisible(true);
      }
      if (this.scene.comboCount2 === 10) {
        this.scene.points2 += 5; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(2, this.scene.points2);
        this.scene.comboCount2 = 0; // Reiniciar el contador de combo
        this.scene.time.delayedCall(
          1200,
          () => {
            this.comboText2.setVisible(false); // Ocultar el marcador
          }
        );
      }

      this.scene.comboTimer2 = this.scene.time.delayedCall(
        this.scene.comboDuration,
        () => {
          this.scene.comboCount2 = 0;
          this.comboText2.setVisible(false); // Ocultar el marcador
        }
      );
    }
  }
}
