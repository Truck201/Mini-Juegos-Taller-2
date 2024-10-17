export class AtributesPlayers {
  constructor(scene) {
    this.scene = scene;
    this.atributes = null

    const initialAttributes = {
      hitPoints: 10,
      speed: 10,
      evadeChance: 0,
      damage: 1,
      critical: 0,
      anchor: 1.2,
    };

    this.atributes = this.atributesData(initialAttributes);

    if (!this.atributes) {
      console.error("Atributos del jugador 2 no inicializados");
      return;
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
    this.atributes.hitPoints =
      newAttributes.hitPoints || this.atributes.hitPoints;
    this.atributes.speed = newAttributes.speed || this.atributes.speed;
    this.atributes.evadeChance =
      newAttributes.evadeChance || this.atributes.evadeChance;
    this.atributes.damage = newAttributes.damage || this.atributes.damage;
    this.atributes.critical =
      newAttributes.critical || this.atributes.critical;
    this.atributes.anchor = newAttributes.anchor || this.atributes.anchor;
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
    }
    if (newAttributes.damage) {
      this.atributes.damage += newAttributes.damage;
    }
    if (newAttributes.critical) {
      this.atributes.critical += newAttributes.critical;
    }
    if (newAttributes.anchor) {
      this.atributes.anchor += newAttributes.anchor;
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
    }
    if (newAttributes.damage) {
      this.atributes.damage -= newAttributes.damage;
    }
    if (newAttributes.critical) {
      this.atributes.critical -= newAttributes.critical;
    }
    if (newAttributes.anchor) {
      this.atributes.anchor -= newAttributes.anchor;
    }
  }

  getAnchor() {
    return this.atributes.anchor;
  }

  getCritical() {
    return this.atributes.critical;
  }

  getDamage() {
    return this.atributes.damage;
  }

  getEvadeChance() {
    return this.atributes.evadeChance;
  }

  getSpeed() {
    return this.atributes.speed;
  }

  getHitPoints() {
    return this.atributes.hitPoints;
  }

  gameOver(loser) {
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.scene.launch("GameOver", { player: loser }); // Game Over Scene
    this.scene.scene.pause("battleScene");
    this.scene.scene.bringToTop("GameOver");
  }
}
