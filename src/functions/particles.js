export class Particles {
  constructor(scene, x, y, targetX, targetY, isPlayerOne) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.targetX = targetX;
    this.targetY = targetY;
    this.isPlayerOne = isPlayerOne;

    // Crear una curva Bézier con los puntos de control
    const curveLeft = new Phaser.Curves.QuadraticBezier(
      new Phaser.Math.Vector2(x, y), // Punto inicial
      new Phaser.Math.Vector2(x - 50, y - 100), // Punto de control inclinado a la izquierda
      new Phaser.Math.Vector2(this.targetX, this.targetY) // Punto final (destino)
    );

    const curveRight = new Phaser.Curves.QuadraticBezier(
      new Phaser.Math.Vector2(x, y), // Punto inicial
      new Phaser.Math.Vector2(x + 50, y - 100), // Punto de control inclinado a la derecha
      new Phaser.Math.Vector2(this.targetX, this.targetY) // Punto final (destino)
    );

    let curve;
    let type
    if (this.isPlayerOne) {
      type = 'flare3'
      curve = curveLeft;
    } else {
      type = 'flare'
      curve = curveRight;  
    }

    const partis = scene.add.particles(x, y, type, {
      speed: { min: 10, max: 70 },
      lifespan: 450, // 450
      alpha: { start: 1, end: 0 }, // Las partículas se desvanecen
      scale: { start: 0.003, end: 0.09 },  // 0.003, end: 0.09  start: 0.76, end: 0.003
      tint: 0xffffff,
      quantity: 9,
      gravityY: 0, // Sin gravedad para un movimiento lineal
      blendMode: "ADD",
    });

    // Actualiza la posición de las partículas a lo largo de la curva
    let t = 0;
    this.scene.time.addEvent({
      delay: 9.3, // Frecuencia de actualización de la posición
      callback: () => {
        const point = curve.getPoint(t); // Obtiene el punto en la curva en el parámetro t
        partis.setPosition(point.x, point.y); // Coloca las partículas en el punto calculado
        t += 0.009; // Incrementa t para avanzar en la curva
        if (t > 1) {
          // Alcanza la meta
          partis.destroy();
        }
      },
      loop: true,
    });

    partis.setDepth(200);
  }
}
