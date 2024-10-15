import { Bullets } from "./bullets";

export class SlingShot {
  constructor(scene, x, y, keyLeft, keyRight, fireKey, isPlayerOne) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.direction = x < scene.game.scale.width / 2 ? 1 : -1; // Determina si el slingshot está a la izquierda o derecha
    this.isCharging = false; // Indica si está cargando el disparo
    this.chargeTime = 0; // Tiempo de carga del disparo

    if (isPlayerOne) {
      this.nameSprite = "TirachinasRoja";
    } else if (!isPlayerOne) {
      this.nameSprite = "TirachinasAzul";
    }

    // Crear el sprite del slingshot
    this.slingshot = this.scene.add.sprite(this.x, this.y, this.nameSprite); // Usar el sprite que prefieras para el slingshot

    // Crear las teclas de control para mover el slingshot
    this.cursors = this.scene.input.keyboard.addKeys({
      left: keyLeft,
      right: keyRight,
      fire: fireKey,
    });

    this.setupControls();
  }

  setupControls() {
    // Movimiento del slingshot
    this.scene.input.keyboard.on("keydown", (event) => {
      if (event.key === this.cursors.left.key) {
        this.slingshot.x -= 10; // Mover a la izquierda
      }
      if (event.key === this.cursors.right.key) {
        this.slingshot.x += 10; // Mover a la derecha
      }
    });

    // Cargar disparo al mantener la tecla de fuego
    this.scene.input.keyboard.on("keydown", (event) => {
      if (event.key === this.cursors.fire.key) {
        this.isCharging = true;
        this.chargeTime = 0; // Reinicia el tiempo de carga
      }
    });

    // Lanzar la bala al soltar la tecla de fuego
    this.scene.input.keyboard.on("keyup", (event) => {
      if (event.key === this.cursors.fire.key && this.isCharging) {
        this.fireBullet();
        this.isCharging = false;
      }
    });
  }

  fireBullet() {
    // Lógica para lanzar la bala
    const bullet = new Bullets(
      this.scene,
      this.slingshot.x,
      this.slingshot.y,
      this.direction
    );
    console.log(`Bala lanzada con una carga de ${this.chargeTime}ms`);
  }

  update(time, delta) {
    // Incrementar el tiempo de carga si está cargando el disparo
    if (this.isCharging) {
      this.chargeTime += delta;
    }
  }
}
