import { Attack } from "../entitities/attack";
import { takeDamage } from "../functions/takeDamage";
export class SwordRain {
  constructor(scene) {
    this.scene = scene;

    this.swords = []; // Arreglo para las espadas activas
    this.maxSwords = 3; // Número máximo de espadas
    this.spawnInterval = 6000 / this.maxSwords; // Intervalo para 3 espadas en 6 segundos

    this.isShelded1 = false;
    this.isShelded2 = false;

    this.create();
  }

  create() {
    this.spaceKey = this.spaceKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.enterKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2
  }

  update() {
    const movingBar1Sprite = this.scene.movingBar1.bar; // Cambia a this.movingBar1.bar
    const movingBar2Sprite = this.scene.movingBar2.bar; // Cambia a this.movingBar2.bar

    // Itera sobre todas las espadas activas
    this.swords.forEach((sword) => {
      const swordBounds = sword.getBounds();

      // Si se presiona espacio, jugador 1 destruye un recolectable
      if (
        this.checkCollision(movingBar1Sprite.getBounds(), swordBounds) &&
        Phaser.Input.Keyboard.JustDown(this.spaceKey)
      ) {
        if (
          takeDamage(
            this,
            this.scene.player1Atributes,
            this.scene.player2Atributes,
            this.scene.player2EvadeChance,
            this.scene.player2HP,
            this.isShelded2,
            "SwordRain"
          )
        ) {
          this.scene.cameras.main.shake(200, 0.015);

          this.scene.player2.change_emotion("Luho", 1);
          this.scene.player1.change_emotion("Mimbo", 2);

          this.scene.sadLuho.play();
          let num = Phaser.Math.Between(1, 2);
          num === 1
            ? this.scene.happyMimbo1.play()
            : this.scene.happyMimbo2.play();

          if (this.scene.player2HP) {
            this.idleCharacters();
          }

          const takeDamageSound = this.scene.takeDamageSound;
          this.scene.television.handleOnomatopoeias("battleScene", "attack");
          takeDamageSound.play();
          const pickSword = this.scene.pickSword;
          pickSword.play();
          this.destroyAndRespawn(sword);
        } else {
          this.showMissMensaje(sword);
        }
        this.player2HP = Math.max(
          0,
          Math.floor(this.scene.player2Atributes.getHitPoints())
        );
        this.scene.player2HPText.setText(
          `${this.player2HP.toString().padStart(2, "0")}`
        );
        // // Actualizar la vida
        this.scene.createHealtBar2.updateHealthBar(this.player2HP);
      }

      // Si se presiona enter, jugador 2 destruye un recolectable
      if (
        this.checkCollision(movingBar2Sprite.getBounds(), swordBounds) &&
        Phaser.Input.Keyboard.JustDown(this.enterKey)
      ) {
        if (
          takeDamage(
            this,
            this.scene.player2Atributes,
            this.scene.player1Atributes,
            this.scene.player1EvadeChance,
            this.scene.player1HP,
            this.isShelded1,
            "SwordRain"
          )
        ) {
          this.scene.cameras.main.shake(200, 0.015);

          this.scene.player2.change_emotion("Luho", 2);
          this.scene.player1.change_emotion("Mimbo", 1);

          this.scene.happyLuho.play();
          this.scene.angryMimbo.play();

          if (this.scene.player1HP) {
            this.idleCharacters();
          }

          const takeDamageSound = this.scene.takeDamageSound;
          this.scene.television.handleOnomatopoeias("battleScene", "attack");
          takeDamageSound.play();
          const pickSword = this.scene.pickSword;
          pickSword.play();
          this.destroyAndRespawn(sword);
        } else {
          this.showMissMensaje(sword);
        }

        this.player1HP = Math.max(
          0,
          Math.floor(this.scene.player1Atributes.getHitPoints())
        );
        this.scene.player1HPText.setText(
          `${this.player1HP.toString().padStart(2, "0")}`
        );
        // // Actualizar la vida
        this.scene.createHealtBar1.updateHealthBar(this.player1HP);
      }
    });
  }

  // Crea una nueva espada usando la clase Attack
  addSword() {
    const sword = new Attack(this.scene);
    this.swords.push(sword);
  }

  // Generar espadas de forma continua cada 2 segundos (dentro de los 6 segundos)
  startSwordRain() {
    this.scene.time.addEvent({
      delay: this.spawnInterval, // Tiempo entre generación de espadas
      callback: () => {
        this.spawnSwordIfNeeded();
      },
      loop: true, // Repite indefinidamente
    });
  }

  // Método para verificar si hay menos de 3 espadas activas
  spawnSwordIfNeeded() {
    if (this.swords.length < this.maxSwords) {
      this.addSword();
    }
  }

  destroyAndRespawn(sword) {
    if (sword) {
      sword.destroy();
      console.log("Espada destruida:", sword);

      const index = this.swords.indexOf(sword);
      if (index > -1) {
        this.swords.splice(index, 1);
        console.log("Destruye");
      }

      this.scene.time.delayedCall(Phaser.Math.Between(3000, 4500), () => {
        console.log("Nuevas Generaciones ");
        this.spawnSwordIfNeeded();
      });
    }
  }

  // Método para verificar la colisión entre dos objetos
  checkCollision(barBounds, swordBounds) {
    if (!barBounds || !swordBounds) {
      return false; // Si no se pueden obtener los límites, no hay colisión
    }
    return Phaser.Geom.Intersects.RectangleToRectangle(barBounds, swordBounds);
  }

  showMissMensaje(sword) {
    if (sword) {
      sword.showMissMessage();
    } else {
      console.warn("No hay espada para mostrar el mensaje de fallo.");
    }
  }

  // Este método devuelve el rectángulo de todas las espadas activas
  getBounds() {
    console.log(
      "Caja de bounds   " + this.swords.map((sword) => sword.getBounds())
    );
    return this.swords.map((sword) => sword.getBounds()); // Devuelve un array de rectángulos
  }

  visualCritical() {
    this.scene.visualCritical();
  }

  idleCharacters() {
    this.scene.time.delayedCall(1200, () => {
      this.scene.player1.change_emotion("Mimbo", 0); // Mimbo: IDLE
      this.scene.player2.change_emotion("Luho", 0); // Luho: IDLE
    });
  }

  gameOver(player, event) {
    this.scene.gameOver(player, event);
  }
}
