export class ComboPersonajes {
  constructor(scene, player) {
    this.scene = scene;
    this.player = player;
  }

  init(data) {
    comboCount1 = 0; // Contador de combo para el jugador 1
    comboCount2 = 0; // Contador de combo para el jugador 2
    comboTimer1; // Temporizador de combo para el jugador 1
    comboTimer2; // Temporizador de combo para el jugador 2
    comboDuration = 3000; // Duración del combo (3 segundos)
  }

  create() {
    // Añadimos sonidos
    this.looseCombo = this.scene.sound.add("looseCombo", { volume: 0.09 });
    this.winCombo = this.scene.sound.add("winCombo", { volume: 0.09 });
    this.sadLuho = this.scene.sound.add("sadLuhoSound", { volume: 0.09 });

    // Texto de los combos
    this.comboText1 = this.scene.add
      .text(
        this.scene.scale.width * 0.035,
        this.scene.scale.height * 0.5,
        "1",
        {
          fontSize: "78px",
          fontFamily: "'Press Start 2P', sans-serif",
          color: "#fff",
          stroke: "black",
          strokeThickness: 6,
          maxLines: 4,
          shadow: {
            color: "#000000",
            fill: true,
            offsetX: 4,
            offsetY: 4,
          },
        }
      )
      .setDepth(7)
      .setVisible(false);

    this.comboText2 = this.scene.add
      .text(
        this.scene.scale.width * 0.867,
        this.scene.scale.height * 0.5,
        "1",
        {
          fontSize: "78px",
          fontFamily: "'Press Start 2P', sans-serif",
          color: "#fff",
          stroke: "black",
          strokeThickness: 6,
          maxLines: 4,
          shadow: {
            color: "#000000",
            fill: true,
            offsetX: 4,
            offsetY: 4,
          },
        }
      )
      .setDepth(7)
      .setVisible(false);

    this.scene.comboDuration = 3000;
    this.resetCombo();
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
    console.log("No visible Combo");
  }

  handleCombo(player) {
    if (player === 1) {
      // Reinicia o crea el temporizador del combo para el jugador 1
      if (this.scene.comboTimer1) {
        this.scene.time.removeEvent(this.scene.comboTimer1);
      }

      this.scene.comboCount1++;

      // Verificar si ha llegado a 10 recolectados dentro del combo
      if (this.scene.comboCount1 >= 5) {
        this.scene.points1 += 2; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(1, this.scene.points1);
        this.comboText1.setText(`${this.scene.comboCount1}x`).setVisible(true);
        console.log("MOSTRAR COMBOS P1", this.scene.comboCount1);
      }
      if (this.scene.comboCount1 === 10) {
        this.scene.points1 += 5; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(1, this.scene.points1);
        this.scene.comboCount1 = 0; // Reiniciar el contador de combo

        // Animación del jugador 1 (victoria) y del enemigo (enojo)
        this.scene.player1.change_emotion("Mimbo", 2, this.scene.player1); // Mimbo: animación de victoria
        this.scene.player2.change_emotion("Luho", 3, this.scene.player2); // Luho: animación de daño
        this.sadLuho.play();
        
        this.winCombo.play();
        this.scene.time.delayedCall(1200, () => {
          this.comboText1.setVisible(false); // Ocultar el marcador
          this.looseCombo.play();
          
          console.log("va??")
          this.scene.player1.change_emotion("Mimbo", 0, this.scene.player1); // Mimbo: IDLE
          this.scene.player2.change_emotion("Luho", 0, this.scene.player2); // Luho: IDLE
        });
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

      if (this.scene.comboCount2 >= 5) {
        this.scene.points2 += 2; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(2, this.scene.points2);
        this.comboText2.setText(`${this.scene.comboCount2}x`).setVisible(true);
        console.log("MOSTRAR COMBOS P2", this.scene.comboCount2);
      }
      if (this.scene.comboCount2 === 10) {
        this.scene.points2 += 5; // Añadir puntos extra por el combo
        this.scene.scene.get("Hud").update_points(2, this.scene.points2);
        this.scene.comboCount2 = 0; // Reiniciar el contador de combo

        // Animación del jugador 1 (victoria) y del enemigo (enojo)
        this.scene.player1.change_emotion("Mimbo", 3, this.scene.player1); // Mimbo: animación de victoria
        this.scene.player2.change_emotion("Luho", 2, this.scene.player2); // Luho: animación de daño

        this.winCombo.play();
        this.scene.time.delayedCall(1200, () => {
          this.comboText2.setVisible(false); // Ocultar el marcador
          this.looseCombo.play();

          console.log("va??  -->>")
          this.scene.player1.change_emotion("Mimbo", 0, this.scene.player1); // Mimbo: IDLE
          this.scene.player2.change_emotion("Luho", 0, this.scene.player2); // Luho: IDLE
        });
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