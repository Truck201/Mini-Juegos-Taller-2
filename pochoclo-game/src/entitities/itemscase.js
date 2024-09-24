export class ItemsCase {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    this.mainItemCase = this.scene.add.rectangle(
      this.width / 2 - 35, // Posicion ancho
      this.height / 1.21,
      360, // Dimension Ancho
      380,
      0x272736
    );

    // Definición de atributos de los ítems
    this.itemAttributes = {
      candy: { speedBoost: 50 },
      popcorn: { extraLife: 1 },
      pizza: { evadeChance: 10 },
    };

    // Inicializar animaciones
    this.initAnimations();

    this.items = [];
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

    // Teclas para cada jugador
    // Teclas para cada jugador
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

    // Seleccionar los primeros cuadrados al inicio
    this.paintPlayerPosition(this.player1Position, 0xff0000, 0.3); // Jugador 1  0xff0000
    this.paintPlayerPosition(this.player2Position, 0x0000ff, 0.3); // Jugador 2 0x0000ff

    // Posicionar los indicadores sobre los ítems iniciales
    this.updateIndicatorPosition(this.player1Indicator, this.player1Position);
    this.updateIndicatorPosition(this.player2Indicator, this.player2Position);

    this.canSelect = true;
  }

  initAnimations() {
    this.scene.anims.create({
      key: "pororo_idle",
      frames: this.scene.anims.generateFrameNumbers("pororo-tienda", {
        start: 0,
        end: 5,
      }),
      frameRate: 4,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.scene.anims.create({
      key: "caramelo_idle",
      frames: this.scene.anims.generateFrameNumbers("caramelo", {
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
      "pororo-tienda",
      "caramelo",
      "pizza",
      "pororo-tienda",
      "caramelo",
      "pizza",
      "pororo-tienda",
      "caramelo",
      "pizza",
      "pizza",
      "pororo-tienda",
      "caramelo",
      "pizza",
      "pororo-tienda",
      "caramelo",
      "pizza",
      "pororo-tienda",
      "caramelo",
      "pizza",
      "caramelo",
    ];

    const randomItems = Phaser.Utils.Array.Shuffle(avalibleItems).slice(0, 20);

    let index = 0;
    // Crear la cuadrícula de elementos
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * itemSize;
        const y = offsetY + row * itemSize;

        const ItemType = randomItems[index];
        const item = this.scene.add.sprite(x, y, ItemType);
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
        if (ItemType === "pororo-tienda") {
          item.play("pororo_idle");
        } else if (ItemType === "caramelo") {
          item.play("caramelo_idle");
        } else if (ItemType === "pizza") {
          item.play("pizza_idle");
        }

        index++;
      }
    }
  }

  update() {
    // Lógica de movimiento de jugadores
    this.handlePlayerMovement(
      1,
      this.player1Position,
      this.player1Keys,
      0xff0000
    ); // Rojo para jugador 1
    this.handlePlayerMovement(
      2,
      this.player2Position,
      this.player2Keys,
      0x0000ff
    ); // Azul para jugador 2

    // Actualizar la posición del indicador de cada jugador
    this.updateIndicatorPosition(this.player1Indicator, this.player1Position);
    this.updateIndicatorPosition(this.player2Indicator, this.player2Position);

    // Lógica de selección de jugadores
    this.handleSelection(
      1,
      this.selectedItemsPlayer1,
      this.player1Keys,
      0xff0000
    ); // Jugador 1 rojo
    this.handleSelection(
      2,
      this.selectedItemsPlayer2,
      this.player2Keys,
      0x0000ff
    ); // Jugador 2 azul
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

  handlePlayerMovement(player, playerPosition, keys, color) {
    // Guardar la posición anterior para pintar
    const prevPosition = { ...playerPosition };

    // Movimiento del jugador
    if (Phaser.Input.Keyboard.JustDown(keys.up)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row - 1, 0, 3);
    } else if (Phaser.Input.Keyboard.JustDown(keys.down)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row + 1, 0, 3);
    }

    if (Phaser.Input.Keyboard.JustDown(keys.left)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col - 1, 0, 4);
    } else if (Phaser.Input.Keyboard.JustDown(keys.right)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col + 1, 0, 4);
    }

    // Pintar la nueva posición del jugador
    this.paintPlayerPosition(prevPosition, 0xffffff); // Limpia la posición anterior
    this.paintPlayerPosition(playerPosition, color, 0.2); // Actualiza la nueva posición
  }

  handleSelection(player, selectedItems, keys, color) {
    const playerPosition =
      player === 1 ? this.player1Position : this.player2Position;
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (Phaser.Input.Keyboard.JustUp(keys.select) && this.canSelect) {
      setInterval(() => {
        this.canSelect = true;
      }, 300);
      this.canSelect = false; // Bloqueamos la selección temporalmente
      if (item.isSelected && item.selectedBy === player) {
        // Deseleccionar y devolver puntos
        item.clearTint();
        item.setAlpha(1);
        item.isSelected = false;
        item.selectedBy = null;
        const index = selectedItems.indexOf(item);
        if (index !== -1) {
          selectedItems.splice(index, 1);
          this.returnPoints(player);
          this.removeItemAttributes(
            player === 1 ? this.scene.player1 : this.scene.player2,
            item.texture.key
          );
        }
      } else if (!item.isSelected && selectedItems.length < 3) {
        if (player === 1 && this.scene.points1 >= 5) {
          this.purchaseItem(player);
          item.setTint(0x272736); //  0xff0000  Rojo
          item.setAlpha(0.5);
          item.isSelected = true;
          item.selectedBy = player;
          selectedItems.push(item);
          this.applyItemAttributes(this.scene.player1, item.texture.key); // Asignar atributos al jugador 1
        } else if (player === 2 && this.scene.points2 >= 5) {
          this.purchaseItem(player);
          item.setTint(0x272736); //  0x0000ff  Azul
          item.setAlpha(0.5);
          item.isSelected = true;
          item.selectedBy = player;
          selectedItems.push(item);
          this.applyItemAttributes(this.scene.player2, item.texture.key); // Asignar atributos al jugador 2
        }
      }
    }
  }

  paintPlayerPosition(playerPosition, color, alpha) {
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (item && !item.isSelected) {
      item.setAlpha(alpha); // Pintar la posición actual del jugador
    }
  }

  // Función para reducir puntos al comprar ítems
  purchaseItem(player) {
    const hudScene = this.scene.scene.get("hudShop");

    if (player === 1 && this.scene.points1 >= 5) {
      this.scene.points1 -= 5;
      hudScene.update_points(1, this.scene.points1);
      return true;
    } else if (player === 2 && this.scene.points2 >= 5) {
      this.scene.points2 -= 5;
      hudScene.update_points(2, this.scene.points2);
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
      // Asignar los atributos al jugador
      player.applyAttributes(attributes);
    }
  }
  

  removeItemAttributes(player, itemType) {
    const attributes = this.itemAttributes[itemType];
    if (attributes) {
      // Remover los atributos del jugador
      player.removeAttributes(attributes);
    }
  }
}
