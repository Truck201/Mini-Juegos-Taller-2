export class AtributesPlayers {
  constructor(scene, playerId, onHealBar) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = [{ hitPoints: 20, speed: 5, evadeChance: 10 }];
    const initialAttributes2 = [{ hitPoints: 20, speed: 5, evadeChance: 10 }];

    let oneBar = true

    if (playerId === 1) {
      this.atributesData(initialAttributes1);
    }
    if (playerId === 2) {
      this.atributesData(initialAttributes2);
    }
  }

  create() {
    if (onHealBar && oneBar){
      this.createHealBar()
      oneBar = false
    }
  }

  createHealBar(){
        // Añadir barras de vida del jugador 1
        this.player1HealthBars = [
          this.scene.add.sprite(50, 50, "healthBarL1").setVisible(true),
          this.scene.add.sprite(50, 50, "healthBarL2").setVisible(false),
          this.scene.add.sprite(50, 50, "healthBarL3").setVisible(false),
          this.scene.add.sprite(50, 50, "healthBarL4").setVisible(false),
          this.scene.add.sprite(50, 50, "healthBarL5").setVisible(false),
          this.scene.add.sprite(50, 50, "healthBarLNo").setVisible(false),
        ];
    
        // Añadir barras de vida del jugador 2
        this.player2HealthBars = [
          this.scene.add.sprite(600, 50, "healthBarR1").setVisible(true),
          this.scene.add.sprite(600, 50, "healthBarR2").setVisible(false),
          this.scene.add.sprite(600, 50, "healthBarR3").setVisible(false),
          this.scene.add.sprite(600, 50, "healthBarR4").setVisible(false),
          this.scene.add.sprite(600, 50, "healthBarR5").setVisible(false),
          this.scene.add.sprite(50, 50, "healthBarRNo").setVisible(false),
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
  }

  // Método para aplicar daño
  takeDamage(playerId, evadeChance, damage) {
    // Implementa la lógica de evadeChance
    const evadeRoll = Phaser.Math.Between(0, 100);
    if (evadeRoll < evadeChance) {
      console.log("Attack evaded!");
      return; // El ataque no afecta
    }

    if (playerId === 1) {
      this.player1HP -= damage;
      this.updateHealthBar(1); // Actualiza la barra de vida del jugador 1
    } else {
      this.player2HP -= damage;
      this.updateHealthBar(2); // Actualiza la barra de vida del jugador 2
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

  updateHealthBar(playerId) {
    let healthBars, currentHP;

    if (playerId === 1) {
      healthBars = this.player1HealthBars;
      currentHP = this.player1HP;
    } else {
      healthBars = this.player2HealthBars;
      currentHP = this.player2HP;
    }

    // Actualizar la visibilidad de las barras de vida
    for (let i = 0; i < healthBars.length; i++) {
      healthBars[i].setVisible(i === 6 - currentHP);
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
