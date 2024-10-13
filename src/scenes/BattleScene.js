import { MoveBar } from "../entitities/movebar";
import { Television } from "../entitities/television";
import { AtributesPlayers } from "../entitities/newatributes"; // Importa la clase
import { Character } from "../entitities/character";
import { BaseScene } from "../lib/FontsBase";
import { SwordRain } from "../events/swordRain";
import { PopcornRaining } from "../events/popcornRain";
import { MedievalEvent } from "../events/medieval";

export class BattleScene extends BaseScene {
  constructor() {
    super("battleScene");
    this.movingBar1 = null;
    this.movingBar2 = null;

    this.player1Atributes = new AtributesPlayers(this, 1); // Crear Atributos de Cada Jugador
    this.player2Atributes = new AtributesPlayers(this, 2);

    this.player1HPText = null; // Vida de Cada Jugador
    this.player2HPText = null;

    this.lastKeyPressTime = 0; // Pausa ?
  }

  game_over_timeout;
  timer_event;
  icons = []; // Agregar un array para almacenar íconos de ítems

  init(data) {
    this.game_over_timeout = 60; // Tiempo límite de 30 segundos
    this.purchasedItems = data.purchasedItems || []; // Obtener los ítems comprados
    this.selectedItemsPlayer1 = data.selectedItemsPlayer1 || {}; // Asegúrate de que sea un objeto
    this.selectedItemsPlayer2 = data.selectedItemsPlayer2 || {}; // Asegúrate de que sea un objeto

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("hudBattle", {
      remaining_time: this.game_over_timeout,
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      if (currentTime - this.lastKeyPressTime > 250) {
        this.lastKeyPressTime = currentTime;
        this.scene.pause("battleScene");
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    this.player1Atributes.create();
    // Actualizar atributos del jugador 1 con los ítems seleccionados
    if (this.selectedItemsPlayer1) {
      this.player1Atributes.aboutWriteAtributes(
        this.selectedItemsPlayer1.atributes1
      );
    }
    console.log(this.selectedItemsPlayer1.atributes1);

    this.player2Atributes.create();
    // Actualizar atributos del jugador 2 con los ítems seleccionados
    if (this.selectedItemsPlayer2) {
      this.player2Atributes.aboutWriteAtributes(
        this.selectedItemsPlayer2.atributes2
      );
    }

    console.log(this.selectedItemsPlayer2.atributes2);

    this.player1CriticalChance =
      this.player1Atributes.getCritical(1) ||
      this.selectedItemsPlayer1.atributes?.critical ||
      0;
    this.player1Damage =
      this.player1Atributes.getDamage(1) ||
      this.selectedItemsPlayer1.atributes?.damage ||
      1;
    this.player1Anchor =
      this.player1Atributes.getAnchor(1) ||
      this.selectedItemsPlayer1.atributes?.anchor ||
      12;
    this.player1Speed =
      this.player1Atributes.getSpeed(1) ||
      this.selectedItemsPlayer1.atributes?.speed ||
      5; // Valor por defecto si no existe
    this.player1EvadeChance =
      this.player1Atributes.getEvadeChance(1) ||
      this.selectedItemsPlayer1.atributes?.evadeChance ||
      0;
    this.player1HP =
      this.player1Atributes.getHitPoints(1) ||
      this.selectedItemsPlayer1.atributes?.hitPoints ||
      1; // int

    this.player1Atributes.updateHealthBar(1, this.player1HP);

    this.player2Damage =
      this.player2Atributes.getDamage(2) ||
      this.selectedItemsPlayer2.atributes?.damage ||
      1;
    this.player2CritialChance =
      this.player2Atributes.getCritical(2) ||
      this.selectedItemsPlayer2.atributes?.critical ||
      0;
    this.player2Anchor =
      this.player2Atributes.getAnchor(2) ||
      this.selectedItemsPlayer2.atributes?.anchor ||
      12;
    this.player2Speed =
      this.player2Atributes.getSpeed(2) ||
      this.selectedItemsPlayer2.atributes?.speed ||
      5; // Valor por defecto si no existe
    this.player2EvadeChance =
      this.player2Atributes.getEvadeChance(2) ||
      this.selectedItemsPlayer2.atributes?.evadeChance ||
      0;
    this.player2HP =
      this.player2Atributes.getHitPoints(2) ||
      this.selectedItemsPlayer2.atributes?.hitPoints ||
      1; // int

    this.player2Atributes.updateHealthBar(2, this.player2HP);

    // Textos De Atributos 1
    this.player1HPText = this.createText(
      width * 0.35,
      height * 0.08,
      `${this.player1HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);
    this.speedText1 = this.createText(
      width * 0.018,
      height * 0.25,
      `Speed: ${this.player1Speed.toString().padStart(2, "0")}`
    ).setDepth(3);
    this.createText(
      width * 0.018,
      height * 0.3,
      `Evade: ${this.player1EvadeChance.toString().padStart(2, "0")}`
    ).setDepth(3);

    // Textos De Atributos 2
    this.player2HPText = this.createText(
      width * 0.66,
      height * 0.08,
      `${this.player2HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);
    this.speedText2 = this.createText(
      width * 0.858,
      height * 0.25,
      `Speed: ${this.player2Speed.toString().padStart(2, "0")}`
    ).setDepth(3);
    this.createText(
      width * 0.858,
      height * 0.3,
      `Evade: ${this.player2EvadeChance.toString().padStart(2, "0")}`
    ).setDepth(3);

    this.television = new Television(this, false);

    let background = this.add.sprite(width * 0.5, height * 0.43, "escenario");
    background.setDepth(1);

    const itemsCase = this.scene.get("ItemsCase");

    let character1 = new Character(this, "mimbo", true);
    let character2 = new Character(this, "luho", false);

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y

    this.imagenBar = this.add
      .sprite(barraX, barraY, "imagen-barra")
      .setScale(1.5)
      .setDepth(10);

    this.movingBar1 = new MoveBar(
      this,
      barraX - 500,
      barraY,
      20,
      105,
      this.player1Speed,
      "anilla-roja",
      {
        left: null,
        right: null,
      },
      true,
      this.mainBar,
      this.player1Anchor
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 500,
      barraY,
      20,
      105,
      this.player2Speed,
      "anilla-azul",
      {
        left: null,
        right: null,
      },
      false,
      this.mainBar,
      this.player2Anchor
    );

    const eventIndex = Phaser.Math.Between(1, 3);
    switch (eventIndex) {
      case 1:
        this.swordRain = new SwordRain(this);
        this.swordRain.startSwordRain();
        this.attackBar = this.swordRain;
        console.log("Lluvia de Espadas");
        break;
      case 2:
        this.popcornRain = new PopcornRaining(this);
        this.popcornRain.startPopcornRain();
        this.attackBar = this.popcornRain;
        console.log("Lluvia de Pororos");
        break;
      case 3:
        this.medievalEvent = new MedievalEvent(this);
        this.medievalEvent.startMedievalEvent();
        this.attackBar = this.medievalEvent;
        console.log("Evento Medieval");
        break;
    }
  }

  update() {
    this.movingBar1.update();
    this.movingBar2.update();

    // Llamar al update del evento actual (SwordRain, PopcornRaining, MedievalEvent)
    if (this.attackBar && typeof this.attackBar.update === "function") {
      this.attackBar.update(); // Actualiza las colisiones y lógica del evento
    }

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
  }
}
