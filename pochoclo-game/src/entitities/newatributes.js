export class AtributesPlayers {
  constructor(scene, playerId) {
    this.scene = scene;
    this.playerId = playerId;

    // Asignar atributos
    this.attributes = {
      speedBoost: 0,
      extraHitPoints: 0, // Nueva propiedad para vida extra
      evadeChance: 0,
      speed: 0, // Nueva propiedad para chance de esquivar
    };

    // Establecer vida inicial
    this.hitPoints = 3; // Por ejemplo, cada jugador comienza con 3 puntos de vida
  }

  applyAttributes(attributes) {
    if (attributes.speedBoost) {
      this.speed += attributes.speedBoost;
    }
    if (attributes.extraLife) {
      this.hitPoints += attributes.extraHitPoints;
    }
    if (attributes.evadeChance) {
      this.evadeChance += attributes.evadeChance;
    }
    if (attributes.moreSeconds) {
      this.moreSeconds += attributes.moreSeconds;
    }
    if (attributes.damageStrength) {
      this.damageStrength += attributes.damageStrength;
    }
  }

  removeAttributes(attributes) {
    if (attributes.speedBoost) {
      this.speed -= attributes.speedBoost;
    }
    if (attributes.extraLife) {
      this.life -= attributes.extraLife;
    }
    if (attributes.evadeChance) {
      this.evadeChance -= attributes.evadeChance;
    }
    if (attributes.moreSeconds) {
      this.moreSeconds -= attributes.moreSeconds;
    }
    if (attributes.damageStrength) {
      this.damageStrength -= attributes.damageStrength;
    }
  }

  getAttributes() {
    return this.attributes
  }

  getHitPoints() {
    return this.hitPoints;
  }

  setHitPoints(value) {
    this.hitPoints = value;
  }
}
