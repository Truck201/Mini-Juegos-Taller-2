import { Bullets } from "./bullets";

export class SlingShot {
  constructor(scene, x, y, keyLeft, keyRight, fireKey, isPlayerOne, gameScene) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.direction = -1; // Para que las balas vayan hacia arriba
    this.isCharging = false;
    this.chargeTime = 0;
    this.maxChargeTime = 3000; // 2 segundos para carga completa
    this.gameScene = gameScene;

    this.nameSprite = isPlayerOne ? "TirachinasRoja" : "TirachinasAzul";

    // Crear el sprite del slingshot
    this.slingshot = this.scene.add.sprite(this.x, this.y, this.nameSprite);
    this.slingshot.setOrigin(0.5, 1); 

    // Crear la barra de carga
    this.chargeBar = this.scene.add.graphics();
    this.chargeBar.setPosition(this.x - 35, this.y - 50); // Posicionar arriba del slingshot

    // Crear las teclas de control para mover el slingshot
    this.keyLeft = keyLeft;
    this.keyRight = keyRight;
    this.fireKey = fireKey;

    this.setupControls();
  }

  setupControls() {
    // Mover el slingshot
    this.scene.input.keyboard.on("keydown", (event) => {
      if (event.keyCode === this.keyLeft) {
        this.slingshot.x -= 15;
        this.chargeBar.x -= 15; // Mover la barra con el slingshot
      }
      if (event.keyCode === this.keyRight) {
        this.slingshot.x += 15;
        this.chargeBar.x += 15; // Mover la barra con el slingshot
      }
      if (event.keyCode === this.fireKey) {
        this.isCharging = true;
        this.chargeTime = 0;
      }
    });

    // Lanzar la bala al soltar la tecla de fuego
    this.scene.input.keyboard.on("keyup", (event) => {
      if (event.keyCode === this.fireKey && this.isCharging) {
        this.fireBullet();
        this.isCharging = false;
      }
    });
  }

  fireBullet() {
    const chargeFactor = Phaser.Math.Clamp(this.chargeTime / this.maxChargeTime, 0, 1);
    const bulletSpeed = 300 + chargeFactor * 4600; // La velocidad aumenta según la carga

    const bullet = new Bullets(
      this.scene,
      this.slingshot.x,
      this.slingshot.y,
      bulletSpeed
    );

    this.gameScene.bullets.add(bullet.bullet);
    console.log(`Bala lanzada con una carga de ${this.chargeTime}ms y velocidad de ${bulletSpeed}ms`);
  }

  update(time, delta) {
    if (this.isCharging) {
      this.chargeTime += delta;

      // Actualizar visualización de la barra de carga
      const chargePercentage = Phaser.Math.Clamp(this.chargeTime / this.maxChargeTime, 0, 1);
      this.updateChargeBar(chargePercentage);
    }
  }

  updateChargeBar(percentage) {
    // Dibujar barra de carga
    this.chargeBar.clear();
    this.chargeBar.fillStyle(0x00ff00, 1);
    this.chargeBar.fillRect(0, 0, 450 * percentage, 10);
  }
}
