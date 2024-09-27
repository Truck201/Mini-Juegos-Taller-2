export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    const initialAttributes1 = [{ hitPoints: 20, speed: 5, evadeChance: 10 }];
    const initialAttributes2 = [{ hitPoints: 20, speed: 5, evadeChance: 10 }];

    if (playerId === 1) {
      this.atributesData(initialAttributes1);
    }
    if (playerId === 2) {
      this.atributesData(initialAttributes2);
    }
  }

  create() {
    this.createHealBar();
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
  takeDamage(damage) {
    // Implementa la lógica de evadeChance
    const evadeRoll = Phaser.Math.Between(0, 100);
    if (evadeRoll < this.atributes.evadeChance) {
      console.log("Attack evaded!");
      return; // El ataque no afecta
    }
    this.atributes.hitPoints -= damage;

    if (this.healthText) {
      this.healthText.setText(`HP: ${this.atributes.hitPoints}`);
    }
    if (this.atributes.hitPoints <= 0) {
      this.gameOver();
    }
  }

  // Lógica de Game Over
  gameOver() {
    console.log(`Game Over for Player ${this.isPlayerOne ? 1 : 2}`);
    // Aquí puedes detener el juego o cambiar a una pantalla de Game Over
    this.scene.scene.pause(); // Por ejemplo, pausa la escena actual
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

  createHealBar() {
    if (this.playerId === 1) {
      const positionY = this.scene.game.scale.height / 7.5; // Define la posición Y según la escena
      this.statsBar = this.scene.add.rectangle(
        this.playerId === 1
          ? this.scene.game.config.width / 15 + 180
          : this.scene.game.config.width / 1.07 + 180,
        positionY - 50,
        200,
        60,
        0xbbbbbb
      );

      this.healthText = this.scene.add.text(
        this.x + 100,
        this.y - 50,
        `HP: ${this.atributes.hitPoints}`,
        { fontSize: "16px", fill: "#00ff00" }
      );
    }

    if (this.playerId === 2) {
      this.statsBar = this.scene.add.rectangle(
        this.x + 180,
        this.y - 50,
        200,
        60,
        0xbbbbbb
      ); // left

      this.healthText = this.scene.add.text(
        this.x + 100,
        this.y - 50,
        `HP: ${this.atributes.hitPoints}`,
        { fontSize: "16px", fill: "#00ff00" }
      );
    }
  }
  getAttributes() {
    return this.attributes;
  }
}
