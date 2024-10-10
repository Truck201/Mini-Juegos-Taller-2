import { Attack } from "../entitities/attack";

export class PopcornRaining {
  constructor(scene) {
    this.scene = scene;
    this.swords = [];

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

    this.createPochoclosAires();
  }

  // Método para generar espadas
  spawnSword(numSwords = 1) {
    for (let i = 0; i < numSwords; i++) {
      const sword = new Attack(this.scene);
      this.swords.push(sword);
    }
  }

  createPochoclosAires() {
    const popcornType = Phaser.Math.Between(1, 3);
    const popcorn = this.scene.add
      .sprite(
        Phaser.Math.Between(120, this.scene.scale.width * 0.83),
        0,
        `popcorn${popcornType}`
      )
      .setDepth(70);

    // Añadir físicas al popcorn
    this.scene.physics.add.existing(popcorn);
    popcorn.body.setCollideWorldBounds(false); // Asegúrate de permitir colisiones con los bordes

    // Detectar colisiones con los bordes del mundo y destruir si colisiona
    popcorn.body.world.on("worldbounds", (body) => {
      if (body.gameObject === popcorn) {
        popcorn.destroy();
      }
    });

    this.scene.physics.add.overlap(
      this.scene.movingBar1.bar, // Barra del jugador 1
      popcorn, // Pochoclo
      (bar, popcorn) => {
        popcorn.destroy(); // Destruye el pochoclo cuando lo recoge el jugador
        console.log("POCHOCLOOOO !! ");
        this.applyBonus(1, this.scene.player1Atributes, popcornType); // Aplica el beneficio correspondiente
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      this.scene.movingBar2.bar, // Barra del jugador 2
      popcorn,
      (bar, popcorn) => {
        popcorn.destroy();
        console.log("POCHOCLOOOO !! ");
        this.applyBonus(2, this.scene.player2Atributes, popcornType); // Aplica el beneficio correspondiente
      },
      null,
      this
    );
  }

  // Lluvia de pororos
  startPopcornRain() {
    this.spawnSword(2); // Genera una espada al inicio

    this.scene.time.addEvent({
      delay: 300,
      callback: () => {
        // Detectar colisiones entre los pochoclos y las espadas
        this.swords.forEach((sword) => {
          this.scene.physics.add.overlap(
            sword.sprite,
            popcorn,
            (sword, popcorn) => {
              popcorn.destroy(); // Destruye el popcorn al colisionar con una espada
              this.destroyAndRespawn(sword); // Destruir y respawnear la espada
            }
          );
        });
      },
      repeat: 15, // Número de pororos que caerán
    });
  }

  update() {
    const movingBar1Sprite = this.scene.movingBar1.bar; // Cambia a this.movingBar1.bar
    const movingBar2Sprite = this.scene.movingBar2.bar; // Cambia a this.movingBar2.bar

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

  applyBonus(playerId, atributos, popcornType) {
    switch (popcornType) {
      case 1:
        if (playerId === 1) {
          atributos.updateAttributes(1, { hitPoints: 1 });
        }
        if (playerId === 2) {
          atributos.updateAttributes(2, { hitPoints: 1 });
        }
        break;

      case 2:
        if (playerId === 1) {
          atributos.updateAttributes(1, { damage: 1 });
        }
        if (playerId === 2) {
          atributos.updateAttributes(2, { damage: 1 });
        }
        break;

      case 3:
        if (playerId === 1) {
          atributos.updateAttributes(1, { speed: 0.3 });
        }
        if (playerId === 2) {
          atributos.updateAttributes(2, { speed: 0.3 });
        }
        break;
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

  // Este método es útil si deseas acceder a las propiedades del sprite
  getBounds() {
    if (sword) {
      return sword.getBounds();
    } else {
      console.warn("Sword no está inicializada.");
      return null; // o un objeto de bounds vacío
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

  // Método para manejar la destrucción y reaparición de la attackBar
  destroyAndRespawn(sword) {
    if (typeof this.destroy === "function") {
      this.destroy(sword); // Destruir la attackBar
      this.scene.time.delayedCall(Phaser.Math.Between(3000, 4500), () => {
        if (typeof this.respawn === "function") {
          this.respawn(); // Llamar al respawn de la attackBar
        }
      });
    }
  }

  respawn() {
    this.spawnSword(1);
  }
}
