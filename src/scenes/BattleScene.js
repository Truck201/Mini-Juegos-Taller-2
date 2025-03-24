import { MoveBar } from "../entitities/movebar";
import { Television } from "../entitities/television";
import { Character } from "../entitities/character";
import { SwordRain } from "../events/swordRain";
import { PopcornRaining } from "../events/popcornRain";
import { MedievalEvent } from "../events/medieval";
import { AtributesPlayers } from "../functions/atributos";
import { initializeHealthBars } from "../functions/createHealtBar";
import { AtributeText } from "../functions/atributeTexts";
import { criticalVisual } from "../functions/criticalVisuals";
import { BattleSounds } from "../functions/addSoundsBattle";
import { initialAnimsBattle } from "../functions/animsToBattle";
import { Scene } from "phaser";

export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
    this.movingBar1 = null;
    this.movingBar2 = null;
    this.player1Atributes = null;
    this.player2Atributes = null;
    this.lastKeyPressTime = 0; // Pausa ?
  }
  game_over_timeout;

  init(data) {
    this.purchasedItems = data.purchasedItems || []; // Obtener los ítems comprados
    this.selectedItemsPlayer1 =
      data.selectedItemsPlayer1 || new AtributesPlayers(this) || {}; // Asegúrate de que sea un objeto
    this.selectedItemsPlayer2 =
      data.selectedItemsPlayer2 || new AtributesPlayers(this) || {}; // Asegúrate de que sea un objeto
  }

  create() {
    BattleSounds(this);
    initialAnimsBattle(this);

    this.music1.play();

    this.width = this.game.scale.width;
    this.height = this.game.scale.height;

    // Crear Atributos de Cada Jugador
    this.player1Atributes = this.selectedItemsPlayer1;
    this.player2Atributes = this.selectedItemsPlayer2;

    this.player1HP = this.player1Atributes.getHitPoints();
    this.player1Speed = this.player1Atributes.getSpeed();
    this.player1Anchor = this.player1Atributes.getAnchor();
    this.player1EvadeChance = this.player1Atributes.getEvadeChance();
    this.player1Damage = this.player1Atributes.getDamage();
    this.player1CriticalChance = this.player1Atributes.getCritical();

    this.player2HP = this.player2Atributes.getHitPoints();
    this.player2Speed = this.player2Atributes.getSpeed();
    this.player2Anchor = this.player2Atributes.getAnchor();
    this.player2EvadeChance = this.player2Atributes.getEvadeChance();
    this.player2Damage = this.player2Atributes.getDamage();
    this.player2CriticalChance = this.player2Atributes.getCritical();

    this.atributesText = new AtributeText(this, this.width, this.height);

    this.createHealtBar1 = new initializeHealthBars(
      this,
      this.width * 0.035,
      this.height * 0.484,
      this.player1HP
    );
    this.createHealtBar2 = new initializeHealthBars(
      this,
      this.width * 0.965,
      this.height * 0.484,
      this.player2HP
    );

    this.createHealtBar1.updateHealthBar(this.player1HP);
    this.createHealtBar2.updateHealthBar(this.player2HP);

    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      if (currentTime - this.lastKeyPressTime > 250) {
        this.lastKeyPressTime = currentTime;
        this.scene.pause("battleScene");
        this.music1.pause();
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { sceneBattle: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    this.television = new Television(this, false, false);
    this.television.handleOnomatopoeias("battleScene", "start"); // Al inicio de la batalla

    let background = this.add.sprite(width * 0.5, height * 0.5, "escenario");
    background.setDepth(2);
    background.setScale(1.15);

    let shadows = this.add.sprite(width * 0.5, height * 0.5, "shadowTotal");
    shadows.setDepth(3);
    shadows.setScale(1);

    this.player1 = new Character(this, "mimbo", true, false);
    this.player2 = new Character(this, "luho", false, false);

    this.player1.change_emotion("Mimbo", 0, this.player1);
    this.player2.change_emotion("Luho", 0, this.player2);

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4) / 5; // Posición de alto en las barras Y

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
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
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
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
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

  visualCritical() {
    criticalVisual(this);
    let num = Phaser.Math.Between(0, 1);
    if (num >= 0.5) {
      this.critical1.play();
      // Cuando un jugador golpea a otro:
      this.television.handleOnomatopoeias("battleScene", "critical");
    }
    if (num < 0.5) {
      this.critical2.play();
      // Cuando un jugador golpea a otro:
      this.television.handleOnomatopoeias("battleScene", "critical");
    }
  }

  gameOver(player, event) {
    if (event === "PopcornRain") {
      this.winnerPopcornRain.play();
    }
    if (event === "SwordRain") {
      this.winnerSwordRain.play();
    }
    if (event === "Medieval") {
      this.winnerMedieval.play();
    }

    if (player === this.player1Atributes) {
      let loser = 1;

      this.happyLuho.play();
      this.cryMimbo.play();

      this.time.delayedCall(120, () => {
        this.goToGameOver(loser);
      });
    }
    if (player === this.player2Atributes) {
      let loser = 2;

      this.angryLuho.play();
      let num = Phaser.Math.Between(1, 2);
      num === 1 ? this.happyMimbo1.play() : this.happyMimbo2.play();

      this.time.delayedCall(120, () => {
        this.goToGameOver(loser);
      });
    } else {
      return false;
    }
  }

  goToGameOver(loser) {
    this.scene.launch("GameOver", { player: loser }); // Game Over Scene
    this.scene.pause("battleScene");
    this.music1.stop();
    this.scene.bringToTop("GameOver");
  }
}
