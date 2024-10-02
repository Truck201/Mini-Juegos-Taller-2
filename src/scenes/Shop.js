import { Scene } from "phaser";
import { ItemsCase } from "../entitities/itemscase";

export class Shop extends Scene {
  game_over_timeout;
  timer_event;
  purchasedItems = [];

  constructor() {
    super("Shop");
    this.itemsCase = null;
  }

  init(data) {
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 6;
    this.lastKeyPressTime = 0;
    this.background;

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
        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout <= 0) {
          this.timer_event.remove(); // Remover el evento del temporizador
          this.scene.get("hudShop").update_cameras(); // Actualizar cámaras al Time 0

          this.time.delayedCall(980, () => {
            this.startBattleScene();
            this.scene.stop("hudShop");
            this.scene.stop("Shop");
          });
        }
        // Actualizar el tiempo en la escena del HUD
        this.scene.get("hudShop").update_timeout(this.game_over_timeout);
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      console.log("pres scape");
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause("Shop");
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    // Crea un nuevo sprite para la animación y colócalo detrás del fondo
    const animatedBackground = this.add
      .sprite(width / 2, height / 2, "backgroundShop")
      .setScale(0.2);
    animatedBackground.setDepth(0);

    this.add
      .image(width / 2, height * 0.79, "backShop")
      .setScale(1.35)
      .setDepth(1);

    this.itemsCase = new ItemsCase(this, this.scale.width, this.scale.height);
  }

  update() {
    if (this.itemsCase) {
      this.itemsCase.update();
    }
  }

  // Método para pasar ítems seleccionados a BattleScene
  startBattleScene = () => {
    const selectedItems = this.itemsCase.selectedItems; // Obtén los ítems seleccionados
    const selected1Player = this.itemsCase.player1Atributes;
    const selected2Player = this.itemsCase.player2Atributes;
    console.log(selected1Player, "player 1 items");
    console.log(selected2Player, "player 2 items");

    this.scene.start("battleScene", {
      purchasedItems: selectedItems,
      selectedItemsPlayer1: selected1Player,
      selectedItemsPlayer2: selected2Player,
    }); // Inicia la escena de batalla
  };
}
