import { AtributesPlayers } from "./atributos";
import { initAnimations } from "../anims/itemsAnims";
import { getPhrase } from "../services/translations";
export class ItemsCase {
  constructor(scene, width, height, itemDescriptions) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.items = [];
    this.selectedItems = [];
    this.itemDescriptions = itemDescriptions;

    this.maxItems = 3;

    // Sounds
    this.buySomething = this.scene.sound.add("buySomething", { volume: 0.09 });
    this.noMoney = this.scene.sound.add("noCash", { volume: 0.09 });
    this.sellSomething = this.scene.sound.add("sellSound", { volume: 0.09 });
    this.chooseAnItem = this.scene.sound.add("chooseAnItem", { volume: 0.09 });

    this.selectedItemsPlayer1 = [];
    this.selectedItemsPlayer2 = [];

    this.player1Position = { row: 0, col: 0 }; // POSICIONES INICIALES
    this.player2Position = { row: 0, col: 3 }; // POSICIONES INICIALES

    // Slots para cada jugador
    this.player1Slots = this.createItemSlots(
      this.width * 0.3328, // this.width * 0.2919
      this.height * 0.7141
    );
    this.player2Slots = this.createItemSlots(
      this.width * 0.66876, // this.width * 0.709
      this.height * 0.7141
    );

    this.mainItemCase = this.scene.add
      .rectangle(
        this.width / 2, // Posicion ancho
        this.height * 0.816,
        280, // Dimension Ancho
        220,
        0x272736
      )
      .setDepth(0)
      .setAlpha(0);

    // Descripción del ítem para jugador 1 y jugador 2
    this.descriptionItemPlayer1 = this.scene.add
      .text(this.width * 0.154, this.height * 0.764, "", {
        fontSize: "22px",
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#fff",
        stroke: "black",
        strokeThickness: 4,
        maxLines: 4,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      })
      .setOrigin(0.5);

    this.descriptionItemPlayer2 = this.scene.add
      .text(this.width * 0.858, this.height * 0.764, "", {
        fontSize: "22px",
        fontFamily: "'Press Start 2P', sans-serif",
        color: "#fff",
        stroke: "black",
        strokeThickness: 4,
        maxLines: 4,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 3,
          offsetY: 3,
        },
      })
      .setOrigin(0.5);

    // Definición de atributos de los ítems
    this.itemAttributes = {
      popcorn: { evadeChance: 7 },

      glasses: { anchor: 0.3 },

      candy1: { hitPoints: 1, speed: 7 },
      candy2: { hitPoints: 1, speed: 7 },
      candy3: { hitPoints: 1, speed: 7 },

      icecream1: { evadeChance: 15 },
      icecream2: { evadeChance: 15 },
      icecream3: { evadeChance: 15 },

      energizing: { speed: 12 },

      cuthulu: { critical: 15 },

      axe: { damage: 2 },

      palete: { speed: 5, critical: 7 },

      burger: { hitPoints: 3 },

      chocolate: { speed: 5, evadeChance: 7 },

      pizza: { hitPoints: 1, damage: 1 },
    };

    // Inicializar animaciones
    initAnimations(this.scene);

    this.createItems();

    this.attributeIcons = {
      HP: "hp_icon",
      Speed: "speed_icon",
      Evade: "evade_icon",
      CRT: "crt_icon",
      Damage: "damage_icon",
      Anchor: "anchor_icon",
    };

    // Crear los cuadros que indican la posición de cada jugador
    this.player1Indicator = this.scene.add.rectangle(0, 0, 76, 76).setDepth(2);
    this.player1Indicator.setStrokeStyle(4, 0xff004d); // Rojo para jugador 1

    this.player2Indicator = this.scene.add.rectangle(0, 0, 76, 76).setDepth(2);
    this.player2Indicator.setStrokeStyle(4, 0x0778f2); // Azul para jugador 2

    this.player1Atributes = new AtributesPlayers(this);
    this.player2Atributes = new AtributesPlayers(this);

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
    const slotSize = 75; // Tamaño del slot

    for (let i = 0; i < this.maxItems; i++) {
      let slot = this.scene.add
        .rectangle(x, y + i * (slotSize + 30), slotSize, slotSize, 0x444444)
        .setStrokeStyle(2, 0xffffff)
        .setDepth(2)
        .setVisible(false);
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

  createItems() {
    const rows = 3;
    const cols = 4;
    const itemSize = 82;
    const offsetX = this.width / 2 - (cols * itemSize) / 2 + 45;
    const offsetY = this.height * 0.847 - (rows * itemSize) / 2;

    // Solo 9 items
    const avalibleItems = [
      "popcorn",
      "popcorn",
      "popcorn",
      "glasses",
      "glasses",
      "glasses",
      "candy1",
      "candy1",
      "candy1",
      "candy2",
      "candy2",
      "candy2",
      "candy3",
      "candy3",
      "candy3",
      "icecream1",
      "icecream1",
      "icecream1",
      "icecream2",
      "icecream2",
      "icecream2",
      "icecream3",
      "icecream3",
      "icecream3",
      "energizing",
      "energizing",
      "cuthulu",
      "cuthulu",
      "axe",
      "axe",
      "palete",
      "palete",
      "palete",
      "burger",
      "burger",
      "chocolate",
      "chocolate",
      "chocolate",
      "pizza",
      "pizza",
      "pizza",
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
        item.setScale(0.79);
        item.setDepth(3);

        item.isSelected = false; // Estado de selección
        item.selectedBy = null; // Jugador que lo seleccionó
        item.row = row;
        item.col = col;
        this.items.push(item);

        // Iniciar la animación dependiendo del tipo de ítem
        if (itemType === "popcorn") {
          item.play("popcorn-idle");
        } else if (itemType === "glasses") {
          item.play("glasses-idle");
        } else if (itemType === "candy1") {
          item.play("candy-idle1");
        } else if (itemType === "candy2") {
          item.play("candy-idle2");
        } else if (itemType === "candy3") {
          item.play("candy-idle3");
        } else if (itemType === "icecream1") {
          item.play("icecream-idle1");
        } else if (itemType === "icecream2") {
          item.play("icecream-idle2");
        } else if (itemType === "icecream3") {
          item.play("icecream-idle3");
        } else if (itemType === "energizing") {
          item.play("energizing-idle");
        } else if (itemType === "cuthulu") {
          item.play("cuthulu-idle");
        } else if (itemType === "axe") {
          item.play("axe-idle");
        } else if (itemType === "palete") {
          item.play("palete-idle");
        } else if (itemType === "burger") {
          item.play("burger-idle");
        } else if (itemType === "chocolate") {
          item.play("chocolate-idle");
        } else if (itemType === "pizza") {
          item.play("pizza-idle");
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

    if (item && item.texture && item.texture.key) {
      const itemType = item.texture.key;
      const itemData = this.itemDescriptions[itemType];

      if (itemData) {
        let description = itemData[0];
        const price = itemData[1];

        // Asegúrate de que iconSprites e iconSprites2 estén inicializados como arrays
        this.iconSprites = this.iconSprites || [];
        this.iconSprites2 = this.iconSprites2 || [];

        // Destruir iconos anteriores
        if (descriptionText.x < this.width * 0.5) {
          this.iconSprites.forEach((icon) => icon.destroy());
          this.iconSprites = [];
        } else {
          this.iconSprites2.forEach((icon) => icon.destroy());
          this.iconSprites2 = [];
        }

        for (const [attribute, icon] of Object.entries(this.attributeIcons)) {
          const attributeRegex = new RegExp(`\\b${attribute}\\b`, "g");
          if (attributeRegex.test(description)) {
            const iconSprite = this.scene.add
              .sprite(
                descriptionText.x -
                  this.width * 0.02 +
                  (descriptionText.x < this.width * 0.5
                    ? this.width * 0.085 * this.iconSprites.length
                    : this.width * 0.085 * this.iconSprites2.length),
                descriptionText.y,
                icon
              )
              .setDepth(30)
              .setOrigin(0.5)
              .setScale(0.9);

            if (descriptionText.x < this.width * 0.5) {
              this.iconSprites.push(iconSprite);
            } else {
              this.iconSprites2.push(iconSprite);
            }

            description = description.replace(attributeRegex, `  `);
            console.log(attributeRegex);
            console.log(description);
          }
        }

        descriptionText
          .setText(`${description}\n ${getPhrase("Valor")} ${price}P`)
          .setDepth(10)
          .setOrigin(0.5);

        descriptionText.setLineSpacing(28); // Ajusta el valor según el espacio que desees
      } else {
        descriptionText.setText("Descripción no disponible");
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
      this.chooseAnItem.play();
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.down)) {
      playerPosition.row = Phaser.Math.Clamp(playerPosition.row + 1, 0, 2);
      this.chooseAnItem.play();
    }

    if (Phaser.Input.Keyboard.JustDown(playerKeys.left)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col - 1, 0, 3);
      this.chooseAnItem.play();
    } else if (Phaser.Input.Keyboard.JustDown(playerKeys.right)) {
      playerPosition.col = Phaser.Math.Clamp(playerPosition.col + 1, 0, 3);
      this.chooseAnItem.play();
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
    // Verificar si item existe y si item.texture.key está definido
    if (!item || !item.texture || !item.texture.key) {
      console.error(
        `No se encontró ningún ítem o clave de textura en la posición (${playerPosition.row}, ${playerPosition.col})`
      );
      return;
    }
    const itemType = item.texture.key;
    const itemData = this.itemDescriptions[itemType];

    if (!itemData) {
      console.error(`No se encontró la descripción del ítem: ${itemType}`);
      return;
    }

    const itemValue = itemData[1]; // Precio del ítem

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
          this.selectedItems.splice(index, 1);
          this.removeItemFromSlot(player, item);
          this.returnPoints(player, itemType);
          console.log(`Puntos devueltos para el jugador ${player}`);
          this.removeItemAttributes(player, itemType);
          console.log(`Remove item for ${player}:`, itemType);
        }
      } else if (!item.isSelected && selectedItems.length < this.maxItems) {
        if (player === 1 && this.scene.points1 >= itemValue) {
          this.purchaseItem(player, item, itemType);
          item.setTint(0x272736); //  0xff0000  Rojo
          item.setAlpha(0.5);
          this.addItemToSlot(player, item);
          item.isSelected = true;
          item.selectedBy = player;
          console.log(`Selected item for jugador 2:`, itemType);
          this.applyItemAttributes(player, itemType); // Asignar atributos al jugador 1
          return true;
        } else if (player === 2 && this.scene.points2 >= itemValue) {
          this.purchaseItem(player, item, itemType);
          item.setTint(0x272736); //  0x0000ff  Azul
          item.setAlpha(0.5);
          this.addItemToSlot(player, item);
          item.isSelected = true;
          item.selectedBy = player;
          console.log(`Selected item for jugador 2:`, itemType);
          this.applyItemAttributes(player, itemType); // Asignar atributos al jugador 2}
          return true;
        }
        // No money Sound
        this.noMoney.play();
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
    const itemValue = this.itemDescriptions[itemType][1];
    console.log("pucharse value item --> " + itemValue);
    if (player === 1 && this.scene.points1 >= itemValue) {
      this.scene.points1 -= itemValue;
      hudScene.update_points(1, this.scene.points1);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      this.buySomething.play();
      return true;
    } else if (player === 2 && this.scene.points2 >= itemValue) {
      this.scene.points2 -= itemValue;
      hudScene.update_points(2, this.scene.points2);
      this.selectedItems.push(item); // Agregar ítem al array de seleccionados
      this.buySomething.play();
      return true;
    } else {
      console.log("No tiene suficientes puntos para comprar");
      return false;
    }
  }

  returnPoints(player, itemType) {
    const hudScene = this.scene.scene.get("hudShop");
    const itemValue = this.itemDescriptions[itemType][1];
    if (player === 1) {
      this.scene.points1 += itemValue;
      hudScene.update_points(1, this.scene.points1);
      this.sellSomething.play();
      console.log("Puntos devueltos al jugador 1: ", this.scene.points1);
    } else if (player === 2) {
      this.scene.points2 += itemValue;
      hudScene.update_points(2, this.scene.points2);
      this.sellSomething.play();
      console.log("Puntos devueltos al jugador 2: ", this.scene.points2);
    }
  }

  applyItemAttributes(player, itemType) {
    console.log("Aplicando atributos del item " + itemType);
    const attributes = this.itemAttributes[itemType];
    console.log(
      `Tiene estos atributos -> 
    HP ${attributes?.hitPoints}
    \nDMG ${attributes?.damage}
    \nCRT ${attributes?.critical}
    \nEC ${attributes?.evadeChance}
    \nSpeed ${attributes?.speed}
    \nAnchor ${attributes?.anchor}`
    );

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
