// grpup of brick
import { Brick } from "../entitities/bricks";
export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene, filas, columnas) {
    super(scene);
    this.scene = scene; // Asegúrate de que la escena esté asociada
    this.filas = filas;
    this.columnas = columnas;

    this.brickPositions = []; // Array para guardar las posiciones de los ladrillos

    this.createWall(this.filas, this.columnas);
  }

  createWall(filas, columnas) {
    const sceneWidth = Number(this.scene.sys.game.config.width);
    const sceneHeight = Number(this.scene.sys.game.config.height);

    const leftMargin = sceneWidth * 0.1;
    const rightMargin = sceneWidth * 0.1;

    const totalWidth = sceneWidth - leftMargin - rightMargin; // Total width minus margins

    const totalHeightForBricks = sceneHeight * 0.2; // El 30% del alto de la pantalla para los ladrillos
    const heightBrick = totalHeightForBricks / filas; // Altura de cada ladrillo (distribuidos equitativamente)
    const minBrickWidth = 10;

    // Calcular el ancho de los ladrillos basado en el totalWidth disponible
    let widthBrick = (totalWidth / columnas) * 0.8; // Reducir el ancho del ladrillo en un 30% para ajuste
    if (widthBrick < minBrickWidth) {
      widthBrick = minBrickWidth; // Asegurar que el ancho mínimo se respete
    }

    this.collisionWidth = widthBrick - 80; // Ancho de colisión igual al ancho del brick
    this.collisionHeight = heightBrick; // Alto de colisión igual al alto del brick

    const spacingX = 60; // Espaciado de 10 px entre los ladrillos
    const spacingY = 70;
    const offsetX = leftMargin; // Desplazamiento en X desde el margen izquierdo
    const offsetY = sceneHeight * 0.2; // Ajuste en Y para centrar verticalmente los ladrillos

    const brickColors = {
      blue: 0x0000ff,
      red: 0xff0000,
      green: 0x00ff00,
      orange: 0xff8000,
      salt: 0xfff1e8,
      sugar: 0xfff1e8,
    };

    for (let i = 0; i < filas; i++) {
      this.brickPositions[i] = [];
      for (let j = 0; j < columnas; j++) {
        const x = offsetX + j * (widthBrick + spacingX) + widthBrick / 2;
        const y = offsetY + i * (heightBrick + spacingY) + heightBrick / 2;

        // Guarda la posición calculada
        this.brickPositions[i][j] = { x, y };

        // Asignar aleatoriamente un tipo de ladrillo
        const randomType = Phaser.Math.RND.pick([
          "blue",
          "red",
          "green",
          "orange",
          "salt",
          "sugar",
        ]);
        const color = brickColors[randomType];

        let brick = new Brick(
          this.scene,
          x,
          y,
          widthBrick,
          heightBrick,
          color,
          0.09,
          randomType,
          this.collisionWidth, // Pasar el tamaño de colisión
          this.collisionHeight // Pasar el tamaño de colisión
        );

        this.add(brick);
        brick.setRowIndex(i);
        brick.setColIndex(j);
      }
    }
  }

  // Método para verificar y regenerar filas y columnas vacías
  checkAndRegenerateWall() {
    let rowsEmpty = Array(this.filas).fill(true);
    let colsEmpty = Array(this.columnas).fill(true);

    this.getChildren().forEach((brick) => {
      const row = brick.getRowIndex();
      const col = brick.getColIndex();

      if (brick.active) {
        rowsEmpty[row] = false;
        colsEmpty[col] = false;
      }
    });

    rowsEmpty.forEach((isEmpty, row) => {
      if (isEmpty) {
        this.regenerateRow(row);
      }
    });

    colsEmpty.forEach((isEmpty, col) => {
      if (isEmpty) {
        this.regenerateColumn(col);
      }
    });
  }

  regenerateRow(row) {
    for (let col = 0; col < this.columnas; col++) {
      const { x, y } = this.brickPositions[row][col];
      const color = this.getRandomBrickColor();
      const randomType = this.getType();

      const brick = new Brick(
        this.scene,
        x,
        y,
        60,
        20,
        color,
        0.09,
        randomType,
        this.collisionWidth, // Pasar el tamaño de colisión
        this.collisionHeight // Pasar el tamaño de colisión
      );
      this.add(brick);
      brick.setRowIndex(row);
      brick.setColIndex(col);
    }
  }

  regenerateColumn(col) {
    for (let row = 0; row < this.filas; row++) {
      const { x, y } = this.brickPositions[row][col];
      const color = this.getRandomBrickColor();
      const randomType = this.getType();

      const brick = new Brick(
        this.scene,
        x,
        y,
        60,
        20,
        color,
        0.09,
        randomType,
        this.collisionWidth, // Pasar el tamaño de colisión
        this.collisionHeight // Pasar el tamaño de colisión
      );
      this.add(brick);
      brick.setRowIndex(row);
      brick.setColIndex(col);
    }
  }

  getRandomBrickColor() {
    const brickColors = {
      blue: 0x0000ff,
      red: 0xff0000,
      green: 0x00ff00,
      orange: 0xff8000,
      salt: 0xfff1e8,
      sugar: 0xfff1e8,
    };
    const randomType = this.getType();
    return brickColors[randomType];
  }

  getType() {
    const randomType = Phaser.Math.RND.pick([
      "blue",
      "red",
      "green",
      "orange",
      "salt",
      "sugar",
    ]);
    return randomType;
  }
}
