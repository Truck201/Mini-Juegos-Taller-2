export class Brick extends Phaser.GameObjects.Rectangle {
  constructor(
    scene,
    x,
    y,
    width,
    height,
    color,
    alpha,
    type,
    collisionWidth,
    collisionHeight
  ) {
    super(scene, x, y, width, height, color, alpha);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.type = type; // Agregamos la propiedad 'type'
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setSize(collisionWidth, collisionHeight); // Ajusta el tamaño de colisión

    this.body.immovable = true;
    this.body.allowGravity = false;
    this.body.setCollideWorldBounds(true);

    this.touches = 0;
    this.maxTouches = 3; // Ladrillo se destruye después de 3 impactos
    this.points = Phaser.Math.Between(5, 20);

    this.createItemSprite(this.type);
  }

  createItemSprite(type) {
    // Agregar el sprite representando el objeto
    this.itemSprite = this.scene.add
      .sprite(this.x, this.y, this.getItemSprite(type))
      .setOrigin(0.5)
      .setScale(0.88)
      .setDepth(0);
    this.scene.physics.add.existing(this.itemSprite);
    this.itemSprite.body.immovable = true; // El sprite no se moverá por la física
    this.itemSprite.body.allowGravity = false; // No se afecta por la gravedad

    // Tween para que el sprite caiga desde la parte superior de la pantalla
    this.itemSprite.setY(-50); // Comienza fuera de la pantalla
    this.scene.tweens.add({
      targets: this.itemSprite,
      y: this.y, // Posición final
      duration: 800, // Duración de la animación
      ease: "Bounce.easeOut", // Efecto de rebote
    });
  }

  getItemSprite(type) {
    // Devuelve el sprite dependiendo del tipo
    switch (type) {
      case "blue":
        return "EmptyBlue";
      case "rose":
        return "EmptyRose";
      case "green":
        return "EmptyGreen";
      case "orange":
        return "EmptyOrange";
      case "salt":
        return "salt";
      case "sugar":
        return "sugar";
      case "spicy":
        return "spicy";
      default:
        console.log("default");
        return "defaultSprite"; // Sprite por defecto si no coincide
    }
  }

  hit() {
    this.touches += 1;
    if (this.touches >= 1) {
      // Destruir el itemSprite cuando el ladrillo es golpeado
      this.itemSprite.destroy();
      // Destruir ladrillo y generar sprite dependiendo del tipo
      let fallingObject;
      if (this.type === "blue") {
        fallingObject = this.scene.createFallingObject(
          this.x,
          this.y,
          "EmptyBlue"
        );
      } else if (this.type === "rose") {
        fallingObject = this.scene.createFallingObject(
          this.x,
          this.y,
          "EmptyRose"
        );
      } else if (this.type === "green") {
        fallingObject = this.scene.createFallingObject(
          this.x,
          this.y,
          "EmptyGreen"
        );
      } else if (this.type === "orange") {
        fallingObject = this.scene.createFallingObject(
          this.x,
          this.y,
          "EmptyOrange"
        );
      } else if (this.type === "salt") {
        fallingObject = this.scene.createFallingObject(this.x, this.y, "salt");
      } else if (this.type === "sugar") {
        fallingObject = this.scene.createFallingObject(this.x, this.y, "sugar");
      } else if (this.type === "spicy") {
        fallingObject = this.scene.createFallingObject(this.x, this.y, "spicy");
      }
      this.body.enable = false; // Deshabilitar el cuerpo de físicas
      this.destroy();
    }
  }
  // Definir setRowIndex y setColIndex
  setRowIndex(row) {
    this.rowIndex = row;
  }

  setColIndex(col) {
    this.colIndex = col;
  }

  getRowIndex() {
    return this.rowIndex;
  }

  getColIndex() {
    return this.colIndex;
  }
}
