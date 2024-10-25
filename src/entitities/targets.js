import { animationsScene } from "../anims/coopTarget";
export class TargetsCoop {
  constructor(scene, x, y, color) {
    this.scene = scene;
    this.color = color;
    this.x = x;
    this.y = y;

    this.target = null;
    this.bag = null;

    this.create();
  }

  create() {
    animationsScene(this.scene);

    this.createTarget();

    this.generateBags(this.color);

    // Detectar la bolsa con el límite suelo
    this.scene.physics.add.collider(
      this.bag,
      this.scene.limits,
      this.onCollisionWithLimits,
      null,
      this
    );
  }

  createTarget() {
    this.target = this.scene.add
      .sprite(this.x, this.y, "StaticTarget")
      .setOrigin(0.5)
      .setDepth(10);

    this.scene.physics.add.existing(this.target);
    this.target.setImmovable;
    this.target.body.allowGravity = false;
  }

  generateBags(color) {
    this.bag = this.scene.add
      .sprite(this.x - 59, this.y - 5, `Empty${color}`)
      .setDepth(10);

    this.scene.physics.add.existing(this.bag);
    this.bag.body.allowGravity = false;
  }

  onHit(bullet, target) {
    console.log("Diana Hit");

    this.target.anims.play("AnimsTarget", true);

    this.target.on("animationcomplete", () => {
      this.target.setTexture(`StaticTarget`);
    });

    // Hacer que la bolsa correspondiente caiga y reproduzca su animación
    this.bag.body.allowGravity = true;
    this.bag.anims.play(`BF${this.color}`, true);

    this.bag.on("animationupdate", (animation, frame) => {
      this.moveColliderDuringAnimation(this.bag);
    });

    this.bag.on("animationcomplete", () => {
      console.log("Bolsa cayendo");
      this.bag.body.setVelocityY(940);
      this.bag.body.setSize(70, 70);
      this.bag.body.setOffset(0, 0);
      this.bag.setTexture(`Empty${this.color}`);
    });

    // Destruir la bala después del impacto
    bullet.destroy();
  }

  moveColliderDuringAnimation(bag) {
    // Ejemplo: mover el cuerpo hacia la derecha
    bag.body.setSize(70, 70);
  }

  // Función a ejecutar cuando ocurre la colisión
  onCollisionWithLimits(bag, limits) {
    console.log("Bolsa ha colisionado con el suelo");
    bag.body.setSize(70, 70);
    bag.body.setOffset(0, 0);
  }
}
