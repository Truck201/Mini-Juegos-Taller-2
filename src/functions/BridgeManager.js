import { initialAnims } from "./animsToCooperative";

export class BridgeManager {
  constructor(scene, bridgeSprite) {
    this.scene = scene;
    this.bridge = bridgeSprite;

    this.scene.physics.add.existing(this.bridge); // Agrega física al sprite
    this.bridge.body.allowGravity = false;
    this.bridge.body.setImmovable(true);
  }

  openBridge() {
    // Lógica para abrir el puente
    this.scene.tweens.add({
      targets: this.bridge,
      angle: 90,
      duration: 500,
      ease: "Power2",
      onComplete: () => {
        // Restablecer el ángulo después de abrir
        this.bridge.setAngle(0);
        this.clearBridge(); // Limpiar el puente después de abrirlo
      },
    });
  }
}
