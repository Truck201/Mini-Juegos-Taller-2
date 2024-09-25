export class AtributesPlayers {
  constructor(scene, playerId, initialAttributes) {
    this.scene = scene;
    this.playerId = playerId;

    this.atributesData(initialAttributes || {});

    this.createHealBar()
  }

  atributesData(initialAttributes) {
    // Asignar atributos con valores predeterminados si son indefinidos
    this.atributes = {
      hitPoints: initialAttributes.hitPoints !== undefined ? initialAttributes.hitPoints : 10, // Inicia en 10 HP
      speed: initialAttributes.speed !== undefined ? initialAttributes.speed : 5,
      evadeChance: initialAttributes.evadeChance !== undefined ? initialAttributes.evadeChance : 0,
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
    this.healthText.setText(`HP: ${this.atributes.hitPoints}`);

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
    }
    if (newAttributes.evadeChance) {
      this.atributes.evadeChance += newAttributes.evadeChance;
    }
    if (newAttributes.hitPoints) {
      this.atributes.hitPoints += newAttributes.hitPoints;
      this.healthText.setText(`HP: ${this.atributes.hitPoints}`); // Actualiza el texto de HP
    }
  }

  createHealBar() {
    if (playerId === 1) {
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

    if (playerId === 2) {
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
