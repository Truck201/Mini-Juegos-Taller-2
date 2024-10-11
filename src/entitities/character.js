export class Character {
  constructor(scene, sprite, isPlayerOne) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayerOne = isPlayerOne;
    this.y = this.scene.scale.height * 0.15;

    if (this.isPlayerOne) {
      this.x = this.scene.game.config.width * 0.0667;
    } else {
      this.x = this.scene.game.config.width * 0.934;
    }

    let character = this.scene.physics.add.sprite(this.x, this.y, this.sprite);

    character.setImmovable;
    character.body.allowGravity = false;
    character.setDepth(2);
    character.setScale(1.5);

    this.initAnimations()

    // Name
    this.scene.add
      .text(this.x, this.y + 70, this.sprite.toUpperCase(), {
        fontSize: "95px",
        fontFamily: "Press Start 2P",
        color: "#fff",
        stroke: "black",
        strokeThickness: 7,
        maxLines: 6,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 5,
          offsetY: 5,
        },
      })
      .setDepth(3)
      .setOrigin(0.5);
  }

  // Añadir Estados, linkear a la función de Collectar pochoclos
  change_emotion(player, num, playerInstance) {
    if (!playerInstance) {
      console.error('playerInstance es undefined');
      return;
    }

    console.log(playerInstance)
    // Agregar las emociones como animaciones. Luego en colección de Battle, hacer una play otra stop
    if (num === 0) {
      playerInstance.anims.play(`Idle-${player}`, true);
    }
    if (num === 1) {
      playerInstance.anims.play(`Dam-${player}`, true);
    }
    if (num === 2) {
      playerInstance.anims.play(`Win-${player}`, true);
    }
    if (num === 3) {
      playerInstance.anims.play(`Def-${player}`, true);
    }

    this.scene.time.delayedCall(Phaser.Math.Between(900), () => {
      playerInstance.anims.play(`Idle-${player}`, true);
    });
  }

  initAnimations() {
    this.scene.anims.create({
      key: "Idle-Mimbo",
      frames: this.scene.anims.generateFrameNumbers("Neutral-Mimbo", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Idle-Luho",
      frames: this.scene.anims.generateFrameNumbers("Neutral-Luho", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Def-Mimbo",
      frames: this.scene.anims.generateFrameNumbers("Defeat-Mimbo", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Def-Luho",
      frames: this.scene.anims.generateFrameNumbers("Defeat-Luho", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Win-Mimbo",
      frames: this.scene.anims.generateFrameNumbers("Victory-Mimbo", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Win-Luho",
      frames: this.scene.anims.generateFrameNumbers("Victory-Luho", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Dam-Mimbo",
      frames: this.scene.anims.generateFrameNumbers("Damage-Mimbo", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "Dam-Luho",
      frames: this.scene.anims.generateFrameNumbers("Damage-Luho", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1,
    });
  }
}
