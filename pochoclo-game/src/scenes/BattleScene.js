import { Scene } from "phaser";
import { MoveBar } from "../entitities/movebar";
import { Character } from "../entitities/character";
import { Television } from "../entitities/television";
import { Attack } from "../entitities/attack";
import { AtributesPlayers } from "./atributes"; // Importa la clase

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

    // Crear los objetos de atributos para cada jugador
    this.player1Atributes = new AtributesPlayers(this, 1);
    this.player2Atributes = new AtributesPlayers(this, 2);

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

    this.character = new Character(this, "mimbo", true, true);
    this.character2 = new Character(this, "luho", false, true);

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 1000, 95, 0x272736);
    this.imagenBar = this.add.sprite(barraX, barraY, "imagen-barra");

    this.attackBar = new Attack(this);

    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 500,
      barraY,
      20,
      105,
      15,
      "anilla-roja",
      {
        left: null,
        right: null,
      },
      true,
      this.mainBar
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 500,
      barraY,
      20,
      105,
      15,
      "anilla-azul",
      {
        left: null,
        right: null,
      },
      false,
      this.mainBar
    );

    // Configurar las teclas para destruir recolectables
    this.spaceKey = this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2

    // Lógica para asignar atributos
    this.applyPlayerAttributes();
  }

  update() {
    this.movingBar1.update();
    this.movingBar2.update();

    const movingBar1Sprite = this.movingBar1.bar; // Cambia a this.movingBar1.bar
    const movingBar2Sprite = this.movingBar2.bar; // Cambia a this.movingBar2.bar

    // Si se presiona espacio, jugador 1 destruye un recolectable
    if (
      this.checkCollision(movingBar1Sprite, this.attackBar.sprite) &&
      Phaser.Input.Keyboard.JustDown(this.spaceKey) // Acción de jugador 1
    ) {
      this.destroyAndRespawn(); // Destruye y reaparece en rojo
    }

    // Si se presiona enter, jugador 2 destruye un recolectable
    if (
      this.checkCollision(movingBar2Sprite, this.attackBar.sprite) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey) // Acción de jugador 2
    ) {
      this.destroyAndRespawn(); // Destruye y reaparece en rojo
    }

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
  }

  applyPlayerAttributes() {
    // Asignar atributos desde ItemsCase
    const player1Attributes = this.player1Atributes.getAttributes();
    const player2Attributes = this.player2Atributes.getAttributes();

    // Ajustar la velocidad, vida y chance de esquivar
    this.moveBar1.setSpeed(
      this.moveBar1.speed + (player1Attributes.speedBoost || 0)
    );
    this.moveBar1.hitPoints += player1Attributes.extraLife || 0;
    this.moveBar1.evadeChance += player1Attributes.evadeChance || 0;  

    this.moveBar2.setSpeed(
      this.moveBar2.speed + (player2Attributes.speedBoost || 0)
    );
    this.moveBar2.hitPoints += player2Attributes.extraLife || 0;
    this.moveBar2.evadeChance += player2Attributes.evadeChance || 0;
  }

  // Método para verificar la colisión entre dos objetos
  checkCollision(bar, attackBar) {
    const barBounds = bar.getBounds(); // Asegúrate de que bar sea un sprite
    const attackBarBounds = attackBar.getBounds(); // Asegúrate de que attackBar sea un sprite

    return Phaser.Geom.Intersects.RectangleToRectangle(
      barBounds,
      attackBarBounds
    );
  }

  // Método para manejar la destrucción y reaparición de la attackBar
  destroyAndRespawn() {
    this.attackBar.destroy();

    // Shake de la pantalla
    this.cameras.main.shake(200, 0.02); // Duración y fuerza del shake

    this.time.delayedCall(3000, () => {
      this.attackBar.respawn();
    });
  }

  // Método para manejar ataques
  handleAttack(attacker, target) {
    if (Math.random() < target.evadeChance / 100) {
      console.log(`${target} esquivó el ataque!`);
      return;
    }
    target.hitPoints -= 1; // Reducir vida
    if (target.hitPoints <= 0) {
      this.gameOver(target); // Lógica de fin de juego si el jugador no tiene vida
    }
  }

  gameOver(loser) {
    // Lógica para manejar el fin del juego
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.restart();
  }
}
