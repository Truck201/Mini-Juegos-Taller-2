import { AtributesPlayers } from "./newatributes";
export class ItemsCase {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.items = [];
    this.selectedItems = [];

    this.mainItemCase = this.scene.add.rectangle(
      this.width / 2 - 35, // Posicion ancho
      this.height / 1.21,
      360, // Dimension Ancho
      380,
      0x272736
    );

    // Definición de atributos de los ítems
    this.itemAttributes = {
      candy: { hitPoints: 1, speed: 0, evadeChance: 0 },
      popcorn: { hitPoints: 0, speed: 0, evadeChance: 10 },
      pizza: { hitPoints: 0, speed: 1.5, evadeChance: 0 },
    };

    // Inicializar animaciones
    this.initAnimations();

    this.selectedItemsPlayer1 = [];
    this.selectedItemsPlayer2 = [];
    this.player1Position = { row: 0, col: 0 };
    this.player2Position = { row: 0, col: 4 };

    this.createItems();

    // Crear los cuadros que indican la posición de cada jugador
    this.player1Indicator = this.scene.add.rectangle(0, 0, 75, 75);
    this.player1Indicator.setStrokeStyle(4, 0xff0000); // Rojo para jugador 1

    this.player2Indicator = this.scene.add.rectangle(0, 0, 75, 75);
    this.player2Indicator.setStrokeStyle(4, 0x0000ff); // Azul para jugador 2

    this.player1Atributes = new AtributesPlayers(this, 1);
    this.player2Atributes = new AtributesPlayers(this, 2);

    this.setupPlayerKeys();

    // Seleccionar los primeros cuadrados al inicio
    this.paintPlayerPosition(this.player1Position, 0.3); // Jugador 1  0xff0000
    this.paintPlayerPosition(this.player2Position, 0.3); // Jugador 2 0x0000ff

    // Posicionar los indicadores sobre los ítems iniciales
    this.updateIndicatorPosition(this.player1Indicator, this.player1Position);
    this.updateIndicatorPosition(this.player2Indicator, this.player2Position);

    this.canSelect = true;
  }

  setupPlayerKeys() {
    this.player1Keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      select: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    this.player2Keys = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.UP,
      down: Phaser.Input.Keyboard.KeyCodes.DOWN,
      left: Phaser.Input.Keyboard.KeyCodes.LEFT,
      right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      select: Phaser.Input.Keyboard.KeyCodes.ENTER,
    });
  }

  initAnimations() {
    this.scene.anims.create({
      key: "popcorn_idle",
      frames: this.scene.anims.generateFrameNumbers("popcorn", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "candy-idle",
      frames: this.scene.anims.generateFrameNumbers("candy", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "pizza_idle",
      frames: this.scene.anims.generateFrameNumbers("pizza", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1,
    });
  }

  createItems() {
    const rows = 4;
    const cols = 5;
    const itemSize = 70;
    const offsetX = this.width / 2 - (cols * itemSize) / 2;
    const offsetY = this.height / 1.23 - (rows * itemSize) / 2;

    // Solo 9 items
    const avalibleItems = [
      "popcorn",
      "candy",
      "pizza",
      "popcorn",
      "candy",
      "pizza",
      "popcorn",
      "candy",
      "pizza",
      "pizza",
      "popcorn",
      "candy",
      "pizza",
      "popcorn",
      "candy",
      "pizza",
      "popcorn",
      "candy",
      "pizza",
      "candy",
    ];

    const randomItems = Phaser.Utils.Array.Shuffle(avalibleItems).slice(0, 20);

    let index = 0;
    // Crear la cuadrícula de elementos
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * itemSize;
        const y = offsetY + row * itemSize;

        const itemType = randomItems[index];
        const item = this.scene.add.sprite(x, y, itemType);
        this.scene.physics.add.existing(item);
        item.setImmovable;
        item.body.allowGravity = false;
        item.setInteractive();
        item.setScale(0.9);

        item.isSelected = false; // Estado de selección
        item.selectedBy = null; // Jugador que lo seleccionó
        item.row = row;
        item.col = col;
        this.items.push(item);

        // Iniciar la animación dependiendo del tipo de ítem
        if (itemType === "popcorn") {
          item.play("popcorn_idle");
        } else if (itemType === "candy") {
          item.play("candy-idle");
        } else if (itemType === "pizza") {
          item.play("pizza_idle");
        }

        index++;
      }
    }
  }

  update() {
    this.handlePlayerMovement(this.player1Keys, this.player1Position, 0xff0000);
    this.handlePlayerMovement(this.player2Keys, this.player2Position, 0x0000ff);

    // Actualizar la posición del indicador de cada jugador
    this.updateIndicatorPosition(this.player1Indicator, this.player1Position);
    this.updateIndicatorPosition(this.player2Indicator, this.player2Position);

    // Lógica de selección de jugadores
    this.handleSelection(1, this.selectedItemsPlayer1, this.player1Keys); // Jugador 1 rojo
    this.handleSelection(2, this.selectedItemsPlayer2, this.player2Keys); // Jugador 2 azul
  }

  // Método para agregar un ítem
  addItem(item) {
    this.items.push(item);
  }

  // Mover el indicador a la posición correcta
  updateIndicatorPosition(indicator, playerPosition) {
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (item) {
      indicator.setPosition(item.x, item.y); // Posicionar el cuadro sobre el ítem
    }
  }

  handlePlayerMovement(playerKeys, playerPosition, color) {
    const prevPosition = { ...playerPosition };

    if (Phaser.Input.Keyboard.JustDown(playerKeys.up)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row - 1, 0, 3);
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.down)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row + 1, 0, 3);
    }

    if (Phaser.Input.Keyboard.JustDown(playerKeys.left)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col - 1, 0, 4);
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.right)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col + 1, 0, 4);
    }

    this.paintPlayerPosition(prevPosition, 1);
    this.paintPlayerPosition(playerPosition, 0.2);
  }

  handleSelection(player, selectedItems, keys) {
    const playerPosition = player === 1 ? this.player1Position : this.player2Position;
    const item = this.items.find((item) => item.row === playerPosition.row && item.col === playerPosition.col);

    // Verifica si el ítem existe
    if (!item) {
      console.error(
        `No se encontró ningún ítem en la posición (${playerPosition.row}, ${playerPosition.col})`
      );
      return;
    }

    if (Phaser.Input.Keyboard.JustUp(keys.select) && this.canSelect) {
      this.canSelect = false;
      setInterval(() => {
        this.canSelect = true;
      }, 300);
      
      if (item.isSelected && item.selectedBy === player) {
        // Deseleccionar y devolver puntos
        item.clearTint();
        item.setAlpha(1);
        item.isSelected = false;
        item.selectedBy = null;
        const index = selectedItems.indexOf(item);
        if (index !== -1) {
          this.returnPoints(player);
          this.removeItemAttributes(player, item.texture.key);
          selectedItems.splice(index, 1);
          this.selectedItems.splice(index, 1)
          console.log(`Remove item for ${player}:`, item.texture.key);
        }
      } else if (!item.isSelected && selectedItems.length < 3) {
        if (player === 1 && this.scene.points1 >= 5) {
          this.purchaseItem(player, item);
          item.setTint(0x272736); //  0xff0000  Rojo
          item.setAlpha(0.5);
          item.isSelected = true;
          item.selectedBy = player;
          selectedItems.push(item);
          console.log(`Selected item for jugador 2:`, item.texture.key);
          this.applyItemAttributes(player, item.texture.key); // Asignar atributos al jugador 1
        } else if (player === 2 && this.scene.points2 >= 5) {
          this.purchaseItem(player, item);
          item.setTint(0x272736); //  0x0000ff  Azul
          item.setAlpha(0.5);
          item.isSelected = true;
          item.selectedBy = player;
          selectedItems.push(item);
          console.log(`Selected item for jugador 2:`, item.texture.key);
          this.applyItemAttributes(player, item.texture.key); // Asignar atributos al jugador 2
        }
      }
    }
  }

  paintPlayerPosition(playerPosition, alpha) {
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (item && !item.isSelected) {
      item.setAlpha(alpha); // Pintar la posición actual del jugador
    }
  }

  // Función para reducir puntos al comprar ítems
  purchaseItem(player, item) {
    const hudScene = this.scene.scene.get("hudShop");

    if (player === 1 && this.scene.points1 >= 5) {
      this.scene.points1 -= 5;
      hudScene.update_points(1, this.scene.points1);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      return true;
    } else if (player === 2 && this.scene.points2 >= 5) {
      this.scene.points2 -= 5;
      hudScene.update_points(2, this.scene.points2);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      return true;
    } else {
      console.log("No tiene suficientes puntos para comprar");
      return false;
    }
  }

  returnPoints(player) {
    const hudScene = this.scene.scene.get("hudShop");
    if (player === 1) {
      this.scene.points1 += 5;
      hudScene.update_points(1, this.scene.points1);
      console.log("Vuelto");
    } else if (player === 2) {
      this.scene.points2 += 5;
      hudScene.update_points(2, this.scene.points2);
    }
  }

  applyItemAttributes(player, itemType) {
    const attributes = this.itemAttributes[itemType];
    if (attributes) {
      console.log("Aplicando atributos:" + attributes);
      if (player === 1) {
        console.log("player 1");
        this.player1Atributes.updateAttributes(attributes);
      } else if (player === 2) {
        console.log("player 2");
        this.player2Atributes.updateAttributes(attributes);
      }
    } else {
      console.error(
        `No se encontraron atributos para el tipo de ítem: ${itemType}`
      );
    }
  }

  removeItemAttributes(player, itemType) {
    const attributes = this.itemAttributes[itemType];
    if (attributes) {
      console.log("Remove atributos:" + player + "," + attributes);
      if (player === 1) {
        this.player1Atributes.removeAttributes(attributes);
      } else if (player === 2) {
        this.player2Atributes.removeAttributes(attributes);
      }
    } else {
      console.error(
        `No se encontraron atributos para el tipo de ítem: ${itemType}`
      );
    }
  }
}
