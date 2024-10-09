import { Attack } from "../entitities/attack";

export class MedievalEvent {
  constructor(scene) {
    this.scene = scene;
  }

  // Método para generar espada, escudo y corazón
  startMedievalEvent() {
    this.sword = new Attack(this.scene); // Genera la espada

    // Genera escudo y corazón
    this.scene.time.addEvent({
      delay: 1000,
      callback: () => {
        const itemType = Phaser.Math.Between(1, 2);
        const itemSprite = itemType === 1 ? "heart" : "shield";
        const item = this.scene.add
          .sprite(
            Phaser.Math.Between(120, this.scene.scale.width * 0.83),
            0,
            itemSprite
          )
          .setDepth(70);

        this.scene.physics.add.existing(item);
        item.body.setVelocityY(200);

        this.scene.physics.add.overlap(
          this.scene.movingBar1.bar,
          item,
          (bar, item) => {
            item.destroy();
            this.applyItemEffect(bar.player, itemSprite); // Aplica efecto del ítem
          }
        );
        this.scene.physics.add.overlap(
          this.scene.movingBar2.bar,
          item,
          (bar, item) => {
            item.destroy();
            this.applyItemEffect(bar.player, itemSprite);
          }
        );
      },
      repeat: 5, // Genera 5 elementos (escudos/corazones)
    });
  }

  applyItemEffect(player, itemSprite) {
    if (itemSprite === "heart") {
      player.hp += 5; // Corazón suma vida
    } else if (itemSprite === "shield") {
      player.shield += 1; // Escudo protege
    }
  }

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
