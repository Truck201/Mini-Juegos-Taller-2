import { Scene } from "phaser";
import { MoveBar } from "../entitities/movebar";
import { Character } from "../entitities/character";
import { Television } from "../entitities/television";
import { Attack } from "../entitities/attack";
import { AtributesPlayers } from "../entitities/atributes"; // Importa la clase

export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
  }

  game_over_timeout;
  timer_event;
  icons = []; // Agregar un array para almacenar íconos de ítems

  init(data) {
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 60; // Tiempo límite de 30 segundos
    this.purchasedItems = data.purchasedItems || []; // Obtener los ítems comprados

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

    console.log(this.purchasedItems)
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
      1,
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
      1,
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
    this.showPurchasedItemIcons();
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

  showPurchasedItemIcons() {
    const offsetX = 50; // Distancia horizontal de los íconos
    const iconY = 50; // Altura donde se mostrarán los íconos

    this.purchasedItems.forEach((item, index) => {
      const icon = this.add.sprite(
        100 + index * offsetX,
        iconY,
        item.spriteKey
      ); // Reemplaza item.spriteKey con la clave correcta de tu sprite
      icon.setScale(0.5); // Escalar el ícono si es necesario
      this.icons.push(icon);
    });
  }

  applyPlayerAttributes() {
    const player1Attributes = this.player1Atributes.getAttributes();
    const player2Attributes = this.player2Atributes.getAttributes();

    // Asignar atributos para jugador 1
    if (player1Attributes.speedBoost) {
      console.log('hola' + player1Attributes.speedBoost)
      this.movingBar1.setSpeed(
        this.movingBar1.movingSpeed + player1Attributes.speedBoost
      );
    }
    if (player1Attributes.extraLife) {
      console.log('hola' + player1Attributes.extraLife)
      this.player1Atributes.setHitPoints(
        this.player1Atributes.getHitPoints() + player1Attributes.extraLife
      );
    }
    if (player1Attributes.evadeChance) {
      console.log('hola' + player1Attributes.evadeChance)
      this.movingBar1.evadeChance += player1Attributes.evadeChance;
    }

    // Asignar atributos para jugador 2
    if (player2Attributes.speedBoost) {
      console.log('hola' + player2Attributes.speedBoost)
      this.movingBar2.setSpeed(
        this.movingBar2.movingSpeed + player2Attributes.speedBoost
      );
    }
    if (player2Attributes.extraLife) {
      console.log('hola' + player2Attributes.extraLife)
      this.player2Atributes.setHitPoints(
        this.player2Atributes.getHitPoints() + player2Attributes.extraLife
      );
    }
    if (player2Attributes.evadeChance) {
      console.log('hola' + player2Attributes.evadeChance)
      this.movingBar2.evadeChance += player2Attributes.evadeChance;
    }
  }

  showPurchasedItemIcons() {
    // Mostrar íconos de ítems comprados
    this.purchasedItems.forEach((item, index) => {
      let icon = this.add.sprite(
        50 + index * 50,
        this.game.scale.height - 50,
        item
      );
      icon.setScale(0.5);
      this.icons.push(icon);
    });
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
    // Verificar si el ataque es esquivado
    if (Math.random() < target.getHitPoints() * (target.evadeChance / 100)) {
      console.log(`Jugador ${target.playerId} esquivó el ataque!`);
      return; // Termina el método si el ataque es esquivado
    }

    // Reducir puntos de vida si el ataque impacta
    target.setHitPoints(target.getHitPoints() - 1);

    if (target.getHitPoints() <= 0) {
      this.gameOver(target.playerId); // Lógica de fin de juego si el jugador no tiene vida
    }
  }

  gameOver(loser) {
    // Lógica para manejar el fin del juego
    console.log(`Jugador ${loser} ha perdido!`);
    this.scene.restart();
  }
}
