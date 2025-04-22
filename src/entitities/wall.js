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

    const margin = sceneWidth * 0.051; // Margen de 6% en los bordes
    const gapBetweenSides = sceneWidth * 0.31; // Espacio central del 20%
    const brickAreaWidth = (sceneWidth - (2 * margin + gapBetweenSides)) / 2; // Ancho para cada grupo de ladrillos (izq y der)
    const spacingX = 60; // Separación horizontal mínima entre ladrillos
    const spacingY = sceneHeight * 0.23; // Separación vertical mínima entre ladrillos

    const widthBrick = (brickAreaWidth - spacingX * (columnas - 1)) / columnas; // Ancho de cada ladrillo
    const heightBrick = (sceneHeight * 0.18 - spacingY * (filas - 1)) / filas; // Alto de cada ladrillo

    const leftOffsetX = margin; // Inicio del primer grupo de ladrillos (izquierda)
    const rightOffsetX = margin + brickAreaWidth + gapBetweenSides; // Inicio del segundo grupo de ladrillos (derecha)
    const offsetY = sceneHeight * 0.2; // Ajuste en Y para centrar verticalmente los ladrillos

    this.collisionWidth = 60; // Ancho de colisión igual al ancho del brick
    this.collisionHeight = 60; // Alto de colisión igual al alto del brick

    const brickColors = {
      blue: 0x0000ff,
      red: 0xff0000,
      green: 0x00ff00,
      orange: 0xff8000,
      salt: 0xfff1e8,
      sugar: 0xfff1e8,
      spicy: 0xfff1e8,
    };

    const createBrickGroup = (startX) => {
      for (let i = 0; i < filas; i++) {
        this.brickPositions[i] = [];
        for (let j = 0; j < columnas; j++) {
          const x = startX + j * (widthBrick + spacingX) + widthBrick / 2;
          const y = offsetY + i * (heightBrick + spacingY) + heightBrick / 2;

          this.brickPositions[i][j] = { x, y };

          const randomType = Phaser.Math.RND.pick([
            "blue",
            "rose",
            "green",
            "orange",
            "salt",
            "sugar",
            "spicy",
          ]);
          const color = brickColors[randomType];

          let brick = new Brick(
            this.scene,
            x,
            y,
            widthBrick,
            heightBrick,
            color,
            0.001,
            randomType,
            this.collisionWidth, // Pasar el tamaño de colisión
            this.collisionHeight // Pasar el tamaño de colisión
          );

          this.add(brick);
          brick.setRowIndex(i);
          brick.setColIndex(j);
        }
      }
    };
    createBrickGroup(leftOffsetX);
    createBrickGroup(rightOffsetX);
  }

  checkAndRegenerateWall() {
    let rowsEmptyLeft = Array(this.filas).fill(true);
    let colsEmptyLeft = Array(this.columnas).fill(true);
    let rowsEmptyRight = Array(this.filas).fill(true);
    let colsEmptyRight = Array(this.columnas).fill(true);

    this.getChildren().forEach((brick) => {
      const row = brick.getRowIndex();
      const col = brick.getColIndex();

      // Verifica si el ladrillo pertenece al lado izquierdo o derecho
      if (brick.active) {
        if (brick.x < this.scene.sys.game.config.width / 2) {
          rowsEmptyLeft[row] = false;
          colsEmptyLeft[col] = false;
        } else {
          rowsEmptyRight[row] = false;
          colsEmptyRight[col] = false;
        }
      }
    });

    // Regenera columnas vacías para el lado izquierdo
    colsEmptyLeft.forEach((isEmpty, col) => {
      if (isEmpty) {
        this.regenerateColumn(col, true); // true para el lado izquierdo
      }
    });

    // Regenera columnas vacías para el lado derecho
    colsEmptyRight.forEach((isEmpty, col) => {
      if (isEmpty) {
        this.regenerateColumn(col, false); // false para el lado derecho
      }
    });
  }

  regenerateColumn(col, isLeftSide) {
    const offsetX = isLeftSide
      ? this.scene.sys.game.config.width * 0.06
      : this.scene.sys.game.config.width * 0.06 +
        (this.scene.sys.game.config.width * 0.165 +
          (this.scene.sys.game.config.width -
            2 * this.scene.sys.game.config.width * 0.06) /
            2);

    for (let row = 0; row < this.filas; row++) {
      const { y } = this.brickPositions[row][col];
      const color = this.getRandomBrickColor();
      const randomType = this.getType();
      const newOffset = isLeftSide ? 98 : 94;
      const x =
        offsetX +
        col * (this.collisionWidth + newOffset) +
        this.collisionWidth / 2; // Ajusta el cálculo de X aquí

      const brick = new Brick(
        this.scene,
        x, // Asegúrate de ajustar la posición X aquí
        y,
        this.collisionWidth,
        this.collisionHeight,
        color,
        0.001,
        randomType,
        this.collisionWidth,
        this.collisionHeight
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
      spicy: 0xfff1e8,
    };
    const randomType = this.getType();
    return brickColors[randomType];
  }

  getType() {
    const randomType = Phaser.Math.RND.pick([
      "blue",
      "rose",
      "green",
      "orange",
      "salt",
      "sugar",
      "spicy",
    ]);
    return randomType;
  }
}
