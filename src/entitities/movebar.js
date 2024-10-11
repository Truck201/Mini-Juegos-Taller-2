export class MoveBar {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    movingSpeed,
    sprite,
    controls,
    isMovingRight,
    imagenBar,
    anchor
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movingSpeed = movingSpeed;
    this.sprite = sprite;
    this.controls = controls;
    this.isMovingRight = isMovingRight; // Estado de movimiento
    this.imagenBar = imagenBar;

    // Crear la barra
    this.bar = scene.add.sprite(x, y, sprite);
    this.bar.setScale(anchor).setDepth(15); // 1.2
    
    this.scene.physics.add.existing(this.bar); // Donde this.bar es el sprite de la barra
    this.bar.body.setImmovable(true); // Si la barra no se debe mover por colisiones
    this.bar.body.allowGravity = false

    // Añadir teclas de control
    this.keyLeft = scene.input.keyboard.addKey(controls.left);
    this.keyRight = scene.input.keyboard.addKey(controls.right);
  }

  update() {
    const imagenBarBounds = this.scene.imagenBar.getBounds();

    // Cambiar dirección solo cuando se presionan las teclas
    if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {
      this.isMovingRight = true;
    } else if (Phaser.Input.Keyboard.JustDown(this.keyLeft)) {
      this.isMovingRight = false;
    }

    // Movimiento continuo dentro de los límites de la imagenBar
    if (
      this.isMovingRight &&
      this.bar.x + this.width / 2 < imagenBarBounds.right + 40
    ) {
      // Mover a la derecha si no supera el borde derecho de la imagenBar
      this.bar.x += this.movingSpeed;
    } else if (
      !this.isMovingRight &&
      this.bar.x - this.width / 2 > imagenBarBounds.left - 40
    ) {
      // Mover a la izquierda si no supera el borde izquierdo de la imagenBar
      this.bar.x -= this.movingSpeed;
    }

    // Verificar si la barra llega a los límites y cambiar la dirección automáticamente
    if (this.bar.x + this.width / 2 >= imagenBarBounds.right) {
      this.isMovingRight = false; // Cambiar a izquierda si toca el borde derecho
    } else if (this.bar.x - this.width / 2 <= imagenBarBounds.left) {
      this.isMovingRight = true; // Cambiar a derecha si toca el borde izquierdo
    }
  }

  setSpeed(newSpeed) {
    this.movingSpeed = newSpeed; // Actualiza la velocidad
  }

  // Método para obtener la barra
  getBounds() {
    return this.bar.getBounds();
  }
}
