import { initialAnims } from "./animsToCooperative";

export class BridgeManager {
  constructor(scene, bridgeSprite) {
    this.scene = scene;
    this.bridge = bridgeSprite;

    this.scene.physics.add.existing(this.bridge); // Agrega física al sprite
    this.bridge.body.allowGravity = false;
    this.bridge.body.setImmovable(true);

    this.itemsOnBridge = [];

    this.scene.physics.add.overlap(
      this.scene.physics.world.bounds,
      this.bridge,
      this.collectItem,
      null,
      this
    );
  }

  collectItem(item) {
    if (item && item.type) {
      this.itemsOnBridge.push(item.type);
    }
  }

  checkItems() {
    if (this.itemsOnBridge.length >= 2) {
      const item1 = this.itemsOnBridge[0];
      const item2 = this.itemsOnBridge[1];
      this.scene.pedidoManager.validatePedido(item1, item2);
      this.itemsOnBridge = []; // Reiniciar después de validar
    }
  }
}
