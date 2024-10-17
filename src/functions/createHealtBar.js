export class initializeHealthBars {
  constructor(scene, positionX, positionY, health) {
    this.scene = scene;
    this.positionX = positionX;
    this.positionY = positionY;
    this.health = health;
    this.playerHealthBars = [];
    this.create();
  }

  create() {
    this.animsHealthBar(this.scene);
    // Añadir barras de vida del jugador
    this.playerHealthBars = [
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 6 HP index 0    this.y * 0.55  this.x * 0.045
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 7 HP index 0
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 8 HP index 0
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 9 HP index 0
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 10 HP index 0
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // 5 lifes
        .setVisible(true)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar4") // 4 lifes
        .setVisible(false)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar3") // 3 lifes
        .setVisible(false)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar2") // 2 lifes
        .setVisible(false)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar1") // 1 lifes
        .setVisible(false)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
      this.scene.add
        .sprite(this.x * 0.035, this.positionY, "healthBarNo") // 0 lifes index 6
        .setVisible(false)
        .setScale(1)
        .setDepth(2)
        .setOrigin(0.5),
    ];

    this.updateHealthBar(this.health);
  }

  updateHealthBar(playerHp) {
    let healthBars = this.playerHealthBars;
    let currentHP = playerHp;

    if (!healthBars) {
      console.error("healthBars no está definido");
      return;
    }

    // Ocultar todas las barras inicialmente
    healthBars.forEach((bar) => bar.setVisible(false));

    // Mostrar la barra correspondiente a los HP restantes
    if (currentHP > 5 && currentHP <= 10) {
      let extraHealthIndex = currentHP - 6; // Índice para healthAnims (6-10 se mapean a 0-4)
      let animKey = `healtAnims${extraHealthIndex + 1}`; // healthAnims1 para 6 HP, healthAnims2 para 7, etc.

      // Mostrar y reproducir la animación correspondiente
      healthBars[extraHealthIndex].setVisible(true);
      healthBars[extraHealthIndex].play(animKey);

      console.log(`Reproduciendo animación: ${animKey}`);
    } else if (currentHP <= 5 && currentHP >= 0) {
      // Mostrar la barra correspondiente a los HP restantes
      const visibleBarIndex = healthBars.length - currentHP - 1;
      healthBars[visibleBarIndex].setVisible(true);

      // Detener cualquier animación que se esté reproduciendo

      healthBars[visibleBarIndex].stop();
    }

    // Verificar si el jugador ha perdido
    if (currentHP < 1) {
      scene.time.addEvent({
        delay: 200,
        callback: () => {
          scene.gameOver();
        },
        loop: false,
      });
    }
  }

  animsHealthBar(scene) {
    scene.anims.create({
      key: "healtAnims1",
      frames: scene.anims.generateFrameNumbers("healthBarExtra1", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    console.log("creando animación");

    scene.anims.create({
      key: "healtAnims2",
      frames: scene.anims.generateFrameNumbers("healthBarExtra2", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    console.log("creando animación 2");

    if (!scene.anims.exists("healtAnims3")) {
      scene.anims.create({
        key: "healtAnims3",
        frames: scene.anims.generateFrameNumbers("healthBarExtra3", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
      console.log("creando animación 3");
    }

    if (!scene.anims.exists("healtAnims4")) {
      scene.anims.create({
        key: "healtAnims4",
        frames: scene.anims.generateFrameNumbers("healthBarExtra4", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
      console.log("creando animación 4");
    }

    if (!scene.anims.exists("healtAnims5")) {
      scene.anims.create({
        key: "healtAnims5",
        frames: scene.anims.generateFrameNumbers("healthBarExtra5", {
          start: 0,
          end: 1,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }
    console.log("creando animación 5");
  }
}
