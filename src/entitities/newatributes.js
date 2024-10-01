export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = { hitPoints: 5, speed: 7, evadeChance: 0 };
    const initialAttributes2 = { hitPoints: 5, speed: 7, evadeChance: 0 };

    if (playerId === 1) {
      this.atributes1 = this.atributesData(initialAttributes1);
      console.log(this.atributes1)
    }
    if (playerId === 2) {
      this.atributes2 = this.atributesData(initialAttributes2);
      console.log(this.atributes2)
    }
  }

  create() {
    this.x = this.scene.scale.width;
    this.initializeHealthBars(this.playerId);
  }

  initializeHealthBars() {
    if (this.playerId === 1) {
      // Añadir barras de vida del jugador 1
      this.player1HealthBars = [
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarL1")
          .setVisible(true)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarL2")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarL3")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarL4")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarL5")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.21, 50, "healthBarLNo")
          .setVisible(false)
          .setDepth(2),
      ];
    }

    if (this.playerId === 2) {
      // Añadir barras de vida del jugador 2
      this.player2HealthBars = [
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarR1")
          .setVisible(true)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarR2")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarR3")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarR4")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarR5")
          .setVisible(false)
          .setDepth(2),
        this.scene.add
          .sprite(this.x * 0.792, 50, "healthBarRNo")
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
      return; // El ataque no afecta
    }

    if (playerId === 1) {
      this.updateHealthBar(1, playerHp); // Actualiza la barra de vida del jugador 1
      this.removeAttributes(1, { hitPoints: 1 });
      console.log("vida 1 " + playerHp);
    } else if (playerId === 2) {
      this.updateHealthBar(2, playerHp); // Actualiza la barra de vida del jugador 2
      this.removeAttributes(2, { hitPoints: 1 });
      console.log("vida 2 " + playerHp);
    }
  }

  aboutWriteAtributes(newAttributes) {
    if (this.playerId === 1) {
      this.atributes1.hitPoints = newAttributes.hitPoints || this.atributes1.hitPoints;
      this.atributes1.speed = newAttributes.speed || this.atributes1.speed;
      this.atributes1.evadeChance = newAttributes.evadeChance || this.atributes1.evadeChance;
    } else if (this.playerId === 2) {
      this.atributes2.hitPoints = newAttributes.hitPoints || this.atributes2.hitPoints;
      this.atributes2.speed = newAttributes.speed || this.atributes2.speed;
      this.atributes2.evadeChance = newAttributes.evadeChance || this.atributes2.evadeChance;
    }
  }


  updateAttributes(player, newAttributes) {
    if (player === 1) {
      if (newAttributes.speed) {
        this.atributes1.speed += newAttributes.speed;
        console.log("New Velocity" + newAttributes.speed);
        console.log(this.atributes1.speed + " lo Viejo speed");
      }
      if (newAttributes.evadeChance) {
        this.atributes1.evadeChance += newAttributes.evadeChance;
        console.log("New EvadeChance" + newAttributes.evadeChance);
        console.log(this.atributes1.evadeChance + " lo Viejo evade");
      }
      if (newAttributes.hitPoints) {
        this.atributes1.hitPoints += newAttributes.hitPoints;
        console.log("New hitPoints" + newAttributes.hitPoints);
        console.log(this.atributes1.hitPoints + " lo Viejo HP");
      }
    }
    if (player === 2) {
      if (newAttributes.speed) {
        this.atributes2.speed += newAttributes.speed;
        console.log("New Velocity" + newAttributes.speed);
        console.log(this.atributes2.speed + " lo Viejo speed");
      }
      if (newAttributes.evadeChance) {
        this.atributes2.evadeChance += newAttributes.evadeChance;
        console.log("New EvadeChance" + newAttributes.evadeChance);
        console.log(this.atributes2.evadeChance + " lo Viejo evade");
      }
      if (newAttributes.hitPoints) {
        this.atributes2.hitPoints += newAttributes.hitPoints;
        console.log("New hitPoints" + newAttributes.hitPoints);
        console.log(this.atributes2.hitPoints + " lo Viejo HP");
      }
    }
  }

  removeAttributes(player, newAttributes) {
    if (player === 1)  {
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
      console.log("vida 1 " + currentHP);
    } else if (playerId === 2) {
      healthBars = this.player2HealthBars;
      currentHP = playerHp;
      console.log("vida 2 " + currentHP);
    }

    // Asegúrate de que currentHP esté dentro del rango de las barras de vida
    if (currentHP >= 0 && currentHP < healthBars.length) {
      console.log("vida 2 " + healthBars.length);
      for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].setVisible(i === healthBars.length - currentHP );
      }
    }

    // Verificar si el jugador ha perdido
    if (currentHP <= 0) {
      this.gameOver(playerId);
    }
  }

  gameOver(loser) {
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.scene.restart("Preloader"); // Reinicia la escena
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
      console.log(" Estos son mis atributos.HitPoint " + this.atributes1.hitPoints);
      return this.atributes1.hitPoints;
    }
    if (player === 2) {
      console.log(" Estos son mis atributos.HitPoint " + this.atributes2.hitPoints);
      return this.atributes2.hitPoints;
    }
  }
}
