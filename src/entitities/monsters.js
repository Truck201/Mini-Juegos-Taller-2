export class MonsterShop {
  constructor(scene) {
    this.scene = scene;
    this.addAnimsMonsters();
    this.create();
  }

  create() {
    const { width, height } = this.scene.game.scale;

    this.polilla = this.scene.add
      .sprite(width * 0.743, height * 0.1889, "polilla")
      .setDepth(4);
    this.scene.physics.add.existing(this.polilla);
    this.polilla.setImmovable;
    this.polilla.body.allowGravity = false;
    this.polilla.play("polilla_idle", true);

    this.toby = this.scene.add
      .sprite(width * 0.774, height * 0.4365, "toby")
      .setDepth(4);
    this.scene.physics.add.existing(this.toby);
    this.toby.setImmovable;
    this.toby.body.allowGravity = false;
    this.toby.play("toby_idle", true);

    this.mothman = this.scene.add
      .sprite(width * 0.391, height * 0.295, "mothman")
      .setDepth(4);
    this.scene.physics.add.existing(this.mothman);
    this.mothman.setImmovable;
    this.mothman.body.allowGravity = false;
    this.mothman.play("mothman_idle", true);

    this.monster = this.scene.add
      .sprite(width * 0.5786, height * 0.599, "alcantarilla")
      .setDepth(4);
    this.scene.physics.add.existing(this.monster);
    this.monster.setImmovable;
    this.monster.body.allowGravity = false;
    this.monster.play("alcantarilla_idle", true);

    this.groupOfFlies()

    this.addCircularMovements(this.polilla, width * 0.735, height * 0.19, 13, 860)
  }

  addAnimsMonsters() {
    this.scene.anims.create({
      key: "mothman_idle",
      frames: this.scene.anims.generateFrameNumbers("mothman", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "polilla_idle",
      frames: this.scene.anims.generateFrameNumbers("polilla", {
        start: 0,
        end: 1,
      }),
      frameRate: 9,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "toby_idle",
      frames: this.scene.anims.generateFrameNumbers("toby", {
        start: 0,
        end: 1,
      }),
      frameRate: 3,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "alcantarilla_idle",
      frames: this.scene.anims.generateFrameNumbers("alcantarilla", {
        start: 0,
        end: 1,
      }),
      frameRate: 0.64,
      repeat: -1, // La animación se repite indefinidamente
    });
  }

  groupOfFlies() {
    this.polillas = this.scene.physics.add.group();
    for (let i = 0; i < 2; i++) {
      const offsetX = Phaser.Math.Between(-40, 40);
      const offsetY = Phaser.Math.Between(-40, 40);
      const polilla = this.polillas.create(
        this.polilla.x + offsetX,
        this.polilla.y + offsetY,
        "polilla"
      );
      polilla.setDepth(4);
      polilla.setImmovable(true);
      polilla.body.allowGravity = false;
      polilla.play("polilla_idle", true);

      let timeCircle = Phaser.Math.Between(600, 800);
      let randomRadius = Phaser.Math.Between(16, 23);

      this.addCircularMovements(polilla, polilla.x, polilla.y, randomRadius, timeCircle);
    }
  }

  addCircularMovements(sprite, centerX, centerY, radius, duration) {
    this.scene.tweens.addCounter({
        from:0,
        to: 2* Math.PI,
        duration: duration,
        repeat: -1,
        onUpdate: (tween) => {
            const angle = tween.getValue();
            sprite.x = centerX + radius * Math.cos(angle);
            sprite.y = centerY + radius * Math.sin(angle);
        }
    })
  }
}
