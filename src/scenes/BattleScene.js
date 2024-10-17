import { MoveBar } from "../entitities/movebar";
import { Television } from "../entitities/television";
import { Character } from "../entitities/character";
import { BaseScene } from "../lib/FontsBase";
import { SwordRain } from "../events/swordRain";
import { PopcornRaining } from "../events/popcornRain";
import { MedievalEvent } from "../events/medieval";
import { AtributesPlayers } from "../functions/atributos";
import { initializeHealthBars } from "../functions/createHealtBar";
import { criticalVisual } from "../functions/criticalVisuals";

export class BattleScene extends BaseScene {
  constructor() {
    super("battleScene");
    this.movingBar1 = null;
    this.movingBar2 = null;
    this.player1Atributes = null;
    this.player2Atributes = null;
    this.player1HPText = null; // Vida de Cada Jugador
    this.player2HPText = null;
    this.lastKeyPressTime = 0; // Pausa ?
  }
  game_over_timeout;
  init(data) {
    this.game_over_timeout = 60; // Tiempo límite de 30 segundos
    this.purchasedItems = data.purchasedItems || []; // Obtener los ítems comprados
    this.selectedItemsPlayer1 =
      data.selectedItemsPlayer1 || new AtributesPlayers(this) || {}; // Asegúrate de que sea un objeto
    this.selectedItemsPlayer2 =
      data.selectedItemsPlayer2 || new AtributesPlayers(this) || {}; // Asegúrate de que sea un objeto

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("hudBattle", {
      remaining_time: this.game_over_timeout,
    });
  }

  create() {
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

    this.createHealtBar1 = new initializeHealthBars(
      this,
      this.width * 0.045,
      this.height * 0.55,
      this.player1HP
    );
    this.createHealtBar2 = new initializeHealthBars(
      this,
      this.width * 0.95,
      this.height * 0.55,
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
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    let width1 = width * 0.115;
    let height1 = height * 0.4;

    // Textos De Atributos 1
    this.player1HPText = this.createText(
      width1,
      height1,
      `${this.player1HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height1, "IcoHp", true);

    let height2 = height * 0.48;
    this.speedText1 = this.createText(
      width1,
      height2,
      `${this.player1Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height2, "IcoSp", true);

    let height3 = height * 0.56;
    this.createText(
      width1,
      height3,
      `${this.player1EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height3, "IcoDef", true); // 0.68  // 0.78

    let height4 = height * 0.64;
    this.damageText1 = this.createText(
      width1,
      height4,
      `${this.player1Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height4, "IcoDam", true);

    let height5 = height * 0.72;
    this.criticalText1 = this.createText(
      width1,
      height5,
      `${this.player1CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height5, "IcoCrt", true);

    let width2 = width * 0.885;
    // Textos De Atributos 2
    this.player2HPText = this.createText(
      width2,
      height1,
      `${this.player2HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height1, "IcoHp", false);

    this.speedText2 = this.createText(
      width2,
      height2,
      `${this.player2Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height2, "IcoSp", false);

    this.createText(
      width2,
      height3,
      `${this.player2EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height3, "IcoDef", false);

    this.damageText2 = this.createText(
      width2,
      height4,
      `${this.player2Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height4, "IcoDam", false);

    this.criticalText2 = this.createText(
      width2,
      height5,
      `${this.player2CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height5, "IcoCrt", false);

    this.television = new Television(this, false);

    let background = this.add.sprite(width * 0.5, height * 0.5, "escenario");
    background.setDepth(1);

    // const itemsCase = this.scene.get("ItemsCase");

    const player1 = new Character(this, "mimbo", true);
    const player2 = new Character(this, "luho", false);

    player1.change_emotion("Mimbo", 0, player1);
    player2.change_emotion("Luho", 0, player2);

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

  createTextWithIcon(x, y, iconKey, isPlayerOne) {
    if (isPlayerOne) {
      x = x - 73;
    }

    if (!isPlayerOne) {
      x = x + 73;
    }

    const iconObject = this.add
      .sprite(x, y, iconKey)
      .setScale(0.9)
      .setDepth(3)
      .setOrigin(0.5); // Ajusta la posición y el tamaño del ícono
    return iconObject;
  }

  gameOver(player) {
    if (player === this.player1Atributes) {
      console.log(player)
      console.log(this.player1Atributes)
      looser = 1;
    }
    if (player === this.player2Atributes) {
      console.log(player)
      console.log(this.player2Atributes)
      looser = 2;
    } else {
      console.log("NO FUNCIONA LA DERIVACIÓN A GAME OVER")
      return false;
    }

    player.gameOver(this, looser);
  }

  visualCritical() {
    criticalVisual(this)
  } 
}
