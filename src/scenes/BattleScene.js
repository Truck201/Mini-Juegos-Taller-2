import { MoveBar } from "../entitities/movebar";
import { Television } from "../entitities/television";
import { Attack } from "../entitities/attack";
import { AtributesPlayers } from "../entitities/newatributes"; // Importa la clase
import { Character } from "../entitities/character";
import { BaseScene } from "../lib/FontsBase";

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

    this.canAttackPlayer1 = true;
    this.canAttackPlayer2 = true;
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

    const player1Speed =
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

    const player2Speed =
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
    this.createText(
      width * 0.018,
      height * 0.25,
      `Speed: ${player1Speed.toString().padStart(2, "0")}`
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
    this.createText(
      width * 0.858,
      height * 0.25,
      `Speed: ${player2Speed.toString().padStart(2, "0")}`
    ).setDepth(3);
    this.createText(
      width * 0.858,
      height * 0.3,
      `Evade: ${this.player2EvadeChance.toString().padStart(2, "0")}`
    ).setDepth(3);

    this.television = new Television(this);

    let background = this.add.sprite(width / 2, height / 2 + 65, "escenario");
    background.setDepth(1);

    const itemsCase = this.scene.get("ItemsCase");

    let character1 = new Character(this, "mimbo", true);
    let character2 = new Character(this, "luho", false);

    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 1000, 95, 0x272736);
    this.imagenBar = this.add.sprite(barraX, barraY, "imagen-barra");
    this.imagenBar.setDepth(2);

    this.attackBar = new Attack(this);

    this.movingBar1 = new MoveBar(
      this,
      barraX - 500,
      barraY,
      20,
      105,
      player1Speed,
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
      player2Speed,
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

    this.healthText = this.add.text(100, 240, "", {
      fontSize: "33px",
      fill: "#fff",
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
      Phaser.Input.Keyboard.JustDown(this.spaceKey) &&
      this.canAttackPlayer1 // Acción de jugador 1
    ) {
      this.destroyAndRespawn(); // Destruye y reaparece

      if (
        this.player2Atributes.takeDamage(
          2,
          this.player2EvadeChance,
          this.player2HP
        )
      ) {
        this.cameras.main.shake(200, 0.025);
      } else {
        this.showMissMessage();
      }

      this.player2HP = this.player2Atributes.getHitPoints(2);
      this.player2HPText.setText(
        `${this.player2HP.toString().padStart(2, "0")}`
      );

      this.canAttackPlayer1 = false;
      this.canAttackPlayer2 = false;
      this.time.delayedCall(3000, () => {
        this.canAttackPlayer1 = true;
        this.canAttackPlayer2 = true;
      });
    }

    // Si se presiona enter, jugador 2 destruye un recolectable
    if (
      this.checkCollision(movingBar2Sprite, this.attackBar.sprite) &&
      Phaser.Input.Keyboard.JustDown(this.enterKey) &&
      this.canAttackPlayer2 // Acción de jugador 2
    ) {
      this.destroyAndRespawn(); // Destruye y reaparece en rojo

      if (
        this.player1Atributes.takeDamage(
          1,
          this.player1EvadeChance,
          this.player1HP
        )
      ) {
        this.cameras.main.shake(200, 0.025);
      } else {
        this.showMissMessage();
      }

      this.player1HP = this.player1Atributes.getHitPoints(1);
      this.player1HPText.setText(
        `${this.player1HP.toString().padStart(2, "0")}`
      );

      this.canAttackPlayer1 = false;
      this.canAttackPlayer2 = false;
      this.time.delayedCall(3000, () => {
        this.canAttackPlayer1 = true;
        this.canAttackPlayer2 = true;
      });
    }

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
  }

  showPurchasedItemIcons() {
    const offsetX = 50; // Distancia horizontal de los íconos
    const iconY = 50; // Altura donde se mostrarán los íconos

    this.purchasedItems.forEach((item, index) => {
      const icon = this.add.sprite(100 + index * offsetX, iconY, "item"); // Reemplaza item.spriteKey con la clave correcta de tu sprite
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

    this.time.delayedCall(Phaser.Math.Between(3000, 4500), () => {
      this.attackBar.respawn();
    });
  }

  showMissMessage() {
    const missText = this.add
      .text(this.attackBar.sprite.x, this.attackBar.sprite.y - 5, "MISS", {
        fontSize: "190px",
        color: "#fff",
        fontFamily: "Press Start 2P",
        fontWeight: "bold",
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      })
      .setOrigin(0.5)
      .setDepth(5);

    this.tweens.add({
      targets: missText,
      scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
      alpha: { from: 1, to: 0 }, // Desaparecer el texto
      duration: 1500, // Duración de la animación (1 segundo)
      ease: "Power2",
      onComplete: () => {
        missText.destroy(); // Eliminar el texto después de la animación
      },
    });
  }
}
