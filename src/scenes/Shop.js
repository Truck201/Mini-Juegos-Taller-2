import { Scene } from "phaser";
import { ItemsCase } from "../functions/itemscase";
import { MonsterShop } from "../entitities/monsters";
import { getLanguageConfig } from "../services/translations";
export class Shop extends Scene {
  game_over_timeout;
  timer_event;
  purchasedItems = [];
  itemDescriptions = null;

  constructor() {
    super("Shop");
    this.itemsCase = null;
    this.Monsters = null;
    this.dialoguesPath = null;
  }

  init(data) {
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.language = data.language || getLanguageConfig();
    console.log(this.language)
    this.game_over_timeout = 15;
    this.lastKeyPressTime = 0;
    this.background;

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("hudShop", {
      remaining_time: this.game_over_timeout,
      points1: this.points1,
      points2: this.points2,
    });
  }

  preload() {
    // Cargar los diálogos del archivo correspondiente según el idioma seleccionado
    this.dialoguesPath = `itemsDescription_${this.language}`;
    console.log(`Charging Descriptions from: ${this.dialoguesPath}`);

    this.load.json(
      this.dialoguesPath,
      `../public/data/itemsDescription_${this.language}.json`
    );
  }

  create() {
    // Cargar el JSON después de que esté disponible
    this.itemDescriptions = this.cache.json.get(this.dialoguesPath);
    console.log("Charge Descriptions", this.itemDescriptions);

    // Asegúrate de que itemDescriptions no sea nulo o indefinido
    if (!this.itemDescriptions) {
      console.error("No se pudo cargar las descripciones de los ítems");
      return;
    }
    this.itemsCase = new ItemsCase(
      this,
      this.scale.width,
      this.scale.height,
      this.itemDescriptions
    );

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;

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

    this.timerForSecond();
    this.createBackground();

    this.Monsters = new MonsterShop(this);
  }

  update() {
    if (this.itemsCase) {
      this.itemsCase.update();
    }
  }

  timerForSecond() {
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

  createBackground() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;
    this.add.sprite(width * 0.5, height * 0.5, "backgroundShop").setDepth(0);
  }

  // Método para pasar ítems seleccionados a BattleScene
  startBattleScene = () => {
    const selectedItems = this.itemsCase.selectedItems; // Obtén los ítems seleccionados
    const selected1Player = this.itemsCase.player1Atributes;
    const selected2Player = this.itemsCase.player2Atributes;

    this.scene.start("battleScene", {
      purchasedItems: selectedItems,
      selectedItemsPlayer1: selected1Player,
      selectedItemsPlayer2: selected2Player,
    }); // Inicia la escena de batalla
  };
}
