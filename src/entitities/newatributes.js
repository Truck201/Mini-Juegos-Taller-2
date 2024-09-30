export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = { hitPoints: 5, speed: 7, evadeChance: 0 };
    const initialAttributes2 = { hitPoints: 5, speed: 7, evadeChance: 0 };

    if (playerId === 1) {
      this.atributesData(initialAttributes1);
    }
    if (playerId === 2) {
      this.atributesData(initialAttributes2);
    }
  }

  create() {
    this.x = this.scene.scale.width;
    this.initializeHealthBars();
  }

  initializeHealthBars() {
    // Añadir barras de vida del jugador 1
    this.player1HealthBars = [
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarL1")
        .setVisible(true)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarL2")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarL3")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarL4")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarL5")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.25, 50, "healthBarLNo")
        .setVisible(false)
        .setDepth(2),
    ];

    // Añadir barras de vida del jugador 2
    this.player2HealthBars = [
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarR1")
        .setVisible(true)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarR2")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarR3")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarR4")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarR5")
        .setVisible(false)
        .setDepth(2),
      this.scene.add
        .sprite(this.x * 0.85, 50, "healthBarRNo")
        .setVisible(false)
        .setDepth(2),
    ];
  }
  
  atributesData(initialAttributes) {
    // Asignar atributos con valores predeterminados si son indefinidos
    this.atributes = {
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
    this.currentHP = this.atributes.hitPoints; // Guarda el HP actual
  }

  // Método para aplicar daño
  takeDamage(playerId, evadeChance, damage, playerHp) {
    // Implementa la lógica de evadeChance
    const evadeRoll = Phaser.Math.Between(0, 100);
    if (evadeRoll < evadeChance) {
      console.log("Attack evaded!");
      return; // El ataque no afecta
    }

    if (playerId === 1) {
      playerHp -= damage;
      this.updateHealthBar(1, playerHp); // Actualiza la barra de vida del jugador 1
      console.log("vida 1 " + playerHp)
      
    } else if (playerId === 2) {
      playerHp -= damage;
      this.updateHealthBar(2, playerHp); // Actualiza la barra de vida del jugador 2
      console.log("vida 2 " + playerHp)
      return 
    }
  }

  updateAttributes(newAttributes) {
    if (newAttributes.speed) {
      this.atributes.speed += newAttributes.speed;
      console.log("New Velocity" + newAttributes.speed);
    }
    if (newAttributes.evadeChance) {
      this.atributes.evadeChance += newAttributes.evadeChance;
      console.log("New EvadeChance" + newAttributes.evadeChance);
    }
    if (newAttributes.hitPoints) {
      this.atributes.hitPoints += newAttributes.hitPoints;
      console.log("New hitPoints" + newAttributes.hitPoints);
      if (this.healthText) {
        this.healthText.setText(`HP: ${this.atributes.hitPoints}`); // Actualiza el texto de HP
      }
    }
  }

  removeAttributes(newAttributes) {
    if (newAttributes.speed) {
      this.atributes.speed -= newAttributes.speed;
    }
    if (newAttributes.evadeChance) {
      this.atributes.evadeChance -= newAttributes.evadeChance;
    }
    if (newAttributes.hitPoints) {
      this.atributes.hitPoints -= newAttributes.hitPoints;
      if (this.healthText) {
        this.healthText.setText(`HP: ${this.atributes.hitPoints}`); // Actualiza el texto de HP
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

    // Asegúrate de que currentHP esté dentro del rango de las barras de vida
    if (currentHP >= 0 && currentHP < healthBars.length) {
      for (let i = 0; i < healthBars.length; i++) {
        healthBars[i].setVisible(i === healthBars.length - currentHP - 1);
      }
    }
    // Verificar si el jugador ha perdido
    if (currentHP <= 0) {
      this.gameOver(playerId);
    }
  }

  gameOver(loser) {
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.restart(); // Reinicia la escena
  }

  getAttributes() {
    return this.attributes;
  }
}
