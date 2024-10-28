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
    console.log(this.language);
    this.game_over_timeout = 20;
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
      `/data/itemsDescription_${this.language}.json`
    );
  }

  create() {
    // Cargar el JSON después de que esté disponible
    this.itemDescriptions = this.cache.json.get(this.dialoguesPath);
    console.log("Charge Descriptions", this.itemDescriptions);

    this.music = this.sound.add("MusicV3", { volume: 0.1, loop: true });

    this.startShop = this.sound.add("starterSoundShop", { volume: 0.003 });
    this.urbanSound = this.sound.add("urbanSounds", { volume: 0.2 });

    this.startShop.play();
    this.music.play();

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
        this.music.pause();
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { sceneShop: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    this.timerForSecond();
    this.createBackground();

    this.Monsters = new MonsterShop(this);
    this.startBarking();
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

  startBarking() {
    if (!this.barkingTimer) {
      this.barkingTimer = this.time.addEvent({
        delay: Phaser.Math.Between(2300, 5600),
        callback: () => {
          let barkSoundNumber = Phaser.Math.Between(1, 3);
          switch (barkSoundNumber) {
            case 1:
              const barkSound1 = this.sound.add("dogBark1", { volume: 0.2 });
              barkSound1.play();
            case 2:
              const barkSound2 = this.sound.add("dogBark2", { volume: 0.2 });
              barkSound2.play();
            case 3:
              const barkSound3 = this.sound.add("dogBark3", { volume: 0.2 });
              barkSound3.play();
          }
        },
        loop: true,
      });
    }
  }

  // Método para detener el sonido del latido del corazón
  stopBarking() {
    if (this.barkingTimer) {
      this.barkingTimer.remove(false); // Elimina el evento del temporizador
      this.barkingTimer = null; // Resetea el temporizador
    }
  }

  // Método para pasar ítems seleccionados a BattleScene
  startBattleScene = () => {
    this.music.stop();
    const selectedItems = this.itemsCase.selectedItems; // Obtén los ítems seleccionados
    const selected1Player = this.itemsCase.player1Atributes;
    const selected2Player = this.itemsCase.player2Atributes;
    this.stopBarking();
    this.scene.start("PreloadBattle", {
      purchasedItems: selectedItems,
      selectedItemsPlayer1: selected1Player,
      selectedItemsPlayer2: selected2Player,
    }); // Inicia la escena de batalla
  };
}
