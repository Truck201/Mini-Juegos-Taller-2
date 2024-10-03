export class KidKorn {
  constructor(scene) {
    this.scene = scene;

    this.y = this.scene.scale.height;
    this.x = this.scene.scale.width;

    this.kidKornBig = this.scene.add.sprite(this.x / 2, this.y * 1.9, "kid-kornB").setDepth(2).setScale(0.64);
    this.kidKornBig.setVisible(false); // Ocultar al inicio

    this.kidKornLeft = this.scene.add.sprite(-200, this.y * 0.8, "kid-kornL").setDepth(4).setScale(0.6);
    this.kidKornRight = this.scene.add.sprite(this.x + 200, this.y * 0.8, "kid-kornR").setDepth(4).setScale(0.6);

    this.kidKornLeft.setVisible(false); // Ocultar al inicio
    this.kidKornRight.setVisible(false); // Ocultar al inicio
  }

  update() {
  }


  showKidKornBig() {
    let width = this.scene.game.scale.width;
    let height = this.scene.game.scale.height;

    // Hacer visible el sprite de KidKorn
    this.kidKornBig.setVisible(true);

    // Animar a KidKorn para que suba desde la parte inferior
    this.scene.tweens.add({
      targets: this.kidKornBig,
      y: height * 0.57, // Subir hasta la mitad de la pantalla
      duration: 2500, // Duración de la animación (2 segundos)
      ease: "Power2", // Tipo de easing
      onComplete: () => {
        // Una vez que llega a la mitad, comenzar a generar pochoclos
        this.scene.startGeneratingPopcorn(true);

        // Luego de 6 segundos, ocultar a KidKorn y detener la generación de pochoclos
        this.scene.time.delayedCall(6000, () => {
          this.hideKidKornBig();
        });
      },
    });

    // Efecto de shake (temblor) mientras sube
    this.scene.tweens.add({
      targets: this.kidKornBig,
      x: {
        value: width / 2 + 10, // Pequeño desplazamiento en X
        duration: 50, // Duración corta
        ease: "Power1",
        yoyo: true, // Regresar a la posición original
        repeat: -1, // Repetir indefinidamente durante la subida
      },
    });
  }

  hideKidKornBig() {
    let height = this.scene.game.scale.height;

    // Hacer que KidKorn baje y luego desaparecerlo
    this.scene.tweens.add({
      targets: this.kidKornBig,
      y: height * 1.66, // Bajar hasta fuera de la pantalla
      duration: 2000, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        this.kidKornBig.setVisible(false); // Ocultar después de la animación
      },
    });
  }

  showKidKorn() {
    // Elegir aleatoriamente si aparece por la izquierda o la derecha
    const fromLeft = Phaser.Math.Between(0, 1) === 0;

    let sprite = fromLeft ? this.kidKornLeft : this.kidKornRight;
    let startX = fromLeft ? -175 : this.scene.scale.width + 175;
    let endX = fromLeft ? this.x * 0.02 : this.x * 0.98;

    sprite.setVisible(true);
    sprite.x = startX;
    console.log("sprite seleccionado:", sprite);
    // Animar la entrada
    this.scene.tweens.add({
      targets: sprite,
      x: endX,
      duration: 2000, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        // Generar pochoclos cuando llega al centro
        this.scene.startGeneratingPopcorn(false);
        // Desaparecer después de un tiempo aleatorio entre 1 y 2 segundos
        this.scene.time.delayedCall(Phaser.Math.Between(1200, 2000), () => {
          this.hideKidKornChild(sprite, fromLeft);
        });
      },
    });
  }

  hideKidKornChild(sprite, fromLeft) {
    let endX = fromLeft ? -160 : this.scene.scale.width + 160;

    console.log("sprite seleccionado:", sprite);
    // Animar la salida
    this.scene.tweens.add({
      targets: sprite,
      x: endX,
      duration: 2000, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        sprite.setVisible(false); // Ocultar después de la animación
      },
    });
  }

  startKidKornAppearance() {
    // Temporizador para aparecer KidKorn en intervalos aleatorios de 4 a 9 segundos
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(5000, 7000),
      loop: true,
      callback: () => {
        if (this.scene.game_over_timeout > 16) {
          this.showKidKorn(); // Mostrar KidKorn de forma aleatoria
        }
      },
    });
  }

}
