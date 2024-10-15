import { Scene } from "phaser";
import { TargetsCoop } from "../entitities/targets";
import { SlingShot } from "../entitities/slingshot";
import { Bullets } from "../entitities/bullets";

export class GameCooperative extends Scene {
  constructor() {
    super("GameCoop");

    this.targets = new Array();
    this.slingshots = new Array();
  }

  create() {
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    this.limits = this.add
      .rectangle(width * 0.5, height * 0.75, width, 100, "#ffffff")
      .setAlpha(0);
    this.physics.add.existing(this.limits);
    this.limits.body.setImmovable(true);
    this.limits.body.allowGravity = false;
    this.limits.body.setSize(width, 100);

    // Crear los slingshots para ambos jugadores
    this.slingshot1 = this.slingshots.push(
      new SlingShot(this, width * 0.25, height * 0.85, "A", "D", "SPACE", true)
    ); // Jugador 1
    this.slingshot2 = this.slingshots.push(
      new SlingShot(
        this,
        width * 0.75,
        height * 0.85,
        "LEFT",
        "RIGHT",
        "ENTER",
        false
      )
    ); // Jugador 2

    this.createNewTargets();

    this.bullets = this.physics.add.group();
    const bullet1 = new Bullets(
      this,
      this.slingshot1.x,
      this.slingshot1.y,
      this.direction
    );
    this.bullets.add(bullet1.bullet); // Agregar la bala al grupo

    const bullet2 = new Bullets(
      this,
      this.slingshot2.x,
      this.slingshot2.y,
      this.direction
    );
    this.bullets.add(bullet2.bullet); // Agregar la bala al grupo

    // Detectar colisiones entre balas y dianas
    this.physics.add.collider(
      this.bullets,
      this.targets.map((target) => target.target),
      this.onBulletHitTarget,
      null,
      this
    );
  }

  createNewTargets() {
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    const size = width * 0.15;
    const size2 = width * 0.088;
    const offsetX = width * 0.32;
    const offsetY = height * 0.385;

    const layout = [
      [1, 1, 1], // 3 elementos en la primera fila
      [1, 1], // 2 elementos en la segunda fila
    ];

    const avalibleColor = ["Blue", "Purple", "Orange", "Rose", "Green"];

    const shuffledColors = Phaser.Utils.Array.Shuffle(avalibleColor).slice(
      0,
      5
    );

    let index = 0;
    for (let row = 0; row < layout.length; row++) {
      const cols = layout[row].length;
      const rowOffsetX = offsetX - (cols * size) / 2;

      for (let col = 0; col < cols; col++) {
        const x = rowOffsetX + col * size; // Posición X basada en el espaciado
        const y = offsetY + row * size2; // Posición Y con distancia entre filas

        const color = shuffledColors[index]; // Asignar color al objetivo

        const target = new TargetsCoop(this, x, y, color); // Crear el objetivo
        this.targets.push(target); // Añadir el objetivo al array

        index++;
      }
    }
  }

  update(time, delta) {
    // Actualizar ambos slingshots
    this.slingshots.forEach((slingshot) => {
      slingshot.update(time, delta);
    });
  }

  // Método para manejar colisiones entre balas y dianas
  onBulletHitTarget(bullet, target) {
    target.onHit(bullet, target);
    bullet.destroy(); // Destruir la bala después de la colisión
  }
}
