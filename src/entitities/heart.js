import { AtributesPlayers } from "./newatributes";
export class Heart {
  constructor(scene) {
    this.scene = scene;
    this.y = (this.scene.scale.height * 4.3) / 5;
    this.x = this.scene.scale.width / 2;

    this.createAnims();
    this.createHeart();

    // Crear Atributos de Cada Jugador
    this.player1Atributes = new AtributesPlayers(this, 1);
    this.player2Atributes = new AtributesPlayers(this, 2);
  }

  createAnims() {
    this.scene.anims.create({
      key: "idle-Heart",
      frames: this.scene.anims.generateFrameNumbers("idle-heart", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "flying-heart",
      frames: this.scene.anims.generateFrameNumbers("flying-heart", {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });
  }

  createHeart() {
    const imagenBar = this.scene.imagenBar;
    const imagenBarBounds = imagenBar.getBounds();

    const randomX = Phaser.Math.Between(
      imagenBarBounds.left + 25,
      imagenBarBounds.right - 25
    );

    this.sprite = this.scene.add.sprite(randomX, this.y - 900, "static-heart");
    this.sprite.setDepth(14).setScale(1.33);
    this.sprite.anims.play("flying-heart", true);

    let endY = this.y * 0.4;

    this.scene.tweens.add({
      targets: this.sprite,
      y: endY,
      duration: 400,
      ease: "Power2",
      onComplete: () => {
        if (this.sprite && this.sprite.anims) {
          this.sprite.anims.play("flying-heart", true);
          if (this.sprite) {
            // Verifica si el sprite aún existe
            let endY = this.y;
            this.scene.tweens.add({
              targets: this.sprite,
              y: endY,
              duration: 300,
              ease: "Power2",
              onComplete: () => {
                if (this.sprite) {
                  this.scene.cameras.main.shake(200, 0.005);
                  this.sprite.anims.play("idle-Heart", true);
                }
              },
            });
          }
        }
      },
    });
  }

  getBounds() {
    return this.sprite ? this.sprite.getBounds() : { width: 0, height: 0 };
  }

  respawn(player) {
    this.destroy(player);
    this.createHeart();
  }
  
  destroy(player) {
    console.log("va o no va? ")
    if (this.sprite) {
      console.log("aquí estoy? ")
      this.sprite.destroy();
      this.sprite = null;

      this.applyBonus(player)
    }
  }

  applyBonus(player) {
    if (player === 1) {
      console.log("wachear 1 ----- >");
      this.player1Atributes.updateAttributes(player, { hitPoints: 1 });
    }
    if (player === 2) {
      console.log("wachear 2 --> ");
      this.player2Atributes.updateAttributes(player, { hitPoints: 1 });
    }
  }
}
