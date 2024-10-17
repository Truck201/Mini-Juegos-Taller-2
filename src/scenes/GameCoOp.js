import { Scene } from "phaser";
import { TargetsCoop } from "../entitities/targets";
import { SlingShot } from "../entitities/slingshot";
import { Bullets } from "../entitities/bullets";

export class GameCooperative extends Scene {
  constructor() {
    super("GameCoop");

    this.targets = [];
    this.slingshots = [];
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

    this.createNewTargets();

    // Crear los slingshots
    this.slingshots.push(
      new SlingShot(
        this,
        width * 0.25,
        height * 0.885,
        Phaser.Input.Keyboard.KeyCodes.A,
        Phaser.Input.Keyboard.KeyCodes.D,
        Phaser.Input.Keyboard.KeyCodes.SPACE,
        true,
        this
      )
    ); // Jugador 1

    this.slingshots.push(
      new SlingShot(
        this,
        width * 0.75,
        height * 0.885,
        Phaser.Input.Keyboard.KeyCodes.LEFT,
        Phaser.Input.Keyboard.KeyCodes.RIGHT,
        Phaser.Input.Keyboard.KeyCodes.ENTER,
        false,
        this
      )
    ); // Jugador 2

    // Crear grupo para las balas
    this.bullets = this.physics.add.group({
      defaultKey: "bulletSprite", // El nombre del sprite para las balas
      maxSize: 0, // Número máximo de balas activas al mismo tiempo
      allowGravity: true, // Desactivar la gravedad para este grupo
    });

    // Detectar colisiones entre balas y dianas
    this.targets.forEach((target) => {
      this.physics.add.collider(
        this.bullets,
        target.target,
        this.onBulletHitTarget,
        null,
        this
      );
    });
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
        const x = rowOffsetX + col * size;
        const y = offsetY + row * size2;

        const color = shuffledColors[index];

        const target = new TargetsCoop(this, x, y, color);
        this.targets.push(target);

        index++;
      }
    }
  }

  update(time, delta) {
    // Actualizar ambos slingshots
    this.slingshots.forEach((slingshot) => {
      slingshot.update(time, delta);
    });

    // Actualizar las balas en cada frame para asegurar su movimiento
    this.bullets.children.each((bullet) => {
      if (bullet.active && bullet.y < 0) {
        bullet.destroy(); // Destruir balas que salgan de la pantalla
      }
    });
  }

  // Método para manejar colisiones entre balas y dianas
  onBulletHitTarget(bullet, target) {
    console.log("Diana impactada!");
    target.onHit(bullet, target);
    bullet.destroy(); // Destruir la bala después de la colisión
  }
}
