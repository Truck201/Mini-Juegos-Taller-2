import { Attack } from "../entitities/attack";
import { Heart } from "../entitities/heart";
import { Shielder } from "../entitities/shield";

export class MedievalEvent {
  constructor(scene) {
    this.scene = scene;
    this.swords = [];
    this.sword;

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
      this.shield.respawn(this.player1);
      console.log("respawn shield pj 1");
    }
    if (
      this.checkCollision(
        movingBar1Sprite.getBounds(),
        this.heart.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.spaceKey)
    ) {
      this.heart.respawn(this.player1);
      console.log("respawn heart pj 1");
    }

    if (
      this.checkCollision(
        movingBar2Sprite.getBounds(),
        this.shield.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey)
    ) {
      this.shield.respawn(this.player2);
      console.log("respawn shield pj 2");
    }

    if (
      this.checkCollision(
        movingBar2Sprite.getBounds(),
        this.heart.getBounds()
      ) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey)
    ) {
      this.heart.respawn(this.player2);
      console.log("respawn heart pj 2");
    }

    this.swords.forEach((sword) => {
      const swordBounds = sword.getBounds();
      // Si se presiona espacio, jugador 1 destruye un recolectable
      if (
        this.checkCollision(movingBar1Sprite.getBounds(), swordBounds) &&
        Phaser.Input.Keyboard.JustDown(this.spaceKey)
      ) {
        if (
          this.scene.player2Atributes.takeDamage(
            2,
            this.scene.player2EvadeChance,
            this.scene.player2HP,
            this.isShelded2
          )
        ) {
          this.scene.cameras.main.shake(200, 0.025);
          this.destroyAndRespawn(sword);
        } else {
          this.showMissMensaje(sword);
        }

        this.scene.player2HP = this.scene.player2Atributes.getHitPoints(2);
        this.scene.player2HPText.setText(
          `${this.scene.player2HP.toString().padStart(2, "0")}`
        );
      }

      // Si se presiona enter, jugador 2 destruye un recolectable
      if (
        this.checkCollision(movingBar2Sprite.getBounds(), swordBounds) &&
        Phaser.Input.Keyboard.JustDown(this.enterKey)
      ) {
        if (
          this.scene.player1Atributes.takeDamage(
            1,
            this.scene.player1EvadeChance,
            this.scene.player1HP,
            this.isShelded1
          )
        ) {
          this.scene.cameras.main.shake(200, 0.025);
          this.destroyAndRespawn(sword);
        } else {
          this.showMissMensaje(sword);
        }

        this.scene.player1HP = this.scene.player1Atributes.getHitPoints(1);
        this.scene.player1HPText.setText(
          `${this.scene.player1HP.toString().padStart(2, "0")}`
        );
      }
    });
  }

  // Método para manejar la destrucción y reaparición de la attackBar
  destroyAndRespawn(sword) {
    if (typeof this.destroy === "function") {
      this.destroy(sword); // Destruir la attackBar

      this.scene.time.delayedCall(Phaser.Math.Between(3000, 4500), () => {
        if (typeof this.respawn === "function") {
          this.respawn(sword); // Llamar al respawn de la attackBar
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
}
