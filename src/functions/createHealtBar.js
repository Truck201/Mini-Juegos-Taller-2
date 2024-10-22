export class initializeHealthBars {
  constructor(scene, positionX, positionY, health) {
    this.scene = scene;
    this.positionX = positionX;
    this.positionY = positionY;
    this.health = health;
    this.playerHealthBars = [];
    this.currentHeart = null;
    this.scene.heartbeatTimer = null; // Nuevo: Timer para heartBeat
    this.create();
  }

  startHeartbeat() {
    if (!this.heartbeatTimer) {
      console.log("Iniciando latidos del corazón");
      // Asegúrate de que `this.scene.time` se refiera a la escena correcta
      this.heartbeatTimer = this.scene.time.addEvent({
        delay: 1000, // Cada 1 segundo
        callback: () => {
          console.log("Reproduciendo sonido de latido del corazón");
          const heartBeatSound = this.scene.sound.get("heartBeats", { volume: 0.2}); // Asegúrate de tener el sonido cargado en BattleScene
          if (heartBeatSound) {
            heartBeatSound.play();
          } else {
            console.error("No se encontró el sonido 'heartBeats'");
          }
        },
        loop: true,
      });
    }
  }

  // Método para detener el sonido del latido del corazón
  stopHeartbeat() {
    if (this.heartbeatTimer) {
      this.heartbeatTimer.remove(false); // Elimina el evento del temporizador
      this.heartbeatTimer = null; // Resetea el temporizador
      console.log("Latidos del corazón detenidos");
    }
  }

  create() {
    this.animsHealthBar(this.scene);
    this.idleHeart(this.scene);
    // Añadir barras de vida del jugador
    this.playerHealthBars = [
      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 6 HP index 0    this.y * 0.55  this.x * 0.045
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 7 HP index 1
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 8 HP index 2
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 9 HP index 3
        .setVisible(false)
        .setScale(1)
        .setDepth(5)
        .setOrigin(0.5),

      this.scene.add
        .sprite(this.positionX, this.positionY, "healthBar5") // EXT 10 HP index 4
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

    this.currentHeart = this.scene.add
      .sprite(this.positionX, this.positionY - 160, "HeartLive")
      .setScale(1.12)
      .setDepth(6)
      .setOrigin(0.5);

    // Mostrar la animación Idle-Heart al inicio
    this.currentHeart.anims.play("Idle-Heart", true);

    this.updateHealthBar(this.health);
  }

  createHeart(playerHp) {
    if (playerHp <= 3) {
      this.currentHeart.setTexture("HeartDeath"); // Cambiar textura
      this.currentHeart.anims.play("Idle-HeartDeath", true); // Reproducir animación de muerte
    } else {
      // Si la vida es mayor a 3, mostrar la animación Idle-Heart normal
      this.currentHeart.setTexture("HeartLive"); // Cambiar textura
      this.currentHeart.anims.play("Idle-Heart", true); // Reproducir animación normal
    }
  }

  updateHealthBar(playerHp) {
    let healthBars = this.playerHealthBars;
    let currentHP = Math.floor(playerHp);

    if (!healthBars) {
      console.error("healthBars no está definido");
      return;
    }

    // Ocultar todas las barras inicialmente
    healthBars.forEach((bar) => bar.setVisible(false));
    if (currentHP >= 10) {
      let maxLife = 10;
      let HealthIndex = maxLife - 6; // Índice para healthAnims (6-10 se mapean a 0-4)
      let animKey = `healtAnims${HealthIndex + 1}`; // healthAnims1 para 6 HP, healthAnims2 para 7, etc.
      this.stopHeartbeat();
      // Mostrar y reproducir la animación correspondiente
      healthBars[HealthIndex].setVisible(true);
      healthBars[HealthIndex].play(animKey);
      console.log(`Reproduciendo animación: ${animKey}`);
      this.createHeart(currentHP);
    }
    // Mostrar la barra correspondiente a los HP restantes
    if (currentHP > 5 && currentHP < 10) {
      let extraHealthIndex = currentHP - 6; // Índice para healthAnims (6-9 se mapean a 0-4)
      let animKey = `healtAnims${extraHealthIndex + 1}`; // healthAnims1 para 6 HP, healthAnims2 para 7, etc.
      this.stopHeartbeat();
      // Mostrar y reproducir la animación correspondiente
      healthBars[extraHealthIndex].setVisible(true);
      healthBars[extraHealthIndex].play(animKey);

      console.log(`Reproduciendo animación: ${animKey}`);
      this.createHeart(currentHP);
    } else if (currentHP <= 5 && currentHP >= 0) {
      // Mostrar la barra correspondiente a los HP restantes
      const visibleBarIndex = healthBars.length - currentHP - 1;
      healthBars[visibleBarIndex].setVisible(true);
      this.startHeartbeat();
      // Detener cualquier animación que se esté reproduciendo
      healthBars[visibleBarIndex].stop();
      this.createHeart(currentHP);
    } else {
      return false;
    }
  }

  idleHeart(scene) {
    scene.anims.create({
      key: "Idle-Heart",
      frames: scene.anims.generateFrameNumbers("AnimsHeart", {
        start: 0,
        end: 1,
      }),
      frameRate: 3.5,
      repeat: -1, // La animación se repite indefinidamente
    });

    scene.anims.create({
      key: "Idle-HeartDeath",
      frames: scene.anims.generateFrameNumbers("AnimsHeartDeath", {
        start: 0,
        end: 1,
      }),
      frameRate: 4.5,
      repeat: -1, // La animación se repite indefinidamente
    });
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
