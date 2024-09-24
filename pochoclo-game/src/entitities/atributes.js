export class AtributesPlayers {
  constructor(scene, player) {
    super('atributesPlayers')
    this.scene = scene;
    this.player = player;

    this.speed = 100; // Velocidad base
    this.life = 3; // Vidas base
    this.evadeChance = 0; // Probabilidad de evasión base
    this.moreSeconds = 0; // Cantidad de Segundos Extras base
  }

  // Método para aplicar atributos
  applyAttributes(attributes) {
    if (attributes.speedBoost) {
      this.speed += attributes.speedBoost;
    }
    if (attributes.extraLife) {
      this.life += attributes.extraLife;
    }
    if (attributes.evadeChance) {
      this.evadeChance += attributes.evadeChance;
    }
    if (attributes.moreSeconds) {
        this.moreSeconds += attributes.moreSeconds
    }
  }

  // Método para eliminar los atributos cuando un ítem es deseleccionado
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
        this.moreSeconds -= attributes.moreSeconds
    }
  }
}
