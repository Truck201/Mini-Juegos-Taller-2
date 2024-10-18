export class AtributesPlayers {
  constructor(scene) {
    this.scene = scene;
    this.atributes = null;

    const initialAttributes = {
      hitPoints: 10,
      speed: 10,
      evadeChance: 10,
      damage: 1,
      critical: 5,
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
          : 5,
      anchor:
        initialAttributes.anchor !== undefined ? initialAttributes.anchor : 1.2,
    };
  }

  aboutWriteAtributes(newAttributes) {
    this.atributes.hitPoints =
      newAttributes.hitPoints || this.atributes.hitPoints;
    this.atributes.speed = newAttributes.speed || this.atributes.speed;
    this.atributes.evadeChance =
      newAttributes.evadeChance || this.atributes.evadeChance;
    this.atributes.damage = newAttributes.damage || this.atributes.damage;
    this.atributes.critical = newAttributes.critical || this.atributes.critical;
    this.atributes.anchor = newAttributes.anchor || this.atributes.anchor;
  }

  updateAttributes(newAttributes) {
    if (newAttributes.speed) {
      this.atributes.speed += newAttributes.speed;
      console.log("Adding -> Speed " + this.atributes.speed);
    }
    if (newAttributes.evadeChance) {
      this.atributes.evadeChance += newAttributes.evadeChance;
      console.log("Adding -> EC " + this.atributes.evadeChance);
    }
    if (newAttributes.hitPoints) {
      this.atributes.hitPoints += newAttributes.hitPoints;
      console.log("Adding -> HP " + this.atributes.hitPoints);
    }
    if (newAttributes.damage) {
      this.atributes.damage += newAttributes.damage;
      console.log("Adding -> DMG " + this.atributes.damage);
    }
    if (newAttributes.critical) {
      this.atributes.critical += newAttributes.critical;
      console.log("Adding -> CRT " + this.atributes.critical);
    }
    if (newAttributes.anchor) {
      this.atributes.anchor += newAttributes.anchor;
      console.log("Adding -> Anchor " + this.atributes.anchor);
    }
  }

  removeAttributes(newAttributes) {
    if (newAttributes.speed) {
      this.atributes.speed -= newAttributes.speed;
      console.log("Remove Speed " + this.atributes.speed);
    }
    if (newAttributes.evadeChance) {
      this.atributes.evadeChance -= newAttributes.evadeChance;
      console.log("Remove EC " + this.atributes.evadeChance);
    }
    if (newAttributes.hitPoints) {
      this.atributes.hitPoints -= newAttributes.hitPoints;
      console.log("Remove HP " + this.atributes.hitPoints);
    }
    if (newAttributes.damage) {
      this.atributes.damage -= newAttributes.damage;
      console.log("Remove DMG " + this.atributes.damage);
    }
    if (newAttributes.critical) {
      this.atributes.critical -= newAttributes.critical;
      console.log("Remove CRT " + this.atributes.critical);
    }
    if (newAttributes.anchor) {
      this.atributes.anchor -= newAttributes.anchor;
      console.log("Remove Anchor " + this.atributes.anchor);
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
}
