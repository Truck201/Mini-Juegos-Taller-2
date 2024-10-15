export class Bullets {
    constructor(scene, x, y, direction) {
        this.scene = scene;

        // Crear la bala
        this.bullet = this.scene.physics.add.sprite(x, y, "bulletSprite"); // Usar el sprite que prefieras para la bala
        this.bullet.setCollideWorldBounds(true);
        this.bullet.body.allowGravity = false;

        // Establecer dirección y velocidad de la bala
        const velocity = 500; // Velocidad de la bala
        this.bullet.setVelocityX(velocity * direction);
    }

    // Método para destruir la bala si es necesario
    destroy() {
        this.bullet.destroy();
    }
}
