export class Character {
  constructor(scene, sprite, isPlayerOne, isInCoop) {
    this.scene = scene;
    this.sprite = sprite;
    this.isPlayerOne = isPlayerOne;
    this.isInCoop = isInCoop;

    if (this.isPlayerOne && !isInCoop) {
      this.x = this.scene.game.config.width * 0.1; // 0.0667;
      this.y = this.scene.scale.height * 0.15;
      this.scale = 1.2;
    } else if (!this.isPlayerOne && !isInCoop) {
      this.x = this.scene.game.config.width * 0.9; // 0.934;
      this.y = this.scene.scale.height * 0.15;
      this.scale = 1.2;
    } else if (this.isPlayerOne && isInCoop) {
      this.x = this.scene.game.config.width * 0.097;
      this.y = this.scene.scale.height * 0.863;
      this.scale = 1;
    } else if (!this.isPlayerOne && isInCoop) {
      this.x = this.scene.game.config.width * 0.903;
      this.y = this.scene.scale.height * 0.863;
      this.scale = 1;
    }

    this.characterSprite = this.scene.physics.add.sprite(
      this.x,
      this.y,
      this.sprite
    );

    this.characterSprite.setImmovable;
    this.characterSprite.body.allowGravity = false;
    this.characterSprite.setDepth(8);
    this.characterSprite.setScale(this.scale);

    this.initAnimations();

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
  change_emotion(player, num) {
    if (!this.characterSprite) {
      console.error("playerInstance es undefined");
      return;
    }

    if (num === 0) {
      this.characterSprite.anims.play(`Idle-${player}`, true); // idle
    }
    if (num === 1) {
      this.characterSprite.anims.play(`Dam-${player}`, true); // damage
    }
    if (num === 2) {
      this.characterSprite.anims.play(`Win-${player}`, true); // win
    }
    if (num === 3) {
      this.characterSprite.anims.play(`Def-${player}`, true); // defeat
    }
  }

  initAnimations() {
    if (!this.scene.anims.exists("Idle-Mimbo")) {
      this.scene.anims.create({
        key: "Idle-Mimbo",
        frames: this.scene.anims.generateFrameNumbers("Neutral-Mimbo", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Idle-Luho")) {
      this.scene.anims.create({
        key: "Idle-Luho",
        frames: this.scene.anims.generateFrameNumbers("Neutral-Luho", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Def-Mimbo")) {
      this.scene.anims.create({
        key: "Def-Mimbo",
        frames: this.scene.anims.generateFrameNumbers("Defeat-Mimbo", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Def-Luho")) {
      this.scene.anims.create({
        key: "Def-Luho",
        frames: this.scene.anims.generateFrameNumbers("Defeat-Luho", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Win-Mimbo")) {
      this.scene.anims.create({
        key: "Win-Mimbo",
        frames: this.scene.anims.generateFrameNumbers("Victory-Mimbo", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Win-Luho")) {
      this.scene.anims.create({
        key: "Win-Luho",
        frames: this.scene.anims.generateFrameNumbers("Victory-Luho", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Dam-Mimbo")) {
      this.scene.anims.create({
        key: "Dam-Mimbo",
        frames: this.scene.anims.generateFrameNumbers("Damage-Mimbo", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    if (!this.scene.anims.exists("Dam-Luho")) {
      this.scene.anims.create({
        key: "Dam-Luho",
        frames: this.scene.anims.generateFrameNumbers("Damage-Luho", {
          start: 0,
          end: 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }
  }
}
