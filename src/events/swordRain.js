import { Attack } from "../entitities/attack";

export class SwordRain {
  constructor(scene) {
    this.scene = scene;

    this.swords = []; // Arreglo para las espadas activas

    this.maxSwords = 3; // Número máximo de espadas
    this.spawnInterval = 6000 / this.maxSwords; // Intervalo para 3 espadas en 6 segundos
  }

  // Método para verificar si hay menos de 3 espadas activas
  spawnSwordIfNeeded() {
    if (this.swords.length < this.maxSwords) {
      this.addSword();
    }
  }

  // Crea una nueva espada usando la clase Attack
  addSword() {
    this.sword = new Attack(this.scene);
    this.swords.push(this.sword);

    // Cuando la espada termine su ciclo, se elimina y genera otra si es necesario
    this.sword.sprite.on("animationcomplete-broken", () => {
      if (this.sword && this.sword.sprite) {
        // Verifica que sword y sprite existan
        this.sword.destroy(); // Destruir espada cuando se complete la animación
        this.swords = this.swords.filter((s) => s !== this.sword); // Elimina la espada del array
        this.spawnSwordIfNeeded(); // Verifica si necesita agregar otra
      }
    });
  }

  // Generar espadas de forma continua cada 2 segundos (dentro de los 6 segundos)
  startSwordRain() {
    this.scene.time.addEvent({
      delay: this.spawnInterval, // Tiempo entre generación de espadas
      callback: () => {
        this.spawnSwordIfNeeded();
      },
      loop: true, // Repite indefinidamente
    });
  }

  // Este método devuelve el rectángulo de todas las espadas activas
  getBounds() {
    if (this.sword) {
      return this.swords.map((sword) => sword.getBounds()); // Devuelve un array de rectángulos
    } else {
      console.warn("Sword no está inicializada.");
      return null; // o un objeto de bounds vacío
    }
  }

  destroy() {
    this.sword.destroy();
  }

  respawn() {
    this.sword.respawn();
  }
}
