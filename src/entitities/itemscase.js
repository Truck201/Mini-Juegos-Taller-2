import { AtributesPlayers } from "./newatributes";
export class ItemsCase {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.items = [];
    this.selectedItems = [];

    this.maxItems = 3;

    this.selectedItemsPlayer1 = [];
    this.selectedItemsPlayer2 = [];

    this.player1Position = { row: 0, col: 0 };
    this.player2Position = { row: 0, col: 3 };

    // Slots para cada jugador
    this.player1Slots = this.createItemSlots(
      this.width * 0.286,
      this.height * 0.67
    );
    this.player2Slots = this.createItemSlots(
      this.width * 0.715,
      this.height * 0.67
    );

    this.mainItemCase = this.scene.add
      .rectangle(
        this.width / 2, // Posicion ancho
        this.height * 0.816,
        280, // Dimension Ancho
        220,
        0x272736
      )
      .setDepth(0);

    // Descripción del ítem para jugador 1 y jugador 2
    this.descriptionItemPlayer1 = this.scene.add.text(
      this.width * 0.125,
      this.height * 0.68,
      "",
      {
        fontSize: "16px",
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#fff",
        stroke: "gold",
        strokeThickness: 4,
        maxLines: 4,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      }
    );

    this.scene.add
      .sprite(this.width * 0.193, this.height * 0.72, "pochoclo2")
      .setDepth(2);

    this.descriptionItemPlayer2 = this.scene.add.text(
      this.width * 0.88,
      this.height * 0.68,
      "",
      {
        fontSize: "16px",
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#fff",
        stroke: "gold",
        strokeThickness: 4,
        maxLines: 4,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      }
    );

    this.scene.add
      .sprite(this.width * 0.95, this.height * 0.72, "pochoclo2")
      .setDepth(2);

    this.itemDescriptions = {
      candy: { description: "A sweet treat!\n\t+1 Hit Point", value: 5 },
      popcorn: {
        description: "Perfect for movies!\n\t+10% Evade Chance",
        value: 15,
      },
      pizza: { description: "Delicious slice!\n\t+1.5 Speed", value: 20 },
    };

    // Definición de atributos de los ítems
    this.itemAttributes = {
      candy: { hitPoints: 1, speed: 0, evadeChance: 0 },
      popcorn: { hitPoints: 0, speed: 0, evadeChance: 10 },
      pizza: { hitPoints: 0, speed: 1.5, evadeChance: 0 },
    };

    // Inicializar animaciones
    this.initAnimations();

    this.createItems();

    // Agregar esto en el constructor después de crear los ítems
    this.items.forEach((item) => {
      item.on("pointerover", () => {
        this.showItemDescription(item.texture.key);
      });

      item.on("pointerout", () => {
        this.clearItemDescriptions();
      });
    });

    // Crear los cuadros que indican la posición de cada jugador
    this.player1Indicator = this.scene.add.rectangle(0, 0, 75, 75).setDepth(2);
    this.player1Indicator.setStrokeStyle(4, 0xff0000); // Rojo para jugador 1

    this.player2Indicator = this.scene.add.rectangle(0, 0, 75, 75).setDepth(2);
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

  // Método para crear los slots visuales de ítems para un jugador
  createItemSlots(x, y) {
    let slots = [];
    const slotSize = 70; // Tamaño del slot

    for (let i = 0; i < this.maxItems; i++) {
      let slot = this.scene.add
        .rectangle(x, y + i * (slotSize + 15), slotSize, slotSize, 0x444444)
        .setStrokeStyle(2, 0xffffff)
        .setDepth(2);
      slot.itemSprite = null; // Aquí almacenaremos el sprite del ítem
      slots.push(slot);
    }

    return slots;
  }

  addItemToSlot(player, item) {
    const slots = player === 1 ? this.player1Slots : this.player2Slots;
    const selectedItems =
      player === 1 ? this.selectedItemsPlayer1 : this.selectedItemsPlayer2;

    if (selectedItems.length >= this.maxItems) {
      console.log(`Jugador ${player} ya tiene 3 ítems!`);
      return;
    }

    // Encontrar el primer slot vacío
    const emptySlot = slots.find((slot) => slot.itemSprite === null);

    if (emptySlot) {
      const sprite = this.scene.add
        .sprite(emptySlot.x, emptySlot.y, item.texture.key)
        .setScale(0.8)
        .setDepth(3);
      emptySlot.itemSprite = sprite; // Almacenar el sprite en el slot
      selectedItems.push(item); // Añadir el ítem a la lista de ítems seleccionados
    }
  }

  // Método para vender un ítem y liberar el slot
  removeItemFromSlot(player, item) {
    const slots = player === 1 ? this.player1Slots : this.player2Slots;
    const selectedItems =
      player === 1 ? this.selectedItemsPlayer1 : this.selectedItemsPlayer2;

    const index = selectedItems.indexOf(item);
    if (index > -1) {
      selectedItems.splice(index, 1); // Remover el ítem de la lista de seleccionados

      // Encontrar el slot correspondiente y eliminar el sprite
      const slot = slots[index];
      if (slot.itemSprite) {
        slot.itemSprite.destroy(); // Eliminar el sprite del ítem
        slot.itemSprite = null; // Liberar el slot
      }
      // Reajustar los ítems restantes en los slots
      this.updatePlayerSlots(player);
    }
  }

  // Método para reajustar los ítems en los slots después de vender
  updatePlayerSlots(player) {
    const slots = player === 1 ? this.player1Slots : this.player2Slots;
    const selectedItems =
      player === 1 ? this.selectedItemsPlayer1 : this.selectedItemsPlayer2;

    // Limpiar todos los slots
    slots.forEach((slot) => {
      if (slot.itemSprite) {
        slot.itemSprite.destroy();
        slot.itemSprite = null;
      }
    });

    // Recolocar los ítems seleccionados en los slots
    selectedItems.forEach((item, index) => {
      const slot = slots[index];
      const sprite = this.scene.add
        .sprite(slot.x, slot.y, item.texture.key)
        .setScale(0.8)
        .setDepth(3);
      slot.itemSprite = sprite;
    });
  }

  showItemDescription(itemType) {
    const description = this.itemDescriptions[itemType];
    if (description) {
      this.descriptionItemPlayer1
        .setText(
          `${description.description} \n\n\t  ${description.value} Points`
        )
        .setDepth(2)
        .setOrigin(0.5, 0.5);
      this.descriptionItemPlayer2.setText("");
    }
  }

  clearItemDescriptions() {
    this.descriptionItemPlayer1.setText("");
    this.descriptionItemPlayer2.setText("");
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
    const rows = 3;
    const cols = 4;
    const itemSize = 70;
    const offsetX = this.width / 2 - (cols * itemSize) / 2 + 35;
    const offsetY = this.height / 1.2 - (rows * itemSize) / 2;

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
        item.setDepth(3);

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
    this.handlePlayerMovement(this.player1Keys, this.player1Position);
    this.handlePlayerMovement(this.player2Keys, this.player2Position);

    // Actualizar la posición del indicador de cada jugador
    this.updateIndicatorPosition(this.player1Indicator, this.player1Position);
    this.updateIndicatorPosition(this.player2Indicator, this.player2Position);

    // Verificar si las posiciones de los jugadores coinciden con los ítems
    this.checkPlayerItemCollision(
      this.player1Position,
      this.descriptionItemPlayer1
    );
    this.checkPlayerItemCollision(
      this.player2Position,
      this.descriptionItemPlayer2
    );

    // Lógica de selección de jugadores
    this.handleSelection(1, this.selectedItemsPlayer1, this.player1Keys); // Jugador 1 rojo
    this.handleSelection(2, this.selectedItemsPlayer2, this.player2Keys); // Jugador 2 azul
  }

  // Método para agregar un ítem
  addItem(item) {
    this.items.push(item);
  }

  checkPlayerItemCollision(playerPosition, descriptionText) {
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (item) {
      const description = this.itemDescriptions[item.texture.key];
      if (description) {
        descriptionText
          .setText(
            `${description.description} \n\n\t  ${description.value} Points`
          )
          .setDepth(2)
          .setOrigin(0.5, 0.5);
      }
    } else {
      descriptionText.setText(""); // Limpiar la descripción si no hay coincidencia
    }
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

  handlePlayerMovement(playerKeys, playerPosition) {
    const prevPosition = { ...playerPosition };

    if (Phaser.Input.Keyboard.JustDown(playerKeys.up)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row - 1, 0, 2);
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.down)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row + 1, 0, 2);
    }

    if (Phaser.Input.Keyboard.JustDown(playerKeys.left)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col - 1, 0, 3);
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.right)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col + 1, 0, 3);
    }

    this.paintPlayerPosition(prevPosition, 1);
    this.paintPlayerPosition(playerPosition, 0.2);
  }

  handleSelection(player, selectedItems, playerKeys) {
    const playerPosition =
      player === 1 ? this.player1Position : this.player2Position;
    const item = this.items.find(
      (item) =>
        item.row === playerPosition.row && item.col === playerPosition.col
    );

    if (!item) {
      console.error(
        `No se encontró ningún ítem en la posición (${playerPosition.row}, ${playerPosition.col})`
      );
      return;
    }

    if (Phaser.Input.Keyboard.JustUp(playerKeys.select) && this.canSelect) {
      this.canSelect = false;
      setInterval(() => {
        this.canSelect = true;
      }, 300);

      if (item.isSelected && item.selectedBy === player) {
        item.clearTint();
        item.setAlpha(1);
        item.isSelected = false;
        item.selectedBy = null;
        const index = selectedItems.indexOf(item);
        

        if (index !== -1) {
          console.log(`Antes de eliminar el ítem, selectedItems: `,selectedItems);
        
          this.selectedItems.splice(index, 1);
          console.log(`Después de eliminar el ítem, selectedItems: `,selectedItems);
          this.removeItemFromSlot(player, item);
          this.returnPoints(player, item.texture.key);
          console.log(`Puntos devueltos para el jugador ${player}`);
          this.removeItemAttributes(player, item.texture.key);
          console.log(`Remove item for ${player}:`, item.texture.key);
        }
      } else if (!item.isSelected && selectedItems.length < this.maxItems) {
        const itemValue = this.itemDescriptions[item.texture.key].value;
        if (player === 1 && this.scene.points1 >= itemValue) {
          this.purchaseItem(player, item, item.texture.key);
          item.setTint(0x272736); //  0xff0000  Rojo
          item.setAlpha(0.5);
          this.addItemToSlot(player, item);
          item.isSelected = true;
          item.selectedBy = player;
          console.log(`Selected item for jugador 2:`, item.texture.key);
          this.applyItemAttributes(player, item.texture.key); // Asignar atributos al jugador 1
        } else if (player === 2 && this.scene.points2 >= itemValue) {
          this.purchaseItem(player, item, item.texture.key);
          item.setTint(0x272736); //  0x0000ff  Azul
          item.setAlpha(0.5);
          this.addItemToSlot(player, item);
          item.isSelected = true;
          item.selectedBy = player;
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
  purchaseItem(player, item, itemType) {
    const hudScene = this.scene.scene.get("hudShop");
    const itemValue = this.itemDescriptions[itemType].value;
    if (player === 1 && this.scene.points1 >= itemValue) {
      this.scene.points1 -= itemValue;
      hudScene.update_points(1, this.scene.points1);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      return true;
    } else if (player === 2 && this.scene.points2 >= itemValue) {
      this.scene.points2 -= itemValue;
      hudScene.update_points(2, this.scene.points2);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      return true;
    } else {
      console.log("No tiene suficientes puntos para comprar");
      return false;
    }
  }

  returnPoints(player, itemType) {
    const hudScene = this.scene.scene.get("hudShop");
    const itemValue = this.itemDescriptions[itemType].value;
    if (player === 1) {
      this.scene.points1 += itemValue;
      hudScene.update_points(1, this.scene.points1);
      console.log("Puntos devueltos al jugador 1: ", this.scene.points1);
    } else if (player === 2) {
      this.scene.points2 += itemValue;
      hudScene.update_points(2, this.scene.points2);
      console.log("Puntos devueltos al jugador 2: ", this.scene.points2);
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

  removeItemFromSelected(player, itemType) {
    const selectedItems =
      player === 1 ? this.selectedItemsPlayer1 : this.selectedItemsPlayer2;
    const index = selectedItems.indexOf(itemType);
    if (index !== -1) {
      selectedItems.splice(index, 1);
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
