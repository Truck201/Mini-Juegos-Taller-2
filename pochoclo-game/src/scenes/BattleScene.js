import { Scene } from "phaser";
import { MoveBar } from "../entitities/movebar";
import { Particles } from "../entitities/particles";
import { Character } from "../entitities/character";
import { Television } from "../entitities/television";

export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
  }

  game_over_timeout;
  timer_event;

  init(data) {
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
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
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.television = new Television(this);

    this.character = new Character(this, "mimbo", true, false);
    this.character2 = new Character(this, "luho", false, false);

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 840, 95, 0x272736);
    this.imagenBar = this.add.sprite(barraX, barraY, "imagen-barra");
    this.imagenBar.setScale(0.685);

    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 432,
      barraY,
      20,
      105,
      3.4,
      0xff004d,
      {
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      },
      true,
      this.mainBar
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 432,
      barraY,
      20,
      105,
      3.4,
      0x29adff,
      {
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      },
      false,
      this.mainBar
    );

    // Configurar las teclas para destruir recolectables
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2
  }

  update() {
    this.movingBar1.update();
    this.movingBar2.update();

    // Si se presiona espacio, jugador 1 destruye un recolectable
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      
    }

    // Si se presiona enter, jugador 2 destruye un recolectable
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      
    }

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
  }
}
