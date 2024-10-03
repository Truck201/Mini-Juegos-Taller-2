export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = { hitPoints: 5, speed: 7, evadeChance: 0 };
    const initialAttributes2 = { hitPoints: 5, speed: 7, evadeChance: 0 };

    if (playerId === 1) {
      this.atributes1 = this.atributesData(initialAttributes1);
    }
    if (playerId === 2) {
      this.atributes2 = this.atributesData(initialAttributes2);
    }
  }

  create() {
    this.x = this.scene.scale.width;
    this.y = this.scene.game.scale.height;
    this.initializeHealthBars(this.playerId);
    this.animsHealthBar();
  }

  animsHealthBar() {
    this.scene.anims.create({
      key: "HealthLeft",
      frames: this.scene.anims.generateFrameNumbers("healthBarLeftAnims", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "HealthRight",
      frames: this.scene.anims.generateFrameNumbers("healthBarRightAnims", {
        start: 0,
        end: 6,
      }),
      frameRate: 10,
      repeat: -1, // La animación se repite indefinidamente
    });
  }

  initializeHealthBars() {
    if (this.playerId === 1) {
      // Añadir barras de vida del jugador 1
      this.player1HealthBars = [
        this.scene.add
          .sprite(this.x * 0.2179, this.y * 0.076, "healthBarL1F") // EXT 6 HP index 0
          .setVisible(false)
          .setScale(0.92)
          .setDepth(5),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarL1") // 5 lifes
          .setVisible(true)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarL2") // 4 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarL3") // 3 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarL4") // 2 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarL5") // 1 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, this.y * 0.08, "healthBarLNo") // 0 lifes index 6 
          .setVisible(false)
          .setDepth(2),
      ];
    }

    if (this.playerId === 2) {
      // Añadir barras de vida del jugador 2
      this.player2HealthBars = [
        this.scene.add
          .sprite(this.x * 0.784, this.y * 0.076, "healthBarRF") // add 6 HP index 0
          .setVisible(false)
          .setScale(0.92)
          .setDepth(5),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarR1") // 5 lifes
          .setVisible(true)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarR2") // 4 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarR3") // 3 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarR4") // 2 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarR5") // 1 lifes
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, this.y * 0.08, "healthBarRNo") // 0 lifes index 6
          .setVisible(false)
          .setDepth(2),
      ];
    }
  }

  atributesData(initialAttributes) {
    // Asignar atributos con valores predeterminados si son indefinidos
    return {
      hitPoints:
        initialAttributes.hitPoints !== undefined
          ? initialAttributes.hitPoints
          : 10, // Inicia en 10 HP
      speed:
        initialAttributes.speed !== undefined ? initialAttributes.speed : 10,
      evadeChance:
        initialAttributes.evadeChance !== undefined
          ? initialAttributes.evadeChance
          : 10,
    };
  }

  // Método para aplicar daño
  takeDamage(playerId, evadeChance, playerHp) {
    // Implementa la lógica de evadeChance
    const evadeRoll = Phaser.Math.Between(0, 100);
    if (evadeRoll < evadeChance) {
      console.log("Attack evaded!");
      return false;
    }
  
    if (playerId === 1) {
      this.removeAttributes(1, { hitPoints: 1 });
      playerHp = this.getHitPoints(1);  
      this.updateHealthBar(1, playerHp); 
      return true;
    } else if (playerId === 2) {
      this.removeAttributes(2, { hitPoints: 1 });
      playerHp = this.getHitPoints(2); 
      this.updateHealthBar(2, playerHp);
      return true;
    }
  }

  aboutWriteAtributes(newAttributes) {
    if (this.playerId === 1) {
      this.atributes1.hitPoints =
        newAttributes.hitPoints || this.atributes1.hitPoints;
      this.atributes1.speed = newAttributes.speed || this.atributes1.speed;
      this.atributes1.evadeChance =
        newAttributes.evadeChance || this.atributes1.evadeChance;
    } else if (this.playerId === 2) {
      this.atributes2.hitPoints =
        newAttributes.hitPoints || this.atributes2.hitPoints;
      this.atributes2.speed = newAttributes.speed || this.atributes2.speed;
      this.atributes2.evadeChance =
        newAttributes.evadeChance || this.atributes2.evadeChance;
    }
  }

  updateAttributes(player, newAttributes) {
    if (player === 1) {
      if (newAttributes.speed) {
        this.atributes1.speed += newAttributes.speed;
      }
      if (newAttributes.evadeChance) {
        this.atributes1.evadeChance += newAttributes.evadeChance;
      }
      if (newAttributes.hitPoints) {
        this.atributes1.hitPoints += newAttributes.hitPoints;
      }
    }
    if (player === 2) {
      if (newAttributes.speed) {
        this.atributes2.speed += newAttributes.speed;
      }
      if (newAttributes.evadeChance) {
        this.atributes2.evadeChance += newAttributes.evadeChance;
      }
      if (newAttributes.hitPoints) {
        this.atributes2.hitPoints += newAttributes.hitPoints;
      }
    }
  }

  removeAttributes(player, newAttributes) {
    if (player === 1) {
      if (newAttributes.speed) {
        this.atributes1.speed -= newAttributes.speed;
      }
      if (newAttributes.evadeChance) {
        this.atributes1.evadeChance -= newAttributes.evadeChance;
      }
      if (newAttributes.hitPoints) {
        this.atributes1.hitPoints -= newAttributes.hitPoints;
      }
    }
    if (player === 2) {
      if (newAttributes.speed) {
        this.atributes2.speed -= newAttributes.speed;
      }
      if (newAttributes.evadeChance) {
        this.atributes2.evadeChance -= newAttributes.evadeChance;
      }
      if (newAttributes.hitPoints) {
        this.atributes2.hitPoints -= newAttributes.hitPoints;
      }
    }
  }

  updateHealthBar(playerId, playerHp) {
    let healthBars, currentHP;
  
    if (playerId === 1) {
      healthBars = this.player1HealthBars;
      currentHP = playerHp;
    } else if (playerId === 2) {
      healthBars = this.player2HealthBars;
      currentHP = playerHp;
    }
  
    // Ocultar todas las barras inicialmente
    healthBars.forEach((bar) => bar.setVisible(false));
    // Mostrar la barra correspondiente a los HP restantes
    if (currentHP > 5) {
      healthBars[0].setVisible(true); // Mostrar el sprite que contiene la animación
      if (playerId === 1) {
        healthBars[0].play("HealthLeft");
      } else if (playerId === 2) {
        healthBars[0].play("HealthRight");
      }
    } else if (currentHP <= 5 && currentHP >= 0) {
      // Mostrar la barra correspondiente a los HP restantes
      const visibleBarIndex = healthBars.length - currentHP - 1;
      healthBars[visibleBarIndex].setVisible(true);
      
      // Detener cualquier animación que se esté reproduciendo
      if (playerId === 1) {
        healthBars[0].stop("HealthLeft");
      } else if (playerId === 2) {
        healthBars[0].stop("HealthRight");
      }
    }
  
    // Verificar si el jugador ha perdido
    if (currentHP < 1) {
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          this.gameOver(playerId);
        },
        loop: false,
      });
    }
  }

  gameOver(loser) {
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.scene.launch("GameOver", { player: loser }); // Game Over Scene
    this.scene.scene.pause("battleScene");
    this.scene.scene.bringToTop("GameOver");
  }

  getSpeed(player) {
    if (player === 1) {
      return this.atributes1.speed;
    }
    if (player === 2) {
      return this.atributes2.speed;
    }
  }

  getEvadeChance(player) {
    if (player === 1) {
      return this.atributes1.evadeChance;
    }
    if (player === 2) {
      return this.atributes2.evadeChance;
    }
  }

  getHitPoints(player) {
    if (player === 1) {
      return this.atributes1.hitPoints;
    }
    if (player === 2) {
      return this.atributes2.hitPoints;
    }
  }
}
