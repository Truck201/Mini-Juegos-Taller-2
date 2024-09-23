import { Scene } from "phaser";
import { ItemsCase } from "../entitities/itemscase";

export class Shop extends Scene {
  game_over_timeout;
  timer_event;

  constructor() {
    super("Shop");
    this.itemsCase = null;
  }

  init(data) {
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 15;

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("hudShop", {
      remaining_time: this.game_over_timeout,
      points1: this.points1,
      points2: this.points2,
    });

    this.timer_event = this.time.addEvent({
      delay: 1000, // Ejecutar cada segundo
      loop: true,
      callback: () => {
        this.game_over_timeout--;

        // Actualizar el tiempo en la escena del HUD
        this.scene.get("hudShop").update_timeout(this.game_over_timeout);

        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout <= 0) {
          this.timer_event.remove(); // Remover el evento del temporizador
          this.scene.get("hudShop").update_cameras();

          this.time.delayedCall(980, () => {
            this.scene.stop("Game1vs1");
            this.scene.start("Game1vs1");
            this.scene.stop("hudShop");
            this.scene.stop("Shop");
          });
        }
      },
    });
  }

  create() {
    this.itemsCase = new ItemsCase(this, this.scale.width, this.scale.height);
  }

  update() {
    if (this.itemsCase) {
      this.itemsCase.update();
    }
  }
}
