import { Attack } from "../entitities/attack";
import { Heart } from "../entitities/heart";
import { Shielder } from "../entitities/shield";
import { takeDamage } from "../functions/takeDamage";
export class MedievalEvent {
  constructor(scene) {
    this.scene = scene;
    this.swords = [];

    this.isShelded1 = false;
    this.isShelded2 = false;

    this.enfriamiento = 2600;

    this.height = this.scene.game.scale.height;
    this.width = this.scene.game.scale.width;

    this.create();
  }

  create() {
    // Thunderbolt importar
    this.thunderboltLeft = this.scene.add
      .sprite(this.width * 0.09, this.height * 0.15, "thunderbolt")
      .setScale(1.2)
      .setDepth(10)
      .setVisible(false);

    this.thunderboltRight = this.scene.add
      .sprite(this.width * 0.93, this.height * 0.15, "thunderbolt")
      .setScale(1.2)
      .setDepth(10)
      .setVisible(false);

    this.spaceKey = this.spaceKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.enterKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2
  }

  // Método para generar espada, escudo y corazón
  startMedievalEvent() {
    const sword = new Attack(this.scene);
    this.swords.push(sword);

    this.shield = new Shielder(this.scene); // Genera Escudos
    this.heart = new Heart(this.scene);
  }

  addNewSword(numSwords = 1) {
    for (let i = 0; i < numSwords; i++) {
      const sword = new Attack(this.scene);
      this.swords.push(sword);
    }
  }

  update() {
    const movingBar1Sprite = this.scene.movingBar1.bar; // Cambia a this.movingBar1.bar
    const movingBar2Sprite = this.scene.movingBar2.bar; // Cambia a this.movingBar2.bar

    if (
      this.checkCollision(
        movingBar1Sprite.getBounds(),
        this.shield.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.spaceKey)
    ) {
      const isShelded = this.scene.isShelded;
      isShelded.play();
      this.scene.television.handleOnomatopoeias("battleScene", "shield");
      this.shield.respawn(this.scene, this.scene.player1Atributes);
      console.log("respawn shield pj 1");
    }
    if (
      this.checkCollision(
        movingBar1Sprite.getBounds(),
        this.heart.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.spaceKey)
    ) {
      const pickHeart = this.scene.pickHeart;
      pickHeart.play();

      console.log("ATRIBUTOS 1 -- > " + this.scene.player1Atributes);
      this.heart.respawn(this.scene, this.scene.player1Atributes);
      console.log("respawn heart pj 1");

      // // Actualizar la vida
      this.scene.player1HP = Math.max(
        0,
        Math.floor(this.scene.player1Atributes.getHitPoints())
      );
      this.scene.player1HPText.setText(
        `${this.scene.player1HP.toString().padStart(2, "0")}`
      );
      // // Actualizar la vida
      this.scene.createHealtBar1.updateHealthBar(this.scene.player1HP);
    }

    if (
      this.checkCollision(
        movingBar2Sprite.getBounds(),
        this.shield.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey)
    ) {
      const isShelded = this.scene.isShelded;
      isShelded.play();
      this.scene.television.handleOnomatopoeias("battleScene", "shield");
      this.shield.respawn(this.scene, this.scene.player2Atributes);

      console.log("respawn shield pj 2");
    }

    if (
      this.checkCollision(
        movingBar2Sprite.getBounds(),
        this.heart.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey)
    ) {
      const pickHeart = this.scene.pickHeart;
      pickHeart.play();

      this.heart.respawn(this.scene, this.scene.player2Atributes);

      // // Actualizar la vida
      this.scene.player2HP = Math.max(
        0,
        Math.floor(this.scene.player2Atributes.getHitPoints())
      );
      this.scene.player2HPText.setText(
        `${this.scene.player2HP.toString().padStart(2, "0")}`
      );
      // // Actualizar la vida
      this.scene.createHealtBar2.updateHealthBar(this.scene.player2HP);
    }

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
            "Medieval"
          )
        ) {
          this.scene.cameras.main.shake(200, 0.025);

          this.scene.player2.change_emotion("Luho", 1); // daño
          this.scene.player1.change_emotion("Mimbo", 2); // win

          this.thunderboltRight.setVisible(true)
          this.thunderboltRight.anims.play("Thunderbolt-Light");
          this.thunderboltRight.on("animationcomplete", () => {
            this.thunderboltRight.setVisible(false); // Cambiar a la imagen estática
          });

          this.scene.sadLuho.play();
          let num = Phaser.Math.Between(1, 2);
          num === 1
            ? this.scene.happyMimbo1.play()
            : this.scene.happyMimbo2.play();

          if (this.scene.player2HP > 0) {
            this.idleCharacters();
          }

          this.destroyAndRespawn(sword);
          this.scene.television.handleOnomatopoeias("battleScene", "attack");
          const takeDamageSound = this.scene.takeDamageSound;
          takeDamageSound.play();
          const pickSword = this.scene.pickSword;
          pickSword.play();
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
            "Medieval"
          )
        ) {
          this.scene.cameras.main.shake(200, 0.025);
          this.scene.player2.change_emotion("Luho", 2); // Win
          this.scene.player1.change_emotion("Mimbo", 1); // daño

          this.thunderboltLeft.setVisible(true);
          this.thunderboltLeft.anims.play("Thunderbolt-Light");
          this.thunderboltLeft.on("animationcomplete", () => {
            this.thunderboltLeft.setVisible(false); // Cambiar a la imagen estática
          });

          this.scene.happyLuho.play();
          this.scene.angryMimbo.play();

          if (this.scene.player1HP > 0) {
            this.idleCharacters();
          }

          this.destroyAndRespawn(sword);
          this.scene.television.handleOnomatopoeias("battleScene", "attack");
          const takeDamageSound = this.scene.takeDamageSound;
          takeDamageSound.play();
          const pickSword = this.scene.pickSword;
          pickSword.play();
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

  // Método para manejar la destrucción y reaparición de la attackBar
  destroyAndRespawn(sword) {
    if (typeof this.destroy === "function") {
      this.destroy(sword); // Destruir la attackBar

      this.scene.time.delayedCall(Phaser.Math.Between(1500, 3500), () => {
        if (typeof this.respawn === "function") {
          let num = Phaser.Math.Between(0, 1);
          num === 1 ? this.addNewSword(1) : this.addNewSword(1);
        } else if (typeof this.spawnSwordIfNeeded === "function") {
          this.scene.attackBar.spawnSwordIfNeeded();
        }
      });
    }
  }

  getBounds() {
    if (sword) {
      return sword.getBounds();
    } else {
      console.warn("Sword no está inicializada.");
      return null; // o un objeto de bounds vacío
    }
  }

  // Método para verificar la colisión entre dos objetos
  checkCollision(barBounds, element) {
    if (!barBounds || !element) {
      return false; // Si no se pueden obtener los límites, no hay colisión
    }
    return Phaser.Geom.Intersects.RectangleToRectangle(barBounds, element);
  }

  showMissMensaje(sword) {
    if (sword) {
      sword.showMissMessage();
    } else {
      console.warn("No hay espada para mostrar el mensaje de fallo.");
    }
  }

  destroy(sword) {
    sword.destroy();

    // Eliminar la espada del array de espadas activas
    const index = this.swords.indexOf(sword);
    if (index > -1) {
      this.swords.splice(index, 1);
      console.log("Destruye");
    }
  }

  isShelded(player) {
    console.log("PLAYER ES -- >" + player);
    if (player === this.scene.player1Atributes) {
      this.isShelded1 = true;
      console.log("Player 1 is now shielded!");
      const inmune = this.scene.inmune;
      inmune.play();
      // Mostrar mensaje de "Immune"
      const textInmune1 = this.scene.add
        .text(this.width * 0.2, this.height * 0.6, "Inmune!", {
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

      this.scene.tweens.add({
        targets: textInmune1,
        scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
        alpha: { from: 1, to: 0.08 }, // Desaparecer el texto
        duration: this.enfriamiento, // Duración de la animación (1 segundo)
        ease: "Power2",
        onComplete: () => {
          textInmune1.destroy(); // Eliminar el texto después de la animación
          this.isShelded1 = false;
          console.log("Player 1 is no longer shielded!");
        },
      });
    }

    if (player === this.scene.player2Atributes) {
      this.isShelded2 = true;
      console.log("Player 2 is now shielded!");
      const inmune = this.scene.inmune;
      inmune.play();
      // Mostrar mensaje de "Immune"
      const textInmune2 = this.scene.add
        .text(this.width * 0.8, this.height * 0.6, "Inmune!", {
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
        .setDepth(18);

      this.scene.tweens.add({
        targets: textInmune2,
        scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
        alpha: { from: 1, to: 0.08 }, // Desaparecer el texto
        duration: this.enfriamiento, // Duración de la animación (1 segundo)
        ease: "Power2",
        onComplete: () => {
          textInmune2.destroy(); // Eliminar el texto después de la animación
          this.isShelded2 = false;
          console.log("Player 2 is no longer shielded!");
        },
      });
    }
  }

  respawn(sword) {
    this.addNewSword(1);
  }

  getBoundsShield() {
    return this.shield.getBounds();
  }

  destroyShield() {
    this.shield.destroy();
  }

  respawnShield() {
    this.shield.respawn();
  }

  visualCritical() {
    this.scene.visualCritical();
  }

  idleCharacters() {
    this.scene.time.delayedCall(1200, () => {
      this.scene.player1.change_emotion("Mimbo", 0, this.scene.player1); // Mimbo: IDLE
      this.scene.player2.change_emotion("Luho", 0, this.scene.player2); // Luho: IDLE
    });
  }

  gameOver(player, event) {
    this.scene.gameOver(player, event);
  }
}
