export class MoveBar {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    movingSpeed,
    color,
    controls,
    isMovingRight,
    mainBar
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movingSpeed = movingSpeed;
    this.color = color;
    this.controls = controls;
    this.isMovingRight = isMovingRight; // Estado de movimiento
    this.mainBar = mainBar;

    // Crear la barra
    this.bar = scene.add.rectangle(x, y, width, height, color);

    // Añadir teclas de control
    this.keyLeft = scene.input.keyboard.addKey(controls.left);
    this.keyRight = scene.input.keyboard.addKey(controls.right);
  }

  update() {
    const mainBarBounds = this.mainBar.getBounds();

    // Cambiar dirección solo cuando se presionan las teclas
    if (Phaser.Input.Keyboard.JustDown(this.keyRight)) {
      this.isMovingRight = true;
    } else if (Phaser.Input.Keyboard.JustDown(this.keyLeft)) {
      this.isMovingRight = false;
    }

    // Movimiento continuo dentro de los límites de la mainBar
    if (
      this.isMovingRight &&
      this.bar.x + this.width / 2 < mainBarBounds.right
    ) {
      // Mover a la derecha si no supera el borde derecho de la mainBar
      this.bar.x += this.movingSpeed;
    } else if (
      !this.isMovingRight &&
      this.bar.x - this.width / 2 > mainBarBounds.left
    ) {
      // Mover a la izquierda si no supera el borde izquierdo de la mainBar
      this.bar.x -= this.movingSpeed;
    }

    // Verificar si la barra llega a los límites y cambiar la dirección automáticamente
    if (this.bar.x + this.width / 2 >= mainBarBounds.right) {
      this.isMovingRight = false; // Cambiar a izquierda si toca el borde derecho
    } else if (this.bar.x - this.width / 2 <= mainBarBounds.left) {
      this.isMovingRight = true; // Cambiar a derecha si toca el borde izquierdo
    }
  }

  // Método para obtener la barra
  getBounds() {
    return this.bar.getBounds();
  }
}
