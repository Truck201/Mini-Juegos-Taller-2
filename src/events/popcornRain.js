import { initAnimationsPopcorn } from "../anims/RainPopcorn";
import { Attack } from "../entitities/attack";
import { takeDamage } from "../functions/takeDamage";
export class PopcornRaining {
  constructor(scene) {
    this.scene = scene;
    this.swords = [];

    this.isShelded1 = false;
    this.isShelded2 = false;

    this.create();
  }

  create() {
    initAnimationsPopcorn(this.scene)
    this.spaceKey = this.spaceKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.enterKey = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2

    // Evento para generar lluvia de pochoclos cada 15 segundos (15000 ms)
    this.scene.time.addEvent({
      delay: 10000, // 10 segundos entre cada lluvia de pochoclos
      callback: () => {
        // Genera 12 pochoclos cada vez que se ejecuta este evento
        for (let i = 0; i < 12; i++) {
          this.scene.time.delayedCall(i * 500, () => {
            // Añade un pequeño delay entre cada pochoclo si lo deseas (0.5s entre pochoclos)
            this.generarPochoclos();
          });
        }
      },
      repeat: -1, // Repite indefinidamente
    });
  }

  addNewSword(numSwords = 1) {
    for (let i = 0; i < numSwords; i++) {
      const sword = new Attack(this.scene);
      this.swords.push(sword);
    }
  }

  generarPochoclos() {
    const popcornType = Phaser.Math.Between(1, 3);
    const popcorn = this.scene.add
      .sprite(
        Phaser.Math.Between(
          this.scene.scale.width * 0.14,
          this.scene.scale.width * 0.86
        ),
        0,
        `popcorn${popcornType}`
      )
      .setDepth(70);

    popcorn.play(`PopcornAnim${popcornType}`);

    // Añadir físicas al popcorn
    this.scene.physics.add.existing(popcorn);
    popcorn.body.setCollideWorldBounds(false); // Asegúrate de permitir colisiones con los bordes
    popcorn.body.setVelocityY(Phaser.Math.Between(100, 300)); // Velocidad hacia abajo
    popcorn.body.setGravityY(300); // Gravedad hacia abajo

    const barBounds1 = this.scene.movingBar1.bar;
    const barBounds2 = this.scene.movingBar2.bar;
    const popcornBounds = popcorn;

    // Detectar colisiones con los bordes del mundo y destruir si colisiona
    popcorn.body.world.on("worldbounds", (body) => {
      if (body.gameObject === popcorn) {
        popcorn.destroy();
      }
    });

    this.scene.physics.add.overlap(
      barBounds1, // Barra del jugador 1
      popcornBounds, // Pochoclo
      (bar, popcorn) => {
        popcorn.destroy(); // Destruye el pochoclo cuando lo recoge el jugador
        console.log("POCHOCLOOOO !! ");
        this.applyBonus(1, this.scene.player1Atributes, popcornType); // Aplica el beneficio correspondiente
      },
      null,
      this
    );

    this.scene.physics.add.overlap(
      barBounds2, // Barra del jugador 2
      popcornBounds,
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
    this.addNewSword(2); // Genera una espada al inicio
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
          takeDamage(
            this,
            this.scene.player1Atributes,
            this.scene.player2Atributes,
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
        // // Actualizar la vida
        this.scene.createHealtBar2.updateHealthBar(this.scene.player2HP);
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
        // // Actualizar la vida
        this.scene.createHealtBar1.updateHealthBar(this.scene.player1HP);
      }
    });
  }

  // 1-(HP), 2-(DMG), 3-(SPEED)
  applyBonus(playerId, atributos, popcornType) {
    switch (popcornType) {
      case 1:
        if (playerId === 1) {
          atributos.updateAttributes({ hitPoints: 0.3 });
          this.player1HP = this.scene.player1Atributes.getHitPoints();
          if (Math.floor(this.player1HP) > this.scene.player1HP) {
            this.scene.player1HP = Math.floor(this.player1HP);
            this.scene.player1HPText.setText(
              `${this.scene.player1HP.toString().padStart(2, "0")}`
            );
            this.scene.createHealtBar1.updateHealthBar(this.scene.player1HP);
          }
        }
        if (playerId === 2) {
          atributos.updateAttributes({ hitPoints: 0.3 });
          this.player2HP = this.scene.player2Atributes.getHitPoints();
          if (Math.floor(this.player2HP) > this.scene.player2HP) {
            this.scene.player2HP = Math.floor(this.player2HP);
            this.scene.player2HPText.setText(
              `${this.scene.player2HP.toString().padStart(2, "0")}`
            );
            this.scene.createHealtBar2.updateHealthBar(this.scene.player2HP);
          }
        }
        break;

      case 2:
        if (playerId === 1) {
          atributos.updateAttributes({ damage: 0.3 });
          this.damageP1 = this.scene.player1Atributes.getDamage();
          if (Math.floor(this.damageP1) > this.scene.player1Damage) {
            this.scene.player1Damage = Math.floor(this.damageP1);
            this.scene.damageText1.setText(
              `${this.scene.player1Damage.toString().padStart(2, "0")}`
            );
          }
        }
        if (playerId === 2) {
          atributos.updateAttributes({ damage: 0.3 });
          this.damageP2 = this.scene.player2Atributes.getDamage();
          if (Math.floor(this.damageP2) > this.scene.player2Damage) {
            this.scene.player2Damage = Math.floor(this.damageP2);
            this.scene.damageText2.setText(
              `${this.scene.player2Damage.toString().padStart(2, "0")}`
            );
          }
        }
        break;

      case 3:
        if (playerId === 1) {
          atributos.updateAttributes({ speed: 1 });
          this.speedP1 = this.scene.player1Atributes.getSpeed();
          if (Math.floor(this.speedP1) > this.scene.player1Speed) {
            this.scene.player1Speed = Math.floor(this.speedP1);
            this.scene.speedText1.setText(
              `${this.scene.player1Speed.toString().padStart(2, "0")}`
            );
          }
        }
        if (playerId === 2) {
          atributos.updateAttributes({ speed: 1 });
          this.speedP2 = this.scene.player2Atributes.getSpeed();
          if (Math.floor(this.speedP2) > this.scene.player1Speed) {
            this.scene.player2Speed = Math.floor(this.speedP2);
            this.scene.speedText2.setText(
              `${this.scene.player2Speed.toString().padStart(2, "0")}`
            );
          }
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
    this.addNewSword(1);
  }
}
