import { Scene } from "phaser";

export class HudBattle extends Scene {
  constructor() {
    super("hudBattle");
  }

  init(data) {
    this.game_over_timeout = 60; // Tiempo límite de 30 segundos

    // Temporizador
    this.timer_event = this.time.addEvent({
      delay: 1000, // Ejecutar cada segundo
      loop: true,
      callback: () => {
        this.game_over_timeout--;
      },
    });
  }

  create() {

   
  }

 
}
