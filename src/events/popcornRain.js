import { Attack } from "../entitities/attack";

export class PopcornRaining {
  constructor(scene) {
    this.scene = scene;
  }

  // Método para generar espadas
  spawnSword() {
    this.sword = new Attack(this.scene);
    this.scene.time.addEvent({
      delay: 3000, // Destruye la espada después de 2 segundos
      callback: () => {
        this.sword.destroy();
      },
      loop: false,
    });
  }

  // Lluvia de pororos
  startPopcornRain() {
    this.spawnSword(); // Genera una espada al inicio

    this.scene.time.addEvent({
      delay: 300,
      callback: () => {
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
        popcorn.body.setCollideWorldBounds(true); // Asegúrate de permitir colisiones con los bordes

        // Detectar colisiones con los bordes del mundo y destruir si colisiona
        if (popcorn.body && popcorn.body.world) {
          popcorn.body.world.on("worldbounds", (body) => {
            if (body.gameObject === popcorn) {
              popcorn.destroy();
            }
          });
        }

        // Colisiones con las barras de los jugadores
        this.scene.physics.add.overlap(
          this.scene.movingBar1.bar,
          popcorn,
          (bar, popcorn) => {
            popcorn.destroy();
            this.applyBonus(bar.player, popcornType); // Aplica el bonus correspondiente al jugador
          }
        );

        this.scene.physics.add.overlap(
          this.scene.movingBar2.bar,
          popcorn,
          (bar, popcorn) => {
            popcorn.destroy();
            this.applyBonus(bar.player, popcornType);
          }
        );
      },
      repeat: 15, // Número de pororos que caerán
    });
  }

  applyBonus(player, popcornType) {
    switch (popcornType) {
      case 1:
        player.hp += 1;
        break;
      case 2:
        player.damage += 1;
        break;
      case 3:
        player.crit += 5;
        break;
    }
  }

  // Este método es útil si deseas acceder a las propiedades del sprite
  getBounds() {
    if (this.sword) {
      return this.sword.getBounds();
    } else {
      console.warn("Sword no está inicializada.");
      return null; // o un objeto de bounds vacío
    }
  }

  destroy() {
    this.sword.destroy();
  }

  respawn() {
    this.sword.respawn();
  }
}
