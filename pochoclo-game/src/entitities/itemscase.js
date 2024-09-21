export class ItemsCase {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    this.mainItemCase = this.scene.add.rectangle(
      this.width / 2,
      this.height / 2,
      840,
      500,
      0x272736
    );

    this.items = [];
    this.selectedItemsPlayer1 = [];
    this.selectedItemsPlayer2 = [];
    this.player1Position = { row: 0, col: 0 };
    this.player2Position = { row: 0, col: 4 };

    this.createItems();

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
    this.paintPlayerPosition(this.player1Position, 0xff0000, 0.4); // Jugador 1
    this.paintPlayerPosition(this.player2Position, 0x0000ff, 0.4); // Jugador 2
  }

  createItems() {
    const rows = 4;
    const cols = 5;
    const itemSize = 80;
    const offsetX = this.width / 2 - (cols * itemSize) / 2;
    const offsetY = this.height / 2 - (rows * itemSize) / 2;

    // Crear la cuadrícula de elementos
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * itemSize;
        const y = offsetY + row * itemSize;

        const item = this.scene.add.rectangle(
          x,
          y,
          itemSize - 10,
          itemSize - 10,
          0xffffff
        );
        this.scene.physics.add.existing(item);
        item.setImmovable;
        item.body.allowGravity = false;
        item.isSelected = false; // Estado de selección
        item.selectedBy = null; // Jugador que lo seleccionó
        item.row = row;
        item.col = col;
        this.items.push(item);
      }
    }
  }

  update() {
    // Lógica de movimiento de jugadores
    this.handlePlayerMovement(1, this.player1Position, this.player1Keys); // Rojo para jugador 1
    this.handlePlayerMovement(2, this.player2Position, this.player2Keys); // Azul para jugador 2

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

  handlePlayerMovement(player, playerPosition, keys) {
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
    this.paintPlayerPosition(playerPosition, 0xff0000); // Actualiza la nueva posición
  }

  handleSelection(player, selectedItems, keys, color) {
    const playerPosition =
      player === 1 ? this.player1Position : this.player2Position;
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );
  
    // Verificar si el jugador puede seleccionar más ítems (máximo 3)
    if (Phaser.Input.Keyboard.JustDown(keys.select) && selectedItems.length < 3) {
      if (!item.isSelected && item.selectedBy === null) {
        item.setFillStyle(color); // Cambiar color del item seleccionado
        item.isSelected = true;
        item.selectedBy = player; // Marcar quién lo seleccionó
        selectedItems.push(item); // Agregar el ítem a la lista de seleccionados
      }
    }
  }

  paintPlayerPosition(playerPosition, color) {
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );
  
    if (item) {
      item.setFillStyle(color); // Pintar la posición actual del jugador
    }
  }
}
