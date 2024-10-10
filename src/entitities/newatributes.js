export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = {
      hitPoints: 5,
      speed: 10,
      evadeChance: 0,
      damage: 1,
      critical: 0,
      anchor: 1.2,
    };
    const initialAttributes2 = {
      hitPoints: 5,
      speed: 10,
      evadeChance: 0,
      damage: 1,
      critical: 0,
      anchor: 1.2,
    };

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
          .sprite(this.x * 0.2198, this.y * 0.0725, "healthBarL1F") // EXT 6 HP index 0
          .setVisible(false)
          .setScale(1.155)
          .setDepth(5),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarL1") // 5 lifes
          .setVisible(true)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarL2") // 4 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarL3") // 3 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarL4") // 2 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarL5") // 1 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.225, this.y * 0.0775, "healthBarLNo") // 0 lifes index 6
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
      ];
    }

    if (this.playerId === 2) {
      // Añadir barras de vida del jugador 2
      this.player2HealthBars = [
        this.scene.add
          .sprite(this.x * 0.78, this.y * 0.0725, "healthBarRF") // add 6 HP index 0
          .setVisible(false)
          .setScale(1.155)
          .setDepth(5),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarR1") // 5 lifes
          .setVisible(true)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarR2") // 4 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarR3") // 3 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarR4") // 2 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarR5") // 1 lifes
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.778, this.y * 0.0775, "healthBarRNo") // 0 lifes index 6
          .setVisible(false)
          .setScale(1.27)
          .setDepth(2),
      ];
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

  // Método para aplicar daño
  takeDamage(playerId, evadeChance, playerHp, isShelded) {
    if (isShelded) {
      console.log("Damage prevented: Player is immune.");
      // Aquí podrías mostrar un mensaje en pantalla de "Immune"
      this.scene.add
        .text(playerId === 1 ? 100 : 500, 150, "Immune!", {
          fontSize: "32px",
          color: "#FFFFFF",
        })
        .setScrollFactor(0)
        .setDepth(20)
        .setAlpha(1)
        .fadeOut(500);
      return false;
    }

    // Implementa la lógica de evadeChance
    const evadeRoll = Phaser.Math.Between(0, 100);
    if (evadeRoll < evadeChance) {
      console.log("Attack evaded!");
      return false;
    }

    if (playerId === 1) {
      let damage = this.getDamage(1);
      let critical = this.getCritical(1);
      if (critical > 0) {
        const criticalChance = Phaser.Math.Between(0, 100);
        if (criticalChance < critical) {
          console.log("CRITICAL");
          damage + damage;
          this.criticalVisual();
        }
      }
      this.removeAttributes(1, { hitPoints: damage });
      playerHp = this.getHitPoints(1);
      this.updateHealthBar(1, playerHp);
      return true;
    } else if (playerId === 2) {
      let damage = this.getDamage(2);
      let critical = this.getCritical(2);
      if (critical > 0) {
        const criticalChance = Phaser.Math.Between(0, 100);
        if (criticalChance < critical) {
          console.log("CRITICAL");
          damage + damage;
          this.criticalVisual();
        }
      }
      this.removeAttributes(2, { hitPoints: damage });
      playerHp = this.getHitPoints(2);
      this.updateHealthBar(2, playerHp);
      return true;
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
      damage:
        initialAttributes.damage !== undefined ? initialAttributes.damage : 1,
      critical:
        initialAttributes.critical !== undefined
          ? initialAttributes.critical
          : 0,
      anchor:
        initialAttributes.anchor !== undefined ? initialAttributes.anchor : 12,
    };
  }

  aboutWriteAtributes(newAttributes) {
    if (this.playerId === 1) {
      this.atributes1.hitPoints =
        newAttributes.hitPoints || this.atributes1.hitPoints;
      this.atributes1.speed = newAttributes.speed || this.atributes1.speed;
      this.atributes1.evadeChance =
        newAttributes.evadeChance || this.atributes1.evadeChance;
      this.atributes1.damage = newAttributes.damage || this.atributes1.damage;
      this.atributes1.critical =
        newAttributes.critical || this.atributes1.critical;
      this.atributes1.anchor = newAttributes.anchor || this.atributes1.anchor;
    } else if (this.playerId === 2) {
      this.atributes2.hitPoints =
        newAttributes.hitPoints || this.atributes2.hitPoints;
      this.atributes2.speed = newAttributes.speed || this.atributes2.speed;
      this.atributes2.evadeChance =
        newAttributes.evadeChance || this.atributes2.evadeChance;
      this.atributes2.damage = newAttributes.damage || this.atributes2.damage;
      this.atributes2.critical =
        newAttributes.critical || this.atributes2.critical;
      this.atributes2.anchor = newAttributes.anchor || this.atributes2.anchor;
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
      if (newAttributes.damage) {
        this.atributes1.damage += newAttributes.damage;
      }
      if (newAttributes.critical) {
        this.atributes1.critical += newAttributes.critical;
      }
      if (newAttributes.anchor) {
        this.atributes1.anchor += newAttributes.anchor;
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
      if (newAttributes.damage) {
        this.atributes2.damage += newAttributes.damage;
      }
      if (newAttributes.critical) {
        this.atributes2.critical += newAttributes.critical;
      }
      if (newAttributes.anchor) {
        this.atributes2.anchor += newAttributes.anchor;
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
      if (newAttributes.damage) {
        this.atributes1.damage -= newAttributes.damage;
      }
      if (newAttributes.critical) {
        this.atributes1.critical -= newAttributes.critical;
      }
      if (newAttributes.anchor) {
        this.atributes1.anchor -= newAttributes.anchor;
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
      if (newAttributes.damage) {
        this.atributes2.damage -= newAttributes.damage;
      }
      if (newAttributes.critical) {
        this.atributes2.critical -= newAttributes.critical;
      }
      if (newAttributes.anchor) {
        this.atributes2.anchor -= newAttributes.anchor;
      }
    }
  }

  criticalVisual() {
    const { width, height } = this.scene.game.scale;
    const criticalText = this.scene.add
      .text(width * 0.5, height * 0.5, "¡¡CRITIAL!!", {
        fontSize: "32px",
        color: "#fff",
        fontFamily: "'Press Start 2P'",
        fontWeight: "bold",
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      })
      .setOrigin(0.5)
      .setDepth(15);

    this.scene.tweens.add({
      targets: criticalText,
      scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
      alpha: { from: 1, to: 0 }, // Desaparecer el texto
      duration: 1500, // Duración de la animación (1 segundo)
      ease: "Power2",
      onComplete: () => {
        criticalText.destroy(); // Eliminar el texto después de la animación
      },
    });
  }

  getAnchor(player) {
    if (player === 1) {
      return this.atributes1.anchor;
    }
    if (player === 2) {
      return this.atributes2.anchor;
    }
  }

  getCritical(player) {
    if (player === 1) {
      return this.atributes1.critical;
    }
    if (player === 2) {
      return this.atributes2.critical;
    }
  }

  getDamage(player) {
    if (player === 1) {
      return this.atributes1.damage;
    }
    if (player === 2) {
      return this.atributes2.damage;
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

  getSpeed(player) {
    if (player === 1) {
      return this.atributes1.speed;
    }
    if (player === 2) {
      return this.atributes2.speed;
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

  gameOver(loser) {
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.scene.launch("GameOver", { player: loser }); // Game Over Scene
    this.scene.scene.pause("battleScene");
    this.scene.scene.bringToTop("GameOver");
  }
}
