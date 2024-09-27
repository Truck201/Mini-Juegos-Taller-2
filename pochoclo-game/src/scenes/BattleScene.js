import { Scene } from "phaser";
import { MoveBar } from "../entitities/movebar";
import { Television } from "../entitities/television";
import { Attack } from "../entitities/attack";
import { AtributesPlayers } from "../entitities/newatributes"; // Importa la clase
import { Character } from "../entitities/character";

export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
    this.movingBar1 = null;
    this.movingBar2 = null;

    // Crear los objetos de atributos para cada jugador
    this.player1Atributes = new AtributesPlayers(this, 1);
    this.player2Atributes = new AtributesPlayers(this, 2);
  }

  game_over_timeout;
  timer_event;
  icons = []; // Agregar un array para almacenar íconos de ítems

  init(data) {
    
    this.game_over_timeout = 60; // Tiempo límite de 30 segundos
    this.purchasedItems = data.selectedItems || []; // Obtener los ítems comprados
    this.selectedItemsPlayer1 = data.selected1Player || [];
    this.selectedItemsPlayer2 = data.selected2Player || [];

    console.log(this.selectedItemsPlayer1)
    console.log(this.selectedItemsPlayer2)

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
    
    let background = this.add.sprite(width/2, height / 2 + 65, 'escenario')
    background.setDepth(1)

    const itemsCase = this.scene.get("ItemsCase");
    
    let character1 = new Character(this, 'mimbo', true)
    let character2 = new Character(this, 'luho', false)

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 1000, 95, 0x272736);
    this.imagenBar = this.add.sprite(barraX, barraY, "imagen-barra");
    this.imagenBar.setDepth(2)

    this.attackBar = new Attack(this);

    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 500,
      barraY,
      20,
      105,
      7,
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
      7,
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
    this.showPurchasedItemIcons();

    this.healthText = this.add.text(100, 240, '', {
      fontSize: '33px',
      fill: '#fff',
    });
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
      this.getDamageStrength = this.player1Atributes.takeDamage()
      this.player1Atributes.takeDamage(this.player1Atributes.atributes.damageStrength); // Aplica daño al jugador 1
      this.destroyAndRespawn(); // Destruye y reaparece
    }

    // Si se presiona enter, jugador 2 destruye un recolectable
    if (
      this.checkCollision(movingBar2Sprite, this.attackBar.sprite) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey) // Acción de jugador 2
    ) {
      this.player2Atributes.takeDamage(this.player2Atributes.atributes.damageStrength); // Aplica daño al jugador 2
      this.destroyAndRespawn(); // Destruye y reaparece en rojo
    }

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
  }

  // Aplica los ítems adquiridos a los jugadores
  applyPurchasedItem(item, player) {
    const itemType = item.texture.key;

    if (player === 1) {
      this.player1Atributes.applyAttributes(itemType);
    } else if (player === 2) {
      this.player2Atributes.applyAttributes(itemType);
    }

    console.log(`Item ${itemType} aplicado al jugador ${player}`);
  }

  showPurchasedItemIcons() {
    const offsetX = 50; // Distancia horizontal de los íconos
    const iconY = 50; // Altura donde se mostrarán los íconos

    this.purchasedItems.forEach((item, index) => {
      const icon = this.add.sprite(
        100 + index * offsetX,
        iconY,
        'item'
      ); // Reemplaza item.spriteKey con la clave correcta de tu sprite
      icon.setScale(0.5); // Escalar el ícono si es necesario
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
